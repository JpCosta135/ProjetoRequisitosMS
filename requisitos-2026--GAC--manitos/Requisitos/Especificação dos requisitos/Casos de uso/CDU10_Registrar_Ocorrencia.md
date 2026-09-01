# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Registrar Ocorrência**

---

# 2. Objetivo

Permitir que o Atendente do CCT ou a Coordenação do CCT registre problemas, atrasos, danos, perdas, falta de acessórios ou inconsistências relacionadas a ativos, retiradas ou devoluções.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Concreto | Caso de uso instanciado diretamente por Atendente ou Coordenação. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Atendente do CCT | Registra ocorrências operacionais. |
| Coordenação do CCT | Registra ou acompanha ocorrências gerenciais. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Sistema GAC | Armazena e vincula a ocorrência ao ativo, retirada ou devolução. |
| Professor | Pode estar vinculado à ocorrência como responsável pelo ativo. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | Deve existir um ativo, retirada, devolução ou usuário relacionado à ocorrência. |
| PRE02 | O tipo de ocorrência deve ser identificado. |
| PRE03 | O responsável pelo registro deve informar uma descrição mínima. |
| PRE04 | O usuário deve possuir permissão para registrar ocorrência. |

---

# 6. Fluxo Principal

## P1. Acessar registro de ocorrência

### P1.1.
O Atendente do CCT seleciona a opção **Registrar Ocorrência**.

### P1.2.
O sistema apresenta o formulário de ocorrência.

## P2. Informar vínculo da ocorrência

### P2.1.
O Atendente do CCT informa o ativo, Professor, retirada ou devolução relacionada.

### P2.2.
O sistema valida o vínculo informado. **[E2]**

## P3. Selecionar tipo de ocorrência

### P3.1.
O sistema apresenta os tipos de ocorrência disponíveis: dano, falha, atraso, falta de acessório, extravio, não devolução ou divergência.

### P3.2.
O Atendente do CCT seleciona o tipo de ocorrência.

## P4. Descrever ocorrência

### P4.1.
O Atendente do CCT informa a descrição da ocorrência.

### P4.2.
O Atendente do CCT anexa evidência quando necessário.

## P5. Validar dados

### P5.1.
O sistema valida os dados obrigatórios. **[E1]**

## P6. Registrar ocorrência

### P6.1.
O sistema registra a ocorrência com data, hora, responsável e vínculo com o ativo.

### P6.2.
O sistema atualiza a situação do ativo quando aplicável. **[A1]**

## P7. Finalizar registro

### P7.1.
O sistema apresenta a mensagem **MSG023 - Ocorrência registrada com sucesso**.

### P7.2.
O caso de uso é encerrado.


---

# 7. Fluxos Alternativos

## A1. Ocorrência altera status do ativo

### A1.1.
No passo **P6.2**, o sistema identifica que a ocorrência impede novo uso do ativo.

### A1.2.
O sistema altera o status do ativo para **Com Pendência** ou **Em Manutenção**.

### A1.3.
O sistema inclui o caso de uso **CDU03 - Atualizar Inventário**.

### A1.4.
O fluxo segue para o passo **P7.1**.


## A2. Coordenação registra ocorrência gerencial

### A2.1.
No passo **P1.1**, a Coordenação do CCT seleciona a opção **Registrar Ocorrência**.

### A2.2.
O sistema apresenta o formulário com campos gerenciais.

### A2.3.
A Coordenação do CCT informa a ocorrência.

### A2.4.
O fluxo segue para o passo **P5.1**.


## A3. Ocorrência aberta automaticamente

### A3.1.
No passo **P1.1**, o sistema inicia o registro a partir de checklist com pendência ou devolução em atraso.

### A3.2.
O sistema preenche automaticamente os dados já conhecidos.

### A3.3.
O Atendente do CCT complementa a descrição.

### A3.4.
O fluxo segue para o passo **P5.1**.


---

# 8. Fluxos de Exceção

## E1. Dados obrigatórios ausentes

### E1.1.
No passo **P5.1**, o sistema identifica ausência de tipo, descrição ou vínculo da ocorrência.

### E1.2.
O sistema apresenta a mensagem **MSG024 - Informe os dados obrigatórios da ocorrência**.

### E1.3.
O fluxo retorna ao passo **P2.1**.


## E2. Ativo relacionado não encontrado

### E2.1.
No passo **P2.2**, o sistema não localiza o ativo informado.

### E2.2.
O sistema apresenta a mensagem **MSG025 - Ativo relacionado não encontrado**.

### E2.3.
O fluxo retorna ao passo **P2.1**.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | A ocorrência fica registrada. |
| POS02 | A ocorrência fica vinculada ao ativo, retirada, devolução ou usuário relacionado. |
| POS03 | O status do ativo pode ser atualizado. |
| POS04 | A Coordenação do CCT pode consultar a ocorrência em relatórios ou dashboard. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | A ocorrência deve ser rastreável. |
| RNF02 | O sistema deve registrar data, hora e usuário responsável. |
| RNF03 | O sistema deve permitir consulta posterior para auditoria. |
| RNF04 | O sistema deve permitir anexar evidências quando aplicável. |
| RNF05 | A consulta de ocorrências deve responder em até 5 segundos na maior parte das operações. |

---

# 11. Ponto de Extensão

## PE1. Atualizar Inventário

Permite atualizar status do ativo quando a ocorrência impedir novo uso ou exigir manutenção.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Média |
| Perfil de Uso | Usado quando há atraso, dano, perda, falha ou divergência |
| Informações mais acessadas | Tipo da ocorrência, ativo, responsável, data e status |

---

# 13. Interface Visual

## IV1. Tela de registro de ocorrência

Tela usada para registrar e acompanhar ocorrências dos ativos.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Patrimônio | Texto/QR/NFC | Sim | Identificação do ativo | Deve existir no inventário |
| Professor relacionado | Texto | Condicional | Responsável vinculado à retirada | Obrigatório quando houver retirada ativa |
| Tipo de ocorrência | Lista | Sim | Dano, falha, atraso, falta, extravio ou divergência | Deve ser selecionado |
| Descrição | Texto longo | Sim | Detalhamento da ocorrência | Deve possuir descrição mínima |
| Evidência | Arquivo/Imagem | Não | Foto ou documento de apoio | Opcional |
| Status da ocorrência | Lista | Sim | Aberta, em análise, resolvida ou cancelada | Gerado ou atualizado pelo sistema |
| Botão “Registrar Ocorrência” | Botão | Sim | Confirma registro | Habilitado após campos obrigatórios |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | Ocorrências podem ser abertas manualmente ou automaticamente por checklist/devolução. |
| OBS02 | A gestão de resolução de ocorrências pode ser detalhada em outro caso de uso. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU03 - Atualizar Inventário |
| REF05 | CDU06 - Registrar Devolução |
| REF06 | CDU07 - Executar Checklist de Devolução |

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
