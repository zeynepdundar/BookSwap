import {
  getFirestore,
  collection,
  doc,
  onSnapshot,
  getDocs,
  writeBatch,
  setDoc,
  updateDoc,
  Timestamp,
} from "@react-native-firebase/firestore";

import { generateConversationId } from "@/utils/helper";


export const subscribeToMessages = (
  firebaseUserId: string,
  {
    onMessageReceived,
    onError,
  }: {
    onMessageReceived: (messages: any[]) => void;
    onError?: (error: any) => void;
  }
): (() => void) => {
  if (!firebaseUserId) {
    console.warn("subscribeToMessages called without firebaseUserId");
    onMessageReceived([]);
    return () => {};
  }

  console.log("🔥 Subscribing for user:", firebaseUserId);

  const db = getFirestore();
  const ref = collection(db, "Users", firebaseUserId, "conversations");

  console.log("📡 Listening to:", ref.path);

  // Latest conversation docs and the per-conversation data we derive from each
  // conversation's shared messages subcollection (so the unseen count works
  // without writing to the other user's documents).
  let conversations: any[] = [];
  const derived: Record<
    string,
    { unseenCount: number; lastMessageText?: string; lastMessageTime?: Date }
  > = {};
  const messageUnsubs: Record<string, () => void> = {};

  const emit = () => {
    const messages = conversations
      .map((conv) => {
        const d = derived[conv.id];
        return {
          ...conv,
          unseenCount: d?.unseenCount ?? 0,
          // Prefer the live latest message from the shared collection so the
          // preview updates even for incoming messages (the user's own
          // conversation doc only updates when they send).
          lastMessageText: d?.lastMessageText ?? conv.lastMessageText,
          lastMessageTime: d?.lastMessageTime ?? conv.lastMessageTime,
        };
      })
      // Most recent conversation on top, like WhatsApp.
      .sort(
        (a, b) =>
          (b.lastMessageTime?.getTime?.() ?? 0) -
          (a.lastMessageTime?.getTime?.() ?? 0)
      );
    onMessageReceived(messages);
  };

  // Listen to a conversation's messages: count the ones the current user has not
  // seen yet (sent by the other person and not flagged as seen) and track the
  // latest message for the list preview.
  const subscribeMessagesFor = (conv: any) => {
    const sharedId = generateConversationId(conv.userId, firebaseUserId);
    const messagesRef = collection(db, "Conversations", sharedId, "messages");

    messageUnsubs[conv.id] = onSnapshot(
      messagesRef,
      (snap) => {
        let unseenCount = 0;
        let latestText: string | undefined;
        let latestTime: Date | undefined;

        snap.forEach((messageDoc) => {
          const message = messageDoc.data();
          const isFromOther =
            message.senderId && message.senderId !== firebaseUserId;
          if (isFromOther && message.seen !== true) {
            unseenCount += 1;
          }

          const createdAt = message.createdAt?.toDate?.();
          if (createdAt && (!latestTime || createdAt > latestTime)) {
            latestTime = createdAt;
            latestText = message.text ?? "";
          }
        });

        derived[conv.id] = {
          unseenCount,
          lastMessageText: latestText,
          lastMessageTime: latestTime,
        };
        emit();
      },
      (error) => {
        console.error("❌ Messages subcollection error:", error);
        onError?.(error);
      }
    );
  };

  let unsubscribe: (() => void) | undefined;

  try {
    unsubscribe = onSnapshot(
      ref,
      (snapshot) => {
        try {
          conversations = snapshot.empty
            ? []
            : snapshot.docs
                .map((doc) => {
                  const data = doc.data();

                  if (!data.conversationId || !data.userId) {
                    console.warn("⚠️ Invalid doc:", doc.id);
                    return null;
                  }

                  return {
                    id: doc.id,
                    conversationId: data.conversationId,
                    lastMessageText: data.lastMessageText || "",
                    lastMessageTime:
                      data.lastMessageTime?.toDate?.() || new Date(),
                    userId: data.userId,
                  };
                })
                .filter(Boolean);

          const activeIds = new Set(conversations.map((conv) => conv.id));

          // Drop listeners for conversations that no longer exist
          Object.keys(messageUnsubs).forEach((id) => {
            if (!activeIds.has(id)) {
              messageUnsubs[id]?.();
              delete messageUnsubs[id];
              delete derived[id];
            }
          });

          // Add listeners for newly seen conversations
          conversations.forEach((conv) => {
            if (!messageUnsubs[conv.id]) {
              subscribeMessagesFor(conv);
            }
          });

          emit();
        } catch (err) {
          console.error("❌ Snapshot processing error:", err);
          onError?.(err);
        }
      },
      (error) => {
        console.error("❌ Firestore subscription error:", error);
        onError?.(error);
      }
    );
  } catch (error) {
    console.error("❌ Failed to setup subscription:", error);
    onError?.(error);
  }

  /**
   * Cleanup
   */
  return () => {
    console.log("🧹 Unsubscribing from messages");
    unsubscribe?.();
    Object.values(messageUnsubs).forEach((unsub) => unsub?.());
  };
};

export const resetUnseenCount = async (relatedChat: any) => {
  try {
    const { friendUserId, firebaseUserId } = relatedChat;

    await updateDoc(
      doc(
        getFirestore(),
        "Users",
        firebaseUserId,
        "conversations",
        friendUserId
      ),
      { unseenCount: 0 }
    );
  } catch (error) {
    console.error("Failed to reset unseen count:", error);
  }
};

export const updateLastMessage = async (relatedChat: any) => {
  try {
    const { friendUserId, currentUserId, messageData } = relatedChat;

    if (!friendUserId || !currentUserId || !messageData) {
      console.error("❌ Missing required fields for updateLastMessage:", {
        friendUserId,
        currentUserId,
        messageData,
      });
      return;
    }

    const timestamp = Timestamp.fromDate(new Date());

    console.log("💾 Updating last message in Users collection:", {
      path: `Users/${currentUserId}/conversations/${friendUserId}`,
      text: messageData.text,
    });

    await setDoc(
      doc(
        getFirestore(),
        "Users",
        currentUserId,
        "conversations",
        friendUserId
      ),
      {
        lastMessageText: messageData.text,
        lastMessageTime: timestamp,
        userId: friendUserId,
        conversationId: `${currentUserId}_${friendUserId}`,
        unseenCount: 0,
      },
      { merge: true }
    );

    console.log("✅ Last message updated successfully for sender");
  } catch (error) {
    console.error("❌ Failed to update last message:", error);
  }
};

/**
 * Marks every message the current user received in a conversation as seen.
 * Writes to the shared Conversations/{id}/messages collection (which both
 * participants can access), so it works without touching the other user's docs.
 */
export const markMessagesAsSeen = async (
  conversationId: string,
  currentUserId: string
) => {
  try {
    if (!conversationId || !currentUserId) return;

    const db = getFirestore();
    const messagesRef = collection(
      db,
      "Conversations",
      conversationId,
      "messages"
    );

    const snapshot = await getDocs(messagesRef);
    if (snapshot.empty) return;

    const batch = writeBatch(db);
    let pending = 0;
    snapshot.forEach((messageDoc) => {
      const message = messageDoc.data();
      // Mark every incoming message that isn't already seen (covers legacy
      // messages that were created without a `seen` field).
      const isFromOther = message.senderId && message.senderId !== currentUserId;
      if (isFromOther && message.seen !== true) {
        batch.update(messageDoc.ref, { seen: true });
        pending += 1;
      }
    });

    if (pending === 0) return;

    await batch.commit();
    console.log(`✅ Marked ${pending} message(s) as seen`);
  } catch (error) {
    console.error("❌ Failed to mark messages as seen:", error);
  }
};

export const initializeConversation = async (
  currentUserId: string,
  friendUserId: string,
  friend: any
) => {
  try {
    if (!currentUserId || !friendUserId) {
      console.error("❌ Missing userIds for initializeConversation");
      return;
    }

    console.log("🆕 Initializing conversation between:", currentUserId, "and", friendUserId);

    const conversationData = {
      userId: friendUserId,
      conversationId: `${currentUserId}_${friendUserId}`,
      lastMessageText: "",
      lastMessageTime: Timestamp.now(),
      unseenCount: 0,
      friend: {
        id: friendUserId,
        name: friend?.name || "Unknown",
      },
    };

    // Initialize for current user
    await setDoc(
      doc(
        getFirestore(),
        "Users",
        currentUserId,
        "conversations",
        friendUserId
      ),
      conversationData,
      { merge: true }
    );

    console.log("✅ Conversation initialized successfully");
  } catch (error) {
    console.error("❌ Failed to initialize conversation:", error);
  }
};

export const unsubscribeFromMessages = (unsubscribe: any) => () => {
  if (unsubscribe) {
    unsubscribe();
  }
};