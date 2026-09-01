import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/validar-conta")({
  head: () => ({ meta: [{ title: "Validar conta — GAC" }] }),
  component: Validar,
});

const STEPS = [
  "Recebendo dados cadastrais",
  "Validando campos obrigatórios",
  "Verificando duplicidade de matrícula e e-mail",
  "Verificando compatibilidade do perfil",
  "Consultando vínculo institucional",
  "Ativando conta",
];

function Validar() {
  const [done, setDone] = useState(0);
  useEffect(() => {
    if (done >= STEPS.length) return;
    const t = setTimeout(() => setDone((d) => d + 1), 700);
    return () => clearTimeout(t);
  }, [done]);

  const finished = done >= STEPS.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/40">
      <div className="mx-auto flex min-h-screen max-w-xl items-center px-6 py-16">
        <div className="w-full rounded-lg border bg-card p-8 shadow-sm">
          <div className="mb-6">
            <h1 className="text-xl font-semibold tracking-tight">Validar Dados e Ativar Conta</h1>
            <p className="mt-1 text-sm text-muted-foreground">Execução automática pelo Sistema GAC.</p>
          </div>

          <ul className="space-y-3">
            {STEPS.map((s, i) => {
              const ok = i < done;
              const cur = i === done && !finished;
              return (
                <li key={s} className="flex items-center gap-3 text-sm">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full ${ok ? "bg-success/15 text-success" : cur ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"}`}>
                    {ok ? <CheckCircle2 className="h-4 w-4" /> : cur ? <Loader2 className="h-4 w-4 animate-spin" /> : i + 1}
                  </span>
                  <span className={ok ? "" : cur ? "font-medium" : "text-muted-foreground"}>{s}</span>
                </li>
              );
            })}
          </ul>

          {finished && (
            <div className="mt-6 rounded-md border border-success/30 bg-success/10 p-4 text-sm">
              <div className="font-medium text-success">Conta ativada</div>
              <p className="mt-1 text-muted-foreground">Você já pode acessar o sistema.</p>
              <Link to="/dashboard" className="mt-3 inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow">
                Entrar no painel
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
