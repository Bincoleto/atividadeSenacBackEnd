import { Inject, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { GENERO } from "./genero.entity";
import { CriaGeneroDTO } from "./dto/cnaGenero.dto";
import { RetornoCadastroDTO, RetornoObjDTO } from "src/dto/retorno.dto";
import { v4 as uuid } from "uuid";
import { AlterarGeneroDTO } from "./dto/atualizarGenero.dto";


@Injectable()
export class GeneroService {
    constructor(
        @Inject('GENERO_REPOSITORY')
        private generoRepository: Repository<GENERO>
    ){}

    async listar(): Promise<GENERO[]> {
        return this.generoRepository.find();
    }

    async inserir(dados: CriaGeneroDTO): Promise<RetornoCadastroDTO>{
        let genero = new GENERO();
            genero.ID = uuid();
            genero.NOME = dados.NOME;
            genero.DESCRICAO = dados.DESCRICAO;

        return this.generoRepository.save(genero)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: genero.ID,
                message: 'Genero Cadastrado'
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
                id: '',
                message: 'Houve algume erro ao cadastrar' + error.message
            }
        })
    }

    async localizarID(ID: string): Promise<GENERO> {
        const genero = await this.generoRepository.findOne({
            where: {
                ID
            },
        });

        if (!genero) {
            throw new Error(`Genero com ID ${ID} não encontrado`)
        }
        return genero;
    }

    async remover(id: string): Promise<RetornoObjDTO> {
        const genero = await this.localizarID(id);

        return this.generoRepository.remove(genero)
        .then((result) => {
            return <RetornoObjDTO>{
                return: genero,
                message: 'Genero Excluido'
            };
        })
        .catch((error) => {
            return <RetornoObjDTO>{
                return: genero,
                message: "Houve um erro ao excluir" + error.message
            }
        })
    }

    async alterar(id: string, dados: AlterarGeneroDTO): Promise<RetornoCadastroDTO>{
        const genero = await this.localizarID(id);


        Object.entries(dados).forEach(
            ([chave, valor]) => {
                if(chave === 'id'){
                    return;
                }

                genero[chave] = valor;
            }
        )

        return this.generoRepository.save(genero)
        .then((result) => {
            return <RetornoCadastroDTO>{
                id: genero.ID,
                message: 'Genero Cadastrado'
            };
        })
        .catch((error) => {
            return <RetornoCadastroDTO>{
                id: '',
                message: 'Houve algume erro ao cadastrar' + error.message
            };
        })
    }

 
       
}


