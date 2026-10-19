# Guia: publicar os apps Systekna na Google Play

> Etapa 6 do processo Systekna. Os apps saem da PoC em HTML + PWA, são empacotados como **TWA** (sem reescrever) e publicados na conta de desenvolvedor **Systekna**.
> Requisitos consultados em out/2026. Confira sempre no Play Console antes de cada passo.

---

## 1. Escolher o tipo de conta

| | Conta pessoal | Conta de organização |
|---|---|---|
| Nome exibido | Pode usar "Systekna" como nome de desenvolvedor | "Systekna" com dados da empresa |
| Documentos | RG/CNH e comprovante de endereço | CNPJ + número **D-U-N-S** (gratuito, pela Dun & Bradstreet) |
| Teste fechado obrigatório | **Sim**: 12 testadores por 14 dias seguidos | Não |
| Indicado para | Começar agora, sem CNPJ | Se a Systekna já tiver ou vier a ter CNPJ |

**Recomendação:** se tiver CNPJ, vá de **organização**, que dispensa o teste fechado e passa mais credibilidade. Sem CNPJ, abra a pessoal e trate o teste fechado como sua homologação (etapa 4).

### Checklist da conta
- [ ] Conta Google dedicada (ex.: um Gmail só da Systekna)
- [ ] Taxa única de registro (US$ 25, paga com cartão internacional)
- [ ] Verificação de identidade concluída no Play Console
- [ ] E-mail público de contato e site (pode ser a própria Loja Systekna)
- [ ] Número de telefone verificado

---

## 2. Atenção: verificação de desenvolvedor Android (Brasil é um dos primeiros)

A partir de **30/09/2026**, no Brasil (e em Indonésia, Singapura e Tailândia), as lojas participantes, incluindo a Google Play e as lojas da Samsung e da Xiaomi, só instalam apps de **desenvolvedores registrados**, com o nome do pacote vinculado.

- Publicando pela Play Console, o registro faz parte da própria conta.
- Para distribuir **APK fora da Play**, é preciso se registrar no Android Developer Console.
- Para testes, existe a **conta de distribuição limitada**: até 20 aparelhos, sem taxa e sem documento.
- **A Loja Systekna em PWA não depende disso**, porque os apps são instalados pelo navegador, não como APK.

---

## 3. Preparar cada app (requisitos do PWA para virar TWA)

- [ ] Hospedado em **HTTPS** (GitHub Pages serve)
- [ ] `manifest.json` com `name`, `short_name`, `start_url`, `display: "standalone"`, `theme_color`, `background_color`
- [ ] Ícones 192×192 e 512×512 PNG, mais um ícone **maskable**
- [ ] `service-worker.js` funcionando offline
- [ ] Nota boa no Lighthouse (PWA, desempenho e acessibilidade)
- [ ] Tela Sobre com versão, contato e link da política de privacidade (já vem no Template Base)
- [ ] Exportar e apagar dados em Ajustes (exigência da LGPD e da Play quando há conta)

### Domínio e Digital Asset Links (ponto crítico)
O TWA só abre sem a barra do navegador se existir o arquivo **`/.well-known/assetlinks.json` na raiz do domínio**.

- Em `celsoalmeidalf.github.io/livro-caixa/`, a raiz é `celsoalmeidalf.github.io`. O arquivo precisa ficar no repositório **`celsoalmeidalf.github.io`** (o site de usuário), e não no repositório do app.
- Um único `assetlinks.json` pode listar todos os apps (um bloco por pacote).
- Alternativa mais limpa: um domínio próprio (ex.: `systekna.com.br`) apontado para o GitHub Pages.

---

## 4. Gerar o pacote Android (TWA)

**Caminho mais simples: PWABuilder** (pwabuilder.com)
1. Cole a URL do app e confira a nota do manifest.
2. Clique em **Package for stores → Android**.
3. Defina o **Package ID** no padrão `com.systekna.livrocaixa` (permanente, não muda depois).
4. Baixe o `.zip`: vem o `.aab` (para a Play), o `.apk` (para testar) e o `assetlinks.json`.
5. **Guarde a chave de assinatura (`signing.keystore`) e as senhas** em local seguro, com backup. Sem elas não dá para atualizar o app.
6. Publique o `assetlinks.json` gerado na raiz do domínio (passo 3).

**Alternativa por linha de comando:** Bubblewrap (`npx @bubblewrap/cli init --manifest=URL`).

**Nível de API:** desde 31/08/2026, apps novos e atualizações precisam mirar o **Android 16 (API 36)**. Gere o pacote com a versão atual do PWABuilder ou do Bubblewrap.

**Quando trocar TWA por Capacitor:** se o app precisar de câmera, notificações nativas, biometria ou outros recursos do aparelho.

---

## 5. Ficha da loja (para cada app)

| Item | Especificação |
|---|---|
| Nome do app | Até 30 caracteres |
| Descrição curta | Até 80 caracteres |
| Descrição completa | Até 4.000 caracteres |
| Ícone | 512×512 PNG |
| Gráfico de destaque | 1024×500 PNG/JPG |
| Capturas de tela | Mínimo 2 de celular (recomendado de 4 a 8) |
| Categoria | Ex.: Finanças, Negócios, Casa e decoração |
| Política de privacidade | URL pública obrigatória |
| E-mail de contato | Obrigatório |

### Formulários obrigatórios no Console
- [ ] **Segurança dos dados**: o que coleta, se compartilha, se criptografa e se permite apagar
- [ ] **Classificação de conteúdo** (questionário IARC)
- [ ] **Público-alvo** (adultos, para os apps Systekna)
- [ ] **Anúncios**: não contém
- [ ] **Acesso ao app**: se houver PIN ou login, informe como o revisor entra
- [ ] Declarações de **apps financeiros**, quando a Play pedir (Livro-Caixa e Cripto)

---

## 6. Teste e lançamento

1. **Teste interno**: você e quem quiser, para validar o `.aab`.
2. **Teste fechado**: obrigatório na conta pessoal. São **12+ testadores por 14 dias seguidos**, e eles precisam **usar** o app de verdade (a Google recusa por "engajamento insuficiente"). Use um Grupo do Google ou uma lista de e-mails.
3. **Solicitar acesso à produção**: responda às perguntas sobre o teste.
4. **Produção**: lançamento gradual (ex.: 20% → 100%).

---

## 7. Ordem sugerida de publicação

| # | App | Por que nessa ordem | Atenção |
|---|---|---|---|
| 1 | Câmbio | Mais simples, valida o fluxo inteiro | — |
| 2 | Livro-Caixa | Mais maduro, Aero 3.0 | Declaração de app financeiro |
| 3 | Cripto Portfólio | Dados locais | Deixar claro que é simulador, não corretora |
| 4 | Despesas da Casa | Usa Firebase | Declarar sincronização na Segurança dos dados |
| — | Studio Agenda, Corretor, Carros | Ainda em beta | Passar antes por homologação |
| — | Carteira Soberana e Governança | Experimentais | Manter só na Loja Systekna por enquanto |

---

## 8. Rascunhos de descrição curta (até 80 caracteres)

- **Câmbio**: Cotação do dólar em tempo real e conversor rápido de USD para real.
- **Livro-Caixa**: Controle receitas, despesas, cartão e dívidas num só lugar.
- **Cripto Portfólio**: Converta criptomoedas e simule o valor da sua carteira em reais.
- **Despesas da Casa**: Divida as despesas da casa e veja tudo sincronizado no celular.

---

## 9. Depois de publicado

- [ ] Atualizar o `url` de cada app no catálogo da Loja Systekna e adicionar o link da Play
- [ ] A cada versão: subir o `versionCode`, gerar um novo `.aab` com a **mesma chave** e escrever as novidades
- [ ] Responder às avaliações da Play e revisar o painel de feedback
- [ ] Revisar a política de privacidade sempre que o app passar a coletar algo novo
