import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { ASSETS, type Asset, type AssetStatus } from "@/lib/gac-data";
import { usePerfil } from "@/lib/perfil";
import { Search, Plus, Pencil, Trash2, X, Save } from "lucide-react";

export const Route = createFileRoute("/inventario")({
  head: () => ({ meta: [{ title: "Inventário — GAC" }] }),
  component: Inventario,
});

const STATUSES: AssetStatus[] = ["Disponível", "Em uso", "Manutenção", "Indisponível"];
const ESTADOS: Asset["estado"][] = ["Ótimo", "Bom", "Regular", "Ruim"];

function emptyAsset(): Asset {
  return {
    id: `a${Date.now()}`,
    patrimonio: "",
    tipo: "Projetor",
    modelo: "",
    status: "Disponível",
    localizacao: "",
    acessorios: [],
    estado: "Bom",
  };
}

function Inventario() {
  const [perfil] = usePerfil();
  const podeEditar = perfil === "Atendente";

  const [items, setItems] = useState<Asset[]>(() => ASSETS.map((a) => ({ ...a })));
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("Todos");
  const [editing, setEditing] = useState<Asset | null>(null);
  const [isNew, setIsNew] = useState(false);

  const statuses = ["Todos", ...STATUSES];
  const filtered = items.filter(
    (a) =>
      (status === "Todos" || a.status === status) &&
      (a.patrimonio.toLowerCase().includes(q.toLowerCase()) ||
        a.modelo.toLowerCase().includes(q.toLowerCase()) ||
        a.localizacao.toLowerCase().includes(q.toLowerCase()))
  );

  const abrirNovo = () => { setEditing(emptyAsset()); setIsNew(true); };
  const abrirEdicao = (a: Asset) => { setEditing({ ...a }); setIsNew(false); };
  const fechar = () => { setEditing(null); setIsNew(false); };

  const salvar = () => {
    if (!editing) return;
    setItems((prev) => isNew ? [editing, ...prev] : prev.map((a) => a.id === editing.id ? editing : a));
    fechar();
  };

  const excluir = (id: string) => {
    if (!confirm("Excluir este projetor?")) return;
    setItems((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <AppShell title="Inventário de Projetores">
      <div className="mb-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Buscar por projetor, modelo, localização…"
            className="w-full rounded-md border bg-card py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="rounded-md border bg-card px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
        >
          {statuses.map((t) => (<option key={t}>{t}</option>))}
        </select>
        {podeEditar && (
          <button onClick={abrirNovo} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">
            <Plus className="h-4 w-4" /> Adicionar projetor
          </button>
        )}
      </div>

      <div className="overflow-hidden rounded-lg border bg-card">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3">Projetor</th>
              <th className="px-4 py-3">Tipo / Modelo</th>
              <th className="px-4 py-3">Localização</th>
              <th className="px-4 py-3">Acessórios</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="px-4 py-3 font-mono text-xs">{a.patrimonio}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{a.tipo}</div>
                  <div className="text-xs text-muted-foreground">{a.modelo}</div>
                </td>
                <td className="px-4 py-3">{a.localizacao}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{a.acessorios.join(", ")}</td>
                <td className="px-4 py-3">{a.estado}</td>
                <td className="px-4 py-3"><StatusBadge status={a.status} /></td>
                <td className="px-4 py-3 text-right">
                  <button
                    onClick={() => podeEditar && abrirEdicao(a)}
                    disabled={!podeEditar}
                    className="inline-flex items-center gap-1 rounded-md border px-2 py-1 text-xs hover:bg-accent disabled:opacity-50"
                  >
                    <Pencil className="h-3 w-3" /> Editar
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-sm text-muted-foreground">Nenhum projetor encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4">
          <div className="w-full max-w-lg rounded-lg border bg-card shadow-lg">
            <div className="flex items-center justify-between border-b px-5 py-3">
              <h3 className="text-sm font-semibold">{isNew ? "Adicionar projetor" : "Editar projetor"}</h3>
              <button onClick={fechar} className="rounded-md p-1 hover:bg-accent"><X className="h-4 w-4" /></button>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2">
              <Field label="Projetor">
                <input value={editing.patrimonio} onChange={(e) => setEditing({ ...editing, patrimonio: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </Field>
              <Field label="Tipo">
                <input value={editing.tipo} onChange={(e) => setEditing({ ...editing, tipo: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </Field>
              <Field label="Modelo" full>
                <input value={editing.modelo} onChange={(e) => setEditing({ ...editing, modelo: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </Field>
              <Field label="Localização" full>
                <input value={editing.localizacao} onChange={(e) => setEditing({ ...editing, localizacao: e.target.value })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </Field>
              <Field label="Status">
                <select value={editing.status} onChange={(e) => setEditing({ ...editing, status: e.target.value as AssetStatus })} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  {STATUSES.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Estado">
                <select value={editing.estado} onChange={(e) => setEditing({ ...editing, estado: e.target.value as Asset["estado"] })} className="w-full rounded-md border bg-background px-3 py-2 text-sm">
                  {ESTADOS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
              <Field label="Acessórios (separados por vírgula)" full>
                <input value={editing.acessorios.join(", ")} onChange={(e) => setEditing({ ...editing, acessorios: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} className="w-full rounded-md border bg-background px-3 py-2 text-sm" />
              </Field>
            </div>
            <div className="flex items-center justify-between gap-2 border-t px-5 py-3">
              {!isNew ? (
                <button
                  onClick={() => { excluir(editing.id); fechar(); }}
                  className="inline-flex items-center gap-2 rounded-md border border-destructive/40 px-3 py-2 text-sm text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" /> Excluir
                </button>
              ) : <span />}
              <div className="flex gap-2">
                <button onClick={fechar} className="rounded-md border px-3 py-2 text-sm hover:bg-accent">Cancelar</button>
                <button onClick={salvar} disabled={!editing.patrimonio || !editing.modelo} className="inline-flex items-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50">
                  <Save className="h-4 w-4" /> Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
