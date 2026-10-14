import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import {  DepartmentService } from './department.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  // Get all departments (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.departmentService.getAll();
  }

  // Get single department by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.departmentService.findById(+id);
  }

  // Create department (open - for demo)
  @Post()
  async create(@Body() body: { name: string, location: string }) {
    return this.departmentService.create(body.name, body.location);
  }

  // Update department (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.departmentService.update(+id, body);
  }

  // Delete department (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.departmentService.delete(+id);
  }
}