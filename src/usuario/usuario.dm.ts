import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";

@Injectable()
export class UsuarioArmazenado{
    #usuario: UsuarioEntity [] = [];

    AdicionarUsuario(usuario){
        this.#usuario.push(usuario);
    }

    get usuario(){
        return this.#usuario;
    }

    // validarUsuario(dadosUsuarios){
    //     var validacao: string[] = [];

    //     if(!(dadosUsuarios.id != null)){
    //         validacao.push("Id não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.nome != null)){
    //         validacao.push("Nome não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.idade != null)){
    //         validacao.push("Idade não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.cidade != null)){
    //         validacao.push("Cidade não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.email != null)){
    //         validacao.push("Email não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.telefone != null)){
    //         validacao.push("Telefone não pode ser nulo");
    //     }
    //     if(!(dadosUsuarios.senha != null)){
    //         validacao.push("Senha não pode ser nulo");
    //     }

    //     return validacao;
    // }
}

    
