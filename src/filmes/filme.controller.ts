import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Provider, Put } from "@nestjs/common";
import { criarFilmeDto } from "./dto/criar-filme.dto";
import { ListaFilmeDTO } from "./dto/consultar-filme.dto"
import { alteraFilmeDto } from "./dto/alterar-filme.dto"
import { ApiAcceptedResponse, ApiResponse, ApiTags } from "@nestjs/swagger";
import { FilmeService } from "./filme.Service";
import { RetornoCadastroDTO } from "src/dto/retorno.dto";

@ApiTags('Filmes')

@Controller('/filmes')
export class FilmesController{
    #filme: any;

    constructor(private FilmeService: FilmeService){

    }


    //Adiciona um novo Filme
    @Post()
    @ApiAcceptedResponse({description: 'Retorna que houve sucesso na Inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão'})
    @ApiResponse({status: 400, description: 'Retorna que há algum dados invalido na requisição'})
    async criarFilme(@Body()dadosFilme: criarFilmeDto ): Promise <RetornoCadastroDTO>{

        var retorno = this.FilmeService.inserir(dadosFilme);
        return retorno
    }


    //Puxa os Filmes
    @Get()
    @ApiResponse({status: 200, description: 'Retorna que houve sucesso na consulta'})
    async listaFilme(): Promise<ListaFilmeDTO[]>{     
        
        return this.FilmeService.listar();
    }

    //trazer o filme por ID
    // @Get(':id')
    // async buscarFilmePorId(@Param('id') id: string) {
    //     const filmeListado = this.clsFilmeArmazenado.filme;

    //     // Buscar o filme com o id fornecido
    //     const filmeEncontrado = filmeListado.find(filme => filme.id === id);

    //     // Caso o filme não seja encontrado, retornar uma mensagem de erro
    //     if (!filmeEncontrado) {
    //         throw new NotFoundException(`Filme com o id ${id} não encontrado.`);
    //     }

    //     return new ListaFilmeDTO(
    //         filmeEncontrado.id,
    //         filmeEncontrado.nome,
    //         filmeEncontrado.duracao,
    //         filmeEncontrado.ano,
    //         filmeEncontrado.genero,
    //         filmeEncontrado.sinopse
    //     );
    // }

    //Altera Filme
    @Put('/:id')
    @ApiAcceptedResponse({description: 'Retorna que houve sucesso na Inclusão'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão'})
    @ApiResponse({status: 400, description: 'Retorna que há algum dados invalido na requisição'})
    async atualizarFilme(@Param('id') id:string, @Body() novoDado: alteraFilmeDto) {
        const filmeAtualizado = await this.FilmeService.alterar(id, novoDado)
        
        var retornoAlteracao = this.FilmeService.alterar(id, novoDado)
        return retornoAlteracao
    }

    //Remove Filme 
    @Delete('/:id')
    @ApiResponse({status: 200, description: 'Retona que houve sucesso na exclusao'})
    @ApiResponse({status: 500, description:'Retorna que houve erro na inclusão'})
    async removerFilme(@Param('id') id: string){
        
        var retornarExclusao = await this.FilmeService.remover(id)
    }

}