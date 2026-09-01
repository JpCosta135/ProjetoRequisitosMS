import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { WITHDRAWALS } from "@/lib/gac-data";
import { ArrowLeftRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/permutacao")({
  head: () => ({ meta: [{ title: "Registrar permutação — GAC" }] }),
  component: Permutacao,
});

function Permutacao() {
  const [patrimonio, setPatrimonio] = useState("");
  const [novoResp, setNovoResp] = useState("");
  const [novoLocal, setNovoLocal] = useState("");
  const [justificativa, setJustificativa] = useState("");
  const [confirmado, setConfirmado] = useState(false);

  const retirada = WITHDRAWALS.find((w) => w.patrimonio === patrimonio);

  return (
    <AppShell title="Registrar Permutação">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-card p-5 space-y-4">
          <h2 className="text-sm font-semibold">Identificar projetor</h2>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Código do projetor</span>
            <input value={patrimonio} onChange={(e) => setPatrimonio(e.target.value)} placeholder="PAT-100232" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
          {patrimonio && !retirada && <p className="text-xs text-destructive">Nenhuma retirada ativa encontrada.</p>}
          {retirada && (
            <div className="rounded-md bg-muted/30 p-3 text-sm">
              <div className="font-medium">{retirada.tipo} · {retirada.patrimonio}</div>
              <div className="text-xs text-muted-foreground">Atual: {retirada.professor} · {retirada.sala}</div>
            </div>
          )}

          <h2 className="pt-2 text-sm font-semibold">Dados da permutação</h2>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Novo responsável</span>
            <input value={novoResp} onChange={(e) => setNovoResp(e.target.value)} placeholder="Nome do professor" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Novo local de utilização</span>
            <input value={novoLocal} onChange={(e) => setNovoLocal(e.target.value)} placeholder="Sala / bloco" className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-muted-foreground">Justificativa</span>
            <textarea value={justificativa} onChange={(e) => setJustificativa(e.target.value)} rows={3} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
          </label>
          <button
            disabled={!retirada || (!novoResp && !novoLocal) || !justificativa}
            onClick={() => setConfirmado(true)}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50"
          >
            Confirmar permutação
          </button>
        </section>

        <section className="rounded-lg border bg-card p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
            <ArrowLeftRight className="h-4 w-4 text-primary" /> Pré-visualização
          </div>
          {!retirada && <p className="text-sm text-muted-foreground">Informe um projetor com retirada ativa.</p>}
          {retirada && (
            <div className="space-y-3 text-sm">
              <Diff label="Responsável" from={retirada.professor} to={novoResp || "—"} />
              <Diff label="Local" from={retirada.sala} to={novoLocal || "—"} />
              <div>
                <div className="text-xs text-muted-foreground">Justificativa</div>
                <div className="rounded-md bg-muted/30 p-2 text-sm">{justificativa || "—"}</div>
              </div>
              {confirmado && (
                <div className="mt-2 space-y-2 rounded-md border border-success/30 bg-success/10 p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
                    <div className="text-sm">Permutação registrada e histórico atualizado.</div>
                  </div>
                  <div className="flex gap-2">
                    <Link to="/validar" search={{ pat: retirada.patrimonio, next: "termo" }} className="inline-block rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-glow">Validar projetor</Link>
                  </div>
                  <p className="text-xs text-muted-foreground">A validação é feita por leitura de QR Code ou NFC.</p>
                </div>
              )}
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function Diff({ label, from, to }: { label: string; from: string; to: string }) {
  return (
    <div className="grid grid-cols-[80px_1fr_auto_1fr] items-center gap-2">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="rounded-md bg-muted/40 px-2 py-1 text-sm line-through">{from}</div>
      <span className="text-muted-foreground">→</span>
      <div className="rounded-md bg-primary/10 px-2 py-1 text-sm text-primary">{to}</div>
    </div>
  );
}
