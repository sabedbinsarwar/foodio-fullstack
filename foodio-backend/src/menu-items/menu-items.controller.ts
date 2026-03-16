import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { MenuItemsService } from './menu-items.service';

@Controller('menu-items')
export class MenuItemsController {

constructor(private service:MenuItemsService){}

@Get()
findAll(@Query() query){
return this.service.findAll(query)
}

@Get(':id')
findOne(@Param('id') id:number){
return this.service.findOne(id)
}

@Post()
create(@Body() body){
return this.service.create(body)
}

}