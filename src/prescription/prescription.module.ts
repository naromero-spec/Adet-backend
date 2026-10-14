import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { PrescriptionService } from './prescription.service';
import { PrescriptionController} from './prescription.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionModule {}