import { GENERO} from "src/genero/genero.entity";
import { PESSOA } from "src/pessoa/pessoa.entity";
import { Column, JoinColumn, ManyToMany, ManyToOne, PrimaryColumn } from "typeorm";


export class FILME{

    @PrimaryColumn()
    ID: string;

    @Column({length:255})
    NOME: string;

    @Column({length: 255})
    DURACAO: number;

    @Column()
    SINOPSE: string;

    @Column('int')
    ANO: number;

   
    @ManyToOne(() => GENERO, genero => genero.filmes)
    @JoinColumn({name: 'IDGENERO', referencedColumnName: 'ID'})
    GENERO: GENERO;

    @ManyToMany(
        () => PESSOA,
        ator => ator.filmes,
        {onDelete: 'NO ACTION', onUpdate: 'NO ACTION'}
    )
    atores?: PESSOA[]
}