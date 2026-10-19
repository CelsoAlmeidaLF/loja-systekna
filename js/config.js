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
  appVersion: "1.4.2",

  /* Em modo demonstração (null), o catálogo local e o cofre operam com Local-First.
     Para conectar ao Firebase Firestore do ecossistema Systekna, descomente: */
  firebase: null,
  /*
  firebase: {
    apiKey: "AIzaSyCQx8kJyXEReASiQMI4a5bT5NNWgtBmJpM",
    authDomain: "systekna-feedback.firebaseapp.com",
    projectId: "systekna-feedback",
    appId: "1:870927975015:web:0576bd5e3cdd8d067d8ac2"
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
