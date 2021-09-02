import { Module } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RepositoriesModule } from './repositories/repositories.module';

const mongooseModule = registerModuleMongoose();

@Module({
  imports: [
    mongooseModule,
    RepositoriesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

function registerModuleMongoose() {
  return MongooseModule.forRootAsync({
    useFactory: () =>
    ({        
        uri: process.env.MONGO_URI,
      } as MongooseModuleOptions),
  });
}