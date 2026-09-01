# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 1.0 | Criação da especificação do caso de uso no padrão do template de CDU | Grupo Manitos |

---
# 1. Nome do Caso de Uso

**Assinar Termo de Responsabilidade**

---

# 2. Objetivo

Permitir que o Professor aceite eletronicamente o termo de responsabilidade antes da retirada de um ativo, registrando ciência sobre o uso, guarda, devolução e integridade do item e de seus acessórios.

---

# 3. Tipo de Caso de Uso

| Item | Valor |
|---|---|
| Tipo do Caso de Uso | Abstrato |
| Justificativa | Caso incluído pelo CDU04 - Retirar Ativo |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
|---|---|
| Professor | Lê e aceita eletronicamente o termo de responsabilidade |

## 4.2 Secundário

| Ator | Descrição |
|---|---|
| Sistema GAC | Gera, apresenta, registra e armazena o termo aceito |
| Sistema de Autenticação Institucional | Confirma a identidade do Professor quando aplicável |

---

# 5. Precondições

| Código | Descrição |
|---|---|
| PRE01 | O caso de uso deve ter sido instanciado por outro caso de uso |
| PRE02 | O Professor deve estar identificado no Sistema GAC |
| PRE03 | O ativo e seus acessórios devem estar vinculados à retirada |
| PRE04 | O termo de responsabilidade deve estar disponível para apresentação |

---

# 6. Fluxo Principal

## P1. Gerar termo

### P1.1.
O sistema recebe os dados da retirada em andamento.

### P1.2.
O sistema gera o termo de responsabilidade com Professor, ativo, patrimônio, acessórios, local de utilização, data e hora.

---

## P2. Apresentar termo

### P2.1.
O sistema apresenta o termo de responsabilidade ao Professor.

### P2.2.
O sistema apresenta a opção de aceite eletrônico.

---

## P3. Confirmar aceite

### P3.1.
O Professor lê o termo apresentado.

### P3.2.
O Professor marca a opção de ciência e aceite. **[E1]**

### P3.3.
O Professor confirma o aceite eletrônico.

---

## P4. Registrar assinatura

### P4.1.
O sistema registra o aceite com data, hora, identificação do Professor e dados da retirada.

### P4.2.
O sistema armazena o termo aceito.

### P4.3.
O sistema retorna ao caso de uso chamador.

---

# 7. Fluxos Alternativos

## A1. Termo apresentado em dispositivo de atendimento

### A1.1.
No passo **P2.1**, o sistema identifica que o aceite será feito em totem, tablet ou computador do atendimento.

### A1.2.
O sistema apresenta o termo em formato adaptado ao dispositivo.

### A1.3.
O fluxo segue para o passo **P3.1**.

## A2. Professor solicita visualização do resumo

### A2.1.
No passo **P2.1**, o Professor seleciona a opção de resumo do termo.

### A2.2.
O sistema apresenta os principais pontos de responsabilidade.

### A2.3.
O fluxo retorna ao passo **P2.1**.

---

# 8. Fluxos de Exceção

## E1. Termo não aceito

### E1.1.
No passo **P3.2**, o Professor não marca a opção de aceite.

### E1.2.
O sistema apresenta a mensagem **MSG026 - O aceite do termo de responsabilidade é obrigatório para concluir a retirada**.

### E1.3.
O sistema retorna ao caso de uso chamador sem autorização para concluir a retirada.

## E2. Falha ao armazenar termo

### E2.1.
No passo **P4.2**, o sistema não consegue armazenar o termo aceito.

### E2.2.
O sistema apresenta a mensagem **MSG027 - Não foi possível registrar o termo de responsabilidade**.

### E2.3.
O caso de uso é interrompido.

---

# 9. Pós-condições

| Código | Descrição |
|---|---|
| POS01 | O termo fica aceito eletronicamente pelo Professor |
| POS02 | O termo fica vinculado à retirada do ativo |
| POS03 | A retirada pode prosseguir após aceite válido |
| POS04 | O registro fica disponível para auditoria |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
|---|---|
| RNF01 | O termo deve ser armazenado de forma segura |
| RNF02 | O sistema deve registrar data e hora do aceite com precisão mínima de segundos |
| RNF03 | O termo deve ser legível em desktop, tablet ou totem |
| RNF04 | O aceite deve ser rastreável por Professor, ativo e retirada |

---

# 11. Ponto de Extensão

Não se aplica.

---

# 12. Frequência de Utilização

| Item | Informação |
|---|---|
| Frequência | Alta |
| Perfil de Uso | Utilizado em toda retirada que exige termo |
| Informações mais acessadas | Professor, ativo, patrimônio, acessórios, data e hora |

---

# 13. Interface Visual

## IV1. Tela de aceite do termo

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
|---|---|---|---|---|
| Professor | Texto | Sim | Nome e matrícula do responsável | Obtido automaticamente |
| Ativo | Texto | Sim | Descrição do ativo retirado | Obtido da retirada |
| Patrimônio | Texto | Sim | Número patrimonial | Deve estar vinculado ao ativo |
| Acessórios | Lista | Não | Itens vinculados à retirada | Devem constar no termo |
| Termo | Texto/RichText | Sim | Conteúdo do termo | Deve ser exibido antes do aceite |
| Aceite | Checkbox | Sim | Confirmação eletrônica | Obrigatório para concluir |
| Botão “Aceitar Termo” | Botão | Sim | Registra aceite | Habilitado após marcação do aceite |

---

# 14. Observações

| Código | Observação |
|---|---|
| OBS01 | O texto do termo poderá ser parametrizado pela Coordenação do CCT |
| OBS02 | O termo poderá ser exportado ou exibido como comprovante eletrônico |

---

# 15. Referências

| Código | Referência |
|---|---|
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | CDU04 - Retirar Ativo |
---

# 16. Checklist de Validação do Artefato (CDU)

## 16.1 Estrutura mínima

- [x] Nome do caso de uso iniciado com verbo no infinitivo.
- [x] Objetivo claro, direto e com foco em um objetivo principal.
- [x] Tipo do caso de uso informado.
- [x] Atores primário e secundários identificados corretamente.
- [x] Precondições registradas.
- [x] Fluxo principal completo e coerente com o objetivo.
- [x] Fluxos alternativos e de exceção definidos.
- [x] Pós-condições registradas.
- [x] Requisitos não funcionais registrados.
- [x] Pontos de extensão identificados quando aplicável.
- [x] Frequência de utilização estimada.

## 16.2 Qualidade da especificação

- [x] Passos escritos com linguagem simples e objetiva.
- [x] Ações descritas com verbos no presente do indicativo.
- [x] Alternância entre ação do ator e ação da solução está clara.
- [x] Não há ambiguidade relevante.
- [x] Regras de negócio e mensagens estão referenciadas quando necessário.

## 16.3 Consistência e rastreabilidade

- [x] Pontos de entrada e saída dos fluxos alternativos estão explícitos.
- [x] Fluxos de exceção estão vinculados aos passos corretos da solução.
- [x] Referências internas entre passos estão corretas.
- [x] Interface visual está coerente com o fluxo descrito.
- [x] Referências para visão da demanda, glossário e CDUs relacionados estão atualizadas.

## 16.4 Revisão final

- [x] Não há contradições entre seções do artefato.
- [x] Links internos e externos foram validados quando aplicável.
- [x] Documento pronto para revisão por pares.
- [x] Artefato pronto para uso em desenvolvimento e testes.
