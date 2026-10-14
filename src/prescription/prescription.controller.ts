import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import { PrescriptionService } from './prescription.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('prescription')
export class PrescriptionController {
  constructor(private PrescriptionService: PrescriptionService) {}

  // Get all prescriptions (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.PrescriptionService.getAll();
  }

  // Get single prescription by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.PrescriptionService.findById(+id);
  }

  // Create prescription (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.PrescriptionService.create(body.name);
  }

  // Update prescription (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.PrescriptionService.update(+id, body);
  }

  // Delete prescription (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.PrescriptionService.delete(+id);
  }
}