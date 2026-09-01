import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { setPerfil } from "@/lib/perfil";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Cadastrar dados — GAC" }] }),
  component: Cadastro,
});

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nome: "", matricula: "", email: "", perfil: "Professor", senha: "", confirmarSenha: "" });
  const [enviado, setEnviado] = useState(false);

  const perfilMap: Record<string, import("@/lib/perfil").Perfil> = {
    "Professor": "Professor",
    "Atendente do CCT": "Atendente",
    "Coordenação do CCT": "Coordenador",
  };

  const rotaPorPerfil: Record<string, string> = {
    "Professor": "/retirar",
    "Atendente do CCT": "/",
    "Coordenação do CCT": "/",
  };

  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm((p) => ({ ...p, [k]: e.target.value }));
  const senhasIguais = form.senha && form.senha === form.confirmarSenha;
  const valid = form.nome && form.matricula && form.email && senhasIguais;

  const salvar = () => {
    if (!valid) return;
    const perfil = perfilMap[form.perfil] ?? "Professor";
    setPerfil(perfil);
    setEnviado(true);
  };

  const proximaRota = rotaPorPerfil[form.perfil] ?? "/";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/40">
      <div className="mx-auto flex min-h-screen max-w-2xl items-center px-6 py-16">
        <div className="w-full rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight">Cadastrar Dados</h1>
            <p className="mt-1 text-sm text-muted-foreground">Cadastre ou atualize seus dados para usar o sistema.</p>
          </div>

          {!enviado ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <F label="Nome completo" full><input value={form.nome} onChange={upd("nome")} className={inp} /></F>
              <F label="Matrícula"><input value={form.matricula} onChange={upd("matricula")} className={inp} /></F>
              <F label="Perfil">
                <select value={form.perfil} onChange={upd("perfil")} className={inp}>
                  <option>Professor</option><option>Atendente do CCT</option><option>Coordenação do CCT</option>
                </select>
              </F>
              <F label="E-mail institucional" full><input type="email" value={form.email} onChange={upd("email")} className={inp} /></F>
              <F label="Senha" full><input type="password" value={form.senha} onChange={upd("senha")} className={inp} /></F>
              <F label="Confirmar senha" full><input type="password" value={form.confirmarSenha} onChange={upd("confirmarSenha")} className={inp} /></F>

              <div className="sm:col-span-2 flex justify-end gap-2 pt-2">
                <button onClick={salvar} disabled={!valid} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50">
                  Salvar e validar conta
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start gap-3 rounded-md border border-success/30 bg-success/10 p-4 text-sm">
                <CheckCircle2 className="mt-0.5 h-5 w-5 text-success" />
                <div>
                  <div className="font-medium">Dados salvos com sucesso</div>
                  <div className="text-muted-foreground">Seu perfil foi definido como <strong>{form.perfil}</strong>.</div>
                </div>
              </div>
              <Link to={proximaRota as any} className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">
                Continuar para o sistema
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inp = "w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring";

function F({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <label className={`block ${full ? "sm:col-span-2" : ""}`}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
