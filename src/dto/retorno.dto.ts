import { IsNotEmpty, IsString } from "class-validator";

export class RetornoCadastroDTO{
    id: string;
    message: string;
}

export class RetornoObjDTO{
    return: any;
    message: string;
}

