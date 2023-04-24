import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Attendee } from 'src/events/entity/attendee.entity';
import { Event } from 'src/events/entity/event.entity.';
export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    //when I use to new entities, I have to put it in the entities array
    entities: [Event, Attendee],
    //automatic schema upgrade disable
    synchronize: false,
  }),
);
