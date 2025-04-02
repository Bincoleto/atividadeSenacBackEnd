import { Body, Controller, Delete, Get, HttpServer, Param, Post, Put } from "@nestjs/common";
import { UsuarioArmazenado } from "./usuario.dm";
import { UsuarioEntity } from "./usuario.entity";
import { criarUsuarioDTO } from "./dto/usuario.dto";

import { v4 as uuid } from "uuid";
import { ListaUsuarioDTO } from "./dto/consulta.dto";
import { alteraUsuarioDto } from "./dto/alterausuario.dto";
import { LoginUsuarioDTO } from "./dto/loginUsuario.dto";
import { ApiTags } from "@nestjs/swagger";
import { lastValueFrom, map } from "rxjs";
import { HttpService } from "@nestjs/axios";

@ApiTags('Usuario')

@Controller('/usuario')
export class UsuarioController{
constructor(private clsUsuarioArmazenamento: UsuarioArmazenado, private HttpService: HttpService){

    }
    @Post()
    async criarUsuario(@Body() dadosUsuarios: criarUsuarioDTO){
        
        var mensageErro = '';
        try{
        var retornoCep = await lastValueFrom(this.HttpService
                .get(`https://viacep.com.br/ws/${dadosUsuarios.cep}/json/`)
                .pipe(
                    map((response) => response.data)
                )
            )
            if(retornoCep ==' true'){
                throw new Error('CEP não encrontado')
            }
        } catch(error){
            mensageErro = 'Erro ao consultar o CEP, informe um CEP valido.';
            return {
                message: mensageErro,
                status: 'Erro no Cadastro do Usuario'
            };
        }
        

        var novoUsuario = new UsuarioEntity(uuid(), 
            dadosUsuarios.nome, 
            dadosUsuarios.idade, 
            dadosUsuarios.cep, retornoCep?retornoCep.logradouro:``, 
            dadosUsuarios.complemento, retornoCep?retornoCep.localidade:``,
            dadosUsuarios.email, 
            dadosUsuarios.telefone, 
            dadosUsuarios.senha
            );

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

        var mensageErro = ``;
        if(novoDado.cep){
            try{
                var retornoCep = await lastValueFrom(this.HttpService
                    .get(`https://viacep.com.br/ws/${novoDado}/json/`)
                    .pipe(
                        map((response) => response.data)
                    ))
            if(retornoCep.error){
                retornoCep = null
                throw new Error('CEP não encontrado')
            }
            }catch(error){
                mensageErro = 'Erro ao buscar o CEP ' + error.mensage;
            }     

            var dadosEndereco = {
                endereco : retornoCep?retornoCep.logradouro: ``,
                cidade: retornoCep? retornoCep.localidade: ``,
                cep: novoDado.cep
            }
        }

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