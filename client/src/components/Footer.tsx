import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react";
import { useSubscribe } from "@/hooks/use-forms";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSubscriberSchema } from "@shared/schema";
import type { InsertSubscriber } from "@shared/schema";
import { Button } from "@/components/ui/button";
import adapyLogo from "@assets/Adapy_Logo_1768163955931.png";
import award1 from "@assets/Globee_Award_1772663910071.png";
import award2 from "@assets/Plaza_Pitch_Award_1772663910071.png";
import award3 from "@assets/SR_50_Award_1772663910072.png";
import award4 from "@assets/US_patent_Award_1772663910072.png";
import award5 from "@assets/UTU_Award_1772663910072.png";
import { ScrollingLogos } from "@/components/ScrollingLogos";

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

  return (
    <footer className="bg-foreground text-background py-24 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-24 mb-16">
          <div className="md:col-span-2">
            <img src={adapyLogo} alt="Adapy" className="h-8 w-auto invert brightness-0 mb-6" />
            <p className="text-white/60 text-lg max-w-md mb-8">
              Pioneering automation in adaptive mobility. Empowering independence through smart technology.
            </p>
            
            <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md relative">
              <input
                {...form.register("email")}
                placeholder="Email address"
                className="w-full bg-white/10 border border-white/10 rounded-full px-6 py-3 pr-12 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <button 
                disabled={subscribe.isPending}
                type="submit" 
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </form>
            {form.formState.errors.email && (
              <p className="text-destructive text-sm mt-2">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Products</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/products" className="hover:text-white transition-colors">Smart Hub</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Adapy App</Link></li>
              <li><Link href="/products" className="hover:text-white transition-colors">Pathways</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-4 text-white/60">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Adapy Inc. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Twitter className="w-5 h-5" /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" className="text-white/60 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
