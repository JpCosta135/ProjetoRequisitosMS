import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";
import { FileSignature, CheckCircle2 } from "lucide-react";
import { CURRENT_USER } from "@/lib/gac-data";

export const Route = createFileRoute("/termo")({
  head: () => ({ meta: [{ title: "Termo de responsabilidade — GAC" }] }),
  component: Termo,
});

function Termo() {
  const [aceito, setAceito] = useState(false);
  const [assinado, setAssinado] = useState(false);

  return (
    <AppShell title="Assinar Termo de Responsabilidade">
      <div className="mx-auto max-w-3xl rounded-lg border bg-card p-6">
        <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
          <FileSignature className="h-4 w-4 text-primary" /> Termo de Responsabilidade
        </div>

        <div className="max-h-80 overflow-y-auto rounded-md border bg-muted/20 p-4 text-sm leading-relaxed">
          <p>Eu, <strong>{CURRENT_USER.nome}</strong> (matrícula {CURRENT_USER.matricula}), declaro estar ciente dos seguintes deveres na retirada de projetores do CCT:</p>
          <ol className="mt-3 list-decimal space-y-2 pl-5">
            <li>Utilizar o equipamento exclusivamente para fins acadêmicos no local informado;</li>
            <li>Zelar pela integridade física do projetor e de seus acessórios;</li>
            <li>Devolver o projetor no prazo previsto, em condições íntegras;</li>
            <li>Comunicar imediatamente qualquer dano, falha, perda ou divergência;</li>
            <li>Responder por eventuais danos causados por uso indevido ou negligência.</li>
          </ol>
          <p className="mt-3 text-xs text-muted-foreground">Data e hora do aceite: {new Date().toLocaleString("pt-BR")}</p>
        </div>

        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" checked={aceito} onChange={(e) => setAceito(e.target.checked)} />
          Li e concordo com os termos acima
        </label>

        <div className="mt-5 flex justify-end gap-2">
          <button disabled={!aceito} onClick={() => setAssinado(true)} className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50">
            Confirmar aceite eletrônico
          </button>
        </div>

        {assinado && (
          <div className="mt-4 flex items-start gap-2 rounded-md border border-success/30 bg-success/10 p-3 text-sm">
            <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" />
            Aceite registrado — {CURRENT_USER.nome} · {new Date().toLocaleString("pt-BR")}
          </div>
        )}
      </div>
    </AppShell>
  );
}
