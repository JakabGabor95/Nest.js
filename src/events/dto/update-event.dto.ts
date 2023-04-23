import { PartialType } from '@nestjs/mapped-types';
import { CreateEventDto } from './create-event.dto';

//Extends all of them key from CreateEventDto, but they are already optional.
export class UpdateEventDto extends PartialType(CreateEventDto) {}
