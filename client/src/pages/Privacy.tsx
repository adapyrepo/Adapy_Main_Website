import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/use-seo";

export default function Privacy() {
  useSEO({
    title: "Privacy Policy",
    description: "How Adapy collects, uses, and protects your personal information across our adaptive mobility platform.",
    path: "/privacy",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Privacy", path: "/privacy" },
    ],
    keywords: "Adapy privacy policy, mobility data privacy, wheelchair vehicle data protection, HIPAA mobility data",
  });
  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid="page-privacy">
      <Navbar />

      <article className="pt-32 pb-24 md:pt-44 md:pb-32 container mx-auto px-6 max-w-3xl">
        <header className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Legal
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-privacy-title">
            Privacy Policy
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We take your privacy seriously. This notice explains what information we
            collect, how we use it, and the rights you have over it.
          </p>
          <p className="text-sm text-muted-foreground mt-4">Last updated: February 23, 2021.</p>
        </header>

        <Section title="Overview">
          <p>
            Thank you for choosing to be part of our community at Adapy®, Inc
            ("Company", "we", "us", "our"). We are committed to protecting your
            personal information and your right to privacy. If you have any questions
            or concerns about this notice or our practices regarding your personal
            information, please contact us at{" "}
            <a href="mailto:support@adapy.com" className="text-primary underline">
              support@adapy.com
            </a>
            .
          </p>
          <p>
            This privacy notice applies to all information collected through our
            services, including our website (https://www.adapy.com) and any related
            services, sales, marketing, or events (collectively, the "Services").
          </p>
          <ul>
            <li>
              <strong>Information collection.</strong> We collect personal information
              you voluntarily provide (such as name, email, phone) and information
              collected automatically (such as IP address, device data, location).
            </li>
            <li>
              <strong>Information usage.</strong> We use information to create and
              manage accounts, fulfill orders, respond to inquiries, send marketing
              communications, and deliver our Services.
            </li>
            <li>
              <strong>Information sharing.</strong> We share information with your
              consent, to comply with laws, to provide services, to protect rights, or
              to fulfill business obligations — including with affiliates and business
              partners.
            </li>
            <li>
              <strong>Your rights.</strong> Depending on your region, you have rights
              to access, rectify, erase, restrict processing, and data portability.
              California residents have additional rights under the CCPA.
            </li>
          </ul>
        </Section>

        <Section title="What information do we collect?">
          <p>
            <strong>Personal information you disclose to us.</strong> We collect
            personal information you voluntarily provide when you register on the
            Website, express interest in our products or Services, participate in
            activities on the Website, or otherwise contact us. The information we
            collect depends on the context of your interactions with us — typically
            name, contact details, account credentials, and similar identifiers.
          </p>
          <p>
            <strong>Information collected automatically.</strong> When you visit, use,
            or navigate the Website, we may automatically collect certain information
            such as IP address, browser and device characteristics, operating system,
            language preferences, referring URLs, device name, country, location,
            information about how and when you use our Website, and other technical
            information. This information is primarily needed to maintain the security
            and operation of our Website, and for our internal analytics and
            reporting purposes.
          </p>
        </Section>

        <Section title="How do we use your information?">
          <p>
            We process your information for purposes based on legitimate business
            interests, the performance of our contract with you, with your consent,
            and/or for compliance with our legal obligations. Specifically, we use the
            information we collect or receive to:
          </p>
          <ul>
            <li>Facilitate account creation and the login process.</li>
            <li>Manage user accounts and provide customer support.</li>
            <li>Fulfill and manage orders, payments, returns, and exchanges.</li>
            <li>Send you marketing and promotional communications (you can opt out anytime).</li>
            <li>Deliver and improve our Services.</li>
            <li>Respond to legal requests and prevent harm.</li>
          </ul>
        </Section>

        <Section title="Will your information be shared with anyone?">
          <p>
            We only share information with your consent, to comply with laws, to
            provide you with services, to protect your rights, or to fulfill business
            obligations. We may share your data with service providers under written
            contract who process information on our behalf. Adapy®, Inc has not sold
            personal information to third parties for a business or commercial purpose
            in the preceding 12 months and will not sell personal information of
            website visitors, users, or other consumers in the future.
          </p>
        </Section>

        <Section title="Cookies and tracking">
          <p>
            We may use cookies and similar tracking technologies to access or store
            information. Most web browsers are set to accept cookies by default; you
            can usually configure your browser to remove or reject cookies. If you do,
            certain features or services on the Website may be affected.
          </p>
        </Section>

        <Section title="How long do we keep your information?">
          <p>
            We keep your information for as long as necessary to fulfill the purposes
            outlined in this privacy notice unless otherwise required by law. When we
            no longer have an ongoing legitimate business need to process your
            information, we will either delete or anonymize it.
          </p>
        </Section>

        <Section title="How do we keep your information safe?">
          <p>
            We have implemented appropriate technical and organizational security
            measures designed to protect the security of any personal information we
            process. However, no electronic transmission over the Internet or
            information storage technology can be guaranteed to be 100% secure.
          </p>
        </Section>

        <Section title="Do we collect information from minors?">
          <p>
            We do not knowingly solicit data from or market to children under 18 years
            of age. If we learn that personal information from users less than 18 has
            been collected, we will deactivate the account and take reasonable
            measures to promptly delete such data from our records.
          </p>
        </Section>

        <Section title="What are your privacy rights?">
          <p>
            In some regions (like the EEA, UK, and Canada) you have certain rights
            under applicable data protection laws — including the right to access,
            correct, or delete your personal information; restrict its processing;
            data portability; and the right to object. To make a request, contact us
            using the details below. We will consider and act upon any request in
            accordance with applicable data protection laws.
          </p>
          <p>
            If you would like to review or change information in your account or
            terminate your account, log in to your account settings. Upon your request
            to terminate, we will deactivate or delete your account and information
            from our active databases. We may retain some information to prevent
            fraud, troubleshoot problems, assist with investigations, enforce our
            Terms, and comply with legal requirements.
          </p>
        </Section>

        <Section title="Do California residents have specific privacy rights?">
          <p>
            Yes. California Civil Code Section 1798.83 ("Shine The Light") permits
            California residents to request and obtain, once a year and free of
            charge, information about categories of personal information (if any) we
            disclosed to third parties for direct marketing purposes and the names and
            addresses of all third parties with which we shared personal information
            in the immediately preceding calendar year.
          </p>
          <p>
            If you are under 18, reside in California, and have a registered account
            with the Website, you have the right to request removal of unwanted data
            you publicly post on the Website. To make a request, contact us using the
            information below and include the email address associated with your
            account and a statement that you reside in California.
          </p>
        </Section>

        <section id="washington-consumer-health-data" className="mb-12 scroll-mt-32">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Washington consumer health data
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-foreground">
            <p>
              This section applies to Washington residents and is provided to
              meet our obligations under the Washington My Health My Data Act
              (MHMDA).
            </p>
            <p>
              <strong>What we collect.</strong> When a Washington resident
              uses our user or dealer intake forms, we ask for free-text
              information about your <em>situation</em> and the{" "}
              <em>adaptive equipment</em> you use or need help with. Because
              that information can reveal a physical or mental health
              condition or a need for adaptive mobility equipment, it is
              treated as &ldquo;consumer health data&rdquo; under MHMDA.
            </p>
            <p>
              <strong>Why we collect it.</strong> We use this information
              only to (i) respond to your inquiry, (ii) determine whether
              Adapy products or funding pathways may fit your situation, and
              (iii) connect you with an authorized Adapy dealer or
              partnership team member who can help. We do not sell consumer
              health data and we do not use it for targeted advertising.
            </p>
            <p>
              <strong>Who we share it with.</strong> We share consumer
              health data only with our internal sales and partnerships
              team and, where relevant, the authorized dealer matched to
              your inquiry. We may also share it with service providers
              (such as our form-processing and email infrastructure) under
              written contract that limits their use to providing services
              to Adapy.
            </p>
            <p>
              <strong>Consent.</strong> Before we collect the situation
              and adaptive equipment fields from a Washington resident, we
              show a notice describing this use and ask you to affirmatively
              opt in. We record the timestamp of that consent with your
              submission. You can withdraw consent at any time by emailing{" "}
              <a href="mailto:support@adapy.com" className="text-primary underline">
                support@adapy.com
              </a>
              ; withdrawal will not affect processing that took place before
              we received the request.
            </p>
            <p>
              <strong>Your MHMDA rights.</strong> Washington residents have
              the right to (i) confirm whether we are processing your
              consumer health data and access that data, (ii) have a list
              of the third parties with whom we have shared it, (iii)
              withdraw consent, and (iv) request deletion of the consumer
              health data we hold about you. To exercise any of these
              rights, contact{" "}
              <a href="mailto:support@adapy.com" className="text-primary underline">
                support@adapy.com
              </a>
              . We will respond within the time required by MHMDA. If we
              decline a request, you may appeal by replying to our
              response, and you may also file a complaint with the
              Washington State Attorney General.
            </p>
          </div>
        </section>

        <Section title="Do we make updates to this notice?">
          <p>
            Yes — we will update this notice as necessary to stay compliant with
            relevant laws. The updated version will be indicated by a revised "Last
            updated" date. We encourage you to review this privacy notice frequently
            to stay informed of how we are protecting your information.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            If you have questions or comments about this notice, you may email us at{" "}
            <a href="mailto:support@adapy.com" className="text-primary underline">
              support@adapy.com
            </a>{" "}
            or by post to:
          </p>
          <address className="not-italic mt-4 text-muted-foreground">
            Adapy®, Inc
            <br />
            912 W 1600 S, Suite 201 B
            <br />
            St. George, UT 84770
            <br />
            United States
          </address>
        </Section>

        <Section title="Review, update, or delete your data">
          <p>
            Based on the laws of your country, you may have the right to request
            access to the personal information we collect, change that information, or
            delete it in some circumstances. To request a review, update, or deletion,
            please contact{" "}
            <a href="mailto:support@adapy.com" className="text-primary underline">
              support@adapy.com
            </a>
            . We will respond to your request within 30 days.
          </p>
        </Section>
      </article>

      <Footer />
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">{title}</h2>
      <div className="prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-foreground">
        {children}
      </div>
    </section>
  );
}
