fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {

    const dialog = document.querySelector('dialog')
    const board = dialog.querySelector('.dialog')
    createCatCard(cats[0], 'jpg', board)

    const catalogo = document.querySelector('.catalogo')
    const cards = catalogo.querySelectorAll('.card')

    cards.forEach(card => {
        card.addEventListener('click', () => {

            const catid = card.querySelector('.catid').innerText.replace("# ", "")

            const index = cats.findIndex(cat => cat.id === catid)

            board.innerHTML = ''
            createCatCard(cats[index], '.jpg', board)
            catCardEventListener(board)

            dialog.addEventListener('click', () => {
                dialog.close()
            })

            dialog.showModal()
        })
    })

})