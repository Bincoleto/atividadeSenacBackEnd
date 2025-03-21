import { Injectable } from "@nestjs/common";
import { UsuarioEntity } from "./usuario.entity";
import { EmailUnico } from "./validacao/email-unico.validator";


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
                }else if(chave === 'email'){
                    usuario.TrocarSenha(valor);
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


    private buscarPorEmail(email: string){
        const possivelUsuario = this.#usuario.find(
            usuarioSalvo => usuarioSalvo.email === email
        )

        if(!possivelUsuario){
            throw new Error("Usuário não Encontrado")
        }

        return possivelUsuario;

    }

    validarLogin(email: string, senha:string){
        const usuario = this.buscarPorEmail(email);
        return{
            login: usuario.login(senha),
            usuario: usuario,
        }

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

    
}

    
