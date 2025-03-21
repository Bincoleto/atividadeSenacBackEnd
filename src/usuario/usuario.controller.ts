import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenado } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criarUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDto } from "./dto/alterausuario.dto";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";


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
                usuario.nome,
                usuario.cidade,
                usuario.email,
                usuario.senha
            )
        );
        return listaRetorno;
    }

    @Put('/:id')
    async atualizarUsuario(@Param('id') id:string, @Body() novoDado: alteraUsuarioDto) {
        const usuarioAtualizado = await this.clsUsuarioArmazenamento.atualizarUsuar(id, novoDado)
        
        return{
            usuario: usuarioAtualizado,
            message: "Usuário Atualizado"
        }
    }

    @Delete('/:id')
    async removerUsuario(@Param('id') id: string){
        const usuarioRemovido = await this.clsUsuarioArmazenamento.removerUsuario(id)

        return{
            usuario: usuarioRemovido,
            messagem: 'Usuário Removido'
        }
    }

    @Post("/login")
    async login(@Body() dadoslogin: LoginUsuarioDTO){
        var login  = this.clsUsuarioArmazenamento.validarLogin(dadoslogin.email, dadoslogin.senha);

        return{
            status: login.login,
            usuario: login.login?login.usuario: null,
            message: login?"login Efetuado" : "Usuario ou senha Invalidos"
        }
    }

}