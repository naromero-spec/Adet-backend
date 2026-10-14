
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class DoctorService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  // CREATE doctor
  async create(
    departmentId: number,
    firstName: string,
    lastName: string,
    specialization: string,
    email?: string,
    phone?: string,
  ) {
    const [result] = await this.pool().execute<OkPacket>(
      `INSERT INTO doctors
      (department_id, first_name, last_name, specialization, email, phone)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        departmentId,
        firstName,
        lastName,
        specialization,
        email ?? null,
        phone ?? null,
      ],
    );

    return {
      doctor_id: result.insertId,
      department_id: departmentId,
      first_name: firstName,
      last_name: lastName,
      specialization,
      email: email ?? null,
      phone: phone ?? null,
    };
  }

  // GET doctor by ID
  async findById(id: number) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM doctors WHERE doctor_id = ?',
      [id],
    );

    return rows[0];
  }

  // GET all doctors
  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM doctors ORDER BY doctor_id DESC',
    );

    return rows;
  }

  // UPDATE doctor
  async update(
    id: number,
    partial: {
      department_id?: number;
      first_name?: string;
      last_name?: string;
      specialization?: string;
      email?: string | null;
      phone?: string | null;
    },
  ) {
    const fields: string[] = [];
    const values: (string | number | null)[] = [];

    if (partial.department_id !== undefined) {
      fields.push('department_id = ?');
      values.push(partial.department_id);
    }

    if (partial.first_name !== undefined) {
      fields.push('first_name = ?');
      values.push(partial.first_name);
    }

    if (partial.last_name !== undefined) {
      fields.push('last_name = ?');
      values.push(partial.last_name);
    }

    if (partial.specialization !== undefined) {
      fields.push('specialization = ?');
      values.push(partial.specialization);
    }

    if (partial.email !== undefined) {
      fields.push('email = ?');
      values.push(partial.email);
    }

    if (partial.phone !== undefined) {
      fields.push('phone = ?');
      values.push(partial.phone);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    await this.pool().execute(
      `UPDATE doctors SET ${fields.join(', ')} WHERE doctor_id = ?`,
      values,
    );

    return this.findById(id);
  }

  // DELETE doctor
  async delete(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM doctors WHERE doctor_id = ?',
      [id],
    );

    return result.affectedRows > 0;
  }

  // Existing methods that use the users table
  async findByUsername(username: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, password, role, refresh_token FROM users WHERE username = ?',
      [username],
    );

    return rows[0];
  }

  async setRefreshToken(id: number, refreshToken: string | null) {
    await this.pool().execute(
      'UPDATE users SET refresh_token = ? WHERE id = ?',
      [refreshToken, id],
    );
  }

  async findByRefreshToken(refreshToken: string) {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT id, username, role FROM users WHERE refresh_token = ?',
      [refreshToken],
    );

    return rows[0];
  }
}