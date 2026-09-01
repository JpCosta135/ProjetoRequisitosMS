import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/checklist")({
  head: () => ({ meta: [{ title: "Checklist de devolução — GAC" }] }),
  component: Checklist,
});

const ITEMS = [
  { key: "equip", label: "Equipamento principal", required: true },
  { key: "hdmi", label: "Cabo HDMI", required: true },
  { key: "fonte", label: "Fonte de alimentação", required: true },
  { key: "adaptador", label: "Adaptador", required: false },
  { key: "controle", label: "Controle remoto", required: false },
  { key: "estado", label: "Estado físico íntegro", required: true },
];

function Checklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [done, setDone] = useState(false);
  const missingRequired = ITEMS.filter((i) => i.required && !checked[i.key]);

  return (
    <AppShell title="Executar Checklist de Devolução">
      <div className="mx-auto max-w-2xl rounded-lg border bg-card p-6">
        <ul className="space-y-2">
          {ITEMS.map((it) => (
            <li key={it.key} className="flex items-center justify-between rounded-md border p-3">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={!!checked[it.key]}
                  onChange={(e) => setChecked((p) => ({ ...p, [it.key]: e.target.checked }))}
                />
                {it.label}
              </label>
              {it.required && <span className="text-[10px] uppercase tracking-wide text-destructive">Obrigatório</span>}
            </li>
          ))}
        </ul>

        {!done && missingRequired.length > 0 && (
          <p className="mt-4 text-xs text-muted-foreground">Faltam {missingRequired.length} item(ns) obrigatório(s).</p>
        )}

        <div className="mt-5 flex justify-end">
          <button
            disabled={missingRequired.length > 0}
            onClick={() => setDone(true)}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50"
          >
            Concluir checklist
          </button>
        </div>

        {done && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-success/30 bg-success/10 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
            MSG021 — Checklist concluído com sucesso.
          </div>
        )}
      </div>
    </AppShell>
  );
}
