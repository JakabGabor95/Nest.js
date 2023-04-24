import { MoreThan, Repository, Like } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity.';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  private readonly logger = new Logger(EventsController.name);
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    this.logger.log(`Hit the findAll route`);
    const events = await this.repository.find();
    this.logger.debug(`Found ${events.length} events`);
    return events;
  }

  @Get('/practice')
  async practice() {
    return await this.repository.find({
      //show only these properties
      select: ['id', 'when'],
      where: [
        //and operator
        {
          id: MoreThan(2),
          when: MoreThan(new Date('2021-02-12T13:00:00')),
        },
        //or operator
        {
          description: Like('%meet%'),
        },
      ],
      //SQL limit statement
      take: 2,
      //sort desc, asc
      order: {
        id: 'DESC',
      },
    });
  }

  @Get(':id')
  //nestJs includes useful pipes such as "ParseIntPipe, ParseBoolPipe"
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const event = await this.repository.findBy({
      id,
    });

    if (!event.length) {
      throw new NotFoundException();
    }

    return event;
  }

  //Otherway to apply pipes
  //@UsePipes(new ValidationPipe({ groups: ['create'] }))
  @Post()
  //validationPipe check DTO class and if the field has decorator validate them
  //globally define ValidationPipe main.ts
  // async create(@Body(ValidationPipe) input: CreateEventDto) {
  //If I defined the validation in dto, then I need to create a new validation type object
  //inside the @Body
  async create(
    // @Body(new ValidationPipe({ groups: ['create'] })) input: CreateEventDto,
    @Body() input: CreateEventDto,
  ) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id,
    // @Body(new ValidationPipe({ groups: ['update'] })) input: UpdateEventDto,
    @Body() input: UpdateEventDto,
  ) {
    const event = await this.repository.findBy({
      id,
    });

    if (!event.length) {
      throw new NotFoundException();
    }

    return await this.repository.save({
      ...event,
      ...input,
      when: input.when ? new Date(input.when) : event[0].when,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const event = await this.repository.findBy({
      id,
    });

    if (!event.length) {
      throw new NotFoundException();
    }

    await this.repository.remove(event);
  }
}
