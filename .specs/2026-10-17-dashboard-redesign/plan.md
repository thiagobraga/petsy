# Dashboard responsivo para os seis cachorros

O dashboard vai seguir a referência fornecida: uma experiência acolhedora, clara e fácil de consultar, com hierarquia mais forte e sombras discretas. No celular, as seções permanecem em uma coluna; em telas maiores, pets e medicações dividem espaço para aproveitar melhor a largura.

O painel exibirá Meg, Snoopy, Lucy, Kali, Lila e Luke. As fotos serão fornecidas pelo usuário e usadas nos perfis e miniaturas correspondentes. Até que os arquivos cheguem, os retratos ficam como placeholders identificados. Dados de saúde que não foram fornecidos não serão atribuídos aos cães.

Medicações poderão ser marcadas e desmarcadas. Cards de pet abrem o perfil correspondente; medicações, calendário e eventos levam às telas existentes. Ações sem uma tela disponível, como cadastrar um pet ou consultar histórico, ficam desabilitadas e identificadas como “Em breve”.

O texto da interface continua em português. O dashboard preserva os exports usados pelo design canvas, oferece foco visível e alvos de toque confortáveis, e respeita a preferência de movimento reduzido.

## Critérios de aceite

- A composição mantém a hierarquia da referência, usa superfícies claras e sombras leves.
- O layout se adapta a celulares, tablets e desktops sem corte, aperto ou rolagem horizontal.
- Os seis perfis mantêm nomes e IDs consistentes ao abrir seus detalhes; as fotos fornecidas aparecem nas miniaturas e perfis.
- Cada ação habilitada tem destino funcional. Ações sem destino não parecem clicáveis.
- O estado de dose concluída pode ser alternado nos dois sentidos, incluindo doses originalmente concluídas; avisos de atraso acompanham o estado.
- Testes automatizados, lint, TypeScript e build passam; a tela é revisada no navegador em 390px, 768px e 1440px.

## Fotos necessárias

Adicionar a `uploads/pets/` seis arquivos com um destes formatos: `.jpg`, `.png` ou `.webp`. Usar os nomes `meg`, `snoopy`, `lucy`, `kali`, `lila` e `luke` antes da extensão. Na implementação, disponibilizar as imagens ao Vite sem alterar os arquivos originais enviados.

## Relevant Files

- `src/components/dashboard/Dashboard.tsx` e componentes em `src/components/dashboard/`: composição, responsividade, navegação, retratos e interações do painel.
- `src/components/dashboard/data.ts`, `src/data.ts` e `src/stores/pet.ts`: identidade compartilhada dos pets e seleção para a rota de detalhes.
- `src/index.css` e `src/screens/Dashboard.tsx`: estilos globais e export do dashboard.
- `tests/Dashboard.test.tsx` e `tests/PetDetail.test.tsx`: regressões do dashboard e integração com perfil.
- `tasks.md`: andamento da tarefa #100.
- `.specs/2026-10-17-dashboard-redesign/plan.md` e `task.md`: especificação e execução.
- Referências visuais: `uploads/petsy-dashboard.png` e `uploads/petsy-dashboard-sidebar.png`; fotos de perfil a serem adicionadas em `uploads/pets/`.
