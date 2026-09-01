import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — GAC" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ matricula: "", senha: "" });
  const upd = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }));
  const valid = form.matricula && form.senha;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/40">
      <div className="mx-auto flex min-h-screen max-w-md items-center px-6 py-16">
        <div className="w-full rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-2">
            <LogIn className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Fazer login</h1>
          </div>
          <p className="mb-6 text-sm text-muted-foreground">
            Acesse o Sistema GAC com sua matrícula institucional.
          </p>

          <div className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Matrícula</span>
              <input value={form.matricula} onChange={upd("matricula")} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-medium text-muted-foreground">Senha</span>
              <input type="password" value={form.senha} onChange={upd("senha")} className="w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring" />
            </label>

            <button
              disabled={!valid}
              onClick={() => navigate({ to: "/dashboard" })}
              className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50"
            >
              Entrar
            </button>
          </div>

          <div className="mt-6 border-t pt-6 text-center text-sm text-muted-foreground">
            Ainda não tem cadastro?{" "}
            <Link to="/cadastro" className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
              <UserPlus className="h-3.5 w-3.5" />
              Cadastrar usuário
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
