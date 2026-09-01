// Mock data for GAC prototype

export type AssetStatus = "Disponível" | "Em uso" | "Manutenção" | "Indisponível";

export interface Asset {
  id: string;
  patrimonio: string;
  tipo: string;
  modelo: string;
  status: AssetStatus;
  localizacao: string;
  acessorios: string[];
  estado: "Ótimo" | "Bom" | "Regular" | "Ruim";
}

export interface Withdrawal {
  id: string;
  assetId: string;
  patrimonio: string;
  tipo: string;
  professor: string;
  matricula: string;
  sala: string;
  bloco: string;
  turno: string;
  retiradaEm: string;
  prevDevolucao: string;
  status: "Ativa" | "Devolvida" | "Atrasada";
}

export interface Occurrence {
  id: string;
  tipo: string;
  ativo: string;
  descricao: string;
  responsavel: string;
  criadaEm: string;
  status: "Aberta" | "Em análise" | "Resolvida";
}

export const ASSETS: Asset[] = [
  { id: "a1", patrimonio: "PAT-100231", tipo: "Projetor", modelo: "Epson PowerLite X49", status: "Disponível", localizacao: "Armário CCT-01", acessorios: ["Cabo HDMI", "Cabo VGA", "Fonte", "Controle remoto"], estado: "Ótimo" },
  { id: "a2", patrimonio: "PAT-100232", tipo: "Projetor", modelo: "Epson PowerLite S41+", status: "Em uso", localizacao: "Sala B-204", acessorios: ["Cabo HDMI", "Fonte", "Controle remoto"], estado: "Bom" },
  { id: "a3", patrimonio: "PAT-100233", tipo: "Projetor", modelo: "BenQ MS550", status: "Disponível", localizacao: "Armário CCT-02", acessorios: ["Cabo HDMI", "Fonte"], estado: "Bom" },
  { id: "a4", patrimonio: "PAT-100234", tipo: "Projetor", modelo: "BenQ MX808ST", status: "Manutenção", localizacao: "Laboratório CCT", acessorios: ["Cabo HDMI", "Fonte", "Controle remoto"], estado: "Regular" },
  { id: "a5", patrimonio: "PAT-100235", tipo: "Projetor", modelo: "Epson PowerLite E20", status: "Disponível", localizacao: "Armário CCT-01", acessorios: ["Cabo HDMI", "Cabo VGA", "Fonte", "Controle remoto"], estado: "Ótimo" },
  { id: "a6", patrimonio: "PAT-100236", tipo: "Projetor", modelo: "ViewSonic PA503S", status: "Disponível", localizacao: "Armário CCT-03", acessorios: ["Cabo HDMI", "Fonte", "Controle remoto"], estado: "Bom" },
  { id: "a7", patrimonio: "PAT-100237", tipo: "Projetor", modelo: "Epson PowerLite X05", status: "Disponível", localizacao: "Armário CCT-02", acessorios: ["Cabo HDMI", "Fonte"], estado: "Bom" },
  { id: "a8", patrimonio: "PAT-100240", tipo: "Projetor", modelo: "BenQ MW535", status: "Em uso", localizacao: "Sala A-103", acessorios: ["Cabo HDMI", "Fonte", "Controle remoto"], estado: "Bom" },
];

export const WITHDRAWALS: Withdrawal[] = [
  { id: "w1", assetId: "a2", patrimonio: "PAT-100232", tipo: "Projetor", professor: "Ana Costa", matricula: "PROF-2031", sala: "B-204", bloco: "B", turno: "Noite", retiradaEm: "2026-06-10 18:42", prevDevolucao: "2026-06-10 22:30", status: "Ativa" },
  { id: "w2", assetId: "a8", patrimonio: "PAT-100240", tipo: "Projetor", professor: "Carlos Lima", matricula: "PROF-1187", sala: "A-103", bloco: "A", turno: "Tarde", retiradaEm: "2026-06-09 14:10", prevDevolucao: "2026-06-09 18:00", status: "Atrasada" },
];

export const OCCURRENCES: Occurrence[] = [
  { id: "o1", tipo: "Atraso", ativo: "PAT-100240", descricao: "Devolução do projetor não realizada no prazo.", responsavel: "Carlos Lima", criadaEm: "2026-06-09 19:00", status: "Em análise" },
  { id: "o2", tipo: "Falta de acessório", ativo: "PAT-100232", descricao: "Controle remoto do projetor não devolvido.", responsavel: "Ana Costa", criadaEm: "2026-06-08 22:15", status: "Aberta" },
];

export const CURRENT_USER = {
  nome: "Profa. Marina Souza",
  matricula: "PROF-2104",
  perfil: "Professor",
  email: "marina.souza@inst.edu.br",
  setor: "Departamento de Computação",
};
