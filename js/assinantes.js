function carregarAssinantes() {
    fetch('../json/assinantes.json') 
      .then(response => {
        if (!response.ok) {
          throw new Error('Erro ao carregar o arquivo JSON');
        }
        return response.json();
      })
      .then(assinantes => {
        console.log('Assinantes carregados:', assinantes); 

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

            <button class="ver-mais" onclick="mostrarDetalhes('${assinante.id}')">Ver Mais</button>
          `;

          lista.appendChild(li); 
        });
      })
      .catch(error => console.error('Erro ao carregar os dados:', error)); 
}

// Função para mostrar os detalhes do assinante
function mostrarDetalhes(id) {
    const detalhesDiv = document.getElementById(`detalhes-${id}`);
    const botaoVerMais = detalhesDiv.nextElementSibling; // Botão "Ver Mais"

    // Verifica se os detalhes estão escondidos e os exibe
    if (detalhesDiv.style.display === "none" || !detalhesDiv.style.display) {
        detalhesDiv.style.display = "block";
        botaoVerMais.style.marginTop = "1rem"; // Dá um espaçamento para o botão ficar abaixo
    } else {
        detalhesDiv.style.display = "none"; // Se já estiver visível, esconde novamente
        botaoVerMais.style.marginTop = "0"; // Remove o espaçamento quando o botão voltar ao normal
    }
}

carregarAssinantes();
