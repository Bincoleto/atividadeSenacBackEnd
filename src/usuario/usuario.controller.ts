import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioArmazenado } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criarUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";


@Controller('/usuario')
export class UsuarioController{

    constructor(private clsUsuarioArmazenamento: UsuarioArmazenado){

    }
    @Post()
    async criarUsuario(@Body() dadosUsuarios: criarUsuarioDTO){

        // var validacao = this.clsUsuarioArmazenamento.validarUsuario(dadosUsuarios);
        // if(validacao.length > 0){
        //     return {
        //         status: "Erro",
        //         validacao: validacao
        //     }
        // }

        var novoUsuario = new UsuarioEntity(uuid(), dadosUsuarios.nome, 
            dadosUsuarios.idade, dadosUsuarios.cidade, dadosUsuarios.email, 
            dadosUsuarios.telefone, dadosUsuarios.senha);

        this.clsUsuarioArmazenamento.AdicionarUsuario(novoUsuario);

        var usuario = {
            dadosUsuarios : dadosUsuarios,
            status: "Usuário Criado."
        }
        return usuario;
    }

    @Get()
    async listaUsuario(){
        const usuarioListados = this.clsUsuarioArmazenamento.usuario;
        const listaRetorno = usuarioListados.map(
            usuario => new ListaUsuarioDTO(
                usuario.id,
                usuario.cidade,
                usuario.email
            )
        );
        return listaRetorno;
    }
}