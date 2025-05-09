import { DatabaseModule } from "src/database/database.module";
import { generoProviders } from "src/genero/genero.provider";
import { GeneroService } from "src/genero/genero.service";
import { FilmesController } from "./filme.controller";
import { filmesProviders } from "./filmes.providers";
import { Module } from "@nestjs/common";
import { FilmeService } from "./filme.Service";

@Module({
    imports:[DatabaseModule],
    controllers:[FilmesController],
    providers:[...filmesProviders,
    FilmeService,
    ...generoProviders,
    GeneroService]
})

export class FilmeModule{}
