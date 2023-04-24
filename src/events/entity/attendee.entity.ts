import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Event } from './event.entity.';
@Entity()
export class Attendee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Event, (event) => event.attendees, {
    nullable: false,
  })

  /* @JoinColumn({
    name: 'event_id',
    referencedColumnName: 'secondary',
  }) */
  @JoinColumn()
  event: Event;
}
