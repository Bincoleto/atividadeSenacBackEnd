export class ListaFilmeDTO{
    //dtos de resposta normalmente não tem nenhuma validação, apenas o constructor com os campos a serem retornados
    constructor(
            readonly ID: string,
            readonly NOME:string,
            readonly DURACAO: number,
            readonly SINOPSE: string
    ){}
}
 
export class ListagemFilmesDTO{
    constructor(
        readonly filme: ListaFilmeDTO[],
    ){}
}