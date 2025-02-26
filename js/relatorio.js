const assinantes = JSON.parse(localStorage.getItem('assinantes'))

let rowsAssinantes = 0
let rowsPagamento = 0

if (assinantes) {
    loadTable(assinantes)
} else {
    fetch('../json/assinantes.json').then(res => res.json()).then(data => {
            loadTable(data)
        })
}

const hoje = document.querySelector('.periodo')
hoje.textContent = new Date().toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric',})

function loadTable(data) {

    const membros = document.querySelector('.membros')
    if (membros) {
            data.forEach((m, i) => {

                const tr = loadMembros(m, i)
                if (tr) membros.appendChild(tr)
                    
            })
    }

    const pagamentos = document.querySelector('.pagamentos')
    if (pagamentos) {
        data.forEach(membro => {
            membro.pagamentos.forEach((_, j) => {

                const tr = loadPagamentos(membro, j)
                if (tr) pagamentos.appendChild(tr)

            })
        })
    }
}

function loadPagamentos(membro, j) {
    if (membro.excluido || membro.pagamentos[j].excluido) return null

    const tr = rowsPagamento % 2 !== 0 ? createElement('tr', 'impar') : createElement('tr')

    const dados = [
        { classe: 'id', textContent: `#${membro.id}` },
        { classe: 'nome', textContent: proper(membro.nome) },
        { classe: 'addr', textContent: proper(membro.endereco) },
        { classe: 'tel', textContent: membro.telefone },

        { classe: 'id-pagamento', textContent: `#${membro.pagamentos[j].id}` },
        { classe: 'data', textContent: membro.pagamentos[j].data },
        { classe: 'hora', textContent: membro.pagamentos[j].hora },
        { classe: 'metodo', textContent: membro.pagamentos[j].descricao },
        { classe: 'plano', textContent: proper(membro.pagamentos[j].plano) },
        { classe: 'valor', textContent: `R$${membro.pagamentos[j].valor},00` },
    ]

    dados.forEach(item => tr.appendChild(createElement('td', item.classe, item.textContent)))

    rowsPagamento++

    return tr
}

function loadMembros(membro, i) {
    if (membro.excluido) return null

    const tr = rowsAssinantes % 2 !== 0 ? createElement('tr', 'impar') : createElement('tr')

    const dados = [
        { classe: 'id', textContent: `#${membro.id}` },
        { classe: 'cadastro', textContent: membro.dataAdesao },
        { classe: 'nome', textContent: proper(membro.nome) },
        { classe: 'addr', textContent: proper(membro.endereco) },
        { classe: 'tel', textContent: membro.telefone },
        { classe: 'plano', textContent: proper(membro.plano) },
        { classe: 'valor', textContent: `R$${membro.valor},00` },
    ]

    dados.forEach(item => tr.appendChild(createElement('td', item.classe, item.textContent)))

    rowsAssinantes++

    return tr
}

document.querySelector('.imprimir').addEventListener('click', () => window.print())
