import { Injectable} from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';
// import * as bcrypt from 'bcryptjs';

@Injectable()
export class PatientService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  async create(
  first_name: string,
  last_name: string,
  date_of_birth: string,
  gender: 'Male' | 'Female' | 'Other',
  address?: string,
  phone?: string,
  email?: string,
  emergency_contact?: string,
  emergency_phone?: string,
) {
  const [result] = await this.pool().execute<OkPacket>(
    `INSERT INTO patients
    (first_name, last_name, date_of_birth, gender, address, phone, email,
      emergency_contact, emergency_phone)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      first_name,
      last_name,
      date_of_birth,
      gender,
      address ?? null,
      phone ?? null,
      email ?? null,
      emergency_contact ?? null,
      emergency_phone ?? null,
    ],
  );

  return {
    patient_id: result.insertId,
    first_name,
    last_name,
    date_of_birth,
    gender,
    address: address ?? null,
    phone: phone ?? null,
    email: email ?? null,
    emergency_contact: emergency_contact ?? null,
    emergency_phone: emergency_phone ?? null,
  };
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
      'SELECT * FROM patients WHERE patient_id = ?',
      [id],
    );
    return rows[0];
  }

  async getAll() {
    const [rows] = await this.pool().execute<RowDataPacket[]>(
      'SELECT * FROM patients ORDER BY patient_id DESC',
    );
    return rows;
  }

  async update(id: number, partial: { first_name?: string,
    last_name?: string,
    date_of_birth?: string,
    gender?: 'Male' | 'Female' | 'Other',
    address?: string,
    phone?: string,
    email?: string,
    emergency_contact?: string,
    emergency_phone?: string
   })
   {
    const fields: string[] = [];
    const values: any[] = [];
    if (partial.first_name) {
      fields.push('first_name = ?');
      values.push(partial.first_name);
    }
    if (partial.last_name) {
      fields.push('last_name = ?');
      values.push(partial.last_name);
    }
    if (partial.date_of_birth) {
      fields.push('date_of_birth = ?');
      values.push(partial.date_of_birth);
    }
    if (partial.gender) {
      fields.push('gender = ?');
      values.push(partial.gender);
    }

    if (partial.address) {
      fields.push('address = ?');
      values.push(partial.address);
    }
    if (partial.phone) {
      fields.push('phone = ?');
      values.push(partial.phone);
    }
    if (partial.email) {
      fields.push('email = ?');
      values.push(partial.email);
    }
    if (partial.emergency_contact) {
      fields.push('emergency_contact = ?');
      values.push(partial.emergency_contact);
    }
    if (partial.emergency_phone) {
      fields.push('emergency_phone = ?');

      values.push(partial.emergency_phone);
    }
    

    if (fields.length === 0) return await this.findById(id);
    values.push(id);
    const sql = `UPDATE patients SET ${fields.join(', ')} WHERE patient_id = ?`;
    await this.pool().execute(sql, values);
    return this.findById(id);
  }

  async delete(id: number) {
    const [res] = await this.pool().execute<OkPacket>('DELETE FROM patients WHERE patient_id = ?', [id]);
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