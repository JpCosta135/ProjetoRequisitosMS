# Especificação de Requisitos Funcionais

## Caso de Uso (CDU) - GAC

---

## Histórico de Versões

| Data       | Versão | Descrição | Autor |
|------------|--------|-----------|-------|
| 30/05/2026 | 2.0 | Reestruturação do caso de uso no padrão do template de especificação de CDU | Grupo Manitos |

---

# 1. Nome do Caso de Uso

**Registrar Devolução**

---

# 2. Objetivo

Permitir que o Atendente do CCT registre o retorno de um ativo ao CCT, encerrando o ciclo de retirada, registrando data e hora da devolução e atualizando a situação do item no inventário.

---

# 3. Tipo de Caso de Uso

| Tipo do Caso de Uso | Justificativa |
| --- | --- |
| Concreto | Caso de uso instanciado diretamente pelo Atendente do CCT. |

---

# 4. Atores

## 4.1 Primário

| Ator | Descrição |
| --- | --- |
| Atendente do CCT | Registra a devolução e confirma o retorno do ativo. |

## 4.2 Secundário

| Ator | Descrição |
| --- | --- |
| Professor | Entrega fisicamente o ativo. |
| Sistema GAC | Localiza a retirada ativa, registra devolução e atualiza inventário. |
| Leitor QR/NFC | Apoia a identificação do patrimônio. |

---

# 5. Precondições

| Código | Descrição |
| --- | --- |
| PRE01 | Deve existir uma retirada ativa para o ativo. |
| PRE02 | O Professor deve apresentar o ativo para devolução. |
| PRE03 | O ativo deve estar identificado por patrimônio, QR Code, NFC ou seleção manual. |
| PRE04 | O Atendente do CCT deve possuir permissão para registrar devolução. |

---

# 6. Fluxo Principal

## P1. Acessar devolução

### P1.1.
O Atendente do CCT seleciona a opção **Registrar Devolução**.

### P1.2.
O sistema apresenta a tela de busca de retirada ativa.

## P2. Identificar ativo

### P2.1.
O Atendente do CCT informa ou escaneia o patrimônio do ativo.

### P2.2.
O sistema localiza a retirada ativa vinculada ao ativo. **[E1]**

## P3. Apresentar dados da retirada

### P3.1.
O sistema apresenta Professor, sala, bloco, turno, data, horário e acessórios esperados.

### P3.2.
O sistema informa se a devolução está dentro do prazo esperado. **[A2]**

## P4. Executar checklist

### P4.1.
O sistema inclui o caso de uso **CDU09 - Executar Checklist de Devolução**. **[E2]**

## P5. Confirmar devolução

### P5.1.
O Atendente do CCT confirma a devolução.

### P5.2.
O sistema registra data e hora da devolução.

## P6. Atualizar inventário

### P6.1.
O sistema inclui o caso de uso **CDU03 - Atualizar Inventário**.

## P7. Finalizar devolução

### P7.1.
O sistema apresenta a mensagem **MSG018 - Devolução registrada com sucesso**.

### P7.2.
O sistema disponibiliza comprovante eletrônico da devolução.

### P7.3.
O caso de uso é encerrado.


---

# 7. Fluxos Alternativos

## A1. Devolução com pendência

### A1.1.
No passo **P4.1**, o checklist identifica pendência.

### A1.2.
O sistema registra a devolução com status **Com Pendência**.

### A1.3.
O sistema inclui o caso de uso **CDU08 - Registrar Ocorrência**.

### A1.4.
O fluxo segue para o passo **P5.2**.


## A2. Devolução fora do prazo

### A2.1.
No passo **P3.2**, o sistema identifica atraso na devolução.

### A2.2.
O sistema informa o atraso ao Atendente do CCT.

### A2.3.
O sistema inclui o caso de uso **CDU08 - Registrar Ocorrência**.

### A2.4.
O fluxo segue para o passo **P4.1**.


## A3. Identificação manual do ativo

### A3.1.
No passo **P2.1**, a leitura automática não está disponível.

### A3.2.
O Atendente do CCT informa manualmente o número patrimonial.

### A3.3.
O fluxo segue para o passo **P2.2**.


---

# 8. Fluxos de Exceção

## E1. Retirada ativa não encontrada

### E1.1.
No passo **P2.2**, o sistema não encontra retirada ativa para o ativo.

### E1.2.
O sistema apresenta a mensagem **MSG019 - Não existe retirada ativa para este ativo**.

### E1.3.
O caso de uso é encerrado.


## E2. Checklist não concluído

### E2.1.
No passo **P4.1**, o checklist não é concluído.

### E2.2.
O sistema apresenta a mensagem **MSG020 - A devolução depende da conclusão do checklist**.

### E2.3.
O fluxo retorna ao passo **P4.1**.


---

# 9. Pós-condições

| Código | Descrição |
| --- | --- |
| POS01 | A devolução fica registrada. |
| POS02 | O ciclo de retirada é encerrado. |
| POS03 | O inventário é atualizado. |
| POS04 | Pendências, atrasos ou danos ficam registrados como ocorrência. |
| POS05 | O histórico de movimentação fica disponível para auditoria. |

---

# 10. Requisitos Não Funcionais

| Código | Requisito |
| --- | --- |
| RNF01 | O registro de devolução deve ser concluído em até 3 segundos após confirmação. |
| RNF02 | O sistema deve manter histórico de devoluções. |
| RNF03 | O sistema deve permitir rastrear responsável, ativo e horário da devolução. |
| RNF04 | A tela deve funcionar em desktop, tablet ou totem. |

---

# 11. Ponto de Extensão

## PE1. Registrar Ocorrência

Permite registrar pendências, atrasos, danos ou divergências identificadas na devolução.

---

# 12. Frequência de Utilização

| Item | Informação |
| --- | --- |
| Frequência | Alta |
| Perfil de Uso | Utilização diária pelos atendentes |
| Informações mais acessadas | Patrimônio, professor, checklist e histórico de devolução |

---

# 13. Interface Visual

## IV1. Tela de devolução de ativos

Tela utilizada pelo atendente para registrar a devolução e conferir dados da retirada ativa.

| Campo | Tipo/Formato | Obrigatório | Descrição | Regra de Negócio |
| --- | --- | --- | --- | --- |
| Patrimônio | QR/NFC/Texto | Sim | Identificação do ativo | Deve possuir retirada ativa |
| Professor responsável | Texto | Sim | Responsável pela retirada | Obtido automaticamente |
| Data/Hora da Retirada | Data/Hora | Sim | Momento da retirada | Obtido automaticamente |
| Data/Hora da Devolução | Data/Hora | Sim | Momento da devolução | Gerado automaticamente |
| Local de utilização | Texto | Sim | Sala ou bloco informado na retirada | Obtido automaticamente |
| Acessórios esperados | Lista | Sim | Itens vinculados à retirada | Devem ser conferidos |
| Resultado do checklist | Lista | Sim | Conforme ou com pendência | Gerado pelo checklist |
| Botão “Confirmar Devolução” | Botão | Sim | Finaliza devolução | Habilitado após checklist |

---

# 14. Observações

| Código | Observação |
| --- | --- |
| OBS01 | A devolução pode gerar ocorrência automaticamente quando houver atraso ou pendência. |
| OBS02 | O comprovante eletrônico pode ser exibido em tela ou exportado em PDF. |

---

# 15. Referências

| Código | Referência |
| --- | --- |
| REF01 | Documento de Visão da Demanda do Projeto GAC |
| REF02 | Glossário do Projeto GAC |
| REF03 | Template de Especificação de Caso de Uso |
| REF04 | CDU03 - Atualizar Inventário |
| REF05 | CDU07 - Executar Checklist de Devolução |
| REF06 | CDU08 - Registrar Ocorrência |

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
