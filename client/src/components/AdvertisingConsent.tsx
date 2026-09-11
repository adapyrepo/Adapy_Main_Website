import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle,
} from "@/components/ui/dialog";

declare global {
  interface Window {
    adapyAdvertising?: {
      read(): boolean | null;
      save(advertising: boolean): void;
      open(): void;
      isPublicHost(): boolean;
    };
  }
}

export function AdvertisingConsent() {
  const [path] = useLocation();
  const [consent, setConsent] = useState<boolean | null>(() => window.adapyAdvertising?.read() ?? null);
  const [open, setOpen] = useState(false);
  const [advertising, setAdvertising] = useState(false);
  const [storageError, setStorageError] = useState(false);
  useEffect(() => {
    const update = () => setConsent(window.adapyAdvertising?.read() ?? null);
    const manage = () => {
      setAdvertising(window.adapyAdvertising?.read() === true);
      setOpen(true);
    };
    window.addEventListener("adapy-advertising-change", update);
    window.addEventListener("adapy-advertising-open", manage);
    const storageFailed = () => setStorageError(true);
    window.addEventListener("adapy-advertising-storage-error", storageFailed);
    return () => {
      window.removeEventListener("adapy-advertising-change", update);
      window.removeEventListener("adapy-advertising-open", manage);
      window.removeEventListener("adapy-advertising-storage-error", storageFailed);
    };
  }, []);
  const save = (value: boolean) => {
    window.adapyAdvertising?.save(value);
    setOpen(false);
  };
  const button = "min-h-11 rounded-xl border border-black/30 px-4 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";
  const showBanner = window.adapyAdvertising?.isPublicHost() &&
    consent === null && ["/", "/platform", "/about", "/privacy", "/terms"].includes(path);
  return <>
    {storageError && createPortal(
      <p role="alert" className="fixed bottom-4 left-4 right-4 z-[250] rounded-xl border bg-white p-4 text-black shadow-xl">
        Advertising is disabled for this page, but your browser could not save the change.
        Clear this site's stored data in your browser to remove any earlier advertising permission.
      </p>, document.body)}
    {showBanner && !open && createPortal(
      <section aria-label="Advertising cookie choices" className="fixed bottom-4 left-4 right-4 z-[220] mx-auto max-w-3xl max-h-[70dvh] overflow-y-auto rounded-2xl border border-black/20 bg-white p-5 text-black shadow-2xl">
        <h2 className="text-lg font-bold">Your advertising choices</h2>
        <p className="mt-2 text-sm">
          With your permission, Meta Pixel measures visits to selected marketing pages.
          Meta receives basic browser and network information and may use advertising cookies.
          Advertising is off until you accept. These controls apply to Meta advertising;
          existing site analytics are unchanged. <a className="underline" href="/privacy">Privacy policy</a>
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button className={button} onClick={() => save(true)}>Accept all</button>
          <button className={button} onClick={() => save(false)}>Reject non-essential cookies</button>
          <button className={button} onClick={() => window.adapyAdvertising?.open()}>Manage preferences</button>
        </div>
      </section>, document.body)}
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="z-[240] max-h-[85dvh] w-[calc(100%-2rem)] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle>Cookie Preferences</DialogTitle>
          <DialogDescription>
            Control Meta advertising on this site. Existing analytics are not changed by these settings.
            Closing this window does not save changes.
          </DialogDescription>
        </DialogHeader>
        <p className="text-sm">Essential storage remembers this choice and cannot be turned off here.</p>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
          <input type="checkbox" checked={advertising} onChange={event => setAdvertising(event.target.checked)} className="mt-1 h-5 w-5" />
          <span><strong>Advertising / marketing</strong><span className="mt-1 block text-sm text-muted-foreground">
            Allow Meta Pixel PageView measurement on approved marketing pages. Meta receives your IP address,
            browser information, and the clean page URL. No form answers are supplied.
          </span></span>
        </label>
        <p className="text-sm text-muted-foreground">
          Turning this off stops future Pixel events and removes accessible Meta cookies.
          A page reload may be needed. It cannot erase data already received by Meta.
        </p>
        <div className="flex flex-wrap gap-3">
          <button className={button} onClick={() => save(advertising)}>Save preferences</button>
          <button className={button} onClick={() => save(false)}>Reject non-essential cookies</button>
        </div>
      </DialogContent>
    </Dialog>
  </>;
}