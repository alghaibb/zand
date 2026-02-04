export type IconKey =
  | "home"
  | "team"
  | "contact"
  | "article"
  | "services"
  | "tooling"
  | "microsoft"
  | "lms"
  | "erp"
  | "api"
  | "pm"
  | "marketing"
  | "design"
  | "photo"
  | "video"
  | "websites"
  | "frontend"
  | "backend"
  | "fullstack"
  | "appointments";

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  iconKey: IconKey;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", href: "/", iconKey: "home" },
  { id: "team", label: "Team", href: "/team", iconKey: "team" },
  { id: "article", label: "Article", href: "/article", iconKey: "article" },
  { id: "contact", label: "Contact", href: "/contact-us", iconKey: "contact" },
  {
    id: "services",
    label: "Services",
    iconKey: "services",
    children: [
      {
        id: "solutions-tool-implementation",
        label: "Solutions / tool implementation",
        href: "/services/solutions-tool-implementation",
        iconKey: "tooling",
      },
      {
        id: "microsoft-implementation",
        label: "Microsoft implementation",
        href: "/services/microsoft-implementation",
        iconKey: "microsoft",
      },
      { id: "lms", label: "LMS", href: "/services/lms", iconKey: "lms" },
      {
        id: "enterprise-learning-resource-implementation",
        label: "Enterprise learning resource implementation (ERP)",
        href: "/services/enterprise-learning-resource-implementation",
        iconKey: "erp",
      },
      {
        id: "api-integrations",
        label: "API integrations",
        href: "/services/api-integrations",
        iconKey: "api",
      },
      {
        id: "project-management",
        label: "Project management",
        href: "/services/project-management",
        iconKey: "pm",
      },
      {
        id: "digital-marketing",
        label: "Digital marketing",
        href: "/services/digital-marketing",
        iconKey: "marketing",
      },
      {
        id: "graphic-design",
        label: "Graphic design",
        href: "/services/graphic-design",
        iconKey: "design",
      },
      {
        id: "commercial-photography",
        label: "Commercial photography",
        href: "/services/commercial-photography",
        iconKey: "photo",
      },
      {
        id: "commercial-videography",
        label: "Commercial videography",
        href: "/services/commercial-videography",
        iconKey: "video",
      },
      {
        id: "websites",
        label: "Websites",
        iconKey: "websites",
        children: [
          {
            id: "frontend-web-development",
            label: "Frontend web development",
            href: "/services/websites/frontend-web-development",
            iconKey: "frontend",
          },
          {
            id: "backend-development",
            label: "Backend development",
            href: "/services/websites/backend-development",
            iconKey: "backend",
          },
          {
            id: "fullstack-web-development",
            label: "Fullstack web development",
            href: "/services/websites/fullstack-web-development",
            iconKey: "fullstack",
          },
          {
            id: "appointment-based-businesses",
            label: "Appointment based businesses",
            href: "/services/websites/appointment-based-businesses",
            iconKey: "appointments",
          },
        ],
      },
    ],
  },
];

