import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class criarUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @ApiProperty({
        example: "Marcio Bincoleto",
        description: 'Esse campo identifica o nome do aluno'
    })
    nome: string;

    @IsInt()
    @ApiPropertyOptional({
        example: "34",
        description:'Este campo informar a idade do usuário'
    })
    idade: number;

    @IsString()
    @ApiProperty({
        example:"Bauru",
        description:"Este campo informa a cidade do usuário"
    })
    cidade: string;

    @IsEmail(undefined, {message:"email e invalido"})
    @EmailUnico({message: "Email já cadastrado"})
    @ApiProperty({
        example: "marciobincoletojunior@gmail.com",
        description: 'Este campo informa o email do usuário'
    })
    email: string;

    @IsString()
    @ApiProperty({
        example: '1199884-5874',
        description:'Informa o telefone do usuário'
    })
    telefone: string;

    @MinLength(8, {message: "Senha Forte"})
    @SenhaForte({message: "Senha Muito Fraca. Tente uma outra"})
    @ApiProperty({
        example: 'B@incoleto',
        description:'Senha precisar conter 1 caracter Maisculo, 1 Especial'
    })
    senha: string;

}