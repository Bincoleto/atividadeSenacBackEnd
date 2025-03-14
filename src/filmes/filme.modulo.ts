import { Module } from "@nestjs/common";
import { FilmesController } from "./filme.controller";
import { FilmeArmezanado } from "./filme.dm"

@Module({
    imports:[],
    controllers:[FilmesController],
    providers:[FilmeArmezanado]
})

export class FilmeModule{}
