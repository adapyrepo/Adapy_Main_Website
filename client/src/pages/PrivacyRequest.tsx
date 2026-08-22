import { FormEvent, useState } from "react";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { useSEO } from "@/hooks/use-seo";

const requestOptions = [
  {
    value: "access",
    label: "Access my consumer health data",
  },
  {
    value: "recipients",
    label: "Get a list of parties that received my data",
  },
  {
    value: "withdrawal",
    label: "Withdraw my consent",
  },
  {
    value: "deletion",
    label: "Delete my consumer health data",
  },
] as const;

export default function PrivacyRequest() {
  useSEO({
    title: "Washington Privacy Request",
    description: "Submit a Washington consumer health data request to Adapy.",
    path: "/privacy-request",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy", path: "/privacy" },
      { name: "Washington Privacy Request", path: "/privacy-request" },
    ],
  });

  const [formData, setFormData] = useState({
    requestType: "access",
    fullName: "",
    email: "",
    phone: "",
    washingtonResident: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<{
    requestId: string;
    responseBy: string;
  } | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/privacy-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "We could not submit your request.");
      }

      setConfirmation({
        requestId: data.requestId,
        responseBy: data.responseBy,
      });
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "We could not submit your request.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main className="container mx-auto max-w-2xl px-6 pb-24 pt-32 md:pt-44">
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">
          Privacy
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
          Washington privacy request
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-muted-foreground">
          Washington residents can use this form to request access to, a list
          of recipients of, deletion of, or withdrawal of consent for consumer
          health data. Please do not include medical details in this form.
        </p>

        {confirmation ? (
          <section
            className="rounded-2xl border border-emerald-200 bg-emerald-50 p-7 text-emerald-950"
            data-testid="privacy-request-confirmation"
          >
            <h2 className="mb-3 text-2xl font-bold">Your request was received.</h2>
            <p className="mb-4 leading-relaxed">
              Your reference number is <strong>{confirmation.requestId}</strong>.
              We will first verify your identity and respond by{" "}
              <strong>{confirmation.responseBy}</strong>.
            </p>
            <p className="text-sm leading-relaxed">
              Keep this reference number for your records. If you need help,
              email support@adapy.com.
            </p>
          </section>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-6 rounded-2xl border bg-card p-6 shadow-sm md:p-8"
            data-testid="form-privacy-request"
          >
            <div>
              <label htmlFor="requestType" className="mb-2 block text-sm font-semibold">
                What would you like to request?
              </label>
              <select
                id="requestType"
                value={formData.requestType}
                onChange={(event) =>
                  setFormData({ ...formData, requestType: event.target.value })
                }
                className="w-full rounded-lg border bg-background px-3 py-3"
              >
                {requestOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="fullName" className="mb-2 block text-sm font-semibold">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                required
                value={formData.fullName}
                onChange={(event) =>
                  setFormData({ ...formData, fullName: event.target.value })
                }
                className="w-full rounded-lg border bg-background px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                Email address
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={(event) =>
                  setFormData({ ...formData, email: event.target.value })
                }
                className="w-full rounded-lg border bg-background px-3 py-3"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-2 block text-sm font-semibold">
                Phone number <span className="font-normal text-muted-foreground">(optional)</span>
              </label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) =>
                  setFormData({ ...formData, phone: event.target.value })
                }
                className="w-full rounded-lg border bg-background px-3 py-3"
              />
            </div>

            <label className="flex items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                required
                checked={formData.washingtonResident}
                onChange={(event) =>
                  setFormData({
                    ...formData,
                    washingtonResident: event.target.checked,
                  })
                }
                className="mt-1 h-4 w-4"
              />
              <span>
                I confirm that I am a Washington resident and that the contact
                information above may be used to verify my identity and respond
                to this request.
              </span>
            </label>

            {error && (
              <p className="rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground disabled:cursor-not-allowed disabled:opacity-60"
              data-testid="button-submit-privacy-request"
            >
              {isSubmitting ? "Submitting request…" : "Submit privacy request"}
            </button>
          </form>
        )}

        <p className="mt-7 text-sm leading-relaxed text-muted-foreground">
          You may also email{" "}
          <a href="mailto:support@adapy.com" className="underline">
            support@adapy.com
          </a>
          . Read our{" "}
          <a href="/privacy#washington-consumer-health-data" className="underline">
            Washington consumer health data notice
          </a>
          .
        </p>
      </main>
      <Footer />
    </div>
  );
}