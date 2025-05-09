  import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.modulo';
import { FilmeModule } from './filmes/filme.modulo';
import { GeneroModule } from './genero/genero.modulo';

@Module({
  imports: [UsuarioModule, FilmeModule, GeneroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

