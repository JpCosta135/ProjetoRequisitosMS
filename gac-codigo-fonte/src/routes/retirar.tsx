import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { ASSETS } from "@/lib/gac-data";
import { ScanLine } from "lucide-react";

export const Route = createFileRoute("/retirar")({
  head: () => ({ meta: [{ title: "Retirar projetor — GAC" }] }),
  component: Retirar,
});

function Retirar() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [sala, setSala] = useState("");
  const [bloco, setBloco] = useState("");
  const [turno, setTurno] = useState("Noite");
  const [selected, setSelected] = useState<string | null>(null);

  const disponiveis = ASSETS.filter((a) => a.status === "Disponível" && a.tipo === "Projetor");
  const ativo = ASSETS.find((a) => a.id === selected);

  return (
    <AppShell title="Retirar Projetor">
      <Stepper step={step} />

      <div className="mt-6 rounded-lg border bg-card p-6">
        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Informar local de uso</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Turno">
                <select value={turno} onChange={(e) => setTurno(e.target.value)} className={inputCls}>
                  <option>Manhã</option><option>Tarde</option><option>Noite</option>
                </select>
              </Field>
              <Field label="Bloco"><input value={bloco} onChange={(e) => setBloco(e.target.value)} placeholder="Ex.: B" className={inputCls} /></Field>
              <Field label="Sala"><input value={sala} onChange={(e) => setSala(e.target.value)} placeholder="Ex.: B-204" className={inputCls} /></Field>
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setStep(2)} disabled={!sala || !bloco} className={primaryBtn}>Buscar disponíveis</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Selecionar projetor disponível</h2>
            {disponiveis.length === 0 && (
              <p className="text-sm text-muted-foreground">Nenhum projetor disponível para o tipo selecionado.</p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              {disponiveis.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setSelected(a.id)}
                  className={`rounded-md border p-4 text-left transition-colors ${selected === a.id ? "border-primary bg-primary/5" : "hover:bg-accent"}`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium">{a.modelo}</div>
                      <div className="text-xs text-muted-foreground">{a.patrimonio} · {a.localizacao}</div>
                    </div>
                    <StatusBadge status={a.status} />
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground">Acessórios: {a.acessorios.join(", ")}</div>
                </button>
              ))}
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(1)} className={ghostBtn}>Voltar</button>
              <button onClick={() => setStep(3)} disabled={!selected} className={primaryBtn}>Validar projetor</button>
            </div>
          </div>
        )}

        {step === 3 && ativo && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold">Validar projetor e acessórios</h2>
            <div className="flex flex-col items-center gap-3 rounded-md border border-dashed bg-muted/30 p-8 text-center">
              <ScanLine className="h-10 w-10 text-primary" />
              <div className="text-sm">Escaneie o QR Code ou NFC do equipamento <strong>{ativo.patrimonio}</strong></div>
              <div className="text-xs text-muted-foreground">Ou digite o número do projetor manualmente</div>
              <input defaultValue={ativo.patrimonio} className={`${inputCls} max-w-xs text-center font-mono`} />
            </div>
            <div className="rounded-md bg-muted/30 p-4 text-sm">
              <div className="mb-2 font-medium">Acessórios obrigatórios</div>
              <ul className="space-y-1">
                {ativo.acessorios.map((ac) => (
                  <li key={ac} className="flex items-center gap-2 text-sm">
                    <input type="checkbox" defaultChecked /> {ac}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between pt-2">
              <button onClick={() => setStep(2)} className={ghostBtn}>Voltar</button>
              <Link to="/termo" className={primaryBtn}>Continuar para o termo</Link>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

const inputCls = "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";
const primaryBtn = "rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50 disabled:cursor-not-allowed";
const ghostBtn = "rounded-md border px-4 py-2 text-sm hover:bg-accent";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

function Stepper({ step }: { step: number }) {
  const labels = ["Local de uso", "Selecionar projetor", "Validar projetor"];
  return (
    <ol className="flex flex-wrap gap-2 text-xs">
      {labels.map((l, i) => {
        const n = i + 1;
        const active = step === n;
        const done = step > n;
        return (
          <li key={l} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 ${active ? "border-primary bg-primary/10 text-primary" : done ? "border-success/40 bg-success/10 text-success" : "text-muted-foreground"}`}>
            <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${active ? "bg-primary text-primary-foreground" : done ? "bg-success text-success-foreground" : "bg-muted text-muted-foreground"}`}>{n}</span>
            {l}
          </li>
        );
      })}
    </ol>
  );
}
