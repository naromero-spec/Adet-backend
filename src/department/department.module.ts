import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { DepartmentService } from './department.service';
import { DepartmentController } from './department.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [DepartmentController],
  providers: [DepartmentService],
  exports: [DepartmentService],
})
export class DepartmentModule {}