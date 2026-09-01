import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  AlertTriangle,
  ScanLine,
  FileDown,
} from "lucide-react";
import type { ReactNode } from "react";
import { CURRENT_USER } from "@/lib/gac-data";
import { usePerfil, type Perfil } from "@/lib/perfil";

const NAV_BY_PERFIL: Record<Perfil, ReadonlyArray<{ to: string; label: string; icon: typeof LayoutDashboard }>> = {
  Professor: [
    { to: "/retirar", label: "Retirar projetor", icon: ArrowDownToLine },
    { to: "/devolver", label: "Devolver projetor", icon: ArrowUpFromLine },
    { to: "/permutacao", label: "Permutação", icon: ArrowLeftRight },
  ],
  Atendente: [
    { to: "/dashboard", label: "Painel", icon: LayoutDashboard },
    { to: "/validar", label: "Validar projetor", icon: ScanLine },
    { to: "/ocorrencias", label: "Ocorrências", icon: AlertTriangle },
    { to: "/inventario", label: "Inventário", icon: Package },
  ],
  Coordenador: [
    { to: "/dashboard", label: "Painel", icon: LayoutDashboard },
    { to: "/relatorio", label: "Gerar relatório", icon: FileDown },
  ],
};

export function AppShell({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [perfil, setPerfil] = usePerfil();
  const nav = NAV_BY_PERFIL[perfil];

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground md:flex">
        <div className="border-b border-sidebar-border px-5 py-5">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-md bg-sidebar-primary font-bold text-sidebar-primary-foreground">
              G
            </div>
            <div>
              <div className="text-sm font-semibold tracking-tight">Sistema GAC</div>
              <div className="text-[11px] text-sidebar-foreground/60">Gestão de Projetores CCT</div>
            </div>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-2 py-4">
          {nav.map(({ to, label, icon: Icon }) => {
            const active = pathname === to;
            return (
              <Link
                key={to}
                to={to}
                className={`mb-0.5 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/75 hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border px-4 py-4 text-xs space-y-3">
          <div>
            <div className="font-medium">{CURRENT_USER.nome}</div>
            <div className="text-sidebar-foreground/60">
              {perfil} · {CURRENT_USER.matricula}
            </div>
          </div>
          <label className="block">
            <span className="mb-1 block text-[10px] uppercase tracking-wide text-sidebar-foreground/60">
              Perfil (demo)
            </span>
            <select
              value={perfil}
              onChange={(e) => setPerfil(e.target.value as Perfil)}
              className="w-full rounded-md border border-sidebar-border bg-sidebar-accent px-2 py-1.5 text-xs text-sidebar-accent-foreground outline-none focus:ring-2 focus:ring-sidebar-ring"
            >
              <option value="Professor">Professor</option>
              <option value="Atendente">Atendente</option>
              <option value="Coordenador">Coordenador</option>
            </select>
          </label>
        </div>
      </aside>

      <main className="flex-1">
        <header className="border-b bg-card">
          <div className="px-6 py-5 md:px-10">
            <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
        </header>
        <div className="px-6 py-8 md:px-10">{children}</div>
      </main>
    </div>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    Disponível: "bg-success/15 text-success",
    "Em uso": "bg-primary/15 text-primary",
    Manutenção: "bg-warning/20 text-warning-foreground",
    Indisponível: "bg-muted text-muted-foreground",
    Ativa: "bg-primary/15 text-primary",
    Devolvida: "bg-success/15 text-success",
    Atrasada: "bg-destructive/15 text-destructive",
    Aberta: "bg-warning/20 text-warning-foreground",
    "Em análise": "bg-primary/15 text-primary",
    Resolvida: "bg-success/15 text-success",
  };
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] ?? "bg-muted text-muted-foreground"}`}>
      {status}
    </span>
  );
}
