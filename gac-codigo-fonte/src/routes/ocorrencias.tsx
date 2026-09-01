import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { OCCURRENCES } from "@/lib/gac-data";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/ocorrencias")({
  head: () => ({ meta: [{ title: "Ocorrências — GAC" }] }),
  component: Ocorrencias,
});

const TIPOS = ["Dano", "Falha", "Atraso", "Falta de acessório", "Extravio", "Não devolução", "Divergência"];

function Ocorrencias() {
  const [open, setOpen] = useState(false);
  const [tipo, setTipo] = useState(TIPOS[0]);
  const [ativo, setAtivo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [list, setList] = useState(OCCURRENCES);

  function submit() {
    setList((prev) => [
      { id: `o${prev.length + 1}`, tipo, ativo, descricao, responsavel: "Marina Souza", criadaEm: new Date().toLocaleString("pt-BR"), status: "Aberta" },
      ...prev,
    ]);
    setOpen(false);
    setAtivo(""); setDescricao("");
  }

  return (
    <AppShell title="Registrar Ocorrência">
      <div className="mb-4 flex justify-end">
        <button onClick={() => setOpen(true)} className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">
          <Plus className="h-4 w-4" /> Nova ocorrência
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Tipo</th>
              <th className="px-4 py-3">Projetor</th>
              <th className="px-4 py-3">Descrição</th>
              <th className="px-4 py-3">Responsável</th>
              <th className="px-4 py-3">Criada em</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {list.map((o) => (
              <tr key={o.id} className="border-t">
                <td className="px-4 py-3 font-medium">{o.tipo}</td>
                <td className="px-4 py-3 font-mono text-xs">{o.ativo}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.descricao}</td>
                <td className="px-4 py-3">{o.responsavel}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{o.criadaEm}</td>
                <td className="px-4 py-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4" onClick={() => setOpen(false)}>
          <div className="w-full max-w-lg rounded-lg border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-base font-semibold">Nova ocorrência</h2>
            <div className="mt-4 space-y-3">
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Tipo</span>
                <select value={tipo} onChange={(e) => setTipo(e.target.value)} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  {TIPOS.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Projetor / vínculo</span>
                <input value={ativo} onChange={(e) => setAtivo(e.target.value)} placeholder="PAT-100232" className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs font-medium text-muted-foreground">Descrição</span>
                <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} rows={4} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setOpen(false)} className="rounded-md border px-4 py-2 text-sm hover:bg-accent">Cancelar</button>
              <button onClick={submit} disabled={!ativo || !descricao} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50">Registrar</button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
