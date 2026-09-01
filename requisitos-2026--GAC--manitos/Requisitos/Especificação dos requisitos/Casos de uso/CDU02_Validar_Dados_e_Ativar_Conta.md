# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Validar Dados e Ativar Conta**

---

# 2. Objetivo

Permitir que o Sistema GAC valide os dados cadastrais informados e ative a conta somente quando as informações obrigatórias estiverem corretas, consistentes e compatíveis com o perfil de acesso solicitado.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Abstrato | Caso de uso incluído por outros fluxos, principalmente pelo CDU02 - Cadastrar Dados. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Executa a validação dos dados, verifica duplicidade e ativa ou pendencia a conta. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Professor | Usuário que tem seus dados validados para acesso ao sistema. |
| Atendente do CCT | Usuário administrativo que pode ter conta validada. |
| Coordenação do CCT | Usuário gestor que pode aprovar perfis administrativos. |
| Sistema de Autenticação Institucional | Apoia a verificação de vínculo e identidade institucional. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O caso de uso deve ter sido instanciado por outro caso de uso. |
| PRE02 | Os dados mínimos do usuário devem ter sido preenchidos. |
| PRE03 | O tipo de usuário deve estar informado. |
| PRE04 | O perfil de acesso solicitado deve estar disponível no Sistema GAC. |

---

# 6. Fluxo Principal

## P1. Receber dados cadastrais

### P1.1.
O sistema recebe os dados informados no cadastro do usuário.

### P1.2.
O sistema identifica o tipo de usuário: Professor, Atendente do CCT ou Coordenação do CCT.

## P2. Validar campos obrigatórios

### P2.1.
O sistema verifica se os campos obrigatórios foram preenchidos.

### P2.2.
O sistema valida nome, matrícula, e-mail institucional, setor e perfil de acesso. **[E1]**

## P3. Verificar duplicidade

### P3.1.
O sistema verifica se já existe conta cadastrada com a mesma matrícula ou e-mail institucional. **[E2]**

## P4. Verificar compatibilidade do perfil

### P4.1.
O sistema verifica se o perfil solicitado é compatível com o tipo de usuário. **[E3]**

## P5. Ativar conta

### P5.1.
O sistema registra a conta como validada.

### P5.2.
O sistema ativa a conta do usuário.

### P5.3.
O sistema registra data, hora e origem da validação.

## P6. Exibir confirmação

### P6.1.
O sistema apresenta a mensagem **MSG001 - Conta validada e ativada com sucesso**.

### P6.2.
O sistema retorna ao caso de uso chamador.


---

# 7. Fluxos Alternativos

## A1. Conta exige aprovação administrativa

### A1.1.
No passo **P4.1**, o sistema identifica que o perfil solicitado exige aprovação da Coordenação do CCT.

### A1.2.
O sistema registra a conta com status **Pendente de Aprovação**.

### A1.3.
O sistema notifica a Coordenação do CCT.

### A1.4.
O fluxo segue para o passo **P6.2**.


## A2. Conta de professor validada por vínculo institucional

### A2.1.
No passo **P4.1**, o sistema identifica que o usuário é Professor.

### A2.2.
O sistema consulta o vínculo institucional.

### A2.3.
O sistema confirma a elegibilidade do professor.

### A2.4.
O fluxo segue para o passo **P5.1**.


---

# 8. Fluxos de Exceção

## E1. Campos obrigatórios ausentes ou inválidos

### E1.1.
No passo **P2.2**, o sistema identifica campo obrigatório não preenchido ou em formato inválido.

### E1.2.
O sistema apresenta a mensagem **MSG002 - Preencha corretamente os dados obrigatórios**.

### E1.3.
O sistema retorna ao caso de uso chamador para correção dos dados.


## E2. Conta já cadastrada

### E2.1.
No passo **P3.1**, o sistema identifica matrícula ou e-mail já cadastrado.

### E2.2.
O sistema apresenta a mensagem **MSG003 - Já existe uma conta cadastrada com estes dados**.

### E2.3.
O caso de uso é encerrado.


## E3. Perfil incompatível

### E3.1.
No passo **P4.1**, o sistema identifica perfil incompatível com o tipo de usuário.

### E3.2.
O sistema apresenta a mensagem **MSG004 - Perfil de acesso incompatível com o tipo de usuário**.

### E3.3.
O sistema retorna ao caso de uso chamador.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | A conta fica ativa quando os dados são válidos. |
| POS02 | A conta fica pendente quando exige aprovação administrativa. |
| POS03 | A tentativa de validação fica registrada para auditoria. |
| POS04 | A conta validada fica disponível para autenticação no Sistema GAC. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A validação cadastral deve responder em até 3 segundos na maior parte das operações. |
| RNF02 | O sistema deve proteger os dados pessoais cadastrados contra acesso não autorizado. |
| RNF03 | O sistema deve registrar trilha de auditoria com data, hora e origem da validação. |
| RNF04 | A ativação de conta deve respeitar controle de perfil e permissão. |

---

# 11. Ponto de Extensão

Não se aplica.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilizado sempre que um usuário é cadastrado ou tem seus dados atualizados |
| Informações mais acessadas | Matrícula, e-mail institucional, perfil e status da conta |

---

# 13. Interface Visual

## IV1. Tela de validação e ativação de conta

Tela usada para validar dados cadastrais e indicar o status da conta.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Nome | Texto | Sim | Nome completo do usuário | Deve conter valor válido |
| Matrícula | Texto (20) | Sim | Identificação institucional | Deve ser única |
| E-mail institucional | E-mail | Sim | Contato institucional | Deve ser único |
| Perfil de acesso | Lista | Sim | Perfil solicitado | Deve ser compatível com o tipo de usuário |
| Status da conta | Lista | Sim | Situação da conta | Ativa, pendente ou rejeitada |
| Botão “Validar” | Botão | Sim | Executa validação | Habilitado após preenchimento mínimo |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | A aprovação administrativa poderá ser parametrizada por perfil. |
| OBS02 | A integração com autenticação institucional pode ser detalhada em artefato técnico posterior. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |

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
