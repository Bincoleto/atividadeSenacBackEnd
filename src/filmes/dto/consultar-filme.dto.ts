export class ListaFilmeDTO{
    constructor(
        readonly id: String,
        readonly nome: string,
        readonly duracao: String,
        readonly ano: number,
        readonly genero: string,
        readonly sinopse: string,
        
    ){}
}

