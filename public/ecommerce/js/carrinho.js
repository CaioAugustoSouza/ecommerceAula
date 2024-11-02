var carrinho = []
document.addEventListener('DOMContentLoaded', () => {
    let btnsCarrinho = document.querySelectorAll('.btn-adicionar-carrinho')
    for (let btnCarrinho of btnsCarrinho) {
        btnCarrinho.addEventListener('click', adicionarCarrinho)
    }
    let cartContent = document.getElementById('cart-content');
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    if (carrinho.length > 0) {
        for (let produto of carrinho) {
            let linha = document.createElement('tr');
            linha.innerHTML = `
            <th scope="row">
                            <div class="d-flex align-items-center">
                                <img src="${produto.imagem}" class="img-fluid me-5 rounded-circle" style="width: 80px; height: 80px;" alt="">
                            </div>
                        </th>
                        <td>
                            <p class="mb-0 mt-4">${produto.nome}</p>
                        </td>
                        <td>
                            <p class="mb-0 mt-4">R$${produto.valor}</p>
                        </td>
                        <td>
                            <div class="input-group quantity mt-4" style="width: 100px;">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-minus rounded-circle bg-light border" >
                                    <i class="fa fa-minus"></i>
                                    </button>
                                </div>
                                <input type="text" class="form-control form-control-sm text-center border-0" value="${produto.quantidade}">
                                <div class="input-group-btn">
                                    <button class="btn btn-sm btn-plus rounded-circle bg-light border">
                                        <i class="fa fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </td>
                        <td>
                            <p class="mb-0 mt-4">R$${produto.valor * produto.quantidade}</p>
                        </td>
                        <td>
                            <button class="btn btn-md rounded-circle bg-light border mt-4" >
                                <i class="fa fa-times text-danger"></i>
                            </button>
                        </td>`
            cartContent.appendChild(linha);

        }

    }


})

function adicionarCarrinho(event) {
    JSON.parse(localStorage.getItem('carrinho')) ? carrinho = JSON.parse(localStorage.getItem('carrinho')) : [];
    let btnCarrino = event.target;
    let id = btnCarrino.dataset.id;
    let nome = btnCarrino.dataset.nome;
    let imagem = btnCarrino.dataset.imagem;
    let valor = btnCarrino.dataset.valor
    let obj = {
        id: id,
        nome: nome,
        imagem: imagem,
        quantidade: 1,
        valor: valor
    }
    let produtoAdicionado = false
    for (let produto of carrinho) {
        if (obj.id == produto.id) {
            produto.quantidade++;
            produtoAdicionado = true
        }
    }
    if (!produtoAdicionado) {
        carrinho.push(obj)
    }
    localStorage.setItem('carrinho', JSON.stringify(carrinho))
    let sacola = JSON.parse(localStorage.getItem('carrinho'));
    let cartContent = document.getElementById('cart-content')
    cartContent.innerHTML = sacola.length;
    alert('Produto Adicionado ao Carrinho')
}