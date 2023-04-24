import {
  Entity,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';
import { Attendee } from './attendee.entity';
//first parameter of the decorator: configure the table name
//second parameter: optional parameter set of entities specific options
// @Entity('event', { name: 'event' })
@Entity()
export class Event {
  //I can use to phoneNumber or other important field
  //@PrimaryColumn()
  //for alternative id generate: uuid, rowid
  @PrimaryGeneratedColumn()
  id: number;
  //Column options
  //second parameter: type, name, length, width, nullable, unique, comment, primary etc.
  //@Column({ length: 100 })
  @Column()
  name: string;

  @Column()
  description: string;

  //@Column({ name: 'when_date' })
  @Column()
  when: Date;

  @Column()
  address: string;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
