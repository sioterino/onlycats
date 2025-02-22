fetch('../json/cats.json')
  .then(response => response.json())
  .then(cats => {

    const onlyCats = cats.filter(cat => cat.isCat)

    const pick = document.querySelector('.pick')
    createCatCard(onlyCats[randInt(0, onlyCats.length)], '.jpg', pick)

    catCardEventListener(pick)

  })

function createCatCard(cat, ext, card) {

    const imgContainer = createElement('div', 'img-container')

    const arrowLeft = createElement('span', ['icon', 'pick-arrow-left'], 'arrow_back_ios')
    const arrowRight = createElement('span', ['icon', 'pick-arrow-right'], 'arrow_forward_ios')
    const carrossel = createElement('div', 'carrossel')

    imgContainer.append(arrowLeft, carrossel, arrowRight)
    
    for (let i = 0; i < cat.imgPath.length; i++) {
        const img = createElement('div', 'img-pick')    
        img.style.backgroundImage = `url(${cat.imgPath[i]}${ext})`     
        carrossel.append(img)
    }

    card.append(imgContainer)

    
    const descricao = createElement('div', 'descricao')
    const superior = createElement('div', 'superior')

    descricao.appendChild(superior)

    const titulo = createElement('div', 'titulo')
    const smallIcons = createElement('div', 'small-icons')

    superior.append(titulo, smallIcons)

    const idcat = createElement('p', 'idcat', `# ${cat.id}`)
    const nomecat = createElement('p', 'nomecat', cat.nome)
    const assinantescat = createElement('p', 'assinantescat', `${formatNumber(cat.popularidade)} Assinantes`)

    titulo.append(idcat, nomecat, assinantescat)


    const heartDiv = createElement('div', ['botao', 'botao-fav'])
    const heart = createElement('span', ['icon', 'heart', 'hollow'], 'favorite')
    heartDiv.append(heart)

    if (card.classList.contains('dialog')) {
        const closeDiv = createElement('div', ['botao', 'botao-close'])
        const close = createElement('span', ['icon', 'close'], 'close')
        closeDiv.append(close)
        smallIcons.append(closeDiv)
    }


    const botoes = createElement('div', 'botoes')

    const chatDiv = createElement('div', ['botao', 'botao-chat'])
    const chatP = createElement('p', null, 'Conversar')
    const chat = createElement('span', ['icon', 'chat', 'hollow'], 'sms')
    chatDiv.append(chatP, chat)

    const cartDiv = createElement('div', ['botao', 'botao-cart'])
    const cartP = createElement('p', null, 'Assinar')
    const cart = createElement('span', ['icon', 'cart'], 'shopping_cart')
    cartDiv.append(cartP, cart)

    botoes.appendChild(chatDiv)
    botoes.appendChild(cartDiv)
    titulo.appendChild(botoes)
    smallIcons.append(heartDiv)

    const table = document.createElement('table')
    const tableTitle = document.createElement('p')
    tableTitle.classList.add('table-titulo')
    tableTitle.textContent = 'Sobre o gato'
    const tbody = document.createElement('tbody')

    descricao.append(table)

    const content = [
        { label: 'Tutor', value: [...cat.tutor.nome, ...cat.tutor.sobrenome].join(' ') },
        { label: 'Sexo', value: cat.sexo === 0 ? 'Fêmea' : 'Macho', icon: cat.sexo === 0 ? 'female' : 'male' },
        { label: 'Idade', value: cat.idade },
        { label: 'Cor', value: cat.cor }
    ]    

    for (let i = 0; i < content.length; i++) {
        const tr = createElement('tr')
        if (i % 2 != 0) {
            tr.classList.add('impar')
        }

        console.log(i)
        const th = createElement('th', null, content[i].label)
        const td = createElement('td', null, content[i].value)

        if (content[i].icon) {
            const iconSpan = createElement('span', ['icon', content[i].icon], content[i].icon)
            td.appendChild(iconSpan)
        }

        tr.append(th, td)
        tbody.appendChild(tr)
    }

    table.appendChild(tableTitle)
    table.appendChild(tbody)

    const tags = createElement('div', 'tags')
    descricao.appendChild(tags)

    cat.personalidade.forEach(item => {
        const tag = createElement('p', 'tag', item)
        tags.appendChild(tag)
    })

    card.appendChild(descricao)
}

// gera um número aleatório onde min é inclusivo e max é exclusivo
