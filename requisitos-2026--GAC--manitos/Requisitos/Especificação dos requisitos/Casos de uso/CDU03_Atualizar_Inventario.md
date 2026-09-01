# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Atualizar Inventário**

---

# 2. Objetivo

Permitir que usuários autorizados atualizem informações dos ativos controlados pelo CCT, como status, localização, estado de conservação, acessórios vinculados e disponibilidade para retirada.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Concreto | Caso de uso instanciado diretamente por ator primário. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Atendente do CCT | Atualiza dados operacionais dos ativos. |
| Coordenação do CCT | Atualiza ou acompanha dados patrimoniais e gerenciais. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Valida, salva e registra alterações. |
| Sistema Patrimonial Institucional | Pode fornecer ou receber dados patrimoniais quando integrado. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O ativo deve estar cadastrado no Sistema GAC. |
| PRE02 | O usuário deve possuir permissão para alterar dados de inventário. |
| PRE03 | O motivo da atualização deve ser informado quando houver alteração de status. |
| PRE04 | O inventário deve estar disponível para consulta e gravação. |

---

# 6. Fluxo Principal

## P1. Acessar atualização de inventário

### P1.1.
O Atendente do CCT seleciona a opção **Atualizar Inventário**.

### P1.2.
O sistema apresenta a tela de consulta de ativos.

## P2. Localizar ativo

### P2.1.
O Atendente do CCT pesquisa o ativo por patrimônio, QR Code, NFC, tipo ou localização.

### P2.2.
O sistema apresenta os dados atuais do ativo. **[E1]**

## P3. Alterar dados do ativo

### P3.1.
O Atendente do CCT altera status, localização, acessórios vinculados ou estado físico.

### P3.2.
O Atendente do CCT informa justificativa quando a alteração modifica disponibilidade ou condição do ativo.

## P4. Validar atualização

### P4.1.
O sistema valida os dados alterados. **[E2]**

### P4.2.
O sistema verifica compatibilidade entre status, responsável e localização.

## P5. Gravar atualização

### P5.1.
O sistema salva a atualização.

### P5.2.
O sistema registra histórico de alteração com data, hora e responsável.

## P6. Exibir confirmação

### P6.1.
O sistema apresenta a mensagem **MSG008 - Inventário atualizado com sucesso**.

### P6.2.
O caso de uso é encerrado.


---

# 7. Fluxos Alternativos

## A1. Atualização automática após retirada

### A1.1.
No passo **P1.1**, o caso de uso é iniciado pelo sistema após a retirada de ativo.

### A1.2.
O sistema altera o status do ativo para **Em Uso**.

### A1.3.
O sistema vincula o ativo ao professor responsável e ao local de utilização.

### A1.4.
O fluxo segue para o passo **P5.2**.


## A2. Atualização automática após devolução

### A2.1.
No passo **P1.1**, o caso de uso é iniciado pelo sistema após registro de devolução.

### A2.2.
O sistema altera o status do ativo para **Disponível**, **Com Pendência** ou **Em Manutenção**.

### A2.3.
O fluxo segue para o passo **P5.2**.


## A3. Ativo encaminhado para manutenção

### A3.1.
No passo **P3.1**, o Atendente do CCT informa que o ativo apresenta defeito.

### A3.2.
O sistema altera o status para **Em Manutenção**.

### A3.3.
O sistema remove o ativo da lista de disponíveis para retirada.

### A3.4.
O fluxo segue para o passo **P5.1**.


---

# 8. Fluxos de Exceção

## E1. Ativo não encontrado

### E1.1.
No passo **P2.2**, o sistema não localiza ativo com os critérios informados.

### E1.2.
O sistema apresenta a mensagem **MSG009 - Ativo não encontrado**.

### E1.3.
O fluxo retorna ao passo **P2.1**.


## E2. Alteração inválida de status

### E2.1.
No passo **P4.1**, o sistema identifica alteração incompatível com a situação atual do ativo.

### E2.2.
O sistema apresenta a mensagem **MSG010 - Status incompatível com a situação atual do ativo**.

### E2.3.
O fluxo retorna ao passo **P3.1**.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | O inventário fica atualizado. |
| POS02 | O histórico da alteração fica registrado. |
| POS03 | O status do ativo passa a refletir sua condição real. |
| POS04 | Ativos indisponíveis deixam de aparecer para retirada. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A consulta ao inventário deve responder em até 3 segundos na maior parte das operações. |
| RNF02 | Toda alteração de inventário deve ser auditável. |
| RNF03 | O sistema deve evitar inconsistência entre status, localização e responsável. |
| RNF04 | A interface deve permitir busca por patrimônio, QR Code, NFC, tipo e localização. |

---

# 11. Ponto de Extensão

Não se aplica.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilização diária pelo atendimento e pela coordenação |
| Informações mais acessadas | Patrimônio, status, localização, responsável e acessórios |

---

# 13. Interface Visual

## IV1. Tela de atualização de inventário

Tela usada para consulta e edição dos dados de ativos.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Patrimônio | Texto/QR/NFC | Sim | Código do ativo | Deve localizar ativo cadastrado |
| Tipo de ativo | Lista | Sim | Projetor, cabo, adaptador, fonte ou chave | Deve pertencer ao catálogo |
| Status | Lista | Sim | Situação atual | Disponível, Em Uso, Em Manutenção ou Com Pendência |
| Localização | Texto/Lista | Sim | Local atual do ativo | Deve ser atualizada em movimentações |
| Acessórios vinculados | Lista | Não | Acessórios associados ao ativo | Deve manter rastreabilidade |
| Justificativa | Texto | Condicional | Motivo da alteração | Obrigatória para status crítico |
| Botão “Salvar” | Botão | Sim | Confirma atualização | Habilitado após validação |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | A atualização automática pode ocorrer a partir de retirada, devolução, checklist ou ocorrência. |
| OBS02 | Integração com sistema patrimonial institucional pode ser detalhada em artefato técnico posterior. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU04 - Retirar Ativo |
| REF05 | CDU06 - Registrar Devolução |

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
