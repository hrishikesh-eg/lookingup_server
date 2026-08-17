import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import InquiryForm from "./InquiryForm";

interface NavInquiryModalProps {
  trigger: ReactNode;
}

/**
 * Self-contained inquiry modal — plug the `trigger` (e.g. a navbar
 * link/button) and it handles open/close state internally via Radix
 * Dialog. No route, no page, no dependency on PromoBannerPage.
 *
 * To turn this feature off between exhibitions, just stop rendering
 * <NavInquiryModal> in the navbar — nothing else needs to change.
 */
export default function NavInquiryModal({ trigger }: NavInquiryModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-ink/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-card p-1 shadow-teal data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95">
          <div className="flex items-center justify-between px-5 pt-4">
            <Dialog.Title className="font-display text-xl text-ink">Client Inquiry</Dialog.Title>
            <Dialog.Close className="rounded-full p-1 text-muted-foreground hover:bg-muted hover:text-ink">
              ✕
            </Dialog.Close>
          </div>
          <Dialog.Description className="sr-only">
            Fill out this form to send a product inquiry
          </Dialog.Description>
          <div className="p-4">
            <InquiryForm />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}