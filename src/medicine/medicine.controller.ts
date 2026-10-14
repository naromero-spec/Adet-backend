import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  MedicineService } from './medicine.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('medicinerecord')
export class MedicineController {
  constructor(private medicineService: MedicineService) {}

  // Get all medicines (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.medicineService.getAll();
  }

  // Get single medicine by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.medicineService.findById(+id);
  }

  // Create medicine (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.medicineService.create(body.name);
  }

  // Update medicine (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.medicineService.update(+id, body);
  }

  // Delete medicine (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.medicineService.delete(+id);
  }
}