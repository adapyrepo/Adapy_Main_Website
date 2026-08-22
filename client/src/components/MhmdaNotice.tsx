interface MhmdaNoticeProps {
  consent: boolean;
  onConsentChange: (checked: boolean) => void;
}

export function MhmdaNotice({ consent, onConsentChange }: MhmdaNoticeProps) {
  return (
    <div
      className="rounded-2xl border border-amber-300/70 bg-amber-50 p-5 text-sm text-black/80"
      data-testid="notice-mhmda"
    >
      <p className="font-bold text-black mb-2">
        Washington consumer health data notice
      </p>
      <p className="leading-relaxed mb-3">
        The questions on this step ask about your situation and adaptive
        equipment. For Washington residents, that information is
        &ldquo;consumer health data&rdquo; under the My Health My Data Act
        (MHMDA). We collect it only to respond to your inquiry, share it
        with the Adapy team and any dealer partner we connect you with,
        and keep it for as long as needed to support that follow-up. You
        can withdraw consent or ask us to delete this information at any
        time through our{" "}
        <a
          href="/privacy-request"
          className="underline font-semibold"
        >
          Washington privacy request form
        </a>
        {" "}or by emailing support@adapy.com.
      </p>
      <p className="leading-relaxed mb-4">
        See the{" "}
        <a
          href="/privacy#washington-consumer-health-data"
          className="underline font-semibold"
          data-testid="link-mhmda-privacy"
        >
          Washington consumer health data section of our Privacy Policy
        </a>{" "}
        for full details.
      </p>
      <label className="flex gap-3 items-start cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => onConsentChange(e.target.checked)}
          className="mt-1 h-4 w-4 accent-[#0071e3] flex-shrink-0"
          data-testid="checkbox-mhmda-consent"
        />
        <span className="text-black/80">
          I am a Washington resident and I consent to Adapy collecting
          and processing the consumer health data I provide on this form
          (including my situation and adaptive equipment) for the
          purposes described above.
        </span>
      </label>
    </div>
  );
}
