  import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { UsuarioModule } from './usuario/usuario.modulo';
import { FilmeModule } from './filmes/filme.modulo';

@Module({
  imports: [UsuarioModule, FilmeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

