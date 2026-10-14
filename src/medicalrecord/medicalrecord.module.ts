import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { MedicalrecordService } from './medicalrecord.service';
import { MedicalrecordController } from './medicalrecord.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [MedicalrecordController],
  providers: [MedicalrecordService],
  exports: [MedicalrecordService],
})
export class MedicalrecordModule {}