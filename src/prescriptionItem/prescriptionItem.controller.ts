import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import { PrescriptionItemService } from './prescriptionItem.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('prescriptionItem')
export class PrescriptionItemController {
  constructor(private PrescriptionItemService: PrescriptionItemService) {}

  // Get all prescriptions (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.PrescriptionItemService.getAll();
  }

  // Get single prescription by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.PrescriptionItemService.findById(+id);
  }

  // Create prescription (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.PrescriptionItemService.create(body.name);
  }

  // Update prescription (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.PrescriptionItemService.update(+id, body);
  }

  // Delete prescription (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.PrescriptionItemService.delete(+id);
  }
}