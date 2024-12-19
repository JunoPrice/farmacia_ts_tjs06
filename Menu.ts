import readlinesync = require('readline-sync');
import { colors } from './src/util/Colors';
import { ProdutoController } from './src/controller/ProdutoController';
import { Livro } from './src/model/Livro';
import { LivroDigital } from './src/model/LivroDigital';

export function main() {
    let opcao, id, preco, tamanhoArquivo, anoPublicacao: number;
    let nome, autor, formato: string;
    let tipoProduto = ['Livro', 'LivroDigital'];

    // Instanciar um Objeto da Classe ProdutoController
    const produtoController = new ProdutoController();

    // Objetos de Teste
    produtoController.cadastrar(
        new LivroDigital(
            produtoController.gerarId(),
            "Orgulho e Preconceito",
            2,
            "Jane Austen",
            25,
            "PDF",
            500,
        )
    );
    produtoController.cadastrar(
        new Livro(
            produtoController.gerarId(),
            "Orgulho e Preconceito",
            1,
            "Jane Austen",
            55,
            1985,
        )
    );

    while (true) {

        console.log(colors.bg.black, colors.fg.yellow,
            "**************************************************************");
        console.log("                                                      ");
        console.log("                     LIVRARIA CYNTESSA                ");
        console.log("        O melhor da Literatura  ao seu dispor         ");
        console.log("                                                      ");
        console.log("******************************************************");
        console.log("         Bem-Vindos ao E-Commerce Livraria Cyntessa   ");
        console.log("                                                      ");
        console.log("         Por favor, escolha a opcão desejada:         ");
        console.log("                                                      ");
        console.log("          1 - Listar todos os Livros                  ");
        console.log("          2 - Listar Livros pelo ID                   ");
        console.log("          3 - Cadastrar Livro                         ");
        console.log("          4 - Atualizar Livro                         ");
        console.log("          5 - Deletar Livro                           ");
        console.log("          6 - Sair                                    ");
        console.log("                                                      ");
        console.log("******************************************************");
        console.log("                                                      ", colors.reset);

        console.log("Entre com a opcão desejada: ");
        opcao = readlinesync.questionInt("");

        if (opcao === 6) {
            console.log(colors.fg.greenstrong, 
                "\nLivraria Cyntessa. Precos que cabem no seu bolso!");
            sobre();
            console.log(colors.reset, "");
            process.exit(0);
        }

        switch (opcao) {
            case 1:
                console.log(
                    colors.fg.whitestrong,
                    '\n\nListar todos os Produtos\n\n',
                    colors.reset
                );

                produtoController.listarTodas();

                keyPress();
                break;
            case 2:
                console.log(
                    colors.fg.whitestrong,
                    '\n\nConsultar dados do Produto - por Id\n\n',
                    colors.reset
                );

                id = readlinesync.questionInt('Digite o Id: ');
                produtoController.procurarPorId(id);

                keyPress();
                break;
            case 3:
                console.log(
                    colors.fg.whitestrong,
                    '\n\nCriar Produto\n\n',
                    colors.reset
                );

                nome = readlinesync.question('Digite o Nome do Produto: ');

                // Corrigindo a variável tipoProduto para tipoProdutoEscolhido
                let tipoProdutoEscolhido = 
                    readlinesync.keyInSelect(tipoProduto, '', { cancel: false }) + 1;

                preco = readlinesync.questionFloat('Digite o preco: ');

                switch (tipoProdutoEscolhido) {
                    case 1:
                        let tipoCapa = readlinesync.question('Digite o nome do Autor do livro: ');
                        anoPublicacao = readlinesync.questionInt('Digite o Ano de Publicacao: ');
                        produtoController.cadastrar(
                            new Livro(
                                produtoController.gerarId(),
                                nome,
                                tipoProdutoEscolhido,
                                tipoCapa,
                                preco,
                                anoPublicacao
                            )
                        );
                        break;
                    case 2:
                        let formato = readlinesync.question('Digite o formato (PDF, EPUB, etc.): ');
                        tamanhoArquivo = readlinesync.questionFloat('Digite o tamanho do arquivo (em MB): ');
                        autor = readlinesync.question('Digite o autor do Livro: ');
                        produtoController.cadastrar(
                            new LivroDigital(
                                produtoController.gerarId(),
                                nome,
                                tipoProdutoEscolhido,
                                autor, // Passando o autor
                                preco,
                                formato,
                                tamanhoArquivo
                            )
                        );
                        break;
                }

                keyPress();
                break;
            case 4:
                console.log(
                    colors.fg.whitestrong,
                    '\n\nAtualizar dados do Produto\n\n',
                    colors.reset
                );

                id = readlinesync.questionInt('Digite o Id do Produto: ');
                let produto = produtoController.buscarNoArray(id);

                if (produto !== null) {
                    nome = readlinesync.question('Digite o Nome do Produto: ');
                    autor = readlinesync.question('Digite o Autor: ');
                    preco = readlinesync.questionFloat('Digite o preco: ');

                    switch (produto.tipo) {
                        case 1: // Livro Físico
                            let tipoCapa = readlinesync.question('Digite o tipo de capa do Livro: ');
                            anoPublicacao = readlinesync.questionInt('Digite o Ano de Publicacão: ');
                            produtoController.atualizar(
                                new Livro(produto.id, nome, produto.tipo, autor, preco, anoPublicacao)
                            );
                            break;
                        case 2: // Livro Digital
                            let formato = readlinesync.question('Digite o formato (PDF, EPUB, etc.): ');
                            let tamanhoArquivo = readlinesync.questionFloat('Digite o tamanho do arquivo (em MB): ');
                            produtoController.atualizar(
                                new LivroDigital(produto.id, nome, produto.tipo, autor, preco, formato, tamanhoArquivo)
                            );
                            break;
                        default:
                            console.log("Tipo de produto desconhecido.");
                            break;
                    }
                } else {
                    console.log('Produto não encontrado!');
                }

                keyPress();
                break;
            case 5:
                console.log(
                    colors.fg.whitestrong,
                    '\n\nApagar um Produto\n\n',
                    colors.reset
                );

                id = readlinesync.questionInt('Digite o Id: ');
                produtoController.deletar(id);

                keyPress();
                break;
            default:
                console.log(
                    colors.fg.whitestrong,
                    '\nOpcão Inválida!\n',
                    colors.reset
                );

                keyPress();
                break;
        }
    }
}

/* Funcão com os dados da pessoa desenvolvedora */
function sobre(): void {
    console.log("\n*****************************************************");
    console.log("Projeto Desenvolvido por: Jonas Gomes");
    console.log("Generation Brasil - generation@generation.org");
    console.log("github.com/JunoPrice");
    console.log("*****************************************************");
}

function keyPress(): void {
    console.log(colors.reset, "");
    console.log("\nPressione enter para continuar...");
    readlinesync.prompt();
}

main();
