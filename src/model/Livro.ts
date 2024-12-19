import { Produto } from "./Produto";

export class Livro extends Produto{

    // Atributo específico da Classe Livro
    private _anoPublicacao: number;

    constructor(id: number, nome: string, tipo: number, autor: string, preco: number, anoPublicacao: number) {

        super(id, nome, tipo, autor, preco);
        this._anoPublicacao = anoPublicacao;

    }

    public get anoPublicacao(): number {
        return this._anoPublicacao;
    }

    public set anoPublicacao(value: number) {
        this._anoPublicacao = value;
    }

    public visualizar(): void {
        super.visualizar();
        console.log("Ano de publicação do livro físico: " + this.anoPublicacao);
    }

}