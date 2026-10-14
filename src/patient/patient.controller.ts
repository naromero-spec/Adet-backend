import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  PatientService } from './patient.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('patient')
export class PatientController {
  constructor(private patientService: PatientService) {}

  // Get all patients (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.patientService.getAll();
  }

  // Get single patient by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.patientService.findById(+id);
  }

  // Create patient (open - for demo)
  @Post()
  async create(@Body() body: { first_name: string;
    last_name: string;
    date_of_birth: string; 
    gender: 'Male' | 'Female' | 'Other'; 
    address?: string; 
    phone?: string; email?: string; 
    emergency_contact : string; 
    emergency_phone: string }) {
    return this.patientService.create(body.first_name, body.last_name, body.date_of_birth, body.gender, body.address, body.phone, body.email, body.emergency_contact, body.emergency_phone);
  }

  // Update patient (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.patientService.update(+id, body);
  }

  // Delete patient (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.patientService.delete(+id);
  }
}