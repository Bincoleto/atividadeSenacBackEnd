import { Module } from "@nestjs/common";
import { UsuarioController } from "./usuario.controller";
import { UsuarioArmazenado } from "./usuario.dm";
import { EmailUnicoValidator } from "./validacao/email-unico.validator";
import { strongPassValidator } from "./validacao/senha-forte.validator";

@Module({
    imports:[],
    controllers:[UsuarioController],
    providers:[UsuarioArmazenado, EmailUnicoValidator, strongPassValidator]
})

export class UsuarioModule{}