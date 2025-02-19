const body = document.querySelector("body");
const header = body.querySelector("header");

const menu = header.querySelector(".menu");
menu.addEventListener("click", toggleSidebar);

const close = header.querySelector(".close");
close.addEventListener("click", toggleSidebar);

const sidebar = header.querySelector(".sidebar");
const user = sidebar.querySelector(".user");
const dropUp = sidebar.querySelector(".dropdown-container");

function toggleSidebar(e) {
  sidebar.classList.toggle("show");

  // impede que o click se propague para
  // o elemento body e chame e ative o
  // event listener do corpo do html
  e.stopPropagation();

  // fecha a aba de relatórios da side bar
  // caso o usuário tenha deixado ela aberta
  if (!sidebar.classList.contains("show")) {
    setTimeout(() => {
      dropUp.classList.remove("showDropUp");
    }, 200);
  }
}

// abre os relatórios ao clicar no usuário admin
user.addEventListener("click", () => {
  dropUp.classList.toggle("showDropUp");
});

// checa qual o alvo sendo clicado e, caso não
// seja um elemento da sidebar, fecha a sidebar
body.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && sidebar.classList.contains("show")) {
    sidebar.classList.toggle("show");
    if (!sidebar.classList.contains("show")) {
      setTimeout(() => {
        dropUp.classList.remove("showDropUp");
      }, 200);
    }
  }
});
