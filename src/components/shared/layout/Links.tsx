import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "@/components/icons/sharedIcon";

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
];

export const authLinks = [
  { href: "/login", label: "Login" },
  { href: "/register", label: "Register" }
]

export const footerLinks = [
  {
    title: "Platform",
    links: [
      { href: "/properties", label: "Browse Properties" },
      { href: "/categories", label: "Categories" },
      { href: "/become-landlord", label: "Become a Landlord" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Us" },
      { href: "/careers", label: "Careers" },
      { href: "/blog", label: "Blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { href: "/help", label: "Help Center" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQs" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  },
];


export const socialLinks = [
  { href: "#", label: "Facebook", Icon: FacebookIcon },
  { href: "#", label: "Twitter", Icon: TwitterIcon },
  { href: "#", label: "Instagram", Icon: InstagramIcon },
  { href: "#", label: "LinkedIn", Icon: LinkedinIcon },
];