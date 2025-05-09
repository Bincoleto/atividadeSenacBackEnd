export class ListaFilmeDTO{
    constructor(
        readonly ID: string,
        readonly NOME: string,
        readonly ANO: number,
        readonly GENERO: string,
        readonly DURACAO: number,
        readonly SINOPSE: string,
        
    ){}
}

