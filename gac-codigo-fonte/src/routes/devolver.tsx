import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { WITHDRAWALS } from "@/lib/gac-data";
import { CheckCircle2, ScanLine } from "lucide-react";

export const Route = createFileRoute("/devolver")({
  head: () => ({ meta: [{ title: "Registrar devolução — GAC" }] }),
  component: Devolver,
});

function Devolver() {
  const [selected, setSelected] = useState<string | null>(null);
  const [step, setStep] = useState<"detail" | "validate" | "done">("detail");
  const w = WITHDRAWALS.find((x) => x.id === selected);

  return (
    <AppShell title="Registrar Devolução">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="rounded-lg border bg-card p-5">
          <h2 className="mb-3 text-sm font-semibold">Retiradas ativas</h2>
          <div className="space-y-2">
            {WITHDRAWALS.map((x) => (
              <button
                key={x.id}
                onClick={() => { setSelected(x.id); setStep("detail"); }}
                className={`flex w-full items-center justify-between rounded-md border p-3 text-left transition-colors ${selected === x.id ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
              >
                <div>
                  <div className="text-sm font-medium">{x.tipo} · {x.patrimonio}</div>
                  <div className="text-xs text-muted-foreground">{x.professor} · {x.sala}</div>
                </div>
                <StatusBadge status={x.status} />
              </button>
            ))}
          </div>
        </section>

        <section className="rounded-lg border bg-card p-5">
          {!w && <p className="text-sm text-muted-foreground">Selecione uma retirada para registrar a devolução.</p>}
          {w && step === "detail" && (
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold">Dados da retirada</h2>
                <div className="mt-2 grid grid-cols-2 gap-3 text-sm">
                  <Info label="Professor" value={w.professor} />
                  <Info label="Matrícula" value={w.matricula} />
                  <Info label="Sala" value={`${w.sala} · ${w.bloco}`} />
                  <Info label="Turno" value={w.turno} />
                  <Info label="Retirada em" value={w.retiradaEm} />
                  <Info label="Prazo" value={w.prevDevolucao} />
                </div>
              </div>

              {w.status === "Atrasada" && (
                <div className="rounded-md border border-warning/40 bg-warning/10 p-3 text-xs">
                  Devolução fora do prazo previsto. Considere registrar uma ocorrência.
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <Link to="/ocorrencias" className="rounded-md border px-4 py-2 text-sm hover:bg-accent">Registrar ocorrência</Link>
                <button onClick={() => setStep("validate")} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">Validar projetor</button>
              </div>
            </div>
          )}
          {w && step === "validate" && (
            <div className="space-y-4">
              <h2 className="text-sm font-semibold">Validar projetor e acessórios</h2>
              <div className="flex flex-col items-center gap-3 rounded-md border border-dashed bg-muted/30 p-8 text-center">
                <ScanLine className="h-10 w-10 text-primary" />
                <div className="text-sm">Escaneie o QR Code ou NFC do equipamento <strong>{w.patrimonio}</strong></div>
                <div className="text-xs text-muted-foreground">Ou digite o número do projetor manualmente</div>
                <input defaultValue={w.patrimonio} className="w-full max-w-xs rounded-md border bg-background px-3 py-2 text-center text-sm font-mono outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div className="flex justify-between pt-2">
                <button onClick={() => setStep("detail")} className="rounded-md border px-4 py-2 text-sm hover:bg-accent">Voltar</button>
                <button onClick={() => setStep("done")} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">Confirmar validação</button>
              </div>
            </div>
          )}
          {w && step === "done" && (
            <div className="space-y-3 rounded-md border border-success/30 bg-success/10 p-4 text-sm">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                <div>
                  <div className="font-medium">Validação concluída</div>
                  <div className="text-muted-foreground">Projetor {w.patrimonio} verificado. Prossiga para o checklist de devolução.</div>
                </div>
              </div>
              <Link to="/checklist" className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">
                Ir para checklist de devolução
              </Link>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
