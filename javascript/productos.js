const botonAbrir = document.getElementById("sidebar-toggle");
const navbar = document.getElementById("navbarLateral");

function abrirNavbar(){
   navbar.classList.add("active");
}

function cerrarNavbar(){
   navbar.classList.remove("active");
}


botonAbrir.addEventListener("click", abrirNavbar);
botonAbrir.addEventListener("click", cerrarNavbar);