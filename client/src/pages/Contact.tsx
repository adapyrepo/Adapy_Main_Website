import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactRequestSchema } from "@shared/schema";
import type { InsertContactRequest } from "@shared/schema";
import { useContactForm } from "@/hooks/use-forms";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useSEO } from "@/hooks/use-seo";

export default function Contact() {
  useSEO({ title: "Contact Adapy — Talk to a Human", description: "Talk to the Adapy team about your vehicle, your fleet, or your clients. Real humans, fast response.", path: "/contact" });
  const mutation = useContactForm();
  
  const form = useForm<InsertContactRequest>({
    resolver: zodResolver(insertContactRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      type: "info_kit",
      message: "",
    },
  });

  const onSubmit = (data: InsertContactRequest) => {
    mutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      
      <div className="pt-32 pb-12 md:pt-48 md:pb-20 container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8">
                Get in touch.
              </h1>
              <p className="text-xl text-muted-foreground mb-12 max-w-lg">
                Whether you're looking for an info kit, a demo, or have general questions, we're here to help.
              </p>

              <div className="space-y-8 text-lg">
                <div>
                  <h3 className="font-bold text-foreground mb-2">Email</h3>
                  <a href="mailto:support@adapy.com" className="text-muted-foreground hover:text-primary transition-colors">support@adapy.com</a>
                </div>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Location</h3>
                  <p className="text-muted-foreground">St. George & Hurricane, Utah</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border p-8 rounded-3xl shadow-sm"
            >
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} className="bg-background border-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-background border-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Company Name" {...field} value={field.value || ''} className="bg-background border-input" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Inquiry Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background border-input">
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="info_kit">Request Info Kit</SelectItem>
                            <SelectItem value="demo">Request Demo</SelectItem>
                            <SelectItem value="general">General Inquiry</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="resize-none min-h-[120px] bg-background border-input" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    disabled={mutation.isPending}
                    className="w-full h-12 text-lg rounded-xl"
                  >
                    {mutation.isPending ? <Loader2 className="animate-spin mr-2" /> : "Submit Request"}
                  </Button>
                </form>
              </Form>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
