# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Executar Checklist de Devolução**

---

# 2. Objetivo

Permitir que o Atendente do CCT confira se o ativo devolvido está em boas condições e acompanhado dos acessórios esperados, registrando o resultado da conferência no Sistema GAC.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Concreto reutilizável | Pode ser iniciado diretamente ou reutilizado por Registrar Devolução. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Atendente do CCT | Executa a conferência física do ativo e dos acessórios. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Apresenta itens esperados e registra resultado do checklist. |
| Professor | Entrega o ativo e seus acessórios. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | O ativo deve estar em processo de devolução. |
| PRE02 | O sistema deve possuir a lista de acessórios vinculados ao ativo. |
| PRE03 | O Atendente do CCT deve ter acesso ao ativo físico. |
| PRE04 | O Atendente do CCT deve possuir permissão para executar checklist. |

---

# 6. Fluxo Principal

## P1. Acessar checklist

### P1.1.
O Atendente do CCT seleciona a opção **Executar Checklist de Devolução**.

### P1.2.
O sistema apresenta os itens esperados para devolução.

## P2. Apresentar itens de conferência

### P2.1.
O sistema apresenta campos para conferência do equipamento, cabo HDMI, fonte, adaptador, identificação numérica dos acessórios e estado físico.

### P2.2.
O sistema destaca os itens obrigatórios.

## P3. Conferir itens

### P3.1.
O Atendente do CCT confere cada item físico.

### P3.2.
O Atendente do CCT marca os itens como **Conforme**. **[A1] [A2]**

## P4. Validar checklist

### P4.1.
O sistema valida se todos os itens obrigatórios foram marcados. **[E1]**

## P5. Registrar checklist

### P5.1.
O sistema registra o checklist como concluído.

### P5.2.
O sistema apresenta a mensagem **MSG021 - Checklist concluído com sucesso**.

### P5.3.
O sistema retorna ao caso de uso chamador.


---

# 7. Fluxos Alternativos

## A1. Item devolvido com dano

### A1.1.
No passo **P3.2**, o Atendente do CCT marca um item como **Danificado**.

### A1.2.
O sistema solicita descrição do dano.

### A1.3.
O Atendente do CCT informa a descrição.

### A1.4.
O sistema inclui o caso de uso **CDU08 - Registrar Ocorrência**.

### A1.5.
O sistema registra o checklist como **Concluído com Pendência**.

### A1.6.
O sistema retorna ao caso de uso chamador.


## A2. Item ausente ou divergente

### A2.1.
No passo **P3.2**, o Atendente do CCT marca um item como **Ausente** ou **Divergente**.

### A2.2.
O sistema solicita justificativa.

### A2.3.
O Atendente do CCT informa a justificativa.

### A2.4.
O sistema inclui o caso de uso **CDU08 - Registrar Ocorrência**.

### A2.5.
O sistema registra o checklist como **Concluído com Pendência**.

### A2.6.
O sistema retorna ao caso de uso chamador.


---

# 8. Fluxos de Exceção

## E1. Checklist incompleto

### E1.1.
No passo **P4.1**, o sistema identifica item obrigatório sem conferência.

### E1.2.
O sistema apresenta a mensagem **MSG022 - Todos os itens obrigatórios devem ser conferidos**.

### E1.3.
O fluxo retorna ao passo **P2.1**.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | O checklist fica registrado. |
| POS02 | O resultado da conferência fica vinculado à devolução. |
| POS03 | Pendências geram ocorrência. |
| POS04 | Devolução incompleta pode ser bloqueada ou registrada com pendência. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A tela de checklist deve ser objetiva e permitir marcação rápida. |
| RNF02 | O sistema deve destacar itens obrigatórios. |
| RNF03 | O checklist deve ser auditável. |
| RNF04 | O checklist deve funcionar em desktop, tablet ou totem. |

---

# 11. Ponto de Extensão

## PE1. Registrar Ocorrência

Permite registrar dano, ausência ou divergência identificada durante a conferência.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilizado em cada devolução de ativo |
| Informações mais acessadas | Equipamento, acessórios, estado físico e pendências |

---

# 13. Interface Visual

## IV1. Tela de checklist de devolução

Tela usada para conferência dos itens devolvidos.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Patrimônio | Texto | Sim | Identificação do ativo | Obtido da devolução |
| Cabo HDMI | Checkbox/Status | Condicional | Confirma devolução do cabo | Obrigatório quando vinculado |
| Fonte | Checkbox/Status | Condicional | Confirma devolução da fonte | Obrigatória quando vinculada |
| Adaptador | Checkbox/Status | Condicional | Confirma devolução do adaptador | Obrigatório quando vinculado |
| Estado físico | Lista | Sim | Condição do ativo | Conforme, danificado ou pendente |
| Observações | Texto longo | Condicional | Descrição de pendências | Obrigatória quando houver dano/divergência |
| Botão “Concluir Checklist” | Botão | Sim | Registra conferência | Habilitado após itens obrigatórios |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | Os itens do checklist podem variar conforme tipo de ativo. |
| OBS02 | O sistema poderá permitir anexar fotos de avarias em versão futura. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU06 - Registrar Devolução |
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
