let cats = JSON.parse(localStorage.getItem("catsData"))

const pick = document.querySelector('.pick')
const onlyCats = filterCats()
createPick(onlyCats[randInt(0, onlyCats.length)], 'jpg')

function filterCats() {
    return cats.filter(cat => cat.isCat)
}

function createPick(cat, ext) {
    console.log(cat)
    const img = document.createElement('div')
    img.classList.add('img-pick')

    img.style.backgroundImage = `url(${cat.imgPath[randInt(0, cat.imgPath.length)]}.${ext})` 

    pick.appendChild(img)

    const descricao = document.createElement('div')
    descricao.classList.add('descricao')

    const superior = document.createElement('div')
    superior.classList.add('superior')

    descricao.appendChild(superior)

    const titulo = document.createElement('div')
    const fav = document.createElement('div')

    titulo.classList.add('titulo')
    fav.classList.add('fav')

    superior.append(titulo, fav)

    const idcat = document.createElement('p')
    const nomecat = document.createElement('p')
    const assinantescat = document.createElement('p')

    idcat.classList.add('idcat')
    nomecat.classList.add('nomecat')
    assinantescat.classList.add('assinantescat')

    idcat.textContent = `#${cat.id}`
    nomecat.textContent = cat.nome
    assinantescat.textContent = `${formatNumber(cat.popularidade)} Assinantes`

    titulo.append(idcat, nomecat, assinantescat)

    const heartDiv = document.createElement('div')
    heartDiv.classList.add('botao', 'botao-fav')
    const heart = document.createElement('span')
    heart.classList.add('icon', 'heart', 'hollow')
    heart.textContent = 'favorite'
    heartDiv.append(heart)

    const botoes = document.createElement('div')
    botoes.classList.add('botoes')

    const chatDiv = document.createElement('div')
    chatDiv.classList.add('botao', 'botao-chat')
    const chatP = document.createElement('span')
    chatP.textContent = 'Conversar'
    const chat = document.createElement('span')
    chat.classList.add('icon', 'chat', 'hollow')
    chat.textContent = 'sms'
    chatDiv.append(chatP, chat)

    const cartDiv = document.createElement('div')
    cartDiv.classList.add('botao', 'botao-cart')
    const cartP = document.createElement('span')
    cartP.textContent = 'Assinar'
    const cart = document.createElement('span')
    cart.classList.add('icon', 'cart')
    cart.textContent = 'shopping_cart'
    cartDiv.append(cartP, cart)

    botoes.appendChild(chatDiv)
    botoes.appendChild(cartDiv)

    titulo.appendChild(botoes)

    fav.append(heartDiv)

    const table = document.createElement('table')
    const tableTitle = document.createElement('p')
    tableTitle.classList.add('table-titulo')
    tableTitle.textContent = 'Sobre o gato'
    const tbody = document.createElement('tbody')

    descricao.appendChild(table)

    const content = [
        { label: 'Tutor', value: [...cat.tutor.nome, ...cat.tutor.sobrenome].join(' ') },
        { label: 'Sexo', value: cat.sexo === 0 ? 'Fêmea' : 'Macho', icon: cat.sexo === 0 ? 'female' : 'male' },
        { label: 'Idade', value: cat.idade },
        { label: 'Cor', value: cat.cor }
    ]    

    for (let i = 0; i < content.length; i++) {
        const tr = document.createElement('tr')
        if (i % 2 != 0) {
            tr.classList.add('impar')
        }

        const th = document.createElement('th')
        th.textContent = content[i].label

        const td = document.createElement('td')

        td.appendChild(document.createTextNode(' '))
        td.appendChild(document.createTextNode(content[i].value))

        if (content[i].icon) {
            const iconSpan = document.createElement('span')
            iconSpan.classList.add('icon', content[i].icon)
            iconSpan.textContent = content[i].icon
            td.appendChild(iconSpan)
        }

        tr.appendChild(th)
        tr.appendChild(td)

        tbody.appendChild(tr)
    }

    table.appendChild(tableTitle)
    table.appendChild(tbody)

    const tags = document.createElement('div')
    tags.classList.add('tags')
    descricao.appendChild(tags)

    cat.personalidade.forEach(item => {
        const tag = document.createElement('p')
        tag.classList.add('tag')
        tag.textContent = item
        tags.appendChild(tag)
    })

    pick.appendChild(descricao)
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        notation: "compact",
        maximumFractionDigits: 1
    }).format(num);
  }

const fav = document.querySelector('.botao-fav')
fav.addEventListener('click', () => {
    const heart = fav.querySelector('.icon')
    heart.classList.toggle('hollow')
    heart.classList.toggle('liked')
})
