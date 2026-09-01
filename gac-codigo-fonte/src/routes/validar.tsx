import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { AppShell, StatusBadge } from "@/components/AppShell";
import { ASSETS } from "@/lib/gac-data";
import { ScanLine, CheckCircle2, XCircle, QrCode, Nfc, Loader2 } from "lucide-react";

const search = z.object({
  pat: z.string().optional(),
  next: z.enum(["termo"]).optional(),
});

export const Route = createFileRoute("/validar")({
  head: () => ({ meta: [{ title: "Validar projetor — GAC" }] }),
  validateSearch: search,
  component: Validar,
});

function Validar() {
  const { pat, next } = Route.useSearch();
  const [code, setCode] = useState("");
  const [result, setResult] = useState<null | "ok" | "fail">(null);
  const [scanning, setScanning] = useState<null | "qr" | "nfc">(null);
  const ativo = ASSETS.find((a) => a.patrimonio === code.trim());

  const simulate = (mode: "qr" | "nfc") => {
    setScanning(mode);
    setResult(null);
    setTimeout(() => {
      setCode(pat || "PAT-100231");
      setScanning(null);
    }, 1200);
  };

  return (
    <AppShell title="Validar Projetor e Acessórios">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border bg-card p-6">
          <div className="flex flex-col items-center gap-4 rounded-md border border-dashed bg-muted/30 p-6 text-center">
            <div className="relative flex h-44 w-44 items-center justify-center rounded-lg border-2 border-primary/40 bg-background">
              {scanning === "qr" && (
                <>
                  <QrCode className="h-20 w-20 text-primary/70" />
                  <div className="absolute inset-x-2 top-2 h-0.5 animate-[scan_1.2s_linear_infinite] bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
                </>
              )}
              {scanning === "nfc" && <Nfc className="h-20 w-20 animate-pulse text-primary" />}
              {!scanning && <ScanLine className="h-16 w-16 text-muted-foreground" />}
              <span className="absolute -bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-primary" />
              <span className="absolute -bottom-2 right-2 h-3 w-3 border-b-2 border-r-2 border-primary" />
              <span className="absolute -top-2 left-2 h-3 w-3 border-l-2 border-t-2 border-primary" />
              <span className="absolute -top-2 right-2 h-3 w-3 border-r-2 border-t-2 border-primary" />
            </div>
            <div className="text-sm font-medium">
              {scanning === "qr" && "Lendo QR Code…"}
              {scanning === "nfc" && "Aproxime o cartão / etiqueta NFC…"}
              {!scanning && "Escolha um método de leitura"}
            </div>
            <div className="flex w-full gap-2">
              <button onClick={() => simulate("qr")} disabled={!!scanning} className="flex-1 inline-flex items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground hover:bg-primary-glow disabled:opacity-50">
                {scanning === "qr" ? <Loader2 className="h-4 w-4 animate-spin" /> : <QrCode className="h-4 w-4" />} Escanear QR
              </button>
              <button onClick={() => simulate("nfc")} disabled={!!scanning} className="flex-1 inline-flex items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium hover:bg-accent disabled:opacity-50">
                {scanning === "nfc" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Nfc className="h-4 w-4" />} Ler NFC
              </button>
            </div>
            <div className="w-full pt-2">
              <div className="mb-1 text-xs text-muted-foreground">ou digite o projetor</div>
              <input value={code} onChange={(e) => { setCode(e.target.value); setResult(null); }} placeholder="PAT-100231" className="w-full rounded-md border bg-background px-3 py-2 text-center font-mono text-sm" />
            </div>
          </div>
          {code && !ativo && !scanning && <p className="mt-3 text-sm text-destructive">Projetor não localizado.</p>}
        </section>

        <section className="rounded-lg border bg-card p-6">
          {!ativo && <p className="text-sm text-muted-foreground">Aguardando identificação do projetor…</p>}
          {ativo && (
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">Esperado</div>
                  <div className="text-base font-semibold">{ativo.modelo}</div>
                  <div className="text-xs text-muted-foreground">{ativo.patrimonio} · {ativo.localizacao}</div>
                </div>
                <StatusBadge status={ativo.status} />
              </div>

              <div>
                <div className="mb-2 text-xs font-semibold uppercase text-muted-foreground">Acessórios obrigatórios</div>
                <ul className="space-y-2 rounded-md border bg-muted/20 p-3 text-sm">
                  {ativo.acessorios.map((ac) => (
                    <li key={ac} className="flex items-center gap-2">
                      <input type="checkbox" defaultChecked /> {ac}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-2 pt-2">
                <button onClick={() => setResult("ok")} className="flex-1 rounded-md bg-success px-4 py-2 text-sm font-medium text-success-foreground hover:opacity-90">Confirmar conformidade</button>
                <button onClick={() => setResult("fail")} className="flex-1 rounded-md border px-4 py-2 text-sm hover:bg-accent">Reportar divergência</button>
              </div>

              {result === "ok" && (
                <div className="space-y-3 rounded-md border border-success/30 bg-success/10 p-3 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 text-success" /> Projetor e acessórios validados.
                  </div>
                  {next === "termo" && (
                    <Link to="/termo" className="inline-block rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary-glow">Assinar termo de responsabilidade</Link>
                  )}
                </div>
              )}
              {result === "fail" && (
                <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm">
                  <XCircle className="mt-0.5 h-4 w-4 text-destructive" /> Divergência registrada — gerando ocorrência.
                </div>
              )}
            </div>
          )}
        </section>
      </div>
      <style>{`@keyframes scan { 0%{top:8px} 50%{top:calc(100% - 12px)} 100%{top:8px} }`}</style>
    </AppShell>
  );
}
