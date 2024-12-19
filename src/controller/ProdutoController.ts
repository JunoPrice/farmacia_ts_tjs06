import { Produto } from "../model/Produto";
import { ProdutoRepository } from "../repository/ProdutoRepository";
import { colors } from "../util/Colors";

export class ProdutoController implements ProdutoRepository{
    
    listaProdutos = new Array<Produto>();

    public id: number = 0;

    procurarPorId(id: number): void {
        let buscaProduto = this.buscarNoArray(id);

        if (buscaProduto != null) {
            buscaProduto.visualizar();
        } else
            console.log(colors.fg.red, "\nO id do Livro: " + id
                + " não foi encontrado!", colors.reset);
    }
    listarTodas(): void {
        
        this.listaProdutos.forEach(produto => produto.visualizar());

        /*for(let produto of this.listaProdutos){
            produto.visualizar();
        }*/
    }

    cadastrar(produto: Produto): void {
        this.listaProdutos.push(produto);
        console.log("O livro foi cadastrado com sucesso!")
    }

    atualizar(produto: Produto): void {
        let buscaProduto = this.buscarNoArray(produto.id);

        if (buscaProduto != null) {
            this.listaProdutos[this.listaProdutos.indexOf(buscaProduto)] = produto;
            console.log(colors.fg.green, "\nO id do Livro: " + produto.id + 
                        " foi atualizado com sucesso!", colors.reset);
        } else
            console.log(colors.fg.red, "\nO id do Livro: " + produto.id + 
                        " não foi encontrado!", colors.reset);
    }
    deletar(id: number): void {
        let buscaProduto = this.buscarNoArray(id);

        if (buscaProduto != null) {
            this.listaProdutos.splice(this.listaProdutos.indexOf(buscaProduto), 1);
        	console.log(colors.fg.green,"\nO id do Livro: " + id + 
                        " foi apagado com sucesso!", colors.reset);
        }else
        console.log(colors.fg.red,"\nO id do livro: " + id + 
                    " não foi encontrado!", colors.reset);
    }

    /*Métodos Auxiliares*/

    /*Gerar Id do Produto*/
    public gerarId(): number {
        return ++this.id;
    }

    /*Checar se um Produto existe*/
    public buscarNoArray(id: number): Produto | null {

        for (let produto of this.listaProdutos) {
            if (produto.id === id)
                return produto;
        }

        return null;
    }
}