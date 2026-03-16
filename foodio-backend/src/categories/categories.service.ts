import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

constructor(
@InjectRepository(Category)
private repo:Repository<Category>
){}

findAll(){
return this.repo.find()
}

create(data:any){
return this.repo.save(data)
}

}