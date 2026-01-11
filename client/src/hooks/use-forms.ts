import { useMutation } from "@tanstack/react-query";
import { api, type InsertContactRequest, type InsertSubscriber } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";

export function useContactForm() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactRequest) => {
      const res = await fetch(api.contact.create.path, {
        method: api.contact.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = api.contact.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to submit request");
      }
      return api.contact.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Request Sent",
        description: "We'll be in touch shortly.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

export function useSubscribe() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertSubscriber) => {
      const res = await fetch(api.subscribe.create.path, {
        method: api.subscribe.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = api.subscribe.create.responses[400].parse(await res.json());
          throw new Error(error.message);
        }
        throw new Error("Failed to subscribe");
      }
      return api.subscribe.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Subscribed",
        description: "You've been added to our newsletter.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
