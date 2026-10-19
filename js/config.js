/* =========================================================
   Loja Systekna · configuração
   ---------------------------------------------------------
   1) Sem Firebase (firebase: null) a loja roda em MODO DEMONSTRAÇÃO:
      dados ficam só neste aparelho e você é o administrador.
   2) Com Firebase: cole aqui o objeto firebaseConfig do console
      (Configurações do projeto → Seus apps → Web) e coloque o seu
      e-mail em adminEmails. Use o MESMO e-mail no firestore.rules.
   ========================================================= */
window.STK_CONFIG = {
  appVersion: "1.3.0",

  firebase: null,
  /* Exemplo:
  firebase: {
    apiKey: "AIza...",
    authDomain: "loja-systekna.firebaseapp.com",
    projectId: "loja-systekna",
    storageBucket: "loja-systekna.appspot.com",
    messagingSenderId: "000000000000",
    appId: "1:000000000000:web:xxxxxxxxxxxx"
  },
  */

  adminEmails: ["seu-email@gmail.com"],

  contactEmail: "contato@systekna.com.br"
};
