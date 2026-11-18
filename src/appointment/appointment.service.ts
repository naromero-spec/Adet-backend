
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../Database/database.service';
import { RowDataPacket, OkPacket } from 'mysql2';

@Injectable()
export class AppointmentService {
  constructor(private db: DatabaseService) {}

  private pool = () => this.db.getPool();

  // CREATE APPOINTMENT
  async create(body: {
    patient_id: number;
    doctor_id: number;
    appointment_date: string;
    appointment_time: string;
    reason?: string;
    status?: string;
  }) {
    const [result] = await this.pool().execute<OkPacket>(
      `INSERT INTO appointments
      (patient_id, doctor_id, appointment_date, appointment_time, reason, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        body.patient_id,
        body.doctor_id,
        body.appointment_date,
        body.appointment_time,
        body.reason?.trim() || null,
        body.status?.trim() || 'Scheduled',
      ],
    );

    return this.findById(result.insertId);
  }

  // GET APPOINTMENT BY ID
  async findById(id: number) {
  const [rows] = await this.pool().execute<RowDataPacket[]>(
    'SELECT * FROM appointments WHERE appointment_id = ?',
    [id],
  );

  return rows[0];
}
  // GET ALL APPOINTMENTS
  async getAll() {
  const [rows] = await this.pool().execute<RowDataPacket[]>(`
    SELECT
      a.appointment_id,
      a.patient_id,
      a.doctor_id,
      a.appointment_date,
      a.appointment_time,
      a.reason,
      a.status,
      p.first_name AS patient_first_name,
      p.last_name AS patient_last_name,
      d.first_name AS doctor_first_name,
      d.last_name AS doctor_last_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
    ORDER BY a.appointment_date ASC, a.appointment_time ASC
  `);

  return rows;
}

  // UPDATE APPOINTMENT
  async update(id: number, partial: { name?: string }) {
    const fields: string[] = [];
    const values: any[] = [];

    if (partial.name !== undefined) {
      fields.push('name = ?');
      values.push(partial.name);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);

    const sql = `UPDATE appointments SET ${fields.join(', ')} WHERE id = ?`;

    await this.pool().execute(sql, values);

    return this.findById(id);
  }

  // DELETE APPOINTMENT
  async delete(id: number) {
    const [result] = await this.pool().execute<OkPacket>(
      'DELETE FROM appointments WHERE id = ?',
      [id],
    );

    return result.affectedRows > 0;
  }
}
