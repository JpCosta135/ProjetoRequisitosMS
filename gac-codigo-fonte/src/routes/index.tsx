import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ArrowRight, LogIn, UserPlus } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sistema GAC — Gestão de Projetores do CCT" },
      { name: "description", content: "Plataforma para retirada, devolução e auditoria de projetores do CCT." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/40">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        <div className="grid w-full gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Protótipo navegável · Grupo Manitos
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-tight md:text-5xl">
              Sistema GAC
              <span className="block text-primary">Gestão de Projetores do CCT</span>
            </h1>
            <p className="mt-4 max-w-md text-muted-foreground">
              Retirada, devolução, permutação e auditoria de equipamentos com
              rastreabilidade ponta a ponta — para professores, atendentes e
              coordenação do CCT.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/login"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary-glow"
              >
                <LogIn className="h-4 w-4" />
                Fazer login
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/cadastro"
                className="inline-flex items-center gap-2 rounded-md border border-input bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
              >
                <UserPlus className="h-4 w-4" />
                Cadastrar usuário
              </Link>
            </div>
          </div>
          <div className="grid gap-4">
            {[
              { t: "Retirar projetor", d: "QR Code, NFC ou seleção manual com termo digital." },
              { t: "Devolver com checklist", d: "Conferência guiada de equipamento e acessórios." },
              { t: "Permutação rastreada", d: "Troca de responsável ou local sem perder histórico." },
              { t: "Ocorrências", d: "Registro de danos, atrasos, extravios e divergências." },
            ].map((f) => (
              <div key={f.t} className="rounded-lg border bg-card p-5 shadow-sm">
                <div className="text-sm font-semibold">{f.t}</div>
                <div className="mt-1 text-sm text-muted-foreground">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
