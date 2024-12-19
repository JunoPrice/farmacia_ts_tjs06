import { Produto } from "./Produto";

export class LivroDigital extends Produto{

    // Atributo específico da Classe LivroDigital
    private _formato: string;
    private _tamanhoArquivo: number;

    //Método Construtor
    constructor(id: number, nome: string, tipo: number, autor: string, preco: number, formato: string, tamanhoArquivo: number) {

        super(id, nome, tipo, autor,preco);
        this._formato = formato;
        this._tamanhoArquivo = tamanhoArquivo;

    }

    //Método Get e Set
    public get formato(): string {
        return this._formato;
    }

    public get tamanhoArquivo(): number {
        return this._tamanhoArquivo;
    }

    public set formato(value: string) {
        this._formato = value;
    }

    public set tamanhoArquivo(value: number) {
        this._tamanhoArquivo = value;
    }

    public visualizar(): void {
        super.visualizar();
        console.log("Formato do Livro: " + this.formato);
        console.log("Tamanho do Arquivo: " + this.tamanhoArquivo, "MB");
    }

}