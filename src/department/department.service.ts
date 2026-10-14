import { Injectable} from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class DepartmentService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(name: string, location: string) {
    const [result] = await this.pool().execute<OkPacket>(
      'INSERT INTO departments (department_name, location) VALUES (?, ?)',
      [name, location],
    );
    return { departmentId: result.insertId, departmentName: name, location: location };
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
      'SELECT * FROM departments WHERE department_Id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM departments ORDER BY department_Id DESC',
    );
    return rows;
  }

  async update(id: number, partial: { department_name?: string, location?: string }) {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.department_name) {
      fields.push('department_name = ?');
      values.push(partial.department_name);
    }
    if (partial.location) {
      fields.push('location = ?');
      values.push(partial.location);
    }

    if (fields.length === 0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE departments SET ${fields.join(', ')} WHERE department_Id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async delete(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM departments WHERE department_Id = ?', [id]);
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