import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { FilmeArmezanado } from "./filme.dm";
import { criarFilmeDto } from "./dto/criar-filme.dto";
import { FilmeEntity } from "./filme.entity";
import { v4 as uuid } from "uuid";
import {ListaFilmeDTO} from "./dto/consultar-filme.dto"
import {alteraFilmeDto} from "./dto/alterar-filme.dto"
import { get } from "http";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Filmes')

@Controller('/filmes')
export class FilmesController{
    #filme: any;

    constructor(private clsFilmeArmazenado: FilmeArmezanado){

    }


    //Adiciona um novo Filme
    @Post()
    async criarFilme(@Body()dadosFilme: criarFilmeDto ){

        var novoFilme = new FilmeEntity(uuid(), dadosFilme.nome, 
            dadosFilme.duracao, dadosFilme.sinopse, dadosFilme.ano, 
            dadosFilme.genero);

        this.clsFilmeArmazenado.AdicionarFilme(novoFilme);

        var filme = {
            dadosFilme : dadosFilme,
            status: "Filme Criado com sucesso."
        }
        return filme;
    }


    //Puxa os Filmes
    @Get()
    async listaFilme(){
        const filmeListado = this.clsFilmeArmazenado.filme;

        const listaRetorno = filmeListado.map(
            filme => new ListaFilmeDTO(
                filme.id,
                filme.nome,
                filme.duracao,
                filme.ano,
                filme.genero,
                filme.sinopse

            )
        );
        return listaRetorno;
    }

    //trazer o filme por ID
    @Get(':id')
    async buscarFilmePorId(@Param('id') id: string) {
        const filmeListado = this.clsFilmeArmazenado.filme;

        // Buscar o filme com o id fornecido
        const filmeEncontrado = filmeListado.find(filme => filme.id === id);

        // Caso o filme não seja encontrado, retornar uma mensagem de erro
        if (!filmeEncontrado) {
            throw new NotFoundException(`Filme com o id ${id} não encontrado.`);
        }

        return new ListaFilmeDTO(
            filmeEncontrado.id,
            filmeEncontrado.nome,
            filmeEncontrado.duracao,
            filmeEncontrado.ano,
            filmeEncontrado.genero,
            filmeEncontrado.sinopse
        );
    }

    //Mostrar messagem pelo ID do filme
    @Get('/:mensagem.id')
    mostrarMensagemPorId(@Param('id') id:string){
        
    }
    

    //Atualiza um Filme
    @Put('/:id')
    async atualizarFilme(@Param('id') id:string, @Body() novoDado: alteraFilmeDto) {
        const filmeAtualizado = await this.clsFilmeArmazenado.AtualizarFilme(id, novoDado)
        
        return{
            filme: filmeAtualizado,
            message: "Filme Atualizado com sucesso"
        }
    }

    //Remove Filme 
    @Delete('/:id')
    async removerFilme(@Param('id') id: string){
        const usuarioRemovido = await this.clsFilmeArmazenado.removerFilme(id)

        return{
            usuario: usuarioRemovido,
            messagem: 'Filme Removido'
        }
    }

}