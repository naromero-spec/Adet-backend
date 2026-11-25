import { Injectable} from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class RoomService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(
  room_number: string,
  room_type = 'General',
  status = 'Available',
  daily_rate = 0,
) {
  const [result] = await this.pool().execute<OkPacket>(
    `INSERT INTO rooms
    (room_number, room_type, status, daily_rate)
    VALUES (?, ?, ?, ?)`,
    [room_number, room_type, status, daily_rate],
  );

  return {
    room_id: result.insertId,
    room_number,
    room_type,
    status,
    daily_rate,
  };
}

  async findById(id: number) {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM rooms WHERE room_id = ?',
    [id],
  );
  return rows[0];
}

async getAll() {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    `SELECT room_id, room_number, room_type, status, daily_rate
      FROM rooms
     ORDER BY room_id DESC`,
  );

  return rows;
}

  async update(id: number, partial: { name?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.name) {
      fields.push('room_number = ?');
      values.push(partial.name);
    }

    
    if (fields.length === 0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE rooms SET ${fields.join(', ')} WHERE room_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async delete(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM rooms WHERE room_id = ?', [id]);
    return res.affectedRows > 0;
  }
}