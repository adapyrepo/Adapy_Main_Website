import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useSubscribe } from "@/hooks/use-forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import type { InsertSubscriber } from "@shared/schema";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
import award1 from "@assets/Globee_Award_1772663910071.png";
import award2 from "@assets/Plaza_Pitch_Award_1772663910071.png";
import award3 from "@assets/SR_50_Award_1772663910072.png";
import award4 from "@assets/US_patent_Award_1772663910072.png";
import award5 from "@assets/UTU_Award_1772663910072.png";

interface FooterColumn {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
}

const footerColumns: FooterColumn[] = [
  {
    title: "Who it's for",
    links: [
      { label: "Drivers & Families", href: "/user-funnel" },
      { label: "Mobility Dealers", href: "/dealer-funnel" },
      { label: "NEMT Fleets", href: "/solutions/nemt" },
      { label: "CDRS & Clinicians", href: "/software/cdrs" },
    ],
  },
  {
    title: "Platform",
    links: [
      { label: "Platform Overview", href: "/platform" },
      { label: "Smart Hub", href: "/hardware/smart-hub" },
      { label: "Harness Integration", href: "/hardware/harness-integration" },
      { label: "Wireless Controllers", href: "/hardware/wireless-controllers" },
      { label: "Safety Modules", href: "/hardware/safety-modules" },
      { label: "Mobile App", href: "/products" },
      { label: "Dealer Dashboard", href: "/software/dealer" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Pricing", href: "/pricing" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
      { label: "Login", href: "https://my.adapy.com", external: true },
    ],
  },
];

export function Footer() {
  const subscribe = useSubscribe();
  const form = useForm<InsertSubscriber>({
    resolver: zodResolver(insertSubscriberSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (data: InsertSubscriber) => {
    subscribe.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const awards = [
    { src: award1, alt: "Globee Award" },
    { src: award2, alt: "Plaza Pitch Award" },
    { src: award3, alt: "SR 50 Award" },
    { src: award4, alt: "US Patent" },
    { src: award5, alt: "UTU Award" },
  ];

  return (
    <footer
      className="bg-foreground text-background py-24 border-t border-white/10"
      data-testid="footer-main"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-16">
          <div className="lg:col-span-4">
            <img
              src={adapyLogo}
              alt="Adapy"
              className="h-8 w-auto invert brightness-0 mb-6"
            />
            <p className="text-white/60 text-lg max-w-md mb-4">
              Independence shouldn't depend on someone else.
            </p>
            <p className="text-white/50 text-sm max-w-md mb-8 leading-relaxed">
              Adapy builds the unified control layer for adaptive vehicles —
              giving drivers, dealers, fleets, and clinicians the visibility
              and safety the industry has gone without for decades.
            </p>

            <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em] mb-3">
              Get the Field Brief
            </div>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="max-w-md relative"
              data-testid="form-newsletter"
            >
              <input
                {...form.register("email")}
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                data-testid="input-newsletter-email"
              />
              <button
                disabled={subscribe.isPending}
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
                data-testid="button-newsletter-submit"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-2">
                {form.formState.errors.email.message}
              </p>
            )}
            <p className="text-white/40 text-xs mt-3 max-w-md">
              Monthly. Real stories from the field. No spam, ever.
            </p>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-10">
            {footerColumns.map((column) => (
              <div key={column.title}>
                <h4 className="font-semibold mb-6 text-white text-[13px] uppercase tracking-[0.12em]">
                  {column.title}
                </h4>
                <ul className="space-y-4 text-white/60">
                  {column.links.map((link) =>
                    link.external ? (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-white transition-colors"
                          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </a>
                      </li>
                    ) : (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="hover:text-white transition-colors"
                          data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mb-12">
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-50 hover:opacity-100 transition-opacity duration-500">
            {awards.map((award, i) => (
              <img
                key={i}
                src={award.src}
                alt={award.alt}
                className="h-12 md:h-16 w-auto brightness-0 invert"
              />
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Adapy Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-white/40 hover:text-white text-sm transition-colors"
              data-testid="link-footer-privacy"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="text-white/40 hover:text-white text-sm transition-colors"
              data-testid="link-footer-terms"
            >
              Terms
            </Link>
            <span className="text-white/20">|</span>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              data-testid="link-social-facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              data-testid="link-social-twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              data-testid="link-social-instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/60 hover:text-white transition-colors"
              data-testid="link-social-linkedin"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
