import { IsString, IsNumber, IsBoolean } from 'class-validator'

export class CreateMenuItemDto{

@IsString()
name:string

@IsString()
description:string

@IsNumber()
price:number

@IsString()
image:string

@IsBoolean()
isAvailable:boolean

}