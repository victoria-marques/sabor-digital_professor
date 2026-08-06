document.addEventListener("DOMContentLoaded", function() {
    renderizarPedidos()
    configurarLimparPedidos()
    //continuar...
})

//4. As funções de ATUALIZAR PREÇO e INSERIR PRODUTO NO RESUMO

function renderizarPedidos(){
    const lista = document.querySelector("#lista-pedidos")
    const spanTotal = document.querySelector("#valor-total")
    const spanResumo = document.querySelector("#valor-total-resumo")
    const spanContador = document.querySelector("#contador-itens")

    if(!lista) return

    const pedidos = JSON.parse(localStorage.getItem("techfood_pedidos") || "[]")

    if(pedidos.length === 0){
        lista.innerHTML = "<li class='pedido-vazio'> Nenhum pedido ainda. Acesse o "+" <a href='index.html'> Cardápio </a> Para Adicionar! 😋 </li>"

        if(spanTotal) spanTotal.textContent = "R$ 0,00"
        if(spanResumo) spanResumo.textContent = "R$ 0,00"
        if(spanContador) spanContador.textContent = "R$ 0 itens"
        return
    }

    lista.innerHTML = ""
    let total = 0

   pedidos.forEach(function(pedido, indice){
    const li = document.createElement("li")
    li.classList.add("item-pedido")
  

    // Informações - TEXTO
    const textoSpan = document.createElement("span")
    textoSpan.innerHTML = " <strong> " + pedido.nome + " </strong> " + " - " + pedido.qtd + " x " + " R$ " + pedido.preco.toFixed(2).replace(".", ",") + " = <span class='subtotal-item'> R$ " + pedido.subtotal.toFixed(2).replace(".", ",")+
    "</span>"

    // Criando botão para remover prato
    const btnRemover = document.createElement("button")
    btnRemover.textContent = "❌"
    btnRemover.classList.add("btn-remover")


    // CONTINUAÇÃO....

    btnRemover.addEventListener("click", () =>{
        const lista = JSON.parse(localStorage.getItem("techfood_pedidos")|| "[]")

        lista.splice(indice, 1)
        
        localStorage.setItem("techfood_pedidos", JSON.stringify(lista))
        renderizarPedidos()
       
    }) // Fechou o evento de click do Listener / btn remover

    // Parte visual realmente inserida na página
    li.appendChild(textoSpan)
    li.appendChild(btnRemover)
    lista.appendChild(li)
    total += pedido.subtotal

}) // Fim pedidos.forEach

    //Mais um trecho
    const totalFmt = " R$ " + total.toFixed(2).replace(".", ",")

    if(spanTotal) spanTotal.textContent = totalFmt
    if(spanResumo) spanResumo.textContent = totalFmt

    // Está contando quantos itens tem no carrinho
    const totalItens = pedidos.reduce(function(acc, p){
        return acc + p.qtd
    },0)

    if(spanContador){
        spanContador.textContent = totalItens + (totalItens === 1 ? "item" : "itens")
    }
} // Fim renderizar Pedidos

function configurarLimparPedidos(){
    const btn = document.querySelector("#btn-limpar-pedidos")

    if(!btn) return

    btn.addEventListener("click", function(){
        localStorage.removeItem("techfood_pedidos")
        renderizarPedidos()
    })
}