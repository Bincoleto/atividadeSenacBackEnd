

export class FilmeEntity{

    id: String;
    nome: string;
    duracao: string;
    sinopse: string;
    ano: number;
    genero: string;
    

    constructor(id: string, nome: string, duracao: string, sinopse: string, ano:number, genero: string){
        this.id = id;
        this.nome = nome;
        this.duracao = duracao;
        this.sinopse = sinopse;
        this.ano = ano;
        this.genero = genero;
    }
}