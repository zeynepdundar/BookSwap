import React, { useCallback, useMemo } from "react";
import { useToast } from "native-base";
import { AppToast, ToastVariant } from "@/components/ui/AppToast";

interface ShowOptions {
  hint?: string | null;
  duration?: number;
}

/**
 * Imperative toast helper built on native-base's toast.
 *
 *   const toast = useAppToast();
 *   toast.error("Something went wrong");
 *   toast.info(i18n.t("removed-from-list"));
 *   toast.success("Saved");
 */
export function useAppToast() {
  const toast = useToast();

  const show = useCallback(
    (
      message: string | null | undefined,
      variant: ToastVariant = "info",
      options?: ShowOptions
    ) => {
      if (!message) return;
      toast.show({
        placement: "bottom",
        duration: options?.duration ?? (variant === "error" ? 4000 : 2500),
        render: () => (
          <AppToast message={message} hint={options?.hint} variant={variant} />
        ),
      });
    },
    [toast]
  );

  return useMemo(
    () => ({
      show,
      error: (message: string | null | undefined, options?: ShowOptions) =>
        show(message, "error", options),
      info: (message: string | null | undefined, options?: ShowOptions) =>
        show(message, "info", options),
      success: (message: string | null | undefined, options?: ShowOptions) =>
        show(message, "success", options),
    }),
    [show]
  );
}
