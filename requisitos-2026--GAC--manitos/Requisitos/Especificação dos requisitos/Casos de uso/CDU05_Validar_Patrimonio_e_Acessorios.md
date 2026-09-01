# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Validar Patrimônio e Acessórios**

---

# 2. Objetivo

Permitir que o Atendente do CCT ou o Sistema GAC valide o patrimônio do ativo e seus acessórios, garantindo que o item físico corresponda ao registro do inventário antes da retirada ou durante a conferência.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Concreto reutilizável | Pode ser iniciado diretamente ou reutilizado por outros casos de uso. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Atendente do CCT | Realiza a conferência física do patrimônio e acessórios. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Consulta e compara os dados do ativo. |
| Professor | Pode acompanhar a validação quando a ação ocorre durante retirada. |
| Leitor QR/NFC | Apoia a leitura do identificador patrimonial. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O ativo deve estar fisicamente disponível para conferência. |
| PRE02 | O ativo deve possuir identificação patrimonial cadastrada. |
| PRE03 | Os acessórios vinculados devem estar registrados no sistema. |
| PRE04 | O usuário deve possuir permissão para validar patrimônio ou acessórios. |

---

# 6. Fluxo Principal

## P1. Acessar validação

### P1.1.
O Atendente do CCT seleciona a opção **Validar Patrimônio e Acessórios**.

### P1.2.
O sistema solicita leitura do QR Code, NFC ou inserção manual do patrimônio.

## P2. Identificar patrimônio

### P2.1.
O Atendente do CCT informa ou escaneia o identificador do ativo.

### P2.2.
O sistema consulta o registro do ativo no inventário. **[E1]**

## P3. Apresentar dados esperados

### P3.1.
O sistema apresenta tipo, patrimônio, status, localização e acessórios esperados.

### P3.2.
O sistema destaca os acessórios obrigatórios.

## P4. Conferir item físico

### P4.1.
O Atendente do CCT confere o ativo físico e seus acessórios.

### P4.2.
O Atendente do CCT confirma que o patrimônio e os acessórios estão corretos. **[A1] [A2] [E2]**

## P5. Registrar validação

### P5.1.
O sistema registra a validação com data, hora, responsável e resultado.

### P5.2.
O sistema apresenta a mensagem **MSG015 - Patrimônio e acessórios validados**.

### P5.3.
O caso de uso é encerrado ou retorna ao caso de uso chamador.


---

# 7. Fluxos Alternativos

## A1. Validação manual sem QR Code ou NFC

### A1.1.
No passo **P2.1**, o Atendente do CCT informa que a leitura automática não está disponível.

### A1.2.
O sistema habilita campo para digitação manual do patrimônio.

### A1.3.
O Atendente do CCT informa o código patrimonial.

### A1.4.
O fluxo segue para o passo **P2.2**.


## A2. Acessório substituído por equivalente

### A2.1.
No passo **P4.2**, o Atendente do CCT identifica que um acessório foi substituído por outro equivalente.

### A2.2.
O sistema solicita justificativa.

### A2.3.
O Atendente do CCT informa a justificativa.

### A2.4.
O sistema registra a alteração.

### A2.5.
O fluxo segue para o passo **P5.1**.


---

# 8. Fluxos de Exceção

## E1. Patrimônio não encontrado

### E1.1.
No passo **P2.2**, o sistema não encontra o patrimônio informado.

### E1.2.
O sistema apresenta a mensagem **MSG016 - Patrimônio não encontrado no inventário**.

### E1.3.
O fluxo retorna ao passo **P1.2**.


## E2. Acessório divergente, ausente ou danificado

### E2.1.
No passo **P4.2**, o Atendente do CCT identifica acessório ausente, divergente ou danificado.

### E2.2.
O sistema apresenta a mensagem **MSG017 - Acessório ausente, divergente ou danificado**.

### E2.3.
O sistema inclui o caso de uso **CDU08 - Registrar Ocorrência**.

### E2.4.
O caso de uso é encerrado.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | O patrimônio fica confirmado como válido. |
| POS02 | Os acessórios ficam confirmados ou a divergência é registrada. |
| POS03 | A validação fica vinculada à retirada, devolução ou conferência correspondente. |
| POS04 | A operação fica registrada para auditoria. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A leitura por QR Code ou NFC deve responder em até 3 segundos na maior parte das operações. |
| RNF02 | A validação deve funcionar também por entrada manual. |
| RNF03 | O sistema deve manter histórico de validações. |
| RNF04 | A tela deve destacar claramente itens obrigatórios e divergentes. |

---

# 11. Ponto de Extensão

## PE1. Registrar Ocorrência

Permite registrar ocorrência quando houver divergência, dano ou ausência de acessório.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilizado em retiradas, devoluções e conferências |
| Informações mais acessadas | Patrimônio, status, acessórios e localização |

---

# 13. Interface Visual

## IV1. Tela de validação patrimonial

Tela usada para conferir patrimônio e acessórios vinculados.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Patrimônio | QR/NFC/Texto | Sim | Identificação do ativo | Deve existir no inventário |
| Tipo do ativo | Texto | Sim | Categoria do ativo | Obtido automaticamente |
| Status | Texto | Sim | Situação atual | Obtido automaticamente |
| Acessórios esperados | Lista | Sim | Itens que devem acompanhar o ativo | Devem ser conferidos |
| Resultado da conferência | Lista | Sim | Conforme, divergente, ausente ou danificado | Obrigatório |
| Justificativa | Texto | Condicional | Motivo da divergência | Obrigatória quando houver inconsistência |
| Botão “Confirmar Validação” | Botão | Sim | Registra conferência | Habilitado após checklist mínimo |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | A validação pode ser acionada por retirada, devolução ou auditoria. |
| OBS02 | A leitura NFC pode ser substituída por digitação manual quando necessário. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU04 - Retirar Ativo |
| REF05 | CDU08 - Registrar Ocorrência |

---

# 16. Checklist de Validação do Artefato (CDU)

## 16.1 Estrutura mínima

- [x] Nome do caso de uso iniciado com verbo no infinitivo.
- [x] Objetivo claro, direto e com foco em um objetivo principal.
- [x] Tipo do caso de uso informado.
- [x] Atores primário e secundários identificados corretamente.
- [x] Precondições registradas.
- [x] Fluxo principal completo e coerente com o objetivo.
- [x] Fluxos alternativos e de exceção definidos quando necessários.
- [x] Pós-condições registradas.
- [x] Requisitos não funcionais específicos registrados.
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
- [x] Referências para visão da demanda, glossário e RNF estão atualizadas.

## 16.4 Revisão final

- [x] Não há contradições entre seções do artefato.
- [x] Links internos e externos foram validados quando aplicável.
- [x] Documento pronto para revisão por pares.
- [x] Artefato pronto para uso em desenvolvimento e testes.
