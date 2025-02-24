const assinantes = JSON.parse(localStorage.getItem('assinantes'))

let rows = 0 // calculo de linhas para relarório de assinantes

if (assinantes) {
    loadTable(assinantes)
} else {

    fetch('../json/assinantes.json').then(res => res.json()).then(data => {
        loadTable(data)
    })
}

const hoje = document.querySelector('.desc table tbody td');
hoje.textContent = new Date().toLocaleDateString('pt-BR', {day: 'numeric', month: 'long', year: 'numeric'})



function loadTable(data) {
    const membros = document.querySelector('.membros')
    if (membros) {
        data.forEach((m, i) => membros.appendChild(loadMembros(m, i)))
    }
    
    
    const pagamentos = document.querySelector('.pagamentos')
    if (pagamentos) {
        
        for (let i = 0; i < data.length; i++) {
            
            for (let j = 0; j < data[i].pagamentos.length; j++) {
                
                pagamentos.appendChild(loadPagamentos(data[i], j))
                
            }
            
        }
        
    }
}

function loadPagamentos(membro, j) {
    const tr = rows % 2 !== 0 ? createElement('tr', 'impar') : createElement('tr')

    const dados = [
        {classe: 'id', textContent: `# ${membro.id}`},
        {classe: 'nome', textContent: proper(membro.nome)},
        {classe: 'addr', textContent: proper(membro.endereco)},
        {classe: 'tel', textContent: membro.telefone},

        {classe: 'data', textContent: membro.pagamentos[j].data},
        {classe: 'hora', textContent: membro.pagamentos[j].hora},
        {classe: 'metodo', textContent: membro.pagamentos[j].metodo},
        {classe: 'plano', textContent: membro.pagamentos[j].plano},
        {classe: 'valor', textContent:`R$ ${membro.pagamentos[j].valor},00`},
    ]

    dados.forEach(item => tr.appendChild(createElement('td', item.classe, item.textContent)))

    rows++

    return tr

}


function loadMembros(membro, i) {

    const tr = i % 2 !== 0 ? createElement('tr', 'impar') : createElement('tr')

    const dados = [
        {classe: 'id', textContent: `# ${membro.id}`},
        {classe: 'cadastro', textContent: membro.dataAdesao},
        {classe: 'nome', textContent: proper(membro.nome)},
        {classe: 'addr', textContent: proper(membro.endereco)},
        {classe: 'tel', textContent: membro.telefone},
        {classe: 'plano', textContent: membro.plano},
        {classe: 'valor', textContent:`R$ ${membro.valor},00`},
    ]

    dados.forEach(item => tr.appendChild(createElement('td', item.classe, item.textContent)))

    return tr

}

document.querySelector('.imprimir').addEventListener('click', () => window.print())