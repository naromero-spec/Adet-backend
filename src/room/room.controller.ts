import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request, BadRequestException } from '@nestjs/common';
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
async create(
  @Body()
  body: {
    room_number?: string;
    roomNumber?: string;
    name?: string;
    room_type?: string;
    status?: string;
    daily_rate?: number;
  },
) {
  const roomNumber =
    body.room_number ?? body.roomNumber ?? body.name;

  if (!roomNumber) {
    throw new BadRequestException('Room number is required');
  }

  return this.RoomService.create(
    roomNumber,
    body.room_type,
    body.status,
    body.daily_rate,
  );
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