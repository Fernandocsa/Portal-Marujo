import { useState } from "react";
import { Link, useLocation } from "wouter";
import { LayoutDashboard, Users, Trophy, Shield, Download, LogOut, ChevronLeft, CalendarDays, UserCog, CalendarRange, Landmark, MessageSquare, Flag, Scale, ClipboardList, BarChart3, Sparkles, Medal, Cake, Menu, X } from "lucide-react";

interface Props {
  children: React.ReactNode;
  onLogout: () => void;
}

const navItems = [
  { href: "/admin", label: "Painel", icon: LayoutDashboard, exact: true },
  { href: "/admin/jogadores", label: "Jogadores", icon: Users },
  { href: "/admin/tecnicos", label: "Técnicos", icon: UserCog },
  { href: "/admin/aniversariantes", label: "Aniversariantes", icon: Cake },
  { href: "/admin/temporadas", label: "Temporadas", icon: CalendarRange },
  { href: "/admin/partidas", label: "Partidas", icon: Trophy },
  { href: "/admin/competicoes", label: "Competições", icon: Medal },
  { href: "/admin/adversarios", label: "Adversários", icon: Shield },
  { href: "/admin/arbitros", label: "Árbitros", icon: Scale },
  { href: "/admin/estadios", label: "Estádios", icon: Landmark },
  { href: "/admin/jogos-futuros", label: "Jogos futuros", icon: CalendarDays },
  { href: "/admin/comentarios", label: "Comentários", icon: MessageSquare },
  { href: "/admin/sugestoes", label: "Sugestões", icon: Flag },
  { href: "/admin/partidas-duplicadas", label: "Revisão Partidas", icon: ClipboardList },
  { href: "/admin/importar-exportar", label: "Importar / Exportar", icon: Download },
  { href: "/admin/importar-ia", label: "Importação IA", icon: Sparkles },
  { href: "/admin/acessos", label: "Acessos", icon: BarChart3 },
];

function SidebarNav({
  location,
  onNavigate,
}: {
  location: string;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 py-2 overflow-y-auto">
      {navItems.map((item) => {
        // Exact segment match so /admin/partidas does not light up on /admin/partidas-duplicadas
        const active = item.exact
          ? location === item.href
          : location === item.href || location.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium transition-colors ${
              active ? "bg-white/15 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
            }`}
          >
            <item.icon size={15} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SidebarFooter({
  onLogout,
  onNavigate,
}: {
  onLogout: () => void;
  onNavigate?: () => void;
}) {
  return (
    <div className="p-3 border-t border-white/10 space-y-1 shrink-0">
      <Link
        href="/"
        onClick={onNavigate}
        className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white transition-colors rounded"
      >
        <ChevronLeft size={13} />
        Ver portal
      </Link>
      <button
        onClick={() => {
          onNavigate?.();
          onLogout();
        }}
        className="flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white transition-colors rounded w-full text-left"
      >
        <LogOut size={13} />
        Sair
      </button>
    </div>
  );
}

function SidebarBrand({ onClose }: { onClose?: () => void }) {
  return (
    <div className="px-4 py-4 border-b border-white/10 flex items-start justify-between gap-2 shrink-0">
      <div>
        <div className="text-lg font-black tracking-tight">
          <span className="text-white">PORTAL</span>
          <span className="text-[#F5A623] ml-1">MARUJO</span>
        </div>
        <p className="text-xs text-white/50 mt-0.5">Admin</p>
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="text-white/60 hover:text-white mt-0.5"
          aria-label="Fechar menu"
        >
          <X size={18} />
        </button>
      )}
    </div>
  );
}

export default function AdminLayout({ children, onLogout }: Props) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Desktop sidebar — unchanged behavior from lg up */}
      <aside className="hidden lg:flex w-52 bg-[#1B3A6B] flex-col shrink-0">
        <SidebarBrand />
        <SidebarNav location={location} />
        <SidebarFooter onLogout={onLogout} />
      </aside>

      {/* Mobile/tablet overlay drawer (below lg = sm/md) */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={closeMobile}
            aria-hidden
          />
          <aside className="relative z-50 flex flex-col w-52 h-full bg-[#1B3A6B] shadow-xl">
            <SidebarBrand onClose={closeMobile} />
            <SidebarNav location={location} onNavigate={closeMobile} />
            <SidebarFooter onLogout={onLogout} onNavigate={closeMobile} />
          </aside>
        </div>
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-20 h-12 flex items-center px-4 bg-[#1B3A6B] border-b border-white/10 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="text-white/70 hover:text-white mr-3"
            aria-label="Abrir menu"
            data-testid="button-admin-mobile-menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="text-sm font-black tracking-tight">
            <span className="text-white">PORTAL</span>{" "}
            <span className="text-[#F5A623]">MARUJO</span>
            <span className="text-white/50 font-medium ml-2 text-xs">Admin</span>
          </span>
        </header>

        <main className="flex-1 overflow-auto min-w-0">
          <div className="max-w-5xl mx-auto p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
