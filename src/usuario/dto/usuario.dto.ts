import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";

export class criarUsuarioDTO{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    nome: string;

    @IsInt()
    idade: number;

    @IsString()
    cidade: string;

    @IsEmail(undefined, {message:"email e invalido"})
    @EmailUnico({message: "Email já cadastrado"})
    email: string;

    @IsString()
    telefone: string;

    @MinLength(8, {message: "Senha Forte"})
    @SenhaForte({message: "Senha Muito Fraca. Tente uma outra"})
    senha: string;

}