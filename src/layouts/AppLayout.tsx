import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  BarChart3,
  Bell,
  BookOpen,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  FileQuestion,
  LayoutDashboard,
  LibraryBig,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Settings,
  UserRound,
  X,
} from "lucide-react";

const nav = [
  { label: "Tổng quan", path: "/dashboard", icon: LayoutDashboard },
  {
    label: "Ngân hàng câu hỏi",
    path: "/questions",
    icon: FileQuestion,
    children: [
      { label: "Danh sách câu hỏi", path: "/questions" },
      { label: "Thêm câu hỏi", path: "/questions/create" },
      { label: "Import câu hỏi", path: "/questions/import" },
    ],
  },
  {
    label: "Bộ câu hỏi",
    path: "/question-sets",
    icon: LibraryBig,
    children: [
      { label: "Danh sách bộ đề", path: "/question-sets" },
      { label: "Tạo bộ đề theo ma trận", path: "/question-sets/create-matrix" },
      { label: "Tạo bộ đề ngẫu nhiên", path: "/question-sets/create-random" },
    ],
  },
  {
    label: "Giao hoạt động",
    path: "/assignments/create",
    icon: ClipboardList,
    children: [
      { label: "Giao bộ câu hỏi", path: "/assignments/create" },
      { label: "Giao nhiệm vụ đọc sách", path: "/reading-tasks" },
    ],
  },
  {
    label: "Kết quả học tập",
    path: "/results",
    icon: CalendarDays,
    children: [
      { label: "Kết quả bài kiểm tra", path: "/results" },
      { label: "Kế hoạch đọc sách", path: "/reading-plan" },
      { label: "Thời khóa biểu", path: "/reading-plan" },
    ],
  },
  { label: "Báo cáo thống kê", path: "/reports", icon: BarChart3 },
  { label: "Cài đặt tài khoản", path: "/settings", icon: Settings },
];

function Sidebar({ collapsed, onClose }: { collapsed: boolean; onClose?: () => void }) {
  const location = useLocation();
  return (
    <aside className={`${collapsed ? "w-20" : "w-72"} flex h-full flex-col border-r border-gray-200 bg-white transition-all`}>
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 px-4">
        <NavLink to="/dashboard" onClick={onClose} className="flex min-w-0 flex-1 items-center gap-3 rounded-xl transition hover:bg-brand-soft/50">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand text-white">
            <BookOpen className="h-5 w-5" />
          </div>
          {!collapsed ? (
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">Lexibook Library</p>
              <p className="truncate text-xs text-muted">Quản lý đọc hiểu</p>
            </div>
          ) : null}
        </NavLink>
        {onClose ? <button onClick={onClose} className="ml-auto rounded-lg p-2 lg:hidden"><X className="h-5 w-5" /></button> : null}
      </div>
      <nav className="flex-1 space-y-2 overflow-y-auto p-3">
        {nav.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.path || item.children?.some((child) => child.path === location.pathname);
          return (
            <div key={item.label}>
              <NavLink
                to={item.path}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${active ? "bg-brand-soft text-brand" : "text-ink hover:bg-gray-100"}`}
                onClick={onClose}
              >
                <Icon className={`h-5 w-5 ${active ? "text-brand" : "text-muted"}`} />
                {!collapsed ? <span className="flex-1">{item.label}</span> : null}
                {!collapsed && item.children ? <ChevronDown className="h-4 w-4" /> : null}
              </NavLink>
              {!collapsed && item.children && active ? (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <NavLink key={child.path + child.label} to={child.path} onClick={onClose} className={({ isActive }) => `block rounded-lg px-3 py-2 text-sm ${isActive ? "bg-orange-50 font-semibold text-brand" : "text-muted hover:bg-gray-50"}`}>
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <div className="fixed inset-y-0 left-0 z-40 hidden lg:block">
        <Sidebar collapsed={collapsed} />
      </div>
      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-gray-950/40 lg:hidden">
          <div className="h-full w-80 max-w-[86vw]">
            <Sidebar collapsed={false} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      ) : null}
      <div className={`transition-all ${collapsed ? "lg:pl-20" : "lg:pl-72"}`}>
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-gray-200 bg-white/95 px-4 backdrop-blur lg:px-6">
          <button className="rounded-xl p-2 text-ink hover:bg-gray-100 lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Mở menu">
            <Menu className="h-5 w-5" />
          </button>
          <button className="hidden rounded-xl p-2 text-ink hover:bg-gray-100 lg:block" onClick={() => setCollapsed((value) => !value)} aria-label="Thu gọn menu">
            {collapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
          </button>
          <div className="relative hidden max-w-md flex-1 md:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm outline-none focus:border-brand focus:ring-2 focus:ring-orange-100" placeholder="Tìm học sinh, sách, hoạt động..." />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button className="relative rounded-xl border border-gray-200 bg-white p-2 text-muted hover:text-brand" aria-label="Thông báo">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-brand" />
            </button>
            <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-brand-soft text-brand"><UserRound className="h-4 w-4" /></div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-ink">Nguyễn Văn An</p>
              </div>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
