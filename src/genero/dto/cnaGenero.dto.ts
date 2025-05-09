import { IsNotEmpty, IsString } from "class-validator";


export class CriaGeneroDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    NOME: string;

    @IsString()
    @IsNotEmpty({message: "Descrição não pode ser vazia"})
    DESCRICAO: string;
}