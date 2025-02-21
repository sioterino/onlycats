const dialog = document.querySelector('dialog')
createCatCard(onlyCats[4], 'jpg', dialog)

const openDialog = document.getElementById("openDialog")
const closeDialog = dialog.querySelector('.botao-close')

openDialog.addEventListener("click", () => {
    dialog.showModal()
})

closeDialog.addEventListener("click", () => {
    dialog.close()
})

const pickImg = dialog.querySelectorAll(".img-pick")
const carrosselDiv = dialog.querySelector(".carrossel")
const leftArrowicon = dialog.querySelector(".pick-arrow-left")
const rightArrowIcon = dialog.querySelector(".pick-arrow-right")

function calculateScroll(isLeftArrowicon) {
    // númeoro de pixels que foram scrolados no carrosselDivl
    const currentScroll = carrosselDiv.scrollLeft
    // tamanho da imagem + gap: 1.2rem da grid
    const imageWidth = pickImg[0].offsetWidth + 1.2 * 16
    // calcula o quanto deverá ser scrollado para o lado
    return isLeftArrowicon ? currentScroll - imageWidth : currentScroll + imageWidth
}

// Scroll to the previous image with looping behavior
leftArrowicon.addEventListener("click", () => {
    const newScroll = calculateScroll(true)

    if (newScroll < 0) {
        carrosselDiv.scrollTo({ left: carrosselDiv.scrollWidth - carrosselDiv.clientWidth, behavior: "smooth" })
    } else {
        carrosselDiv.scrollTo({ left: newScroll, behavior: "smooth" })
    }
})

// Scroll to the next image with looping behavior
rightArrowIcon.addEventListener("click", () => {
    const newScroll = calculateScroll(false)

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
