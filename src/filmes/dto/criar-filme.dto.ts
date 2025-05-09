import { IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class criarFilmeDto{
    @IsString()
    @IsNotEmpty({message: "Nome não pode ser vazio"})
    @IsOptional()
    NOME: string;

    @IsString()
    @IsOptional()
    DURACAO: number;

    @IsString()
    @IsOptional()
    SINOSPE: string;

    @IsInt()
    @IsNotEmpty({message: "Informe o ano, exp: AAAA"})
    @IsOptional()
    ANO: number;

    @IsString()
    @IsNotEmpty({message: "Informe o Genero do filme, exp: Terror, Drana, Ação..."})
    @IsOptional()
    GENERO: string;

}