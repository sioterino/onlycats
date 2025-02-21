let cats = JSON.parse(localStorage.getItem("catsData"))

const pick = document.querySelector('.pick')
createPick(cats[randInt(0, cats.length)], 'jpg')

function createPick(cat, ext) {
    const img = document.createElement('div')
    img.classList.add('img-pick')

    img.style.backgroundImage = `url(${cat.imgPath[0]}.${ext})` 

    pick.appendChild(img)

    const superior = document.createElement('div')
    superior.classList.add('superior')

    const idcat = document.createElement('p')
    const nomecat = document.createElement('p')
    const assinantescat = document.createElement('p')

    idcat.classList.add('idcat')
    nomecat.classList.add('nomecat')
    assinantescat.classList.add('assinantescat')

    idcat.textContent = cat.id
    nomecat.textContent = cat.nome
    assinantescat.textContent = `${cat.popularidade} Assinantes`

    superior.append(idcat, nomecat, assinantescat)
    pick.appendChild(superior)

    const table = document.createElement('table')
    const tableTitle = document.createElement('p')
    tableTitle.textContent = 'Cat Information'
    const tbody = document.createElement('tbody')

    const catInfo = [
        { label: 'Tutor', value: cat.tutor.nome[0] },
        { label: 'Sexo', value: cat.sexo === 0 ? 'Fêmea' : 'Macho', icon: cat.sexo === 0 ? 'female' : 'male' },
        { label: 'Idade', value: cat.idade },
        { label: 'Cor', value: cat.cor }
    ];

    for (let i = 0; i < catInfo.length; i++) {
        const tr = document.createElement('tr')

        const th = document.createElement('th')
        th.textContent = catInfo[i].label

        const td = document.createElement('td')

        if (catInfo[i].icon) {
            const iconSpan = document.createElement('span')
            iconSpan.classList.add('icon', catInfo[i].icon)
            iconSpan.textContent = catInfo[i].icon
            td.appendChild(iconSpan)
        }

        td.appendChild(document.createTextNode(' '))
        td.appendChild(document.createTextNode(catInfo[i].value))

        tr.appendChild(th)
        tr.appendChild(td)

        tbody.appendChild(tr)
    }

    table.appendChild(tableTitle)
    table.appendChild(tbody)

    pick.appendChild(table)
}

function randInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
