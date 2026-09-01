# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Retirar Ativo**

---

# 2. Objetivo

Permitir que o Professor retire um ativo do CCT, registrando eletronicamente a movimentação do item, os acessórios vinculados, o local de utilização e o aceite digital do termo de responsabilidade.

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
| Professor | Solicita ou confirma a retirada do ativo e aceita o termo de responsabilidade. |
| Atendente do CCT | Pode registrar a retirada em nome do Professor quando necessário. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Registra a retirada, gera termo e atualiza o inventário. |
| Sistema de Autenticação Institucional | Valida a identidade do usuário. |
| Leitor QR/NFC | Apoia a identificação do patrimônio. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O Professor deve possuir dados cadastrados no Sistema GAC. |
| PRE02 | O ativo deve estar cadastrado no inventário. |
| PRE03 | O ativo deve possuir status **Disponível**. |
| PRE04 | O Professor deve informar sala, bloco, turno ou local de utilização. |
| PRE05 | O ativo deve possuir patrimônio identificável por QR Code, NFC ou digitação manual. |

---

# 6. Fluxo Principal

## P1. Acessar funcionalidade de retirada

### P1.1.
O Professor seleciona a opção **Retirar Ativo**.

### P1.2.
O sistema apresenta a tela de retirada de ativos.

## P2. Informar local e tipo de ativo

### P2.1.
O Professor informa sala, bloco, turno e tipo de ativo desejado.

### P2.2.
O sistema consulta ativos disponíveis para o tipo informado. **[E1]**

## P3. Selecionar ativo

### P3.1.
O Professor seleciona o ativo disponível.

### P3.2.
O sistema apresenta os dados do ativo, status e acessórios vinculados.

## P4. Validar patrimônio e acessórios

### P4.1.
O sistema inclui o caso de uso **CDU05 - Validar Patrimônio e Acessórios**. **[E2]**

## P5. Assinar termo de responsabilidade

### P5.1.
O sistema inclui o caso de uso CDU06 - Assinar Termo de Responsabilidade. **[E3]**

### P5.2.
O Professor realiza o aceite digital do termo. **[E3]**

## P6. Registrar retirada

### P6.1.
O sistema registra professor responsável, ativo retirado, sala, bloco, turno, data, hora e acessórios vinculados.

### P6.2.
O sistema armazena o termo de responsabilidade aceito.

## P7. Atualizar inventário

### P7.1.
O sistema inclui o caso de uso **CDU03 - Atualizar Inventário**.

## P8. Finalizar retirada

### P8.1.
O sistema apresenta a mensagem **MSG011 - Ativo retirado com sucesso**.

### P8.2.
O sistema disponibiliza comprovante eletrônico da retirada.

### P8.3.
O caso de uso é encerrado.


---

# 7. Fluxos Alternativos

## A1. Atendente registra retirada em nome do Professor

### A1.1.
No passo **P1.1**, o Atendente do CCT seleciona a opção **Retirar Ativo**.

### A1.2.
O Atendente do CCT localiza o cadastro do Professor.

### A1.3.
O sistema apresenta os dados do Professor.

### A1.4.
O Atendente do CCT informa os dados da retirada.

### A1.5.
O fluxo segue para o passo **P2.2**.


## A2. Professor precisa atualizar dados

### A2.1.
No passo **P2.1**, o sistema identifica dados cadastrais desatualizados.

### A2.2.
O sistema solicita atualização cadastral.

### A2.3.
O sistema inclui o caso de uso **CDU02 - Cadastrar Dados**.

### A2.4.
O fluxo retorna ao passo **P2.1**.


## A3. Identificação manual do ativo

### A3.1.
No passo **P3.1**, a leitura de QR Code ou NFC não está disponível.

### A3.2.
O Professor ou Atendente do CCT informa manualmente o número patrimonial.

### A3.3.
O fluxo segue para o passo **P3.2**.


---

# 8. Fluxos de Exceção

## E1. Nenhum ativo disponível

### E1.1.
No passo **P2.2**, o sistema não encontra ativo disponível.

### E1.2.
O sistema apresenta a mensagem **MSG012 - Não há ativo disponível para retirada**.

### E1.3.
O caso de uso é encerrado.


## E2. Patrimônio ou acessórios inválidos

### E2.1.
No passo **P4.1**, o sistema identifica divergência na validação do patrimônio ou dos acessórios.

### E2.2.
O sistema apresenta a mensagem **MSG013 - Patrimônio ou acessórios divergentes**.

### E2.3.
O fluxo retorna ao passo **P3.1**.


## E3. Termo não aceito

### E3.1.
No passo **P5.2**, o Professor não aceita o termo de responsabilidade.

### E3.2.
O sistema apresenta a mensagem **MSG014 - A retirada depende do aceite do termo de responsabilidade**.

### E3.3.
O caso de uso é encerrado sem registrar a retirada.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | A retirada fica registrada no Sistema GAC. |
| POS02 | O ativo fica vinculado ao Professor responsável. |
| POS03 | O inventário é atualizado para status **Em Uso**. |
| POS04 | O termo de responsabilidade fica armazenado. |
| POS05 | O local de utilização do ativo fica registrado. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A leitura QR Code/NFC deve responder em até 3 segundos na maior parte das operações. |
| RNF02 | O sistema deve registrar data e hora com precisão mínima de segundos. |
| RNF03 | O sistema deve manter rastreabilidade entre Professor, ativo, local, data, horário e acessórios. |
| RNF04 | O termo eletrônico deve ser armazenado de forma segura. |
| RNF05 | A tela de retirada deve funcionar em desktop, tablet ou totem. |

---

# 11. Ponto de Extensão

## PE1. Registrar Devolução

Permite registrar a devolução do ativo previamente retirado por meio do **CDU06 - Registrar Devolução**.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilização diária por professores e atendentes |
| Informações mais acessadas | Patrimônio, disponibilidade, sala, professor e acessórios |

---

# 13. Interface Visual

## IV1. Tela de retirada de ativos

Tela utilizada para registrar a retirada e o aceite do termo de responsabilidade.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Matrícula do Professor | Texto | Sim | Identificação do professor | Deve possuir cadastro ativo |
| Nome do Professor | Texto | Sim | Nome completo | Obtido automaticamente |
| Data/Hora da Retirada | Data/Hora | Sim | Momento da retirada | Gerado automaticamente |
| Patrimônio | QR/NFC/Texto | Sim | Identificação do ativo | Deve localizar ativo disponível |
| Tipo do Ativo | Lista | Sim | Projetor, cabo, adaptador, fonte ou chave | Deve pertencer ao catálogo |
| Bloco | Lista | Sim | Bloco do local de uso | Deve existir cadastro válido |
| Sala/Local | Lista/Texto | Sim | Local de utilização | Obrigatório para retirada |
| Acessórios | Checkbox | Não | Itens vinculados à retirada | Devem ser rastreados |
| Termo de Responsabilidade | Texto/RichText | Sim | Termo eletrônico | Deve ser exibido ao usuário |
| Aceite do Termo | Checkbox | Sim | Confirmação eletrônica | Obrigatório |
| Botão “Confirmar Retirada” | Botão | Sim | Finaliza a operação | Habilitado após aceite |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | A retirada pode ser feita em autoatendimento ou com apoio do atendente. |
| OBS02 | O sistema poderá permitir reserva antecipada de ativos em versão futura. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU03 - Atualizar Inventário |
| REF05 | CDU05 - Validar Patrimônio e Acessórios |

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
