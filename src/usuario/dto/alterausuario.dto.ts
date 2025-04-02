import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";
import { SenhaForte } from "../validacao/senha-forte.validator";

export class alteraUsuarioDto{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsInt()
    @IsOptional()
    idade: number;

    @IsString()
    @IsOptional()
    cidade: string;

    @IsEmail(undefined, {message:"email e invalido"})
    @EmailUnico({message: "Email já cadastrado"})
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    telefone: string;

    @MinLength(8, {message: "Senha Forte"})
    @SenhaForte({message: "Senha Muito Fraca. Tente uma outra"})
    @IsOptional()
    senha: string;

    @IsString()
    @IsOptional()
    cep: string;

    @IsString()
    @IsOptional()
    complemento: string;

}
   
