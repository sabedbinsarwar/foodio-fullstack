import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MenuItem } from './entities/menu-item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MenuItemsService {

constructor(
@InjectRepository(MenuItem)
private repo:Repository<MenuItem>
){}

async findAll(query:any){

const qb=this.repo.createQueryBuilder("menu")

qb.leftJoinAndSelect("menu.category","category")

if(query.search){
qb.andWhere("menu.name ILIKE :search",{search:`%${query.search}%`})
}

if(query.category){
qb.andWhere("category.id = :category",{category:query.category})
}

if(query.available){
qb.andWhere("menu.isAvailable = :available",{available:query.available})
}

return qb.getMany()

}

findOne(id:number){
return this.repo.findOne({
where:{id},
relations:['category']
})
}

create(data:any){
return this.repo.save(data)
}

}