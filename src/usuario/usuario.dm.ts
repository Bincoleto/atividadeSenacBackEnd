import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";


@Injectable()
export class UsuarioArmazenado{
    #usuario: UsuarioEntity [] = [];

    AdicionarUsuario(usuario: UsuarioEntity){
        this.#usuario.push(usuario);
    }

    get usuario(){
        return this.#usuario;
    }

    atualizarUsuar(id: string, dadosAtualizacao: Partial<UsuarioEntity>){
        const usuario = this.buscarPorId(id);


        Object.entries(dadosAtualizacao).forEach(
            ([chave, valor]) => {
                if(chave === "id"){
                    return
                }
                if (valor === undefined){
                    return
                }
              usuario[chave] =   valor;
            }
        )


    }

    private buscarPorId(id: string){
        const possivelUsuario = this.#usuario.find(
            usuarioSalvo => usuarioSalvo.id === id
        )

        if(!possivelUsuario){
            throw new Error("Usuário não Encontrado")
        }

        return possivelUsuario;

    }

    async validarEmail(email: string): Promise<boolean>{
        const possivelUsuario = this.#usuario.find(
            usuario => usuario.email === email
        );
        return (possivelUsuario !== undefined);
    }


    async removerUsuario(id: string){
        const usuario = this.buscarPorId(id);

        this.#usuario = this.#usuario.filter(
            usuarioSalvo => usuarioSalvo.id != id
        )

        return usuario;
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

    
