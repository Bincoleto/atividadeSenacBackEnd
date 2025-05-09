import { DataSource } from "typeorm";
import { FILME } from "./filme.entity";

export const filmesProviders = [
    {
        provide: 'FILME_REPOSITORY',
        useFactory: (DataSource: DataSource) => DataSource.getMongoRepository(FILME),
        inject: ['DATA_SOURCE'],
    },
]