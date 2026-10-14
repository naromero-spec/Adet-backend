import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './Auth/auth.module';
import { DatabaseModule } from './Database/database.module';
import { CategoryModule } from './category/category.module';
import { DepartmentModule } from './department/department.module';
import { AdmissionModule } from './admission/admission.module';
import { AppointmentModule } from './appointment/appointment.module';
import {PatientModule} from './patient/patient.module';
import { PrescriptionModule } from './prescription/prescription.module';
import {PrescriptionItemModule } from './prescriptionItem/prescriptionItem.module';
import {PaymentModule } from './payment/payment.module';
import {MedicineModule } from './medicine/medicine.module';
import { MedicalrecordModule } from './medicalrecord/medicalrecord.module';
import {DoctorModule } from './doctor/doctor.module'
import { RoomModule } from './room/room.moduler';


@Module({
  imports: [DatabaseModule, UsersModule, AuthModule, CategoryModule, DepartmentModule, AdmissionModule, AppointmentModule, PatientModule, PrescriptionModule, PrescriptionItemModule, PaymentModule, MedicineModule, MedicalrecordModule, RoomModule, DoctorModule],
})
export class AppModule {}