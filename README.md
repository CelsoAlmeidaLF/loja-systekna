# Loja Systekna · HTML + PWA

Loja própria dos apps Systekna: vitrine com destaques, categorias, busca, página de cada app com telas reais, favoritos, avaliações com resposta do administrador e área de **Gestão** para cadastrar, editar, ordenar e publicar apps.

- **Design:** minimalista atual (Geist, superfícies neutras), claro e escuro
- **Tecnologia:** HTML, CSS e JavaScript puro (módulos ES), sem build
- **PWA:** instalável, abre offline, aviso de nova versão
- **Dados:** Firebase (Firestore + Login Google) ou **modo demonstração** no próprio aparelho

---

## 1. Testar agora (modo demonstração)

Sem configurar nada, a loja abre em modo demonstração: o catálogo dos 10 apps já vem carregado, você é o administrador e tudo fica salvo só no aparelho.

**No computador**
```bash
cd loja-systekna
python3 -m http.server 8080
# abra http://localhost:8080
```

**No celular com SHTTPS**
1. Copie a pasta `loja-systekna` para a pasta servida pelo SHTTPS.
2. Abra `http://localhost:8080/loja-systekna/` no navegador do celular.
3. Menu do navegador → **Instalar app**.

> O service worker só funciona em `https://` ou `localhost`. Abrir o `index.html` direto do arquivo (`file://`) não instala a PWA.

---

## 2. Ligar ao Firebase (para publicar de verdade)

Tudo cabe no plano gratuito **Spark**. As imagens (ícones e telas) ficam no próprio Firestore, então o projeto não precisa do Cloud Storage.

1. Acesse **console.firebase.google.com** → **Adicionar projeto** → nome `loja-systekna` (o Analytics pode ficar desligado).
2. **Firestore Database** → **Criar banco de dados** → modo de produção → região `southamerica-east1 (São Paulo)`.
3. **Authentication** → **Começar** → **Google** → ativar → escolha o e-mail de suporte → **Salvar**.
4. **Authentication → Configurações → Domínios autorizados** → adicione `celsoalmeidalf.github.io` (ou o domínio onde a loja vai ficar). `localhost` já vem liberado.
5. **Configurações do projeto** (engrenagem) → **Seus apps** → ícone **Web `</>`** → registre o app → copie o objeto `firebaseConfig`.
6. Abra `js/config.js`:
   - cole o objeto em `firebase: { ... }`
   - coloque o seu e-mail Google em `adminEmails`
7. **Firestore → Regras** → cole o conteúdo de `firestore.rules`, troque `seu-email@gmail.com` pelo **mesmo** e-mail → **Publicar**.
8. Abra a loja → toque no ícone de conta → **Entrar com Google**.
9. Vá em **Gestão** → **Importar catálogo inicial**. Pronto: os 10 apps sobem para o Firestore.

**Quem pode o quê**

| Ação | Visitante | Conta Google | Administrador |
|---|---|---|---|
| Ver, buscar, favoritar e abrir apps | ✓ | ✓ | ✓ |
| Avaliar e comentar | | ✓ (só a própria avaliação) | ✓ |
| Responder avaliações | | | ✓ |
| Cadastrar, editar, ordenar, ocultar, excluir apps | | | ✓ |

A permissão de administrador é garantida pelas **regras do Firestore** (servidor). O `adminEmails` do `config.js` só decide o que aparece na tela.

---

## 3. Publicar no GitHub Pages

1. Crie um repositório, por exemplo `loja-systekna`.
2. Envie **o conteúdo** da pasta (o `index.html` fica na raiz do repositório).
3. **Settings → Pages → Build and deployment** → *Deploy from a branch* → `main` / `/ (root)` → **Save**.
4. Em alguns minutos a loja fica em `https://celsoalmeidalf.github.io/loja-systekna/`.
5. Adicione esse domínio em **Domínios autorizados** do Firebase (passo 2.4).

---

## 4. Publicar uma nova versão

1. Altere os arquivos.
2. Suba o número em **dois lugares**:
   - `js/config.js` → `appVersion`
   - `sw.js` → `VERSION`
3. Envie para o GitHub. Quem estiver com a loja aberta vê o aviso **"Nova versão da loja disponível · Atualizar"**.

---

## 5. Usando a Gestão

- **Novo app / Editar:** nome, descrição curta, categoria, status, cor, **ícone próprio** (imagem recortada em quadrado) ou ícone da galeria, **telas do app** (até 8, reordenáveis), descrição, recursos, onde ficam os dados, link, versão, novidades, publicado e destaque.
- **Versão nova:** ao mudar o campo *Versão*, o app ganha o selo **Atualizado** por 14 dias e entra em **Novidades recentes** por 30 dias.
- **Catálogo:** setas para mudar a ordem, chave para publicar ou ocultar.
- **Avaliações recentes:** mostra o que está sem resposta; toque para responder.
- **Excluir:** com confirmação e opção de desfazer.
- **Apoio (Pix e Bitcoin):** informe chave Pix, nome e cidade do recebedor e o endereço Bitcoin. A página **Apoie a Systekna** gera o QR code e o **Pix copia e cola** no padrão do Banco Central (com valores sugeridos de R$ 5 a R$ 50 ou valor livre) e mostra o QR do endereço Bitcoin. Deixe em branco o que não quiser oferecer.

## Compartilhar

Na página de cada app (e em *Sobre a loja*) há o botão **Compartilhar**: abre o WhatsApp com o texto e o link direto do app (`.../#app-livro-caixa`), copia o link ou usa o compartilhamento do celular.

Limite por imagem: cerca de 900 KB depois da compressão automática (ícones viram 384 × 384 PNG; telas, JPEG de até 1080 px).

---

## 6. Estrutura

```
loja-systekna/
├── index.html            esqueleto da página e navegação
├── manifest.webmanifest  nome, ícones e atalhos da PWA
├── sw.js                 cache offline e atualização
├── firestore.rules       regras de segurança do Firestore
├── css/styles.css        tokens claro/escuro e componentes
├── js/config.js          Firebase, e-mails de administrador, versão
├── js/app.js             telas, roteador por hash, Gestão, avaliações
├── js/data.js            camada de dados (demonstração ou Firebase)
├── js/seed.js            catálogo inicial dos 10 apps
└── icons/                ícones 192, 512, maskable e Apple
```

Detalhes técnicos em [ARQUITETURA.md](ARQUITETURA.md).

---

## 7. Próximas etapas do processo Systekna

- **Homologação:** testar em Android e iPhone, claro e escuro, offline, conta comum e conta de administrador.
- **Google Play:** empacotar com **PWABuilder (TWA)** — veja `guia-google-play-systekna.md`.
- **Login no app instalado:** em alguns celulares a janela do Google abre como redirecionamento em vez de pop-up; o código já trata os dois casos.
