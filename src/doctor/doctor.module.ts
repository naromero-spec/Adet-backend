import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorModule {}