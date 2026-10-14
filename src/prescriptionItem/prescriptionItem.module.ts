import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { PrescriptionItemService } from './prescriptionItem.service';
import { PrescriptionItemController} from './prescriptionItem.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [PrescriptionItemController],
  providers: [PrescriptionItemService],
  exports: [PrescriptionItemService],
})
export class PrescriptionItemModule {}