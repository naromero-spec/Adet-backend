import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';
import { DatabaseModule } from '../Database/database.module';
import { CategoryService } from './category.service';
import { Categorycontroller } from '../category/category.controller';

@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [Categorycontroller],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}