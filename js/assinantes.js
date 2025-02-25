let assinantes = [];

function gerarID(prefixo = '10', tamanho = 5) {
    let idUnico;
    let idExistente = true;

    while (idExistente) {
        const numeroAleatorio = Math.floor(Math.random() * 100000);
        const id = numeroAleatorio.toString().padStart(tamanho, '0');
        idUnico = prefixo + id;

        idExistente = assinantes.some(assinante => assinante.id === idUnico);
    }

    return idUnico;
}

function carregarAssinantes() {
    const dadosSalvos = localStorage.getItem('assinantes');

    if (dadosSalvos) {
        assinantes = JSON.parse(dadosSalvos);
        renderizarAssinantes();
    } else {
        fetch('../json/assinantes.json')
            .then(response => response.json())
            .then(data => {
                assinantes = data;
                renderizarAssinantes();
            })
            .catch(error => console.error('Erro ao carregar os dados:', error));
    }
}


function registrarPagamento(assinanteId, valor, data, descricao, plano) {
    const assinante = assinantes.find(a => a.id === assinanteId);

    if (assinante) {
        const pagamento = {
            id: gerarID('09'),
            valor,
            plano,
            data,
            descricao,
        };

        assinante.pagamentos.push(pagamento);

        localStorage.setItem('assinantes', JSON.stringify(assinantes));

        renderizarAssinantes();
    }
}


function mostrarModalPagamento(assinanteId) {
    const modal = document.getElementById('modalPagamento');
    const formPagamento = document.getElementById('formPagamento');

    modal.dataset.assinanteId = assinanteId;

    modal.style.display = 'block';

    formPagamento.onsubmit = (event) => {
        event.preventDefault();

        const valor = document.getElementById('valorPagamento').value;
        const data = document.getElementById('dataPagamento').value;
        const plano = document.getElementById('planoPagamento').value;
        const descricao = document.getElementById('descricaoPagamento').value;

        const assinanteId = modal.dataset.assinanteId;

        registrarPagamento(assinanteId, valor, data, descricao, plano);

        fecharModalPagamento();
    };
}


function fecharModalPagamento() {
    document.getElementById('modalPagamento').style.display = 'none';
}
document.getElementById('fecharModalPagamento').addEventListener('click', fecharModalPagamento);

function renderizarAssinantes() {
    const lista = document.getElementById('associados');
    lista.innerHTML = '';

    const membrosVisiveis = assinantes.filter(assinante => !assinante.excluido);

    membrosVisiveis.forEach(assinante => {
        const li = document.createElement('li');
        li.classList.add('assinante-card');

        li.innerHTML = `
            <div>
                <div class="nome">${assinante.nome}</div>
                <p class="plano"><strong>Plano:</strong> ${assinante.plano}</p>
                <p class="id"><strong>ID:</strong> ${assinante.id}</p>
            </div>

            <div id="detalhes-${assinante.id}" class="detalhes-assinante" style="display: none;">
                <p><strong>Endereço:</strong> ${assinante.endereco}</p>
                <p><strong>Telefone:</strong> ${assinante.telefone}</p>
                <p><strong>Data de Adesão:</strong> ${assinante.dataAdesao}</p>
                <button class="editar-usuario" onclick="editarAssinante('${assinante.id}')">Editar Usuário</button>
                <button class="excluir-usuario" onclick="excluirAssinante('${assinante.id}')">Excluir</button>
                <button class="adicionar-pagamento" onclick="mostrarModalPagamento('${assinante.id}')">Adicionar Pagamento</button>

                <table class="tabela-pagamentos">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Valor</th>
                            <th>Descrição</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${assinante.pagamentos && Array.isArray(assinante.pagamentos)
                ? assinante.pagamentos.filter(pagamento => !pagamento.excluido).map(pagamento =>
                    `<tr>
                                    <td>${pagamento.dia}</td>
                                    <td>${pagamento.data}</td>
                                    <td>${pagamento.hora}</td>
                                    <td>${pagamento.valor}</td>
                                    <td>${pagamento.descricao}</td>
                                    <td>
                                        <button onclick="excluirPagamento('${assinante.id}', '${pagamento.id}')">Excluir</button>
                                    </td>
                                </tr>`
                ).join('')
                : '<tr><td colspan="6">Nenhum pagamento registrado.</td></tr>'
            }
                    </tbody>
                </table>
            </div>
            
            <button class="ver-mais" onclick="mostrarDetalhes('${assinante.id}', this)">Ver mais</button>
        `;
        lista.appendChild(li);
    });
}

function mostrarDetalhes(id, botao) {
    const detalhesDiv = document.getElementById(`detalhes-${id}`);

    if (detalhesDiv.style.display === "none" || !detalhesDiv.style.display) {
        detalhesDiv.style.display = "block";
        botao.textContent = "Fechar";
        botao.style.marginTop = "1rem";
    } else {
        detalhesDiv.style.display = "none";
        botao.textContent = "Ver mais";
        botao.style.marginTop = "0";
    }
}

function editarAssinante(id) {
    const assinanteEditando = assinantes.find(a => a.id === id);

    document.getElementById('editNome').value = assinanteEditando.nome;
    document.getElementById('editPlano').value = assinanteEditando.plano;
    document.getElementById('editEndereco').value = assinanteEditando.endereco;
    document.getElementById('editTelefone').value = assinanteEditando.telefone;
    document.getElementById('editDataAdesao').value = assinanteEditando.dataAdesao;

    // editar valor quando o plano é trocado -----------------------------------------------------------------------------------------------

    document.getElementById('editModal').style.display = 'block';

    document.getElementById('editForm').onsubmit = (event) => {
        event.preventDefault();

        assinanteEditando.nome = document.getElementById('editNome').value;
        assinanteEditando.plano = document.getElementById('editPlano').value;
        assinanteEditando.endereco = document.getElementById('editEndereco').value;
        assinanteEditando.telefone = document.getElementById('editTelefone').value;
        assinanteEditando.dataAdesao = document.getElementById('editDataAdesao').value;

        renderizarAssinantes();
        localStorage.setItem('assinantes', JSON.stringify(assinantes));

        fecharModalEdit();
    };
}

function fecharModalEdit() {
    document.getElementById('editModal').style.display = 'none';
}

document.getElementById('fecharModal').addEventListener('click', fecharModalEdit);

function adicionarAssinante() {
    document.getElementById('addModal').style.display = 'block';
    document.getElementById('addForm').onsubmit = (event) => {
        event.preventDefault();

        const pacotes = [
            { plano: 'basico', preco: 10 },
            { plano: 'intermediario', preco: 20 },
            { plano: 'premium', preco: 35 },
            { plano: 'gold', preco: 55 }
        ];
        
        const novoAssinante = {
            id: gerarID(),
            nome: document.getElementById('nome').value,
            plano: document.getElementById('plano').value,
            valor: function() {
                const select = document.getElementById('plano').value;
                const p = pacotes.find(p => p.plano === select);
                return p ? p.preco : 0;
            }(),
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            dataAdesao: document.getElementById('dataAdesao').value,
            pagamentos: []
        };
        
        

        assinantes.push(novoAssinante);

        renderizarAssinantes();

        localStorage.setItem('assinantes', JSON.stringify(assinantes));

        fecharModalAdd();
    };
}

function fecharModalAdd() {
    document.getElementById('addModal').style.display = 'none';
}

document.getElementById('adicionar').addEventListener('click', adicionarAssinante);
document.getElementById('fecharModalAdd').addEventListener('click', fecharModalAdd);

function excluirAssinante(id) {
    const assinante = assinantes.find(a => a.id === id);

    if (assinante) {
        assinante.excluido = true;
        renderizarAssinantes();
        localStorage.setItem('assinantes', JSON.stringify(assinantes));
    }
}

function filtrarAssinantes() {
    const input = document.getElementById('searchInput');
    const filtro = input.value.toLowerCase();
    const lista = document.getElementById('associados');
    const items = lista.getElementsByTagName('li');


    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        const nome = item.querySelector('.nome').textContent.toLowerCase();
        const plano = item.querySelector('.plano').textContent.toLowerCase();
        const id = item.querySelector('.id').textContent.toLowerCase();

        if (nome.includes(filtro) || plano.includes(filtro) || id.includes(filtro)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}

// formata o campo de input de telefone pra facilitar a vida do usuario
document.querySelectorAll(".tel").forEach(tel => {
    tel.addEventListener("input", function (e) {
        // [^0-9] 'não números' + 'g' de global (todos valores não numéricos)
        let input = e.target.value.replace(/[^0-9]/g, "");
        
        // limita o input do usuário pra 11 digitos
        if (input.length > 11) input = input.slice(0, 11);
    
        let telefone = "";
        
        // (DDD) (9 solitário) (primeiros 4)-(segundos 4)
        if (input.length > 0) telefone += `(${input.slice(0, 2)})`;
        if (input.length > 2) telefone += ` ${input[2]}`;
        if (input.length > 3) telefone += ` ${input.slice(3, 7)}`;
        if (input.length > 7) telefone += `-${input.slice(7, 11)}`;
    
        e.target.value = telefone;
    });
});


window.onload = carregarAssinantes();
