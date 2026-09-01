# Especificação de Requisitos Não Funcionais

 

> Documento preenchido para o **Sistema GAC — Gestão de Ativos do CCT**. Os requisitos abaixo descrevem atributos de qualidade e restrições da solução, com critérios objetivos e verificáveis, alinhados ao documento de visão, à elicitação e aos requisitos funcionais do projeto.

## Histórico de Versões

<!-- markdownlint-disable MD060 -->

| Data       | Versão | Descrição                                                             | Autor         |
| ---------- | ------ | --------------------------------------------------------------------- | ------------- |
| 30/05/2026 | 1.0    | Criação da especificação de requisitos não funcionais do Sistema GAC. | Grupo Manitos |

<!-- markdownlint-enable MD060 -->

## 1. Requisitos de Produto

Especificam o comportamento da solução.

### 1.1. Eficiência de Desempenho

Capacidade da solução operar no tempo, rendimento e recursos definidos.

#### 1.1.1. Comportamento temporal

**RNF01 — Tempo de resposta das consultas principais**

O sistema deve responder às consultas principais de ativo, professor e empréstimo em até **3 segundos** para pelo menos **95% das requisições** em condições normais de uso no balcão de atendimento do CCT.

**Critério verificável:** executar testes de consulta com massa de dados representativa e medir o tempo de resposta.

#### 1.1.2. Capacidade

**RNF02 — Capacidade de uso simultâneo**

O sistema deve suportar pelo menos **20 usuários simultâneos**, considerando professores, atendentes, coordenação e equipe técnica acessando funcionalidades de consulta, retirada, devolução e relatório.

**Critério verificável:** executar teste de carga com 20 sessões simultâneas sem indisponibilidade ou erro crítico.

#### 1.1.3. Uso de recursos

**RNF03 — Uso controlado de recursos**

O sistema deve operar em ambiente institucional ou servidor de aplicação sem ultrapassar **80% de uso médio de CPU e memória** em cenário de uso normal.

**Critério verificável:** monitorar CPU e memória durante teste de carga com usuários simultâneos.

### 1.2. Flexibilidade (portabilidade)

Capacidade da solução adaptar-se a mudanças em seus requisitos, contextos de uso e ambientes.

#### 1.2.1. Escalabilidade

**RNF04 — Escalabilidade do inventário**

A solução deve permitir aumento da quantidade de ativos cadastrados sem reescrita da aplicação, suportando crescimento do inventário além dos projetores, cabos, adaptadores, fontes e chaves inicialmente previstos.

**Critério verificável:** cadastrar novos tipos de ativos sem alteração estrutural no código principal.

#### 1.2.2. Adaptabilidade

**RNF05 — Funcionamento em navegadores modernos**

O sistema deve funcionar em navegadores web modernos, como Chrome, Edge e Firefox, sem exigir instalação local nos computadores dos professores, atendentes ou coordenação.

**Critério verificável:** validar os fluxos principais nos navegadores definidos.

#### 1.2.3. Instalabilidade

**RNF06 — Instalação documentada**

A solução deve possuir procedimento documentado de instalação ou publicação em ambiente de homologação e produção.

**Critério verificável:** um integrante da equipe deve conseguir preparar o ambiente seguindo a documentação sem orientação adicional.

#### 1.2.4. Substituibilidade

**RNF07 — Substituição do controle atual**

A solução deve substituir os formulários físicos e Google Planilhas nos fluxos principais de retirada, devolução, checklist, permuta e relatório, mantendo os dados necessários para consulta e auditoria.

**Critério verificável:** verificar que os dados antes registrados manualmente possuem campo equivalente no sistema.

### 1.3. Confiabilidade

Capacidade da solução de manter o desempenho sob condições específicas.

#### 1.3.1. Maturidade

**RNF08 — Operação sem falhas nos fluxos principais**

O sistema deve permitir a execução dos fluxos de cadastro de ativo, retirada, aceite de termo, devolução, checklist e ocorrência sem erro crítico em testes funcionais de homologação.

**Critério verificável:** todos os cenários principais devem ser executados com sucesso antes da entrega.

#### 1.3.2. Disponibilidade

**RNF09 — Disponibilidade nos turnos de atendimento**

O sistema deve estar disponível durante os turnos de atendimento do CCT, exceto em períodos de manutenção programada comunicados previamente.

**Critério verificável:** monitorar disponibilidade durante o horário de atendimento definido pelo CCT.

#### 1.3.3. Tolerância a falhas

**RNF10 — Preservação de dados durante falha de operação**

Se ocorrer falha temporária durante cadastro, retirada, devolução ou checklist, o sistema deve evitar perda dos dados já confirmados e permitir retomar ou refazer a operação sem corromper o histórico.

**Critério verificável:** simular interrupção e verificar se registros já gravados permanecem consistentes.

#### 1.3.4. Recuperabilidade

**RNF11 — Recuperação após falha crítica**

Após falha crítica, o sistema deve permitir restauração do serviço e dos dados a partir de cópia de segurança ou mecanismo equivalente definido pela equipe técnica.

**Critério verificável:** realizar teste de restauração em ambiente de homologação.

### 1.4. Segurança

Capacidade da solução para proteger as informações e garantir operações seguras.

#### 1.4.1. Confidencialidade

**RNF12 — Acesso restrito a dados administrativos**

Dados de professores, ativos, empréstimos, devoluções, ocorrências e relatórios devem ser acessíveis apenas a usuários autenticados e autorizados conforme o perfil.

**Critério verificável:** usuário sem permissão não deve conseguir acessar telas ou dados restritos.

#### 1.4.2. Integridade

**RNF13 — Proteção contra inconsistência patrimonial**

O sistema deve impedir duplicidade inconsistente de patrimônio, QR Code ou NFC para ativos ativos.

**Critério verificável:** tentar cadastrar ou editar dois ativos ativos com o mesmo identificador e verificar bloqueio.

#### 1.4.3. Não repúdio

**RNF14 — Registro de aceite e ações críticas**

O sistema deve registrar evidências de ações críticas, como aceite do termo, retirada, devolução, permuta, ocorrência e manutenção, para impedir negação posterior da ação.

**Critério verificável:** consultar trilha com usuário, data, hora e ação executada.

#### 1.4.4. Autenticidade (autenticação)

**RNF15 — Autenticação de usuários**

O sistema deve exigir autenticação individual para acesso a funcionalidades administrativas e de movimentação de ativos.

**Critério verificável:** usuário não autenticado não deve acessar funcionalidades de cadastro, retirada, devolução, manutenção, relatório ou gestão de usuários.

#### 1.4.5. Resistência

**RNF16 — Proteção contra acesso indevido**

O sistema deve proteger funcionalidades administrativas contra acesso indevido, aplicando validação de sessão e permissão a cada operação crítica.

**Critério verificável:** requisições diretas a rotas administrativas sem sessão ou sem perfil autorizado devem ser negadas.

### 1.5. Privacidade

#### 1.5.1. Licitude

**RNF17 — Tratamento de dados pessoais com finalidade institucional**

O tratamento de dados pessoais de professores deve estar vinculado à finalidade operacional de retirada, devolução e responsabilização por ativos do CCT.

**Critério verificável:** documentação do sistema deve indicar a finalidade dos dados pessoais coletados.

#### 1.5.2. Finalidade

**RNF18 — Uso limitado dos dados coletados**

Os dados de professores devem ser usados somente para cadastro, autenticação, contato institucional, registro de empréstimo, termo de responsabilidade, devolução, auditoria e relatórios do Sistema GAC.

**Critério verificável:** verificar que relatórios e telas não usam os dados para finalidade fora do escopo do projeto.

#### 1.5.3. Necessidade

**RNF19 — Coleta mínima de dados do professor**

O sistema deve solicitar apenas dados necessários à identificação e responsabilização do professor, como nome, matrícula ou identificador institucional, setor e contato institucional.

**Critério verificável:** revisar formulário de cadastro e confirmar ausência de campos pessoais não necessários ao fluxo.

#### 1.5.4. Tratamento

**RNF20 — Proteção do histórico com dados pessoais**

O sistema deve proteger o histórico de empréstimos e termos de responsabilidade contra acesso não autorizado, mantendo rastreabilidade sem exposição desnecessária de dados pessoais.

**Critério verificável:** consultar histórico com perfis diferentes e verificar limitação de acesso conforme permissão.

### 1.6. Capacidade de Interação (UX, usabilidade e acessibilidade)

Capacidade da solução relacionar-se com os usuários em variados contextos de uso.

#### 1.6.1. Reconhecimento de adequação

**RNF21 — Telas alinhadas ao vocabulário do CCT**

As telas principais devem usar termos compatíveis com o contexto do CCT, como ativo, professor, sala, bloco, turno, patrimônio, acessórios, retirada, devolução, permuta e ocorrência.

**Critério verificável:** validação por usuários representativos do CCT durante homologação.

#### 1.6.2. Facilidade de aprendizado (learnability)

**RNF22 — Aprendizagem rápida dos fluxos principais**

Um atendente treinado deve conseguir registrar retirada e devolução com checklist sem orientação adicional após treinamento inicial de até **30 minutos**.

**Critério verificável:** teste assistido com usuário do perfil atendente.

#### 1.6.3. Operabilidade

**RNF23 — Uso rápido no balcão de atendimento**

As telas de retirada e devolução devem exigir poucos passos e apresentar campos obrigatórios de forma clara para reduzir filas no atendimento.

**Critério verificável:** o fluxo de retirada deve ser concluído em até **2 minutos** quando os dados do professor e do ativo já estiverem disponíveis.

#### 1.6.4. Proteção contra erros do usuário

**RNF24 — Validação de campos obrigatórios**

O sistema deve validar campos obrigatórios antes de salvar cadastros, empréstimos, devoluções, checklists, permutas e ocorrências.

**Critério verificável:** tentar salvar formulários incompletos e verificar mensagens de erro objetivas.

#### 1.6.5. Inclusividade (acessibilidade)

**RNF25 — Acessibilidade básica da interface**

A interface deve permitir navegação por teclado, contraste adequado e rótulos compreensíveis em campos e botões principais.

**Critério verificável:** validar navegação sem mouse e leitura dos rótulos nas telas principais.

#### 1.6.6. Assistência ao usuário (acessibilidade)

**RNF26 — Mensagens de orientação**

O sistema deve exibir mensagens claras quando houver erro de validação, ativo indisponível, divergência de acessório ou bloqueio por permissão.

**Critério verificável:** simular erros comuns e verificar se a mensagem informa o problema e a ação esperada.

#### 1.6.7. Engajamento do usuário

**RNF27 — Feedback das operações**

O sistema deve informar ao usuário o resultado das operações de cadastro, retirada, aceite, devolução, ocorrência, manutenção e relatório.

**Critério verificável:** cada operação concluída deve exibir confirmação visual ou mensagem de sucesso.

### 1.7. Manutenibilidade

Capacidade da solução de evoluir com custo baixo e sem introdução de novos erros.

#### 1.7.1. Modularidade

**RNF28 — Organização modular da solução**

A solução deve ser organizada em módulos de inventário, empréstimo, devolução, assinatura digital, checklist, gestão de chaves, ocorrências, manutenção, relatórios e autenticação.

**Critério verificável:** revisar estrutura do projeto e confirmar separação lógica dos módulos.

#### 1.7.2. Reusabilidade

**RNF29 — Reuso de validações comuns**

Validações comuns, como autenticação, permissão, identificação de ativo, campos obrigatórios e auditoria, devem ser reutilizáveis entre os módulos.

**Critério verificável:** revisar implementação ou documentação técnica para identificar componentes compartilhados.

#### 1.7.3. Analisabilidade

**RNF30 — Logs para diagnóstico**

A solução deve registrar logs técnicos suficientes para diagnóstico de falhas, sem expor dados pessoais desnecessários.

**Critério verificável:** simular erro e verificar registro de log com data, hora, módulo e tipo de falha.

#### 1.7.4. Modificabilidade

**RNF31 — Evolução de regras sem alto impacto**

Alterações em regras de empréstimo, devolução, checklist e manutenção devem poder ser realizadas com impacto limitado aos módulos correspondentes.

**Critério verificável:** revisar arquitetura e confirmar separação das regras por domínio.

#### 1.7.5. Testabilidade

**RNF32 — Testes objetivos dos fluxos principais**

As regras de negócio e os fluxos principais devem permitir criação de testes funcionais, incluindo retirada, aceite de termo, devolução, bloqueio de pendência, permuta e manutenção.

**Critério verificável:** elaborar casos de teste para cada regra de negócio crítica.

### 1.8. Compatibilidade

Capacidade da solução trocar informações e coexistir com outras soluções.

#### 1.8.1. Interoperabilidade

**RNF33 — Possibilidade de integração institucional**

A solução deve permitir integração futura com sistemas institucionais de autenticação, patrimônio ou cadastro de professores, quando definidos pelo CCT ou pela universidade.

**Critério verificável:** documentação técnica deve prever pontos de integração ou API para dados principais.

#### 1.8.2. Coexistência

**RNF34 — Coexistência com infraestrutura institucional**

A aplicação deve coexistir com outros sistemas institucionais sem conflito de portas, banco de dados, autenticação ou dependências críticas.

**Critério verificável:** validar implantação em ambiente compartilhado de homologação.

### 1.9. Segurança Operacional (safety)

Capacidade da solução ser segura em relação aos riscos operacionais.

#### 1.9.1. Restrição operacional

**RNF35 — Bloqueio de operações inseguras**

Operações críticas, como baixa de devolução incompleta, liberação de ativo sem termo e empréstimo de ativo em manutenção, devem ser bloqueadas pelo sistema.

**Critério verificável:** executar cenários críticos e verificar impedimento automático.

#### 1.9.2. Identificação de riscos

**RNF36 — Alerta de pendências e divergências**

O sistema deve alertar quando houver atraso, falta de acessório, divergência de numeração, ativo com defeito ou devolução inconsistente.

**Critério verificável:** simular cada tipo de pendência e verificar alerta correspondente.

#### 1.9.3. Segurança contra falhas (fail-safe)

**RNF37 — Preservação do estado seguro**

Em caso de erro grave durante retirada ou devolução, o sistema deve preservar o estado anterior do ativo para evitar liberação ou baixa indevida.

**Critério verificável:** interromper uma operação em andamento e verificar que o status do ativo não foi alterado de forma incorreta.

#### 1.9.4. Aviso de perigo

**RNF38 — Aviso em operações com impacto patrimonial**

O sistema deve exibir aviso antes de concluir operações com impacto patrimonial, como registrar dano, retirar ativo de circulação, encerrar manutenção ou confirmar devolução com ocorrência.

**Critério verificável:** executar essas operações e verificar aviso de confirmação.

#### 1.9.5. Integração segura

**RNF39 — Comunicação segura em integrações futuras**

Toda integração futura com sistemas institucionais deve utilizar comunicação autenticada e protegida conforme padrão definido pela equipe técnica.

**Critério verificável:** revisar documentação da integração antes da implantação.

### 1.10. Adequação funcional

Capacidade da solução de fornecer funções que atendam às necessidades dos usuários.

#### 1.10.1. Completude funcional

**RNF40 — Cobertura dos módulos definidos**

O sistema deve contemplar os módulos de inventário, identificação digital, retirada, termo de responsabilidade, devolução, permutação, manutenção, relatórios, dashboard e autenticação.

**Critério verificável:** comparar funcionalidades implementadas com a visão da demanda e o backlog priorizado.

#### 1.10.2. Corretude funcional

**RNF41 — Consistência dos relatórios**

Relatórios de empréstimos, devoluções, atrasos, ocorrências e manutenções devem apresentar dados consistentes com os registros operacionais do sistema.

**Critério verificável:** comparar amostra de registros operacionais com os dados exportados em relatório.

#### 1.10.3. Adequação funcional

**RNF42 — Foco no controle de ativos do CCT**

Cada funcionalidade deve apoiar diretamente o controle de ativos, chaves, acessórios, empréstimos, devoluções, manutenção, auditoria ou gestão de usuários do CCT.

**Critério verificável:** revisar funcionalidades propostas e remover itens fora do escopo do Sistema GAC.

## 2. Requisitos Externos

Derivados de fatores externos à solução e ao seu processo de desenvolvimento.

### 2.1. Ético

**RNF43 — Transparência na responsabilização**

O sistema deve informar de forma clara quais ativos e acessórios estão vinculados ao professor antes do aceite do termo de responsabilidade.

**Critério verificável:** tela de aceite deve apresentar a lista de ativos e acessórios antes da confirmação.

### 2.2. Regulatório

**RNF44 — Aderência às regras institucionais do CCT**

A solução deve respeitar regras internas do CCT para retirada, devolução, uso de chaves, responsabilidade sobre ativos, registro de ocorrências e acesso por perfil.

**Critério verificável:** validar regras com coordenação do CCT antes da aprovação da versão.

### 2.3. Legislativo

**RNF45 — Proteção de dados pessoais**

O sistema deve tratar dados pessoais de professores e usuários conforme princípios de finalidade, necessidade, segurança e controle de acesso previstos na legislação aplicável de proteção de dados.

**Critério verificável:** revisar campos coletados, perfis de acesso e relatórios para evitar exposição desnecessária de dados pessoais.

## 3. Requisitos Organizacionais

Derivados de políticas e procedimentos do cliente e do fornecedor.

### 3.1. Ambientais

**RNF46 — Ambiente web ou mobile institucional**

A solução deve ser acessível por navegador web e/ou interface mobile, com banco de dados centralizado para manter registros atualizados em tempo real.

**Critério verificável:** validar acesso a partir dos equipamentos definidos para uso no CCT.

### 3.2. Operacionais

**RNF47 — Uso por perfis distintos**

O sistema deve ser utilizado por professor, atendente do CCT, coordenação do CCT e equipe técnica, com permissões distintas e rastreáveis.

**Critério verificável:** testar acesso com cada perfil e verificar funcionalidades disponíveis.

### 3.3. Desenvolvimento

**RNF48 — Documentação mínima para evolução**

O desenvolvimento deve manter documentação mínima de módulos, regras de negócio, requisitos não funcionais e fluxos principais para apoiar manutenção e evolução futura.

**Critério verificável:** verificar existência de documentos atualizados na entrega.

## 4. Checklist de Validação do Artefato (RNF)

Use este checklist antes de concluir a versão do documento.

### 4.1. Estrutura e escopo

* [x] O documento possui histórico de versões preenchido.
* [x] O escopo da solução está claro no documento.
* [x] Há requisitos registrados nas seções aplicáveis: produto, externos e organizacionais.
* [x] Requisitos não aplicáveis foram evitados ou adaptados ao contexto do GAC.

### 4.2. Qualidade dos requisitos

* [x] Cada requisito está escrito de forma objetiva e verificável.
* [x] Cada requisito possui critério mensurável, condição ou evidência.
* [x] Não há requisito ambíguo com termos vagos sem métrica ou critério.
* [x] Requisitos duplicados ou conflitantes foram eliminados.

### 4.3. Conformidade e rastreabilidade

* [x] Requisitos regulatórios/legais relevantes foram registrados.
* [x] Requisitos de privacidade e segurança foram contemplados.
* [x] Os requisitos estão alinhados com visão da demanda, requisitos funcionais e regras de negócio.
* [x] Existe rastreabilidade para fontes de negócio, decisão técnica ou necessidade levantada.

### 4.4. Prontidão para uso

* [x] Os requisitos podem ser usados como base para implementação e testes.
* [x] Há insumos suficientes para criar critérios de aceitação.
* [ ] O documento foi revisado por pares.
* [ ] A versão está pronta para aprovação/publicação.
