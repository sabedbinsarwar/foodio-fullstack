import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Roles } from 'src/common/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@Controller('categories')
export class CategoriesController {

constructor(private service:CategoriesService){}

@Get()
findAll(){
return this.service.findAll()
}

@Post()
@UseGuards(JwtAuthGuard,RolesGuard)
@Roles('ADMIN')
create(@Body() body){
return this.service.create(body)
}

}