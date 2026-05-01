import firestore from "@react-native-firebase/firestore";

import {
  messagesError,
  messagesLoading,
  messagesReceived,
} from "./messages-slice";


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

  const ref = firestore()
    .collection("Users")
    .doc(firebaseUserId)
    .collection("conversations");

  console.log("📡 Listening to:", ref.path);

  let unsubscribe: (() => void) | undefined;

  try {
    unsubscribe = ref.onSnapshot(
      (snapshot) => {
        try {
          console.log("🔥 SNAPSHOT FIRED");
          console.log("empty:", snapshot.empty);
          console.log("size:", snapshot.size);

          const messages = snapshot.empty
            ? []
            : snapshot.docs.map((doc) => {
                const data = doc.data();

                if (!data.conversationId || !data.userId) {
                  console.warn("⚠️ Invalid doc:", doc.id);
                  return null;
                }

                return {
                  conversationId: data.conversationId,
                  lastMessageText: data.lastMessageText || "",
                  lastMessageTime: data.lastMessageTime?.toDate?.() || new Date(),
                  unseenCount: data.unseenCount || 0,
                  userId: data.userId,
                };
              })
              .filter(Boolean);

          console.log("✅ messages received:", messages.length);

          onMessageReceived(messages);
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
  };
};

export const resetUnseenCount = async (relatedChat: any) => {
  try {
    const { friendUserId, firebaseUserId } = relatedChat;

    await firestore()
      .collection("Users")
      .doc(firebaseUserId)
      .collection("conversations")
      .doc(friendUserId)
      .update({
        unseenCount: 0,
      });
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

    const timestamp = firestore.Timestamp.fromDate(new Date());

    console.log("💾 Updating last message in Users collection:", {
      path: `Users/${currentUserId}/conversations/${friendUserId}`,
      text: messageData.text,
    });

    await firestore()
      .collection("Users")
      .doc(currentUserId)
      .collection("conversations")
      .doc(friendUserId)
      .set(
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
      lastMessageTime: firestore.Timestamp.now(),
      unseenCount: 0,
      friend: {
        id: friendUserId,
        name: friend?.name || "Unknown",
      },
    };

    // Initialize for current user
    await firestore()
      .collection("Users")
      .doc(currentUserId)
      .collection("conversations")
      .doc(friendUserId)
      .set(conversationData, { merge: true });

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