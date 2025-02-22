let assinantes = [];

function carregarAssinantes() {
    fetch('../json/assinantes.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
      })
      .then(data => {
        assinantes = data;
        renderizarAssinantes();
      })
      .catch(error => console.error('Erro ao carregar os dados:', error)); 
}

function renderizarAssinantes() {
    const lista = document.getElementById('associados');
    lista.innerHTML = '';

    assinantes.forEach(assinante => {
        const li = document.createElement('li');
        li.classList.add('assinante-card'); 

        li.innerHTML = `
            <div>
                <div class="nome">${assinante.nome}</div>
                <p class="plano"><strong>Plano:</strong> ${assinante.plano}</p>
                <p><strong>ID:</strong> ${assinante.id}</p>
            </div>

            <div id="detalhes-${assinante.id}" class="detalhes-assinante" style="display: none;">
                <p><strong>Endereço:</strong> ${assinante.endereco}</p>
                <p><strong>Telefone:</strong> ${assinante.telefone}</p>
                <p><strong>Data de Adesão:</strong> ${assinante.dataAdesao}</p>
                <button class="editar-usuario" onclick="editarAssinante('${assinante.id}')">Editar Usuário</button>
                
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
                        ${assinante.pagamentos.map(pagamento => `
                            <tr>
                                <td>${pagamento.dia}</td>
                                <td>${pagamento.data}</td>
                                <td>${pagamento.hora}</td>
                                <td>${pagamento.metodo}</td>
                                <td>${pagamento.plano}</td>
                                <td>${pagamento.valor}</td>
                            </tr>
                        `).join('')}
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
    const assinante = assinantes.find(a => a.id === id);

    if (!assinante) return;

    document.getElementById('nome').value = assinante.nome;
    document.getElementById('plano').value = assinante.plano;
    document.getElementById('endereco').value = assinante.endereco;
    document.getElementById('telefone').value = assinante.telefone;
    document.getElementById('dataAdesao').value = assinante.dataAdesao;

    document.getElementById('editModal').style.display = 'block';

    document.getElementById('editForm').onsubmit = (event) => {
        event.preventDefault();

        assinante.nome = document.getElementById('nome').value;
        assinante.plano = document.getElementById('plano').value;
        assinante.endereco = document.getElementById('endereco').value;
        assinante.telefone = document.getElementById('telefone').value;
        assinante.dataAdesao = document.getElementById('dataAdesao').value;

        renderizarAssinantes();

        
        fecharModal();
    }
}

function fecharModal() {
    document.getElementById('editModal').style.display = 'none';
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

        if (nome.includes(filtro) || plano.includes(filtro)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    }
}

window.onload = carregarAssinantes;
