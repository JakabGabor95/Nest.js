import { IsDateString, IsString, Length } from 'class-validator';
export class CreateEventDto {
  //if I want specific message I can use the message parameter
  @IsString()
  @Length(5, 255, { message: 'The name length is wrong' })
  name: string;
  @Length(5, 255)
  description: string;
  @IsDateString()
  when: string;
  //I can use specific validation group such as "create", "update" etc.
  /*   @Length(5, 255, { groups: ['create'] })
  @Length(10, 20, { groups: ['update'] }) */
  @Length(5, 255)
  address: string;
}
