import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useSEO } from "@/hooks/use-seo";

export default function Terms() {
  useSEO({
    title: "Terms & Conditions",
    description: "The terms governing your use of the Adapy adaptive mobility platform, website, and services.",
    path: "/terms",
    breadcrumbs: [
      { name: "Home", path: "/" },
      { name: "Terms", path: "/terms" },
    ],
    keywords: "Adapy terms of service, mobility platform terms, wheelchair vehicle software terms",
  });
  return (
    <div className="min-h-screen bg-background text-foreground font-sans" data-testid="page-terms">
      <Navbar />

      <article className="pt-32 pb-24 md:pt-44 md:pb-32 container mx-auto px-6 max-w-3xl">
        <header className="mb-14">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground mb-4">
            Legal
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6" data-testid="text-terms-title">
            Terms &amp; Conditions
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            These terms and conditions govern your use of the Adapy® website and
            constitute a legally binding agreement between you ("Client") and
            Adapy®, Inc ("Company"). By accessing adapy.com, you accept these terms
            in full.
          </p>
        </header>

        <Section title="Welcome to Adapy®">
          <p>
            These Website Standard Terms and Conditions written on this webpage
            shall manage your use of our website at www.adapy.com. By using this
            Website, you agree to accept all terms and conditions written here. You
            must not use this Website if you disagree with any of these terms.
            Minors below 18 years old are not allowed to use this Website.
          </p>
          <p>
            The following terminology applies to these Terms and Conditions, our
            Privacy Statement, and any related agreements: "Client", "You" and
            "Your" refers to you, the person accessing this website. "The Company",
            "Ourselves", "We", "Our" and "Us" refers to Adapy®, Inc. "Party",
            "Parties", or "Us" refers to both the Client and ourselves.
          </p>
        </Section>

        <Section title="Cookies">
          <p>
            We employ the use of cookies. By using the Adapy® website you consent to
            the use of cookies in accordance with our Privacy Policy. Most modern
            interactive websites use cookies to retrieve user details for each
            visit. Some of our affiliate or advertising partners may also use
            cookies.
          </p>
        </Section>

        <Section title="Intellectual property and license">
          <p>
            Unless otherwise stated, Adapy®, Inc and/or its licensors own the
            intellectual property rights for all material on adapy.com, the mobile
            app, and the software and hardware associated with our products. All
            intellectual property rights are reserved. You may view and/or print
            pages from adapy.com for your own personal use, subject to the
            restrictions set in these terms and conditions.
          </p>
          <p>You must not:</p>
          <ul>
            <li>Republish material from adapy.com</li>
            <li>Sell, rent, or sub-license material from adapy.com</li>
            <li>Reproduce, duplicate, or copy material from adapy.com</li>
            <li>Redistribute content from adapy.com unless specifically made for redistribution</li>
          </ul>
        </Section>

        <Section title="Restrictions">
          <p>You are specifically restricted from all of the following:</p>
          <ul>
            <li>Publishing any Website material in any other media</li>
            <li>Selling, sublicensing, or otherwise commercializing any Website material</li>
            <li>Publicly performing or showing any Website material</li>
            <li>Using this Website in any way that is or may be damaging to it</li>
            <li>Using this Website in any way that impacts user access</li>
            <li>Using this Website contrary to applicable laws and regulations, or in any way that may cause harm to the Website or to any person or business entity</li>
            <li>Engaging in data mining, data harvesting, data extracting, or any similar activity in relation to this Website</li>
            <li>Using this Website to engage in any advertising or marketing</li>
          </ul>
        </Section>

        <Section title="User comments">
          <p>
            Certain parts of this website offer the opportunity for users to post
            and exchange opinions, information, material, and data ("Comments")
            in designated areas. Adapy® does not screen, edit, publish, or review
            Comments prior to their appearance on the Website, and Comments do not
            reflect the views or opinions of Adapy®, Inc, its agents, or
            affiliates. To the extent permitted by applicable laws, Adapy®, Inc
            shall not be responsible or liable for any Comments or for any loss,
            cost, liability, damages, or expenses caused or suffered as a result of
            Comments on this Website.
          </p>
          <p>
            Adapy®, Inc reserves the right to monitor all Comments and to remove
            any Comments that it considers, in its sole discretion, to be
            inappropriate, offensive, or otherwise in breach of these Terms and
            Conditions.
          </p>
          <p>You warrant and represent that:</p>
          <ul>
            <li>You are entitled to post the Comments and have all necessary licenses and consents.</li>
            <li>The Comments do not infringe any intellectual property right, including copyright, patent, or trademark, or other proprietary rights of any third party.</li>
            <li>The Comments do not contain any defamatory, libelous, offensive, indecent, or otherwise unlawful material, or material that is an invasion of privacy.</li>
            <li>The Comments will not be used to solicit or promote business or to present commercial activities or unlawful activity.</li>
          </ul>
          <p>
            You hereby grant Adapy®, Inc a non-exclusive, royalty-free license to
            use, reproduce, edit, and authorize others to use, reproduce, and edit
            any of your Comments in any and all forms, formats, or media.
          </p>
        </Section>

        <Section title="Hyperlinking to our content">
          <p>
            The following organizations may link to our Website without prior
            written approval: government agencies, search engines, news
            organizations, online directory distributors, and system-wide
            accredited businesses (excluding soliciting non-profit organizations,
            charity shopping malls, and charity fundraising groups).
          </p>
          <p>
            These organizations may link to our home page, publications, or other
            Website information, so long as the link: (a) is not in any way
            misleading; (b) does not falsely imply sponsorship, endorsement, or
            approval of the linking party and its products or services; and (c)
            fits within the context of the linking party's site.
          </p>
          <p>
            Other link requests will be considered on a case-by-case basis. To
            request a link, email{" "}
            <a href="mailto:support@adapy.com" className="text-primary underline">
              support@adapy.com
            </a>{" "}
            with your name, organization, contact information, the URL of your
            site, the URLs you intend to link from, and the URLs on our site you
            would like to link to. Allow 2–3 weeks for a response.
          </p>
        </Section>

        <Section title="Iframes">
          <p>
            Without prior approval and express written permission, you may not
            create frames around our web pages or use other techniques that alter
            in any way the visual presentation or appearance of our Website.
          </p>
        </Section>

        <Section title="Reservation of rights">
          <p>
            We reserve the right at any time, and at our sole discretion, to
            request that you remove all links or any particular link to our
            Website. You agree to immediately remove all such links upon request.
            We also reserve the right to amend these terms and conditions and our
            linking policy at any time. By continuing to link to our Website, you
            agree to be bound by these linking terms and conditions.
          </p>
        </Section>

        <Section title="Content liability">
          <p>
            We shall have no responsibility or liability for any content appearing
            on your website. You agree to indemnify and defend us against all
            claims arising out of or based upon your website. No link(s) may
            appear on any page on your website or within any context containing
            content or materials that may be interpreted as libelous, obscene, or
            criminal, or that infringes, otherwise violates, or advocates the
            infringement or other violation of any third party rights.
          </p>
        </Section>

        <Section title="Disclaimer">
          <p>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties, and conditions relating to our website
            and the use of this website (including, without limitation, any
            warranties implied by law in respect of satisfactory quality, fitness
            for purpose, and the use of reasonable care and skill). Nothing in
            this disclaimer will:
          </p>
          <ul>
            <li>Limit or exclude our or your liability for death or personal injury resulting from negligence;</li>
            <li>Limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
            <li>Limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
            <li>Exclude any of our or your liabilities that may not be excluded under applicable law.</li>
          </ul>
          <p>
            To the extent that the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
          </p>
        </Section>

        <Section title="Governing law">
          <p>
            These Terms will be governed by and interpreted in accordance with the
            laws of the United States, and you submit to the non-exclusive
            jurisdiction of the state and federal courts for dispute resolution.
          </p>
        </Section>

        <Section title="Contact us">
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:support@adapy.com" className="text-primary underline">
              support@adapy.com
            </a>
            , or write to:
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
