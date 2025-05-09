import { Optional } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";


export class AlterarGeneroDTO{
    @IsString()
    @Optional()
    @IsNotEmpty({message: 'Nome não pode ser vazio'})
    NOME: string;

    @IsString()
    @Optional()
    @IsNotEmpty({message: 'Descrição não pode ser vazio'})
    DESCRICAO: string;
}