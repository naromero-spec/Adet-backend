import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  DoctorService } from './doctor.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('doctor')
export class DoctorController {
  constructor(private doctorService: DoctorService) {}

  // Get all doctors (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.doctorService.getAll();
  }

  // Get single doctor by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.doctorService.findById(+id);
  }

  // Create doctor (open - for demo)
  
@Post()
async create(
  @Body() body: {
    department_id: number;
    first_name: string;
    last_name: string;
    specialization: string;
    email?: string;
    phone?: string;
  },
) {
  return this.doctorService.create(
    body.department_id,
    body.first_name,
    body.last_name,
    body.specialization,
    body.email,
    body.phone,
  );
}


  // Update doctor (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.doctorService.update(+id, body);
  }

  // Delete doctor (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.doctorService.delete(+id);
  }
}