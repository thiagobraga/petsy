# Implementação: dashboard responsivo

## 1. Registrar e preparar

- [x] Criar esta especificação sob `.specs/2026-10-17-dashboard-redesign/`.
- [x] Registrar tarefa #100 como em andamento em `tasks.md`, preservando IDs e tarefas existentes.
- [ ] Conferir os arquivos fornecidos pelo usuário em `uploads/pets/`: `meg`, `snoopy`, `lucy`, `kali`, `lila`, `luke` (`jpg`, `png` ou `webp`). Se ainda não existirem, manter os placeholders identificados e completar a integração das imagens assim que forem adicionadas.
- [ ] Antes de editar componentes, ler o `craft-floor.md` do Impeccable, carregar o contexto Impeccable para o dashboard e usar Impeccable com o plugin Taste Design no modo de produto / operar. Usar a referência como autoridade visual e conservar a personalidade Petsy documentada em `DESIGN.md`.

## 2. Escrever testes que exponham as lacunas

- [ ] Em `tests/Dashboard.test.tsx`, cobrir navegação para perfis existentes, medicações e eventos; ações indisponíveis desabilitadas; seis nomes; retratos com alt text apropriado; estado e aviso de medicação.
- [ ] Cobrir desmarcação de medicação inicialmente concluída e conclusão de uma dose atrasada; validar `aria-pressed` e texto de atraso.
- [ ] Em `tests/PetDetail.test.tsx`, cobrir os seis IDs e garantir que selecionar um pet pelo dashboard abre o mesmo perfil, sem transferir notas entre IDs.
- [ ] Executar os testes direcionados para confirmar que os casos novos falham pelo comportamento esperado.

## 3. Implementar dados e navegação

- [ ] Em `src/data.ts` e `src/stores/pet.ts`, acrescentar os seis cães ao catálogo compartilhado com IDs estáveis, sem remover os registros existentes ou alterar notas de pets anteriores. Deixar dados não fornecidos como “Não informado”.
- [ ] Em `src/components/dashboard/data.ts`, associar pets, eventos e linhas do painel aos mesmos IDs; distinguir conteúdo demonstrativo de dados de saúde reais.
- [ ] Conectar cards de pets a `/pets/:petId`, medicações a `/medicines`, calendário e eventos a `/appointments`, usando `useLocation` do Wouter ou a abstração já presente.
- [ ] Desabilitar ações sem rota disponível e mostrar “Em breve”. Remover ação “Ver todos” redundante quando toda a lista já estiver exposta.
- [ ] Corrigir a precedência do estado de medicação em `MedicationCard.tsx` para que toggles reflitam sempre o estado local e atualizem avisos de atraso.
- [ ] Integrar fotos fornecidas em `uploads/pets/` ao Vite. Preservar os originais; disponibilizar cópias em `public/images/pets/` se esse for o caminho necessário para servir imagens. Incluir placeholder e texto alternativo pelo nome do pet para cada perfil sem foto.

## 4. Refinar componentes e layouts

- [ ] Em `src/components/dashboard/Dashboard.tsx`, criar container fluido com largura máxima adequada: coluna no celular e grade em duas colunas no desktop, mantendo a ordem da referência.
- [ ] Em `primitives.tsx`, `QuickAction.tsx`, `MedicationRow.tsx`, `MedicationCard.tsx`, `PetsCard.tsx`, `PetTile.tsx`, `EventsCard.tsx`, `ReminderCard.tsx` e `SidebarOverlay.tsx`, refinar espaçamento, tipografia, imagens e hierarquia para acompanhar a referência e suportar as ações acordadas.
- [ ] Reduzir sombras e brilhos em superfícies paradas; usar contraste por cor e espaçamento. Confirmar foco, alvo de toque, contraste e `prefers-reduced-motion`.
- [ ] Preservar os exports `window.DashboardScreen`, dos componentes já exportados e o contrato de acesso do design canvas.

## 5. Verificar e fechar

- [ ] Reexecutar primeiro `docker compose exec -T app npm test -- --run tests/Dashboard.test.tsx tests/PetDetail.test.tsx`; então executar suíte completa, `npm run lint`, TypeScript disponível no projeto, `npm run build` e `npm run format:check`.
- [ ] Abrir `/dashboard` em navegador e inspecionar 390px, 768px e 1440px; exercitar menu e navegação, conferir console, imagens, overflow, texto, foco e intensidade das sombras.
- [ ] Aplicar uma rodada conjunta de ajustes visuais e reinspecionar os mesmos viewports. Rodar detector Impeccable uma vez nos arquivos alterados.
- [ ] Marcar tarefas desta spec como `[x]` e atualizar a tarefa #100 em `tasks.md` para concluída somente depois que todas as verificações passarem.

## Decisões fixas

- Sem novos fluxos de cadastro, histórico, configurações ou ajuda nesta entrega.
- Sem gerar imagens: aguardam-se fotos fornecidas pelo usuário; placeholders são aceitáveis até elas chegarem.
- Preservar dados e fotos de usuário, demais telas e alterações locais preexistentes.
- Não adicionar dependências.
