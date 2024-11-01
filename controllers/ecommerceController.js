const ProdutoModel = require("../models/produtoModel");
const ProdutoController = require("./produtoController");

class EcommerceController {
    async ecommerceView(req, res){
        
        let produtos = new ProdutoModel();
        produtos = await produtos.listarProdutos()
        res.render('ecommerce/home/index.ejs', {layout: 'ecommerce/layout.ejs', produtos:produtos});
    }
}

module.exports = EcommerceController;