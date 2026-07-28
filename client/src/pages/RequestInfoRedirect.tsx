import { useEffect } from "react";
import { useLocation } from "wouter";

export default function RequestInfoRedirect() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    setLocation("/contact", { replace: true });
  }, [setLocation]);

  return null;
}
