import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  AdmissionService } from './admission.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('admission')
export class AdmissionController {
  constructor(private admissionService: AdmissionService) {}

  // Get all appointments (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.admissionService.getAll();
  }

  // Get single appointment by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.admissionService.findById(+id);
  }

  // Create appointment (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.admissionService.create(body.name);
  }

  // Update appointment (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.admissionService.update(+id, body);
  }

  // Delete appointment (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.admissionService.delete(+id);
  }
}