const gatinhos = JSON.parse(localStorage.getItem('catsData'))

const dialog = document.querySelector('dialog')
createCatCard(onlyCats[0], 'jpg', dialog)

const cards = catalogo.querySelectorAll('.card');

cards.forEach(card => {
    card.addEventListener('click', () => {

        const gatoNome = card.querySelector('.gato-nome').innerText

        const index = gatos.findIndex(gato => gato.nome === gatoNome)

        dialog.innerHTML = ''
        createCatCard(gatinhos[index], 'jpg', dialog)
        eventListener(dialog)

        dialog.showModal()
    })
})


function eventListener(dialog) {
    const closeDialog = dialog.querySelector('.botao-close')

    closeDialog.addEventListener("click", () => {
        dialog.close()
    })

    const pickImg = dialog.querySelectorAll(".img-pick")
    const carrosselDiv = dialog.querySelector(".carrossel")
    const leftArrowicon = dialog.querySelector(".pick-arrow-left")
    const rightArrowIcon = dialog.querySelector(".pick-arrow-right")

    // // Scroll to the previous image with looping behavior
    leftArrowicon.addEventListener("click", () => {
        const currentScroll = carrosselDiv.scrollLeft
        const imageWidth = pickImg[0].offsetWidth + 1.2 * 16
        const newScroll = currentScroll - imageWidth

        if (newScroll < 0) {
            carrosselDiv.scrollTo({ left: carrosselDiv.scrollWidth - carrosselDiv.clientWidth, behavior: "smooth" })
        } else {
            carrosselDiv.scrollTo({ left: newScroll, behavior: "smooth" })
        }
    })

    // Scroll to the next image with looping behavior
    rightArrowIcon.addEventListener("click", () => {
        const currentScroll = carrosselDiv.scrollLeft
        const imageWidth = pickImg[0].offsetWidth + 1.2 * 16
        const newScroll = currentScroll + imageWidth

        if (newScroll >= carrosselDiv.scrollWidth - carrosselDiv.clientWidth) {
            carrosselDiv.scrollTo({ left: 0, behavior: "smooth" })
        } else {
            carrosselDiv.scrollTo({ left: newScroll, behavior: "smooth" })
        }
    })

    // animação do coração de favorito
    const fav = dialog.querySelector('.botao.botao-fav')
    fav.addEventListener('click', () => {
        const heart = fav.querySelector('.icon')
        heart.classList.toggle('hollow')
        heart.classList.toggle('liked')
    })
}
