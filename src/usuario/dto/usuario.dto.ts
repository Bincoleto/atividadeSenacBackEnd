import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

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

    @MinLength(6, {message: "Senha precisa ser no minimo 6 digitos"})
    senha: string;

}