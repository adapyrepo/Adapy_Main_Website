import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Platform from "@/pages/Platform";
import SmartHub from "@/pages/SmartHub";
import HarnessIntegration from "@/pages/HarnessIntegration";
import WirelessControllers from "@/pages/WirelessControllers";
import SafetyModules from "@/pages/SafetyModules";
import DealerDashboard from "@/pages/DealerDashboard";
import CDRSPortal from "@/pages/CDRSPortal";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/platform" component={Platform} />
      <Route path="/hardware/smart-hub" component={SmartHub} />
      <Route path="/hardware/harness-integration" component={HarnessIntegration} />
      <Route path="/hardware/wireless-controllers" component={WirelessControllers} />
      <Route path="/hardware/safety-modules" component={SafetyModules} />
      <Route path="/software/dealer" component={DealerDashboard} />
      <Route path="/software/cdrs" component={CDRSPortal} />
      <Route path="/products" component={Products} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
