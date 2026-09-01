import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ASSETS, WITHDRAWALS, OCCURRENCES } from "@/lib/gac-data";
import { FileDown } from "lucide-react";

export const Route = createFileRoute("/relatorio")({
  head: () => ({ meta: [{ title: "Gerar relatório — GAC" }] }),
  component: Relatorio,
});

function Relatorio() {
  const totalAtivos = ASSETS.length;
  const disponiveis = ASSETS.filter((a) => a.status === "Disponível").length;
  const emUso = ASSETS.filter((a) => a.status === "Em uso").length;
  const manut = ASSETS.filter((a) => a.status === "Manutenção").length;
  const ativas = WITHDRAWALS.filter((w) => w.status === "Ativa").length;
  const atrasadas = WITHDRAWALS.filter((w) => w.status === "Atrasada").length;
  const ocorrencias = OCCURRENCES.length;

  const gerarCSV = () => {
    const linhas = [
      ["Indicador", "Valor"],
      ["Total de projetores", totalAtivos],
      ["Disponíveis", disponiveis],
      ["Em uso", emUso],
      ["Em manutenção", manut],
      ["Retiradas ativas", ativas],
      ["Devoluções atrasadas", atrasadas],
      ["Ocorrências registradas", ocorrencias],
    ];
    const csv = linhas.map((l) => l.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `relatorio-gac-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <AppShell title="Gerar Relatório" subtitle="Resumo consolidado do dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["Total de projetores", totalAtivos],
          ["Disponíveis", disponiveis],
          ["Em uso", emUso],
          ["Em manutenção", manut],
          ["Retiradas ativas", ativas],
          ["Devoluções atrasadas", atrasadas],
          ["Ocorrências", ocorrencias],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="text-sm text-muted-foreground">{label}</div>
            <div className="mt-2 text-3xl font-semibold tracking-tight">{value}</div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={gerarCSV}
          className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow"
        >
          <FileDown className="h-4 w-4" />
          Baixar relatório (CSV)
        </button>
      </div>
    </AppShell>
  );
}
