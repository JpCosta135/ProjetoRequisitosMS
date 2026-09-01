import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { ASSETS, WITHDRAWALS, OCCURRENCES } from "@/lib/gac-data";
import { Package, ArrowDownToLine, AlertTriangle, ArrowUpFromLine } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Painel — GAC" }] }),
  component: Dashboard,
});

function Dashboard() {
  const disponiveis = ASSETS.filter((a) => a.status === "Disponível").length;
  const ativas = WITHDRAWALS.filter((w) => w.status === "Ativa").length;
  const atrasadas = WITHDRAWALS.filter((w) => w.status === "Atrasada").length;
  const ocorrenciasAbertas = OCCURRENCES.filter((o) => o.status !== "Resolvida").length;

  const cards = [
    { label: "Projetores disponíveis", value: disponiveis, icon: Package, to: "/inventario" },
    { label: "Retiradas ativas", value: ativas, icon: ArrowDownToLine, to: "/devolver" },
    { label: "Devoluções atrasadas", value: atrasadas, icon: ArrowUpFromLine, to: "/ocorrencias" },
    { label: "Ocorrências abertas", value: ocorrenciasAbertas, icon: AlertTriangle, to: "/ocorrencias" },
  ];

  return (
    <AppShell title="Painel" subtitle="Visão geral da operação do CCT">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to} className="rounded-lg border bg-card p-5 shadow-sm transition-shadow hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{label}</div>
              <Icon className="h-4 w-4 text-primary" />
            </div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Retiradas recentes</h2>
            <Link to="/devolver" className="text-xs text-primary hover:underline">Ver todas</Link>
          </div>
          <div className="space-y-3">
            {WITHDRAWALS.map((w) => (
              <div key={w.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium">{w.tipo} · {w.patrimonio}</div>
                  <div className="text-xs text-muted-foreground">{w.professor} · {w.sala} · {w.turno}</div>
                </div>
                <StatusBadge status={w.status} />
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold">Ocorrências</h2>
            <Link to="/ocorrencias" className="text-xs text-primary hover:underline">Abrir página</Link>
          </div>
          <div className="space-y-3">
            {OCCURRENCES.map((o) => (
              <div key={o.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                <div>
                  <div className="text-sm font-medium">{o.tipo} · {o.ativo}</div>
                  <div className="text-xs text-muted-foreground">{o.descricao}</div>
                </div>
                <StatusBadge status={o.status} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
