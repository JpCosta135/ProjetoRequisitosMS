# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 1.0 | Criação da especificação do caso de uso no padrão do template de CDU | Grupo Manitos |

---
# 1. Nome do Caso de Uso

**Registrar Permutação**

---

# 2. Objetivo

Permitir que o Professor registre a troca de responsabilidade ou de local de uso de um ativo já retirado, mantendo a rastreabilidade da movimentação e a identificação do novo responsável ou destino.

---

# 3. Tipo de Caso de Uso

| Item | Valor |
|---|---|
| Tipo do Caso de Uso | Concreto |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
|---|---|
| Professor | Solicita ou confirma a permutação do ativo |

## 4.2 Secundário

| Ator | Descrição |
|---|---|
| Atendente do CCT | Pode apoiar ou validar a permutação quando necessário |
| Sistema GAC | Registra a permutação e atualiza o histórico do ativo |
| Coordenação do CCT | Pode consultar ou auditar permutações realizadas |

---

# 5. Precondições

| Código | Descrição |
|---|---|
| PRE01 | O ativo deve possuir retirada ativa |
| PRE02 | O Professor deve estar vinculado ao ativo ou informado na permutação |
| PRE03 | O novo responsável ou novo local de uso deve ser informado |
| PRE04 | O ativo não deve estar com pendência bloqueante |

---

# 6. Fluxo Principal

## P1. Acessar permutação

### P1.1.
O Professor seleciona a opção **Registrar Permutação**.

### P1.2.
O sistema apresenta a tela de permutação de ativos.

---

## P2. Identificar ativo

### P2.1.
O Professor informa ou escaneia o patrimônio do ativo.

### P2.2.
O sistema localiza a retirada ativa vinculada ao ativo. **[E1]**

---

## P3. Informar dados da permutação

### P3.1.
O Professor informa o novo responsável ou novo local de utilização.

### P3.2.
O Professor informa a justificativa da permutação.

---

## P4. Validar permutação

### P4.1.
O sistema valida se a permutação é permitida para o ativo e para os usuários envolvidos. **[E2]**

### P4.2.
O sistema apresenta os dados para conferência.

---

## P5. Confirmar permutação

### P5.1.
O Professor confirma a permutação.

### P5.2.
O sistema registra a permutação com data, hora, responsável anterior, novo responsável ou novo local.

---

## P6. Atualizar histórico

### P6.1.
O sistema atualiza o histórico do ativo.

### P6.2.
O sistema apresenta a mensagem **MSG028 - Permutação registrada com sucesso**.

### P6.3.
O caso de uso é encerrado.

---

# 7. Fluxos Alternativos

## A1. Atendente registra permutação

### A1.1.
No passo **P1.1**, o Atendente do CCT seleciona a opção **Registrar Permutação**.

### A1.2.
O Atendente do CCT informa o Professor responsável e o ativo.

### A1.3.
O fluxo segue para o passo **P2.2**.

## A2. Permutação apenas de local de uso

### A2.1.
No passo **P3.1**, o Professor informa somente o novo local de utilização.

### A2.2.
O sistema mantém o mesmo responsável pelo ativo.

### A2.3.
O fluxo segue para o passo **P4.1**.

---

# 8. Fluxos de Exceção

## E1. Retirada ativa não encontrada

### E1.1.
No passo **P2.2**, o sistema não encontra retirada ativa para o ativo.

### E1.2.
O sistema apresenta a mensagem **MSG029 - Não existe retirada ativa para o ativo informado**.

### E1.3.
O caso de uso é encerrado.

## E2. Permutação não permitida

### E2.1.
No passo **P4.1**, o sistema identifica pendência, restrição ou ausência de permissão.

### E2.2.
O sistema apresenta a mensagem **MSG030 - Permutação não permitida para este ativo**.

### E2.3.
O fluxo retorna ao passo **P3.1**.

---

# 9. Pós-condições

| Código | Descrição |
|---|---|
| POS01 | A permutação fica registrada |
| POS02 | O histórico do ativo é atualizado |
| POS03 | O novo responsável ou novo local fica vinculado à movimentação |
| POS04 | A Coordenação do CCT pode consultar a permutação |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
|---|---|
| RNF01 | A permutação deve ser rastreável |
| RNF02 | O sistema deve registrar data, hora e usuários envolvidos |
| RNF03 | O sistema deve impedir permutação de ativo com pendência bloqueante |
| RNF04 | A consulta do ativo deve responder em até 3 segundos na maior parte das operações |

---

# 11. Ponto de Extensão

Não se aplica.

---

# 12. Frequência de Utilização

| Item | Informação |
|---|---|
| Frequência | Baixa a média |
| Perfil de Uso | Usado quando há troca de local ou responsabilidade durante o período de uso |
| Informações mais acessadas | Patrimônio, responsável anterior, novo responsável, local e justificativa |

---

# 13. Interface Visual

## IV1. Tela de registro de permutação

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
|---|---|---|---|---|
| Patrimônio | QR/NFC/Texto | Sim | Identificação do ativo | Deve possuir retirada ativa |
| Responsável atual | Texto | Sim | Professor vinculado à retirada | Obtido automaticamente |
| Novo responsável | Texto/Busca | Condicional | Novo responsável pelo ativo | Obrigatório quando houver troca de responsável |
| Novo local | Lista/Texto | Condicional | Novo local de utilização | Obrigatório quando houver troca de local |
| Justificativa | Texto longo | Sim | Motivo da permutação | Deve ser informado |
| Botão “Confirmar Permutação” | Botão | Sim | Finaliza operação | Habilitado após validação |

---

# 14. Observações

| Código | Observação |
|---|---|
| OBS01 | A permutação não encerra a retirada, apenas atualiza responsabilidade ou local |
| OBS02 | Permutações podem ser auditadas pela Coordenação do CCT |

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
