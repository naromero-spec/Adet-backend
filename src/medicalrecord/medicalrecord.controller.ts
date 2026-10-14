import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  MedicalrecordService } from './medicalrecord.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('medicalrecord')
export class MedicalrecordController {
  constructor(private medicalrecordService: MedicalrecordService) {}

  // Get all doctors (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.medicalrecordService.getAll();
  }

  // Get single doctor by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.medicalrecordService.findById(+id);
  }

  // Create doctor (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.medicalrecordService.create(body.name);
  }

  // Update doctor (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.medicalrecordService.update(+id, body);
  }

  // Delete doctor (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.medicalrecordService.delete(+id);
  }
}