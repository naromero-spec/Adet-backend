import { Injectable} from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class MedicalrecordService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(name: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO medicalrecords (name) VALUES (?)',
      [name],
    );
    return { id: result.insertId, name };
  }

  async findByUsername(username: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
      [username],
    );
    return rows[0];
  }

  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, role, created_at FROM users WHERE id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, role, created_at FROM users',
    );
    return rows;
  }

  async update(id: number, partial: { name?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.name) {
      fields.push('name = ?');
      values.push(partial.name);
    }

    
    if (fields.length === 0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE medicalrecords SET ${fields.join(', ')} WHERE id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async delete(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM medicalrecords    WHERE id = ?', [id]);
    return res.affectedRows > 0;
  }

  async setRefreshToken(id: number, refreshToken: string | null) {
    await this.pool().execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, id]);
  }

  async findByRefreshToken(refreshToken: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, role FROM users WHERE refresh_token = ?',
      [refreshToken],
    );
    return rows[0];
  }
}