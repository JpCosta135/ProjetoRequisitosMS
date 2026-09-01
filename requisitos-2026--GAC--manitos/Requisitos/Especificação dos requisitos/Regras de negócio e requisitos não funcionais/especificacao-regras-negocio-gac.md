# Especificação de Regras de Negócio

## Contexto

Este documento apresenta as regras de negócio do **Sistema GAC — Gestão de Ativos do CCT**, com base no documento de visão, na elicitação registrada e nos requisitos do projeto.

O sistema tem como objetivo substituir o controle atual por formulários físicos e Google Planilhas por uma solução digital para controlar ativos utilizados em salas e atividades do CCT, incluindo inventário, empréstimos, devoluções, assinatura de termo de responsabilidade, checklist de acessórios, permutas, ocorrências, manutenção, relatórios, dashboard e autenticação.

## Histórico de Versões

<!-- markdownlint-disable MD060 -->

| Data       | Versão | Descrição                                                                 | Autor         |
| ---------- | ------ | ------------------------------------------------------------------------- | ------------- |
| 30/05/2026 | 1.0    | Criação da especificação de regras de negócio do Sistema GAC.             | Grupo Manitos |

<!-- markdownlint-enable MD060 -->

## Regras de Negócio

### RN1. Empréstimo exige vínculo completo

* **Identificador:** RN1
* **Regra:** O empréstimo de ativo somente pode ser registrado quando houver vínculo com professor, ativo, sala, bloco, turno, data e horário.
* **Critério verificável:** O sistema deve impedir a conclusão do empréstimo quando qualquer uma dessas informações obrigatórias estiver ausente.
* **Origem:** RF04 Registrar empréstimo; F2.1 Retirada de ativo; Documento de Visão.

### RN2. Professor deve aceitar termo de responsabilidade

* **Identificador:** RN2
* **Regra:** O ativo somente pode ser liberado após o professor aceitar digitalmente o termo de responsabilidade.
* **Critério verificável:** O sistema deve bloquear a liberação do ativo enquanto o termo digital não possuir aceite registrado.
* **Origem:** RF06 Gerar termo digital; F2.2 Assinatura digital do termo de responsabilidade; F2.3 Liberação do ativo.

### RN3. Termo digital registra aceite identificável

* **Identificador:** RN3
* **Regra:** O termo digital deve registrar a identificação do professor, o ativo retirado, os acessórios vinculados, a data, a hora e o aceite eletrônico.
* **Critério verificável:** Após o aceite, o sistema deve manter essas informações associadas ao empréstimo para consulta e auditoria.
* **Origem:** RN07 do documento inicial; RF06 Gerar termo digital; proposta de valor de segurança.

### RN4. Ativo deve ser validado antes da liberação

* **Identificador:** RN4
* **Regra:** O patrimônio e os acessórios do ativo devem ser validados antes da liberação ao professor.
* **Critério verificável:** O sistema deve exigir leitura por QR Code/NFC ou seleção validada do patrimônio e dos acessórios antes de permitir a saída do ativo.
* **Origem:** RF03 Gerar QR Code/NFC; RF05 Validar patrimônio; F1.2 Identificação por QR Code ou NFC.

### RN5. Ativo indisponível não pode ser emprestado

* **Identificador:** RN5
* **Regra:** Ativos com status indisponível, em manutenção, emprestado ou reservado não podem ser liberados para novo empréstimo.
* **Critério verificável:** O sistema deve bloquear nova retirada quando o status do ativo não for "disponível".
* **Origem:** F1.3 Consulta de disponibilidade; RF02 Editar ativos; RF15 Registrar manutenção.

### RN6. Devolução exige checklist de acessórios

* **Identificador:** RN6
* **Regra:** A devolução somente pode ser concluída após a execução do checklist de acessórios e estado físico.
* **Critério verificável:** O sistema deve impedir a baixa da devolução enquanto o checklist obrigatório não estiver preenchido.
* **Origem:** RF07 Registrar devolução; RF08 Executar checklist; RN03 do documento inicial.

### RN7. Devolução incompleta deve ser bloqueada

* **Identificador:** RN7
* **Regra:** O sistema deve bloquear a conclusão da devolução quando houver acessório obrigatório ausente, divergente ou danificado.
* **Critério verificável:** Ao detectar pendência no checklist, o sistema deve registrar a pendência e impedir o fechamento normal da devolução.
* **Origem:** F3.2 Bloqueio de devolução incompleta; resultados da elicitação sobre conferência de acessórios.

### RN8. Cabo HDMI deve manter numeração conferida

* **Identificador:** RN8
* **Regra:** A numeração do cabo HDMI devolvido deve corresponder à numeração registrada na retirada.
* **Critério verificável:** O sistema deve sinalizar divergência quando o número do cabo HDMI informado na devolução for diferente do número registrado na retirada.
* **Origem:** RN04 do documento inicial; principais descobertas sobre numeração de acessórios.

### RN9. Devolução deve ocorrer até o fim do turno

* **Identificador:** RN9
* **Regra:** A devolução do ativo deve ser registrada até o encerramento do turno letivo informado no empréstimo.
* **Critério verificável:** O sistema deve indicar atraso quando a devolução for registrada após o horário limite do turno.
* **Origem:** RN02 do documento inicial; resultados da elicitação sobre devolução até o fim do turno.

### RN10. Permuta deve ser formalmente registrada

* **Identificador:** RN10
* **Regra:** Toda troca de equipamento entre salas ou entre professores deve ser registrada como permuta.
* **Critério verificável:** O sistema deve atualizar o responsável, a sala e o histórico do ativo quando uma permuta for registrada.
* **Origem:** RF10 Registrar permuta; F4.1 Registro de permutação; risco de permutação identificado na elicitação.

### RN11. Ocorrência deve registrar motivo e responsável

* **Identificador:** RN11
* **Regra:** Toda ocorrência deve registrar o tipo de problema, a descrição, o ativo relacionado, a data, a hora e o usuário responsável pelo registro.
* **Critério verificável:** O sistema deve impedir o salvamento da ocorrência sem essas informações mínimas.
* **Origem:** RF09 Registrar ocorrência; F4.2 Registro de ocorrência.

### RN12. Ativo com defeito deve ficar indisponível

* **Identificador:** RN12
* **Regra:** Ativos marcados com defeito devem ficar indisponíveis para novos empréstimos até a liberação após manutenção.
* **Critério verificável:** Ao registrar defeito, o sistema deve alterar o status do ativo para "em manutenção" ou "indisponível" e impedir nova retirada.
* **Origem:** RF15 Registrar manutenção; F4.3 Módulo de manutenção; RN05 do documento inicial.

### RN13. Manutenção deve atualizar inventário

* **Identificador:** RN13
* **Regra:** O registro de manutenção deve atualizar o inventário para refletir a indisponibilidade ou o retorno do ativo ao uso.
* **Critério verificável:** Ao abrir ou encerrar manutenção, o sistema deve atualizar automaticamente o status do ativo no inventário.
* **Origem:** Diagrama de caso de uso; módulo de manutenção; F4.3 Módulo de manutenção.

### RN14. Chaves originais e reservas devem ser controladas separadamente

* **Identificador:** RN14
* **Regra:** Chaves originais e chaves reservas devem possuir identificação e histórico de retirada/devolução separados.
* **Critério verificável:** O sistema deve permitir distinguir a chave original da chave reserva e manter registros independentes de movimentação.
* **Origem:** RF11 Controlar chaves; resultados da elicitação sobre chaves originais e reservas.

### RN15. Patrimônio deve ser único

* **Identificador:** RN15
* **Regra:** Não pode existir mais de um ativo ativo com o mesmo código patrimonial, QR Code ou identificador NFC.
* **Critério verificável:** O sistema deve bloquear o cadastro ou edição quando detectar duplicidade de identificação patrimonial ativa.
* **Origem:** RF01 Cadastrar ativos; RF03 Gerar QR Code/NFC; RNF07 Integridade.

### RN16. Perfis definem permissões de acesso

* **Identificador:** RN16
* **Regra:** As funcionalidades do sistema devem ser acessadas conforme o perfil do usuário: professor, atendente, coordenação ou equipe técnica.
* **Critério verificável:** O sistema deve negar acesso a funcionalidades incompatíveis com o perfil autenticado.
* **Origem:** RF14 Gerenciar usuários; F6.2 Controle de perfis; RNF04 Segurança.

### RN17. Operações críticas devem ser auditadas

* **Identificador:** RN17
* **Regra:** Operações críticas devem registrar trilha de auditoria com usuário, data, hora, ação executada e dados alterados.
* **Critério verificável:** Inclusões, alterações, devoluções, permutas, ocorrências, manutenções e alterações de status devem gerar registro de auditoria consultável.
* **Origem:** RF13 Gerar relatórios; F5.3 Histórico de alterações; RNF05 Auditoria.

### RN18. Coordenação pode consultar histórico gerencial

* **Identificador:** RN18
* **Regra:** A coordenação do CCT deve poder consultar histórico de empréstimos, devoluções, atrasos, ocorrências e manutenções.
* **Critério verificável:** Usuários com perfil de coordenação devem conseguir filtrar e exportar relatórios gerenciais desses registros.
* **Origem:** RF12 Consultar dashboard; RF13 Gerar relatórios; F5.1 Dashboard de localização; F5.2 Relatórios de auditoria e uso.

### RN19. Dados do professor devem ser suficientes para responsabilização

* **Identificador:** RN19
* **Regra:** O cadastro do professor deve conter dados básicos suficientes para identificação e responsabilização pelo ativo retirado.
* **Critério verificável:** O sistema deve exigir, no mínimo, nome, matrícula ou identificador institucional, setor e contato institucional antes de vincular o professor a uma retirada.
* **Origem:** F1.4 Cadastrar dados do professor; personas e proposta de valor de segurança.

### RN20. Histórico de alterações não deve ser apagado

* **Identificador:** RN20
* **Regra:** O histórico de alterações de ativos, empréstimos e devoluções deve ser preservado para auditoria.
* **Critério verificável:** O sistema deve manter registros históricos mesmo após atualização de status, encerramento de empréstimo ou correção administrativa.
* **Origem:** F5.3 Histórico de alterações; RNF05 Auditoria; RNF07 Integridade.

## Mapeamento para Requisitos e Funcionalidades

| Funcionalidade/Requisito | Regras relacionadas |
| ------------------------ | ------------------- |
| F1.1 Cadastro de ativos / RF01 | RN15 |
| F1.2 Identificação por QR Code ou NFC / RF03 | RN4, RN15 |
| F1.3 Consulta de disponibilidade | RN5 |
| F1.4 Cadastrar dados do professor | RN19 |
| F2.1 Retirada de ativo / RF04 | RN1, RN2, RN4, RN5 |
| F2.2 Assinatura digital do termo / RF06 | RN2, RN3 |
| F2.3 Liberação do ativo | RN2, RN4, RN5 |
| F3.1 Registro de devolução e checklist / RF07, RF08 | RN6, RN8, RN9 |
| F3.2 Bloqueio de devolução incompleta | RN7 |
| F4.1 Registro de permutação / RF10 | RN10 |
| F4.2 Registro de ocorrência / RF09 | RN11 |
| F4.3 Módulo de manutenção / RF15 | RN12, RN13 |
| F5.1 Dashboard de localização / RF12 | RN18 |
| F5.2 Relatórios de auditoria e uso / RF13 | RN17, RN18 |
| F5.3 Histórico de alterações | RN17, RN20 |
| F6.1 Autenticação de usuários | RN16 |
| F6.2 Controle de perfis / RF14 | RN16 |
| F6.3 Tempo de resposta das consultas | RN18 |

## Checklist de Validação da Regra de Negócio

Use este checklist antes de finalizar as regras.

### 1. Estrutura mínima

* [x] Identificador único e padronizado.
* [x] Nome da regra no formato sujeito + verbo + objeto.
* [x] Descrição clara, direta e sem ambiguidades.

### 2. Qualidade da regra

* [x] Cada regra descreve apenas uma decisão ou comportamento principal.
* [x] Condições de aplicação estão explícitas.
* [x] Resultado esperado da regra está explícito.
* [x] As regras são verificáveis e testáveis.

### 3. Consistência e rastreabilidade

* [x] Não há conflito evidente com outras regras já existentes.
* [x] As regras referenciam origem quando aplicável.
* [x] As regras estão alinhadas com visão, requisitos funcionais, RNF e casos de uso.

### 4. Prontidão

* [ ] Conteúdo revisado por pares.
* [ ] Regra pronta para uso em análise, desenvolvimento e testes.
