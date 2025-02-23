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

                 <table class="tabela-pagamentos">
                    <thead>
                        <tr>
                            <th>Dia</th>
                            <th>Data</th>
                            <th>Hora</th>
                            <th>Método</th>
                            <th>Plano</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                       ${assinante.pagamentos && Array.isArray(assinante.pagamentos) 
                        ? assinante.pagamentos.map(pagamento => `
                            <tr>
                                <td>${pagamento.dia}</td>
                                <td>${pagamento.data}</td>
                                <td>${pagamento.hora}</td>
                                <td>${pagamento.metodo}</td>
                                <td>${pagamento.plano}</td>
                                <td>${pagamento.valor}</td>
                            </tr>
                       `).join('') 
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

        const novoAssinante = {
            id: gerarID(),
            nome: document.getElementById('nome').value,
            plano: document.getElementById('plano').value,
            endereco: document.getElementById('endereco').value,
            telefone: document.getElementById('telefone').value,
            dataAdesao: document.getElementById('dataAdesao').value,
            pagamentos:[] 
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

window.onload = carregarAssinantes;