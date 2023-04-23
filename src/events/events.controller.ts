import { Repository } from 'typeorm';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity.';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event)
    private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll() {
    return await this.repository.find();
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.repository.findBy({
      id,
    });
  }

  @Post()
  async create(@Body() input: CreateEventDto) {
    return await this.repository.save({
      ...input,
      when: new Date(input.when),
    });
  }

  @Patch(':id')
  async update(@Param('id') id, @Body() input: UpdateEventDto) {
    const event = await this.repository.findBy({
      id,
    });

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
    await this.repository.remove(event);
  }
}
