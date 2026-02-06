const menuBtn = document.getElementById("menuBtn")
const mobileMenu = document.getElementById("mobileMenu")
const menuLinks = document.querySelectorAll(".mobileMenuSpace li a")
const closeBtn = document.getElementById("closeBtn")
const overlay = document.getElementById("overlay")

// Adicionando evento de abrir e fechar
menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("noScroll")
    overlay.classList.toggle("active")
})

closeBtn.addEventListener("click",closeMenu)
overlay.addEventListener("click",closeMenu)

menuLinks.forEach(link => {
    link.addEventListener("click", closeMenu)
    })

// Função para fechar o menu
function closeMenu(){
    mobileMenu.classList.remove("active")
    document.body.classList.remove("noScroll")
    overlay.classList.remove("active")
}
