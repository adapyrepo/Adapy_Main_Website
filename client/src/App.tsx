import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Contact from "@/pages/Contact";
import Pricing from "@/pages/Pricing";
import Platform from "@/pages/Platform";
import SmartHub from "@/pages/SmartHub";
import HarnessIntegration from "@/pages/HarnessIntegration";
import WirelessControllers from "@/pages/WirelessControllers";
import SafetyModules from "@/pages/SafetyModules";
import DealerDashboard from "@/pages/DealerDashboard";
import DealerFunnel from "@/pages/DealerFunnel";
import UserFunnel from "@/pages/UserFunnel";
import CDRSPortal from "@/pages/CDRSPortal";
import IndividualSolutions from "@/pages/IndividualSolutions";
import NEMTFleet from "@/pages/NEMTFleet";
import Privacy from "@/pages/Privacy";
import About from "@/pages/About";
import Terms from "@/pages/Terms";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/platform" component={Platform} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/hardware/smart-hub" component={SmartHub} />
      <Route path="/hardware/harness-integration" component={HarnessIntegration} />
      <Route path="/hardware/wireless-controllers" component={WirelessControllers} />
      <Route path="/hardware/safety-modules" component={SafetyModules} />
      <Route path="/dealer-funnel" component={DealerFunnel} />
      <Route path="/user-funnel" component={UserFunnel} />
      <Route path="/software/dealer" component={DealerDashboard} />
      <Route path="/software/cdrs" component={CDRSPortal} />
      <Route path="/solutions/individual" component={IndividualSolutions} />
      <Route path="/solutions/nemt" component={NEMTFleet} />
      <Route path="/products" component={Products} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogPost} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/privacy" component={Privacy} />
      <Route path="/terms" component={Terms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
