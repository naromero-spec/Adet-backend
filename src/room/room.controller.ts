import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
// import { UsersService } from './users.service';
import { RoomService } from './room.service';
import { JwtAuthGuard } from '../Auth/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private RoomService: RoomService) {}

  // Get all rooms (protected)
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.RoomService.getAll();
  }

  // Get single room by id (protected)
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.RoomService.findById(+id);
  }

  // Create room (open - for demo)
  @Post()
  async create(@Body() body: { name: string }) {
    return this.RoomService.create(body.name);
  }

  // Update room (protected)
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.RoomService.update(+id, body);
  }

  // Delete room (protected)
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.RoomService.delete(+id);
  }
}