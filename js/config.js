/* =========================================================
   Loja Systekna · configuração
   ---------------------------------------------------------
   1) Sem Firebase (firebase: null) a loja roda em MODO DEMONSTRAÇÃO:
      dados ficam neste aparelho com suporte a persistência IndexedDB/localStorage.
   2) Com Firebase: cole aqui o objeto firebaseConfig do console
      (Configurações do projeto → Seus apps → Web) e adicione seu e-mail
      em adminEmails.
   3) adminMasterPin: PIN simples para autenticação direta de Administrador
      sem dependência de pop-ups bloqueados no navegador.
   ========================================================= */
window.STK_CONFIG = {
  appVersion: "1.4.0",

  firebase: null,
  /* Exemplo para publicação:
  firebase: {
    apiKey: "AIza...",
    authDomain: "loja-systekna.firebaseapp.com",
    projectId: "loja-systekna",
    storageBucket: "loja-systekna.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:xxxxxxxxxxxx"
  },
  */

  adminEmails: [
    "celso.almeida.leite@hotmail.com",
    "celso@systekna.com.br",
    "admin@systekna.com.br"
  ],

  // PIN mestre de acesso administrativo imediato (sem pop-up externo)
  adminMasterPin: "123456",

  contactEmail: "contato@systekna.com.br"
};
