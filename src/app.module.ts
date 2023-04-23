import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsController } from './events/events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './events/entity/event.entity.';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'example',
      database: 'nest-events',
      //when I use to new entities, I have to put it in the entities array
      entities: [Event],
      //automatic upgrade schmema when entities changing
      synchronize: true,
    }),
    //if i want to inject an entity, I have to put it in forFeature array
    TypeOrmModule.forFeature([Event]),
  ],
  controllers: [AppController, EventsController],
  providers: [AppService],
})
export class AppModule {}
