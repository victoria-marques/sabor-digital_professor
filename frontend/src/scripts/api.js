const BASE_URL = "http://localhost:3000"

// 1. Buscar produtos

async function buscarProdutos(){
    // Realizar conexão (Espera até receber resposta)
    const response = await fetch(`${BASE_URL}/produtos`)
    const dados = await response.json()
    // Armazenar os DADOS (Espera até receber os dados)
    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados.dados
}

// 2. Criar Pedido

async function criarPedido(cliente, itens){
    // Solicitação de Comunicação e executa o método POST (publica o cliente e os itens do pedido)
    const response = await fetch(`${BASE_URL}/pedidos`,{
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({cliente, itens}),
    })
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
}

// 3. Buscar pedidos - (Foco par a conzinha ter acesso aos pedidos)

async function buscarPedidos(){
    const response = await fetch(`${BASE_URL}/pedidos`)
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)
        
    return dados
}

// 4. Deletar pedidos - Utilizado pela cozinha

async function deletarPedido(id){
    // Chamamos o método DELETE (apagar do banco de pedidos)
    const response = await fetch(`${BASE_URL}/pedidos/${id}`,{
        method: "DELETE",
    })
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados
}

// 5. Atualizar status do pedido

async function atualizarStatusPedido(id, novoStatus){
    const response = await fetch(`${BASE_URL}/pedidos/${id}/status`,{
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({status: novoStatus}),
    })
    const dados = await response.json()

    if(!response.ok) throw new Error(dados.erro || `Erro ${response.status}`)

    return dados

}