import braunabilityLogo from "@assets/braunability_1772217975241.png";
import brunoLogo from "@assets/bussani-mobility-bruno_logo_1772218097103.png";
import riconLogo from "@assets/ricon_1772218412364.png";
import qstraintLogo from "@assets/QSTRAINT-logo-300x81-removebg-preview_1772226148510.png";
import ezlockLogo from "@assets/ezklock_1772218764750.webp";
import suregripLogo from "@assets/Screenshot_2026-02-27_at_1.53.46_PM-removebg-preview_1772225967882.png";
import harmarLogo from "@assets/Harmar_LogoT_PMS_1772226094357.webp";
import atcMobilityLogo from "@assets/ATC_Mobility-Logo_1772231199262.webp";
import adaptLogo from "@assets/adapt_1772225980081.png";

const logos = [
  { name: "BraunAbility", url: braunabilityLogo },
  { name: "Bruno", url: brunoLogo },
  { name: "Ricon", url: riconLogo },
  { name: "Q'Straint", url: qstraintLogo },
  { name: "EZ Lock", url: ezlockLogo },
  { name: "Sure Grip", url: suregripLogo },
  { name: "Harmar", url: harmarLogo },
  { name: "ATC Mobility", url: atcMobilityLogo },
  { name: "Adapt Solutions", url: adaptLogo },
];

export function ScrollingLogos() {
  return (
    <div className="bg-black/90 py-4 md:py-6 overflow-hidden border-t border-white/5 w-full relative">
      <div className="relative flex items-center">
        <div
          className="flex whitespace-nowrap gap-12 items-center animate-scroll-logos motion-reduce:animate-none"
          style={{ willChange: "transform" }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center h-8 md:h-12 w-40 mx-4">
              <img
                src={logo.url}
                alt={logo.name}
                loading="lazy"
                className="max-h-full max-w-full object-contain grayscale invert opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
