import { Body, Controller, Delete, Get, Param, Post, Put} from "@nestjs/common";
import { GeneroService } from "./genero.service";
import { CriaGeneroDTO } from "./dto/cnaGenero.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { GENERO } from "./genero.entity";
import { AlterarGeneroDTO } from "./dto/atualizarGenero.dto";

@Controller('/genero')

export class GeneroController{
    constructor(private readonly generoService: GeneroService){
    }

    @Get('lista')
    async lista(): Promise<GENERO[]>{
        return this.generoService.listar();
    }

    @Post('')
    async criarGenero(@Body() dados:CriaGeneroDTO): Promise<RetornoCadastroDTO>{
        return this.generoService.inserir(dados)
    }

    @Put('id')
    async alterarGenero(@Body() dados: AlterarGeneroDTO, @Param('id') id:string): Promise<RetornoCadastroDTO>{
        return this.generoService.alterar(id, dados)
    }

    @Get('ID/:id')
    async listaID(@Param('id') id: string): Promise<GENERO>{
        return this.generoService.localizarID(id)
    }

    @Delete(':id')
    async removerGenero(@Param('id') id:string): Promise<RetornoObjDTO>{
        return this.generoService.remover(id)
    }
}