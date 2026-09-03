import {
  Bookmark,
  LayoutGrid,
  MessageSquare,
  ScrollText,
  Settings,
  Telescope,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  to: string;
  icon: LucideIcon;
};

export const navItems: NavItem[] = [
  { label: "Dashboard", to: "/", icon: LayoutGrid },
  { label: "Meeting Assistant", to: "/meeting-assistant", icon: ScrollText },
  { label: "Research Assistant", to: "/research-assistant", icon: Telescope },
  { label: "AI Chat", to: "/chat", icon: MessageSquare },
  { label: "Saved", to: "/saved", icon: Bookmark },
  { label: "Settings", to: "/settings", icon: Settings },
];
