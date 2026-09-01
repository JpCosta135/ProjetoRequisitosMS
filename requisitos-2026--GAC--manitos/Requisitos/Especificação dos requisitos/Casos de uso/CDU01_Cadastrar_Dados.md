# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Cadastrar Dados**

---

# 2. Objetivo

Permitir que professores e usuários autorizados cadastrem ou atualizem dados necessários para operar o Sistema GAC, incluindo identificação, contato institucional e informações básicas para uso nos fluxos de retirada, devolução e auditoria.

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
| Professor | Cadastra ou atualiza seus dados básicos para utilizar o sistema. |
| Atendente do CCT | Cadastra dados operacionais quando autorizado. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Coordenação do CCT | Pode validar dados administrativos e perfis de acesso. |
| Sistema GAC | Valida e armazena os dados informados. |
| Sistema de Autenticação Institucional | Apoia a validação do vínculo institucional. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O usuário deve acessar a opção de cadastro. |
| PRE02 | O perfil a ser cadastrado deve estar definido. |
| PRE03 | Os dados mínimos exigidos devem estar disponíveis. |
| PRE04 | O sistema deve estar disponível para gravação dos dados. |

---

# 6. Fluxo Principal

## P1. Acessar cadastro

### P1.1.
O Professor seleciona a opção **Cadastrar Dados**.

### P1.2.
O sistema apresenta o formulário de cadastro.

## P2. Informar dados cadastrais

### P2.1.
O Professor informa nome, matrícula, setor, e-mail institucional e contato.

### P2.2.
O Professor revisa as informações preenchidas.

## P3. Confirmar cadastro

### P3.1.
O Professor seleciona a opção **Salvar**.

### P3.2.
O sistema verifica os campos obrigatórios. **[E1]**

## P4. Validar e ativar conta

### P4.1.
O sistema inclui o caso de uso **CDU02 - Validar Dados e Ativar Conta**. **[E2]**

## P5. Armazenar dados

### P5.1.
O sistema armazena os dados cadastrados.

### P5.2.
O sistema registra a operação no histórico de alterações.

## P6. Exibir confirmação

### P6.1.
O sistema apresenta a mensagem **MSG005 - Dados cadastrados com sucesso**.

### P6.2.
O caso de uso é encerrado.


---

# 7. Fluxos Alternativos

## A1. Atendente cadastra dados de usuário

### A1.1.
No passo **P1.1**, o Atendente do CCT seleciona a opção **Cadastrar Dados**.

### A1.2.
O sistema apresenta o formulário administrativo.

### A1.3.
O Atendente do CCT informa os dados do usuário.

### A1.4.
O fluxo segue para o passo **P3.1**.


## A2. Usuário atualiza dados existentes

### A2.1.
No passo **P1.2**, o sistema identifica que já existem dados cadastrados.

### A2.2.
O sistema apresenta os dados atuais preenchidos.

### A2.3.
O usuário altera as informações permitidas.

### A2.4.
O fluxo segue para o passo **P3.1**.


---

# 8. Fluxos de Exceção

## E1. Campos obrigatórios não preenchidos

### E1.1.
No passo **P3.2**, o sistema identifica ausência de campo obrigatório.

### E1.2.
O sistema apresenta a mensagem **MSG006 - Preencha todos os campos obrigatórios**.

### E1.3.
O fluxo retorna ao passo **P2.1**.


## E2. Dados duplicados ou inválidos

### E2.1.
No passo **P4.1**, o sistema identifica matrícula ou e-mail já cadastrado, ou dados incompatíveis com o perfil.

### E2.2.
O sistema apresenta a mensagem **MSG007 - Dados inválidos ou já cadastrados no sistema**.

### E2.3.
O fluxo retorna ao passo **P2.1**.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | Os dados ficam cadastrados ou atualizados. |
| POS02 | A conta fica ativa ou pendente de validação. |
| POS03 | O cadastro fica disponível para uso nos fluxos de retirada e devolução. |
| POS04 | A operação fica registrada em histórico para auditoria. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | O formulário deve utilizar linguagem simples e objetiva. |
| RNF02 | Os dados pessoais devem ser protegidos contra acesso indevido. |
| RNF03 | A validação dos dados deve ocorrer em até 3 segundos na maior parte das operações. |
| RNF04 | O sistema deve impedir duplicidade de matrícula e e-mail institucional. |

---

# 11. Ponto de Extensão

Não se aplica.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Média |
| Perfil de Uso | Usado no primeiro acesso ou em atualização cadastral |
| Informações mais acessadas | Nome, matrícula, setor, contato e perfil |

---

# 13. Interface Visual

## IV1. Formulário de cadastro de dados

Tela usada para cadastro e atualização de dados básicos do usuário.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Nome completo | Texto | Sim | Nome do usuário | Não aceitar campo vazio |
| Matrícula | Texto (20) | Sim | Identificação institucional | Deve ser única |
| Setor | Lista/Texto | Sim | Unidade ou setor de vínculo | Deve ser informado |
| E-mail institucional | E-mail | Sim | Contato institucional | Deve ser único |
| Telefone/Contato | Texto | Não | Canal de contato | Validar tamanho máximo |
| Perfil | Lista | Sim | Professor, Atendente ou Coordenação | Deve ser compatível com o usuário |
| Botão “Salvar” | Botão | Sim | Confirma cadastro | Habilitado após preenchimento mínimo |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | O cadastro de professores pode ser integrado ao sistema institucional. |
| OBS02 | A alteração de perfil administrativo pode exigir aprovação da Coordenação do CCT. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU01 - Validar Dados e Ativar Conta |

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
