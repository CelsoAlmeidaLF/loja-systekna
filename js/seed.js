/* Catálogo inicial da Loja Systekna.
   Usado no modo demonstração e no botão "Importar catálogo inicial" da Gestão.
   Cada app traz ícones vetoriais em Base64 e URLs diretas do ecossistema Systekna. */
export const SEED = [
  {
    "id": "livro-caixa",
    "tasks": [
      "controlar meus gastos",
      "organizar o cartão de crédito",
      "acompanhar minhas dívidas",
      "ver para onde vai meu dinheiro"
    ],
    "order": 1,
    "name": "Livro-Caixa",
    "cat": "Finanças",
    "h": 212,
    "ic": "caixa",
    "status": "ok",
    "short": "Receitas, despesas, cartão e dívidas",
    "desc": "Controle financeiro pessoal com lançamentos de receitas e despesas, fatura do cartão, metas e dívidas, com assistente e insights sobre os seus gastos.",
    "feats": [
      "Lançamentos com categorias",
      "Fatura e limite do cartão",
      "Metas e dívidas com progresso",
      "Modo claro, escuro e luz ambiente"
    ],
    "data": "Fica no aparelho",
    "featured": true,
    "storyTitle": "Seu dinheiro, sob controle",
    "storyText": "Receitas, cartão e dívidas num só lugar, com insights que mostram para onde vai cada real.",
    "url": "https://celsoalmeidalf.github.io/livro-caixa/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/livro-caixa",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzYwQTVGQSIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjMjU2M0VCIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzFENEVEOCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFFNDBBRiIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xOSA3VjRhMSAxIDAgMCAwLTEtMUg1YTIgMiAwIDAgMCAwIDRoMTVhMSAxIDAgMCAxIDEgMXY0aC0zYTIgMiAwIDAgMCAwIDRoM2ExIDEgMCAwIDAgMS0xdi0yYTEgMSAwIDAgMC0xLTEiLz48cGF0aCBkPSJNMyA1djE0YTIgMiAwIDAgMCAyIDJoMTVhMSAxIDAgMCAwIDEtMXYtNCIvPjwvZz4KPC9zdmc+"
  },
  {
    "id": "cripto",
    "tasks": [
      "acompanhar minhas criptomoedas",
      "converter bitcoin para real",
      "simular uma carteira de cripto"
    ],
    "order": 2,
    "name": "Cripto Portfólio",
    "cat": "Finanças",
    "h": 38,
    "ic": "cripto",
    "status": "ok",
    "short": "Conversor e carteira de criptomoedas",
    "desc": "Converta criptomoedas e acompanhe em reais o valor de uma carteira simulada.",
    "feats": [
      "Conversor entre moedas",
      "Simulador de portfólio",
      "Funciona como app instalado"
    ],
    "data": "Fica no aparelho",
    "url": "https://celsoalmeidalf.github.io/cripto-sim/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/cripto-sim",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZERTA0NyIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjRUFCMzA4Ii8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iI0NBOEEwNCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0ExNjIwNyIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMS43NjcgMTkuMDg5YzQuOTI0Ljg2OCA2LjE0LTYuMDI1IDEuMjE2LTYuODk0bS0xLjIxNiA2Ljg5NEw1Ljg2IDE4LjA0N201LjkwOCAxLjA0Mi0uMzQ3IDEuOTdtMS41NjMtOC44NjRjNC45MjQuODY5IDYuMTQtNi4wMjUgMS4yMTUtNi44OTNtLTEuMjE1IDYuODkzLTMuOTQtLjY5NG01LjE1NS02LjJMOC4yOSA0LjI2bTUuOTA4IDEuMDQyLjM0OC0xLjk3TTcuNDggMjAuMzY0bDMuMTI2LTE3LjcyNyIvPjwvZz4KPC9zdmc+"
  },
  {
    "id": "cambio",
    "tasks": [
      "ver a cotação do dólar",
      "converter dólar para real"
    ],
    "order": 3,
    "name": "Câmbio",
    "cat": "Finanças",
    "h": 152,
    "ic": "cambio",
    "status": "ok",
    "short": "Cotação do dólar e conversor",
    "desc": "Painel com a cotação USD/BRL e conversor nos dois sentidos.",
    "feats": [
      "Painel do dólar",
      "Conversor USD ⇄ BRL",
      "Seletor de sentido"
    ],
    "data": "Fica no aparelho",
    "url": "https://celsoalmeidalf.github.io/cambio-sim/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/cambio-sim",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzJERDRCRiIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjMEQ5NDg4Ii8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzBGNzY2RSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzExNUU1OSIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04IDMgNCA3bDQgNCIvPjxwYXRoIGQ9Ik00IDdoMTYiLz48cGF0aCBkPSJtMTYgMjEgNC00LTQtNCIvPjxwYXRoIGQ9Ik0yMCAxN0g0Ii8+PC9nPgo8L3N2Zz4="
  },
  {
    "id": "despesas-casa",
    "tasks": [
      "dividir as contas da casa",
      "organizar despesas com quem mora comigo"
    ],
    "order": 4,
    "name": "Despesas da Casa",
    "cat": "Casa",
    "h": 18,
    "ic": "casa",
    "status": "ok",
    "short": "Despesas compartilhadas em tempo real",
    "desc": "Divida as despesas da casa com quem mora com você. Os lançamentos sincronizam entre os aparelhos.",
    "feats": [
      "Lançamentos compartilhados",
      "Sincronização entre celulares",
      "Funciona no Android e no iPhone"
    ],
    "data": "Sincronizado via Firebase",
    "url": "https://despesasdacasa.web.app",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/Financas-da-Casa",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0ZCOTIzQyIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjRUE1ODBDIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iI0MyNDEwQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzlBMzQxMiIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zIDExbDktNyA5IDd2OUgzek05IDIwdi02aDZ2NiIvPjwvZz4KPC9zdmc+"
  },
  {
    "id": "agenda",
    "tasks": [
      "agendar clientes do salão",
      "controlar horários dos profissionais",
      "calcular comissão"
    ],
    "order": 5,
    "name": "Studio Agenda",
    "cat": "Negócios",
    "h": 328,
    "ic": "agenda",
    "status": "beta",
    "short": "Agenda de atendimentos para salões",
    "desc": "Agenda em grade por profissional, cadastro de clientes e serviços, fechamento, pagamento, comissão e relatórios.",
    "feats": [
      "Grade de 30 em 30 minutos",
      "Comanda, fechamento e pagamento",
      "Comissão por profissional",
      "Relatórios de faturamento"
    ],
    "data": "Fica no aparelho",
    "featured": true,
    "storyTitle": "A agenda do salão num toque",
    "storyText": "Horários por profissional, comanda e comissão no mesmo lugar.",
    "url": "https://celsoalmeidalf.github.io/studio-agenda/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/studio-agenda",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48cmVjdCB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgcng9IjExMiIgZmlsbD0iI2MyMjU1YyIvPjxyZWN0IHg9IjExMiIgeT0iMTI4IiB3aWR0aD0iMjg4IiBoZWlnaHQ9IjI3MiIgcng9IjM2IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iMzIiLz48cGF0aCBkPSJNMTEyIDIwMGgyODhNMTg0IDk2djY0TTMyOCA5NnY2NCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjMyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSIyNjAiIHk9IjI1NiIgd2lkdGg9Ijg4IiBoZWlnaHQ9IjgwIiByeD0iMTYiIGZpbGw9IiNmZmYiLz48L3N2Zz4="
  },
  {
    "id": "corretor",
    "tasks": [
      "controlar vendas de imóveis",
      "acompanhar o faturamento da equipe"
    ],
    "order": 6,
    "name": "Corretor",
    "cat": "Negócios",
    "h": 262,
    "ic": "predio",
    "status": "beta",
    "short": "Vendas e faturamento de imóveis",
    "desc": "Gestão das vendas de apartamentos para gerentes e vendedores, com cadastro de imóveis e faturamento.",
    "feats": [
      "Cadastro por gerente e vendedor",
      "Funil de vendas",
      "Faturamento por período"
    ],
    "data": "Fica no aparelho",
    "url": "https://celsoalmeidalf.github.io/corretor/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/corretor",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0MwODRGQyIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjOTMzM0VBIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzdFMjJDRSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzZCMjFBOCIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik00IDIxVjVsOC0ydjE4TTEyIDloOHYxMk03IDhoMk03IDEyaDJNNyAxNmgyTTE1IDEzaDJNMTUgMTdoMiIvPjwvZz4KPC9zdmc+"
  },
  {
    "id": "carros",
    "tasks": [
      "controlar vendas de carros",
      "acompanhar o faturamento da revenda"
    ],
    "order": 7,
    "name": "Carros",
    "cat": "Negócios",
    "h": 4,
    "ic": "carro",
    "status": "beta",
    "short": "Vendas da corretora de carros",
    "desc": "O mesmo modelo do app Corretor, adaptado para a venda de veículos.",
    "feats": [
      "Cadastro de veículos",
      "Acompanhamento das vendas",
      "Faturamento por período"
    ],
    "data": "Fica no aparelho",
    "url": "https://celsoalmeidalf.github.io/carros/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/carros",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0Y4NzE3MSIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjREMyNjI2Ii8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iI0I5MUMxQyIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzk5MUIxQiIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS44IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik01IDE3aDE0TTYgMTdsMS41LTZoOUwxOCAxN003IDExbDEtNGg4bDEgNE04IDIxdi0yTTE2IDIxdi0yIi8+PC9nPgo8L3N2Zz4="
  },
  {
    "id": "carteira",
    "tasks": [
      "guardar minha identidade digital",
      "provar quem eu sou sem expor dados"
    ],
    "order": 8,
    "name": "Carteira Soberana",
    "cat": "Identidade",
    "h": 186,
    "ic": "chave",
    "status": "lab",
    "short": "Sua identidade digital, só sua",
    "desc": "Identidade soberana com chave pública e privada, PIN de 6 dígitos, recuperação por 12 palavras e crachás emitidos por serviços.",
    "feats": [
      "Identidade guardada só com você",
      "Recuperação com 12 palavras",
      "Crachás de acesso a serviços"
    ],
    "data": "Criptografado no aparelho",
    "featured": true,
    "storyTitle": "Uma identidade que é só sua",
    "storyText": "Chaves no seu aparelho, recuperação por 12 palavras e nenhum dado em servidor.",
    "url": "https://celsoalmeidalf.github.io/identidade-systekna/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/identidade-systekna",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzdDQ0JGOCIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjM0JBMEVBIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzFBN0FENCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJCOERFMiIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS43IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzbDcgM3Y1YzAgNC41LTMgOC4zLTcgMTAtNC0xLjctNy01LjUtNy0xMFY2eiIvPjxwYXRoIGQ9Ik05IDEybDIgMiA0LTQiLz48L2c+Cjwvc3ZnPg=="
  },
  {
    "id": "governanca",
    "tasks": [
      "aprovar identidades digitais",
      "credenciar serviços"
    ],
    "order": 9,
    "name": "Governança Systekna",
    "cat": "Identidade",
    "h": 240,
    "ic": "escudo",
    "status": "lab",
    "short": "Aprova identidades e credencia serviços",
    "desc": "O cartório digital da Systekna: aprova identidades e credencia serviços para emitir crachás.",
    "feats": [
      "Aprovação de identidades",
      "Credenciamento de serviços"
    ],
    "data": "Nenhum dado pessoal em servidor",
    "url": "https://celsoalmeidalf.github.io/governanca-systekna/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/governanca-systekna",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzVFOUZFMCIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjMUY2RkMwIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzBFNEY5NiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzFBNjJBRSIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS43IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0zLjg1IDguNjJhNCA0IDAgMCAxIDQuNzgtNC43NyA0IDQgMCAwIDEgNi43NCAwIDQgNCAwIDAgMSA0Ljc4IDQuNzggNCA0IDAgMCAxIDAgNi43NCA0IDQgMCAwIDEtNC43NyA0Ljc4IDQgNCAwIDAgMS02Ljc1IDAgNCA0IDAgMCAxLTQuNzgtNC43NyA0IDQgMCAwIDEgMC02Ljc2WiIvPjxwYXRoIGQ9Ik05IDEybDIgMiA0LTQiLz48L2c+Cjwvc3ZnPg=="
  },
  {
    "id": "servicos",
    "tasks": [
      "emitir crachás de acesso para clientes"
    ],
    "order": 10,
    "name": "Serviços Systekna",
    "cat": "Identidade",
    "h": 282,
    "ic": "cracha",
    "status": "lab",
    "short": "Emissão de crachás para clientes",
    "desc": "App para qualquer serviço pedir à Governança permissão para emitir crachás a clientes com carteira.",
    "feats": [
      "Pedido de credenciamento",
      "Emissão de crachás de acesso"
    ],
    "data": "Nenhum dado pessoal em servidor",
    "url": "https://celsoalmeidalf.github.io/servicos-systekna/",
    "repoUrl": "https://github.com/CelsoAlmeidaLF/servicos-systekna",
    "iconBase64": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzdFRENBMCIvPjxzdG9wIG9mZnNldD0iLjQ4IiBzdG9wLWNvbG9yPSIjMzRBODYzIi8+CiAgICA8c3RvcCBvZmZzZXQ9Ii41MiIgc3RvcC1jb2xvcj0iIzFFODA0OCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzJBOTQ1NyIvPgogIDwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPgogIDxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTEyIiBmaWxsPSJ1cmwoI2cpIi8+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjU2IDI1Nikgc2NhbGUoMTIpIHRyYW5zbGF0ZSgtMTIgLTEyKSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIgogICAgIHN0cm9rZS13aWR0aD0iMS43IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik0xMiAzbDIuNCAxLjggMy0uMi45IDIuOSAyLjQgMS44LTEgMi44IDEgMi44LTIuNCAxLjgtLjkgMi45LTMtLjJMMTIgMjFsLTIuNC0xLjgtMyAuMi0uOS0yLjktMi40LTEuOCAxLTIuOC0xLTIuOCAyLjQtMS44LjktMi45IDMgLjJ6Ii8+PHBhdGggZD0iTTguNSAxMmwyLjUgMi41IDQuNS01Ii8+PC9nPgo8L3N2Zz4="
  }
].map(a => Object.assign({
  url: "", repoUrl: "", docsUrl: "", version: "", versionAt: "", news: "", visible: true, featured: false,
  storyTitle: "", storyText: "", imgId: "", iconBase64: "", shots: [], tasks: []
}, a));
