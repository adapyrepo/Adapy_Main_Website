import pendantLiftImg from "@assets/generated_images/pendant_wheelchair_lift.png";
import nemtVanHeroImg from "@assets/full-shot-disabled-man-getting-car_23-2149445656_1778688340541.avif";
import emergencyVehiclesNightImg from "@assets/generated_images/emergency_vehicles_night.png";
import utahSceneImg from "@assets/Screenshot_2026-05-13_at_10.10.23_AM_1778688626181.png";
import coAlertImg from "@assets/generated_images/co_detection_alert.png";
import protectiveMonitoringImg from "@assets/generated_images/protective_monitoring_passenger.png";
import connectedDashboardImg from "@assets/generated_images/connected_mobility_dashboard.png";

export type BlogBody =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  image: string;
  readTime?: string;
  body?: BlogBody[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "future-of-adaptive-mobility-integration-over-innovation",
    title: "The Future of Adaptive Mobility: Integration Over Innovation",
    excerpt:
      "Discover how unified control systems are transforming the adaptive mobility landscape — and why connecting what already exists matters more than building one more device.",
    date: "March 15, 2026",
    author: "Sarah Johnson",
    category: "Industry Insights",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600",
    readTime: "8 min read",
    body: [
      {
        type: "p",
        text: "The adaptive mobility industry is entering a new era — not because of entirely new equipment, but because of how existing technologies are beginning to work together.",
      },
      {
        type: "p",
        text: "For years, innovation in mobility focused on creating individual products: wheelchair lifts, transfer seats, hand controls, docking systems, ramps, and mobility vans. Each solved a specific problem, but most operated independently. Users often found themselves managing multiple remotes, switches, control boxes, and learning curves just to complete a single daily task.",
      },
      { type: "p", text: "Today, the conversation is shifting." },
      {
        type: "quote",
        text: "The future of adaptive mobility is no longer about adding more devices. It is about integration.",
      },
      { type: "h2", text: "The Problem with Fragmented Mobility Systems" },
      {
        type: "image",
        src: pendantLiftImg,
        alt: "Wheelchair user pressing a handheld pendant remote to operate a deployed wheelchair lift on an accessible van",
        caption:
          "Every device — lifts, ramps, transfer seats — typically ships with its own pendant, app, and wiring standard.",
      },
      {
        type: "p",
        text: "Modern adaptive vehicles can contain equipment from several different manufacturers, each with its own control system, wiring standards, and user interface. While each product may perform well individually, the overall user experience often feels disconnected and overly complex.",
      },
      {
        type: "p",
        text: "For many wheelchair users, operating a vehicle can involve:",
      },
      {
        type: "ul",
        items: [
          "Managing multiple pendants or remotes",
          "Remembering different button layouts",
          "Navigating inconsistent interfaces",
          "Troubleshooting communication issues between devices",
          "Relying heavily on installers for customization changes",
        ],
      },
      {
        type: "p",
        text: "This fragmentation creates barriers to independence rather than removing them. The mobility industry has historically approached innovation as isolated hardware development. But users are increasingly asking a different question:",
      },
      {
        type: "quote",
        text: "“Why doesn’t all of this work together seamlessly?”",
      },
      { type: "h2", text: "Integration is Becoming the Real Innovation" },
      {
        type: "p",
        text: "The next major advancement in adaptive mobility is not necessarily a new lift or transfer seat. It is the ability to unify all adaptive equipment into a single intelligent ecosystem.",
      },
      {
        type: "p",
        text: "Just as smartphones replaced dozens of standalone devices by integrating them into one platform, adaptive mobility is beginning to move toward centralized control systems that connect multiple pieces of equipment into a single interface.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=1600",
        alt: "A smartphone acting as a unified controller for multiple devices",
        caption:
          "One interface, designed around accessibility — not five remotes designed in isolation.",
      },
      { type: "h3", text: "Simplified User Experience" },
      {
        type: "p",
        text: "A unified control platform reduces confusion and learning curves. Instead of managing multiple controls, users interact with one consistent interface designed around accessibility and ease of use.",
      },
      { type: "h3", text: "Greater Independence" },
      {
        type: "p",
        text: "When systems communicate with one another, users gain automation and intelligent workflows. A vehicle can begin preparing itself automatically based on the user’s preferences and mobility needs.",
      },
      { type: "h3", text: "Improved Reliability and Diagnostics" },
      {
        type: "p",
        text: "Integrated systems can monitor equipment performance in real time, identify service needs early, and provide remote diagnostics that reduce downtime and unnecessary service visits.",
      },
      { type: "h3", text: "Accessibility Through Software" },
      {
        type: "p",
        text: "Historically, adaptive equipment functionality was limited by hardware. Integrated systems allow software updates, mobile applications, cloud connectivity, and customization to continuously improve the user experience over time.",
      },
      { type: "h2", text: "The Rise of Smart Mobility Platforms" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=1600",
        alt: "Modern vehicle dashboard with a connected digital interface",
        caption:
          "Cars became software platforms a decade ago. Adaptive mobility is finally catching up.",
      },
      {
        type: "p",
        text: "The automotive industry already embraced this transition years ago. Modern vehicles are no longer viewed as collections of independent components — they are connected software-driven systems.",
      },
      {
        type: "p",
        text: "Adaptive mobility is now following the same path. Smart mobility platforms are emerging that can interface across multiple manufacturers and adaptive devices, allowing users to control equipment through centralized dashboards, mobile devices, voice commands, and intelligent automation.",
      },
      {
        type: "p",
        text: "This evolution is especially important as adaptive technology expands beyond personal vehicles into areas such as:",
      },
      {
        type: "ul",
        items: [
          "Non-Emergency Medical Transportation (NEMT)",
          "Commercial transportation fleets",
          "Autonomous mobility systems",
          "Remote monitoring and service platforms",
          "Connected healthcare environments",
        ],
      },
      {
        type: "p",
        text: "The future requires adaptive equipment to communicate, share data, and operate cohesively.",
      },
      { type: "h2", text: "Why Integration Matters for the Entire Industry" },
      {
        type: "p",
        text: "Integration benefits more than just the end user.",
      },
      { type: "h3", text: "Dealers and Installers" },
      {
        type: "p",
        text: "Unified systems can reduce installation complexity, streamline training, and improve troubleshooting capabilities.",
      },
      { type: "h3", text: "Manufacturers" },
      {
        type: "p",
        text: "Open integration creates opportunities for adaptive equipment manufacturers to expand compatibility without redesigning their entire product ecosystem.",
      },
      { type: "h3", text: "Healthcare and Funding Agencies" },
      {
        type: "p",
        text: "Connected systems provide better data collection, utilization reporting, and measurable outcomes related to independence and accessibility.",
      },
      { type: "h3", text: "Families and Caregivers" },
      {
        type: "p",
        text: "Integrated mobility solutions reduce stress and improve confidence by creating more predictable and reliable experiences for users.",
      },
      { type: "h2", text: "The Industry is Moving Toward Collaboration" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=1600",
        alt: "Diverse team of engineers and clinicians collaborating around a workspace",
        caption:
          "No single manufacturer can solve every mobility challenge alone.",
      },
      {
        type: "p",
        text: "One of the most important shifts happening today is the growing recognition that no single manufacturer can solve every mobility challenge alone.",
      },
      {
        type: "p",
        text: "The future will belong to platforms and technologies that prioritize interoperability, adaptability, and collaboration. Rather than competing solely on isolated hardware features, the industry is beginning to focus on how systems can connect together to create better overall experiences for users.",
      },
      {
        type: "p",
        text: "This represents a major philosophical change in adaptive mobility. The goal is no longer simply to build adaptive equipment.",
      },
      {
        type: "quote",
        text: "The goal is to build connected mobility ecosystems that empower independence at every level.",
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600",
        alt: "Network of connected nodes representing a connected mobility ecosystem",
        caption:
          "The most impactful breakthroughs may come from finally connecting the technologies that already exist.",
      },
      {
        type: "p",
        text: "The adaptive mobility market is poised for significant growth over the next decade. Advances in software, cloud computing, wireless communication, artificial intelligence, and smart vehicle technology are accelerating what is possible.",
      },
      {
        type: "p",
        text: "But the most impactful breakthroughs may not come from entirely new inventions. They may come from finally connecting the technologies that already exist.",
      },
      {
        type: "p",
        text: "The future of adaptive mobility is not just innovation for innovation’s sake. It is intelligent integration designed around the people who depend on mobility every single day.",
      },
    ],
  },
  {
    id: 2,
    slug: "safety-first-proactive-monitoring-fleet-operations",
    title: "Safety First: Proactive Monitoring in Fleet Operations",
    excerpt:
      "Real-time environmental sensors, intelligent monitoring, and connected mobility platforms are moving fleet safety from reactive to preventive — before the incident ever happens.",
    date: "March 10, 2026",
    author: "Michael Chen",
    category: "Technology",
    image: nemtVanHeroImg,
    readTime: "9 min read",
    body: [
      {
        type: "p",
        text: "Fleet safety has traditionally been reactive. A vehicle breaks down, an incident occurs, or equipment fails — and only then does the investigation begin. For decades, fleet management systems focused primarily on tracking location, mileage, and maintenance schedules after problems surfaced.",
      },
      {
        type: "p",
        text: "But today’s connected technologies are changing that model entirely. Modern fleet operations are entering a new era of proactive safety, powered by real-time environmental sensors, intelligent monitoring systems, and connected mobility platforms designed to identify risks before they become emergencies.",
      },
      {
        type: "quote",
        text: "The goal is no longer simply responding to incidents. The goal is preventing them altogether.",
      },
      { type: "h2", text: "The Hidden Risks Inside Fleet Operations" },
      {
        type: "image",
        src: emergencyVehiclesNightImg,
        alt: "Ambulance and fire truck at night with red and blue emergency lights flashing",
        caption:
          "Commercial, NEMT, and adaptive mobility fleets share a common challenge: most safety risks are invisible until something goes wrong.",
      },
      {
        type: "p",
        text: "Whether operating commercial transportation, adaptive mobility fleets, NEMT (Non-Emergency Medical Transportation), or service vehicles, fleet operators face a growing number of safety challenges every day. Many of these risks are invisible until they become serious:",
      },
      {
        type: "ul",
        items: [
          "Carbon monoxide exposure",
          "Overheating vehicle interiors",
          "Battery voltage failures",
          "Equipment malfunctions",
          "Lift and transfer seat failures",
          "Driver fatigue indicators",
          "Environmental hazards",
          "Power interruptions affecting mobility equipment",
        ],
      },
      {
        type: "p",
        text: "In many cases, operators only learn about these problems after a customer complaint, a vehicle breakdown, or a dangerous situation has already occurred. For fleets transporting wheelchair users, elderly passengers, or medically vulnerable individuals, delayed awareness can have severe consequences.",
      },
      {
        type: "p",
        text: "That is why proactive monitoring is rapidly becoming one of the most important advancements in fleet safety.",
      },
      { type: "h2", text: "A Tragic Reminder of Why Monitoring Matters" },
      {
        type: "image",
        src: utahSceneImg,
        alt: "Emergency responders and a West Valley City Fire Department truck investigating a scene outside a Utah apartment complex",
        caption:
          "(Fox13) Emergency responders investigate a scene in West Valley City on Friday, Feb. 6, 2026, after three disabled men were found dead in a vehicle.",
      },
      {
        type: "p",
        text: "In February 2026, a devastating tragedy in Utah brought national attention to the importance of environmental safety monitoring in transportation services for vulnerable individuals.",
      },
      {
        type: "p",
        text: "According to reports from the Salt Lake Tribune and other news outlets, three disabled men died from suspected carbon monoxide poisoning after being left inside a running vehicle in a garage for several hours. Authorities stated the victims were being transported by a service provider for disabled adults when the incident occurred. Investigators reported that the vehicle had been left running while parked inside a garage, creating a deadly buildup of carbon monoxide.",
      },
      {
        type: "p",
        text: "While the circumstances remain deeply tragic, the incident highlights an important reality for the mobility and NEMT industries:",
      },
      {
        type: "quote",
        text: "Many life-threatening environmental conditions are detectable long before they become fatal.",
      },
      {
        type: "p",
        text: "Real-time carbon monoxide monitoring systems, environmental sensors, automatic alerts, and connected fleet safety technologies are specifically designed to identify dangerous conditions immediately — giving operators an opportunity to intervene before lives are lost. This is exactly why proactive monitoring systems are becoming essential infrastructure for modern transportation fleets serving vulnerable populations.",
      },
      { type: "h2", text: "From Fleet Tracking to Fleet Intelligence" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=1600",
        alt: "Operator monitoring data on multiple screens in a control room",
        caption:
          "Modern fleet platforms answer questions that traditional GPS tracking never could.",
      },
      {
        type: "p",
        text: "Traditional fleet systems were designed to answer one question:",
      },
      { type: "quote", text: "“Where is the vehicle?”" },
      {
        type: "p",
        text: "Modern smart fleet systems answer far more important questions:",
      },
      {
        type: "ul",
        items: [
          "Is the environment safe?",
          "Is the equipment functioning properly?",
          "Is the vehicle at risk of failure?",
          "Is the passenger environment stable?",
          "Does the operator need immediate alerts?",
          "Can a problem be identified before it impacts the user?",
        ],
      },
      {
        type: "p",
        text: "This transition from tracking to intelligence is transforming how fleets operate. Real-time environmental sensors now provide continuous monitoring of critical safety conditions inside and around vehicles.",
      },
      { type: "h2", text: "How Real-Time Monitoring Prevents Incidents" },
      {
        type: "p",
        text: "The power of proactive monitoring comes from constant visibility. Instead of waiting for scheduled inspections or manual reports, connected sensor systems continuously evaluate vehicle conditions and generate immediate alerts when abnormalities occur.",
      },
      { type: "h3", text: "Carbon Monoxide Detection" },
      {
        type: "image",
        src: coAlertImg,
        alt: "In-vehicle dashboard display showing a red CARBON MONOXIDE DETECTED alert",
        caption:
          "CO sensors detect dangerous exhaust buildup before occupants ever feel symptoms.",
      },
      {
        type: "p",
        text: "One of the most important applications is carbon monoxide monitoring. Vehicles operating for extended periods — particularly NEMT vans, accessible vehicles, and transport fleets — may expose occupants to dangerous exhaust leaks without obvious warning signs. Integrated CO sensors can instantly detect abnormal levels and notify operators before occupants experience symptoms.",
      },
      { type: "h3", text: "Temperature Monitoring" },
      {
        type: "p",
        text: "Extreme heat inside vehicles creates serious risks, especially for passengers with medical conditions or mobility limitations. Smart environmental monitoring systems can:",
      },
      {
        type: "ul",
        items: [
          "Detect unsafe cabin temperatures",
          "Alert operators in real time",
          "Trigger automated notifications",
          "Help prevent heat-related medical emergencies",
        ],
      },
      { type: "h3", text: "Battery and Power Monitoring" },
      {
        type: "p",
        text: "Adaptive mobility equipment often depends on reliable electrical systems. A sudden voltage drop or power failure can disable critical accessibility equipment when users need it most. Connected monitoring systems track:",
      },
      {
        type: "ul",
        items: [
          "Vehicle battery voltage",
          "Equipment power consumption",
          "Charging system performance",
          "Abnormal electrical conditions",
        ],
      },
      {
        type: "p",
        text: "This allows operators to address issues before equipment failures strand passengers or disable accessibility systems.",
      },
      { type: "h3", text: "Equipment Usage and Diagnostics" },
      {
        type: "p",
        text: "Smart monitoring platforms can also identify abnormal usage patterns or early warning signs of equipment failure. For example:",
      },
      {
        type: "ul",
        items: [
          "Lift cycles increasing beyond normal ranges",
          "Motors drawing excessive power",
          "Unexpected operational interruptions",
          "Mechanical stress indicators",
        ],
      },
      {
        type: "p",
        text: "Rather than waiting for equipment to fail in the field, maintenance teams can proactively schedule service before downtime occurs.",
      },
      { type: "h2", text: "Why This Matters in Adaptive Mobility and NEMT" },
      {
        type: "image",
        src: protectiveMonitoringImg,
        alt: "Wheelchair passenger inside an accessible NEMT van with translucent holographic monitoring icons surrounding them, representing real-time protective sensors",
        caption:
          "For passengers depending on accessible transportation, safety isn’t a feature — it’s the entire service.",
      },
      {
        type: "p",
        text: "The stakes are significantly higher in adaptive transportation environments. Passengers relying on wheelchair-accessible transportation often depend on the vehicle not only for transportation, but for safety, independence, and access to healthcare, employment, and daily life.",
      },
      {
        type: "p",
        text: "A single preventable incident can impact:",
      },
      {
        type: "ul",
        items: [
          "Passenger safety",
          "Regulatory compliance",
          "Liability exposure",
          "Fleet reputation",
          "Service continuity",
        ],
      },
      {
        type: "p",
        text: "Proactive monitoring creates a layer of protection that traditional fleet systems were never designed to provide. Instead of simply managing vehicles, operators can actively protect the people inside them.",
      },
      { type: "h2", text: "The Role of Connected Mobility Platforms" },
      {
        type: "image",
        src: connectedDashboardImg,
        alt: "Fleet operations command center with multiple monitors showing live vehicle map, health gauges, sensor readings, and analytics on a unified mobility dashboard",
        caption:
          "One dashboard. Real-time alerts, diagnostics, and fleet-wide safety analytics.",
      },
      {
        type: "p",
        text: "As fleet technologies evolve, monitoring systems are becoming increasingly integrated into centralized smart mobility platforms. This means fleet operators can access:",
      },
      {
        type: "ul",
        items: [
          "Real-time alerts",
          "Remote diagnostics",
          "Equipment health reports",
          "Historical environmental data",
          "Predictive maintenance insights",
          "Fleet-wide safety analytics",
        ],
      },
      {
        type: "p",
        text: "All from a single dashboard. The result is faster response times, improved maintenance planning, and significantly greater operational visibility.",
      },
      { type: "h2", text: "Safety is Becoming a Competitive Advantage" },
      {
        type: "p",
        text: "Fleet safety is no longer just about compliance. It is becoming a competitive differentiator. Organizations that invest in proactive monitoring technologies gain several advantages:",
      },
      {
        type: "ul",
        items: [
          "Reduced downtime",
          "Lower maintenance costs",
          "Improved passenger trust",
          "Better operational efficiency",
          "Stronger regulatory readiness",
          "Reduced incident risk",
          "Enhanced service reliability",
        ],
      },
      {
        type: "p",
        text: "In industries like NEMT and adaptive mobility, trust and reliability are everything. Passengers, caregivers, healthcare providers, and funding agencies increasingly expect transportation providers to demonstrate higher levels of safety and accountability.",
      },
      { type: "h2", text: "Looking Ahead" },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?auto=format&fit=crop&q=80&w=1600",
        alt: "Fleet of vans lined up at sunrise",
        caption:
          "The fleets of tomorrow won’t wait for problems — they’ll see them coming.",
      },
      {
        type: "p",
        text: "The future of fleet operations will be defined by intelligence, connectivity, and prevention. Environmental sensors, real-time diagnostics, and connected safety systems are rapidly becoming essential infrastructure for modern transportation fleets.",
      },
      {
        type: "p",
        text: "The fleets of tomorrow will not wait for problems to occur. They will identify risks early, respond automatically, and continuously protect both operators and passengers through proactive monitoring technologies.",
      },
      {
        type: "quote",
        text: "Because in modern mobility, safety is no longer reactive. Safety starts before the incident ever happens.",
      },
    ],
  },
  {
    id: 3,
    slug: "atc-mobility-reduced-support-costs-40-percent",
    title: "Case Study: How ATC Mobility Reduced Support Costs by 40%",
    excerpt:
      "Explore the implementation journey and measurable results of unified control systems.",
    date: "March 5, 2026",
    author: "James Wilson",
    category: "Case Study",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 4,
    slug: "connected-vehicles-data-privacy-security",
    title: "Connected Vehicles: Data Privacy and Security Best Practices",
    excerpt:
      "Understanding how Adapy protects user data while enabling powerful fleet insights.",
    date: "February 28, 2026",
    author: "Emily Rodriguez",
    category: "Security",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f70a504f9?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 5,
    slug: "nemt-operations-compliance-made-simple",
    title: "NEMT Operations: Compliance Made Simple",
    excerpt:
      "Automate compliance reporting and reduce administrative burden with cloud intelligence.",
    date: "February 20, 2026",
    author: "David Park",
    category: "Operations",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
  },
  {
    id: 6,
    slug: "user-spotlight-transforming-independence-through-technology",
    title: "User Spotlight: Transforming Independence Through Technology",
    excerpt:
      "Meet the people behind Adapy and hear how unified control changed their lives.",
    date: "February 12, 2026",
    author: "Lisa Thompson",
    category: "Community",
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=1600",
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
