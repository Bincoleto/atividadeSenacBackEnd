import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class criarFilmeDto{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    nome: string;

    @IsString()
    @IsOptional()
    duracao: string;

    @IsString()
    @IsOptional()
    sinopse: string;

    @IsInt()
    @IsNotEmpty({message: "Informe o ano, exp: AAAA"})
    @IsOptional()
    ano: number;

    @IsString()
    @IsNotEmpty({message: "Informe o Genero do filme, exp: Terror, Drana, Ação..."})
    @IsOptional()
    genero: string;

}