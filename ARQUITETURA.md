# Arquitetura · Loja Systekna

## Visão geral

Aplicação de página única (SPA) em HTML, CSS e JavaScript puro, sem etapa de build. Cada tela é gerada por uma função e trocada por um roteador baseado em `location.hash`, o que faz o botão **voltar** do celular funcionar e permite links diretos (`#app-livro-caixa`, `#gestao`).

```
index.html ─┬─ css/styles.css        (tokens + componentes)
            ├─ js/config.js          (configuração global: window.STK_CONFIG)
            └─ js/app.js  (módulo) ──► js/data.js ──► js/seed.js
                                          │
                       ┌──────────────────┴──────────────────┐
                 modo demonstração                       modo Firebase
          localStorage + IndexedDB             Firestore + Auth (Google)
```

## Rotas

| Hash | Tela |
|---|---|
| `#inicio` | Destaques (carrossel, novidades recentes, prateleiras por categoria, coleção "Em teste") |
| `#apps` | Categorias em blocos + lista filtrada |
| `#buscar` | Busca por nome, descrição, categoria e recursos |
| `#biblioteca` | Favoritos (salvos no aparelho) |
| `#app-<id>` | Página do app: banner, abas Visão geral / Privacidade / Avaliações |
| `#conta` | Entrar com Google, sair, dados da demonstração |
| `#sobre` | Sobre, compartilhar a loja, como instalar, versão |
| `#apoiar` | Apoie a Systekna: QR e código Pix copia e cola, QR e endereço Bitcoin |
| `#gestao` | Painel do administrador |
| `#novo`, `#editar-<id>` | Formulário de app |

## Camada de dados (`js/data.js`)

As duas implementações expõem a mesma interface, então `app.js` não sabe onde os dados estão:

| Método | Função |
|---|---|
| `onAuth(cb)` | usuário atual `{uid, name, email, photo, isAdmin}` ou `null` |
| `signIn()` / `signOut()` | login Google (pop-up, com redirecionamento como alternativa) |
| `onApps / onReviews / onReplies(cb)` | assinaturas em tempo real das coleções |
| `setApp / updateApp / deleteApp` | escrita do catálogo |
| `putImage(blob)` → id, `getImage(id)` → data URL, `deleteImage(id)` | ícones e telas |
| `setReview(uid, doc)` / `setReply(uid, doc)` | avaliações e respostas |
| `seed()` | importa o catálogo inicial |

## Modelo de dados (Firestore)

**`apps/{id}`**
```js
{ name, short, cat, status: "ok"|"beta"|"lab", desc, feats: [], data,
  url, version, versionAt, news, visible, featured, storyTitle, storyText,
  h /* matiz 0–359 */, ic /* ícone da galeria */, imgId, shots: [{id}],
  order, updatedAt }
```

**`images/{id}`** — `{ data: "data:image/...;base64,...", type, size, at }`

**`reviews/{uid}`** — um documento por pessoa com todas as avaliações dela:
```js
{ name, photo, at, apps: { "<appId>": { stars: 1–5, text, at } } }
```

**`settings/support`** — `{ pixKey, pixName, pixCity, btcAddress, message }` (apoio; leitura pública, escrita do administrador)

**`replies/{uid}`** — respostas do administrador às avaliações daquela pessoa:
```js
{ apps: { "<appId>": { text, at } } }
```

Um documento por pessoa mantém as regras simples (`request.auth.uid == uid`) e cabe com folga no limite de 1 MiB por documento.

## Segurança

- Leitura pública de catálogo, imagens, avaliações e respostas.
- Escrita do catálogo, das imagens e das respostas: só o e-mail verificado do administrador (`firestore.rules`).
- Avaliações: cada conta escreve apenas o próprio documento.
- O app escapa todo texto vindo do banco antes de inserir no HTML (`esc`), e imagens só são exibidas a partir de data URLs `image/*` validadas pelas regras.

## Offline e atualização

- `sw.js` guarda o "esqueleto" do app (HTML, CSS, JS, ícones), as fontes e o SDK do Firebase.
- Navegação: rede primeiro, cópia salva sem conexão.
- O Firestore usa cache persistente (IndexedDB), então o catálogo aparece mesmo offline.
- Nova versão: o service worker novo fica em espera e a loja mostra o aviso **Atualizar**; ao tocar, ele assume e a página recarrega.

## Imagens

Processadas no próprio navegador antes de enviar:
- **Ícone:** recorte central quadrado, 384 × 384, PNG
- **Telas:** lado maior até 1080 px, JPEG 86%

## Decisões

| Decisão | Motivo |
|---|---|
| Sem framework e sem build | Mesmo padrão dos outros apps Systekna; abre direto no SHTTPS e no GitHub Pages |
| Imagens no Firestore em vez do Cloud Storage | Funciona no plano gratuito, sem configuração extra |
| Modo demonstração embutido | Testar a loja inteira antes de criar o projeto Firebase |
| Hash router | Voltar do celular, links diretos e compatível com GitHub Pages sem regras de servidor |
