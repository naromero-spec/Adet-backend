import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  AppointmentService } from './appointment.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('appointment')
export class AppointmentController {
  constructor(private appointmentService: AppointmentService) {}

  // Get all appointments (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.appointmentService.getAll();
  }

  // Get single appointment by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.appointmentService.findById(+id);
  }

  // Create appointment (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.appointmentService.create(body.name);
  }

  // Update appointment (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.appointmentService.update(+id, body);
  }

  // Delete appointment (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentService.delete(+id);
  }
}