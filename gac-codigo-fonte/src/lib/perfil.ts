import { useEffect, useState } from "react";

export type Perfil = "Professor" | "Atendente" | "Coordenador";

const KEY = "gac:perfil";
const EVT = "gac:perfil-change";

export function getPerfil(): Perfil {
  if (typeof window === "undefined") return "Professor";
  const v = window.localStorage.getItem(KEY) as Perfil | null;
  return v ?? "Professor";
}

export function setPerfil(p: Perfil) {
  window.localStorage.setItem(KEY, p);
  window.dispatchEvent(new CustomEvent(EVT));
}

export function usePerfil(): [Perfil, (p: Perfil) => void] {
  const [perfil, setState] = useState<Perfil>("Professor");
  useEffect(() => {
    setState(getPerfil());
    const h = () => setState(getPerfil());
    window.addEventListener(EVT, h);
    window.addEventListener("storage", h);
    return () => {
      window.removeEventListener(EVT, h);
      window.removeEventListener("storage", h);
    };
  }, []);
  return [perfil, setPerfil];
}
