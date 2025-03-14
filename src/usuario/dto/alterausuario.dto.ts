import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";
import { EmailUnico } from "../validacao/email-unico.validator";

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

    @MinLength(6, {message: "Senha precisa ser no minimo 6 digitos"})
    @IsOptional()
    senha: string;

}
   
