import { DataSource } from 'typeorm';
import { GENERO} from './genero.entity';

export const generoProviders = [

    {
        provide: 'GENERO_REPOSITORY',
        useFactory: (DataSource: DataSource) => DataSource.getRepository(GENERO),
        inject: ['DATA_SOURCE'],
    }


];