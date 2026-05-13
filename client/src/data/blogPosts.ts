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
        src: "https://images.unsplash.com/photo-1583912267550-d6c2ac3196c0?auto=format&fit=crop&q=80&w=1600",
        alt: "Tangled wires and disconnected control boxes representing fragmented adaptive equipment",
        caption:
          "Most adaptive vehicles today run a different remote, app, and wiring standard for every piece of equipment.",
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
      "Learn how real-time environmental sensors are preventing incidents before they happen.",
    date: "March 10, 2026",
    author: "Michael Chen",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1600",
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
