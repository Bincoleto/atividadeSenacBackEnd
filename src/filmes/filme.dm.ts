// import { Injectable } from "@nestjs/common";
// import { FilmeEntity } from "./filme.entity";

// @Injectable()
// export class FilmeArmezanado{
//     #filme: FilmeEntity [] = [];

//     AdicionarFilme(filme: FilmeEntity){
//         this.#filme.push(filme);
//     }

//     get filme(){
//         return this.#filme;
//     }

//     AtualizarFilme(id: string, filmeAtualizado: Partial<FilmeEntity>){
//         const filme = this.buscaFilmeId(id);

//         Object.entries(filmeAtualizado).forEach(
//             ([chave, valor]) => {
//                 if(chave === 'id'){
//                     return
//                 }
//                 if (valor === undefined){
//                     return
//                 }
//                 filme[chave] =   valor;
//             }
//         )
//     }

//     //buscar o filme pelo ID
//     private buscaFilmeId(id: string){
//         const possivelFilme = this.#filme.find(
//             filmeSalvo => filmeSalvo.id === id
//         )

//         if(!possivelFilme){
//             throw new Error("Filme Encontrado")
//         }

//         return possivelFilme;

//     }

//     //deleta o filme pelo ID
//     async removerFilme(id: string){
//         const filme = this.buscaFilmeId(id);

//         this.#filme = this.#filme.filter(
//             filmeSalvo => filmeSalvo.id != id
//         )

//         return filme;
//     }

//     //validar se o filme já existe
//     // async validarFilme(nome: string): Promise<boolean>{
//     //     const possivelFilme = this.#filme.find(
//     //         filme => filme.nome.toLocaleUpperCase === nome.toUpperCase
//     //     );
//     //     return (possivelFilme !== undefined);
//     // }

// }