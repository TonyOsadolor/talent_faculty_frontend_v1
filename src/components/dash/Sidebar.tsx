import {
  Category2,
  Book1,
  FolderOpen,
  Profile2User,
  Clock,
  TickCircle,
  DocumentText,
  Award,
  Message,
  Profile,
  Setting2,
  MessageQuestion,
  LogoutCurve,
  ArrowRight3,
} from "iconsax-react";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
}

const mainMenu: NavItem[] = [
  { label: "Dashboard", icon: <Category2 size={20} variant="Bold" />, href: "/dashboard" },
  { label: "My Courses", icon: <Book1 size={20} />, href: "/courses" },
  { label: "Deliverables", icon: <FolderOpen size={20} />, href: "/deliverables" },
  { label: "Group Project", icon: <Profile2User size={20} />, href: "/group-project" },
  { label: "Progress", icon: <Clock size={20} />, href: "/progress" },
  { label: "Assessments", icon: <TickCircle size={20} />, href: "/assessments" },
  { label: "Assignments", icon: <DocumentText size={20} />, href: "/assignments" },
  { label: "Certificates", icon: <Award size={20} />, href: "/certificates" },
  { label: "Messages", icon: <Message size={20} />, href: "/messages" },
  { label: "Profile", icon: <Profile size={20} />, href: "/profile" },
];

const otherTools: NavItem[] = [
  { label: "Settings", icon: <Setting2 size={20} />, href: "/settings" },
  { label: "Help & Support", icon: <MessageQuestion size={20} />, href: "/help" },
  { label: "Log Out", icon: <LogoutCurve size={20} />, href: "/logout" },
];

interface SidebarProps {
  activeHref?: string;
  onNavigate?: (href: string) => void;
}

export default function Sidebar({ activeHref = "/dashboard", onNavigate }: SidebarProps) {
  const renderItem = (item: NavItem) => {
    const isActive = item.href === activeHref;
    return (
      <button
        key={item.href}
        onClick={() => onNavigate?.(item.href)}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? "bg-primary text-white"
            : "text-slate-600 hover:bg-primary hover:text-primary"
        }`}
      >
        {item.icon}
        <span>{item.label}</span>
      </button>
    );
  };

  return (
    <aside className="flex h-full w-64 flex-col justify-between bg-primary/60 px-4 py-6">
      <div>
        <div className="mb-8 flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="" className="h-7 w-7" />
            <span className="text-lg font-bold text-slate-900">-Talent Faculty-</span>
          </div>
          <ArrowRight3 size={16} className="text-slate-400" />
        </div>

        <p className="mb-2 px-2 text-xs font-semibold tracking-wide text-slate-400">
          MAIN MENU
        </p>
        <nav className="flex flex-col gap-1">{mainMenu.map(renderItem)}</nav>
      </div>

      <div>
        <hr className="my-4 border-slate-200" />
        <p className="mb-2 px-2 text-xs font-semibold tracking-wide text-slate-400">
          OTHER TOOLS
        </p>
        <nav className="flex flex-col gap-1">{otherTools.map(renderItem)}</nav>
      </div>
    </aside>
  );
}
