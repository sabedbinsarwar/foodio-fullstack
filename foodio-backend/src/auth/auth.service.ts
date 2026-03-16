import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

constructor(
private usersService:UsersService,
private jwtService:JwtService
){}

async register(data:any){

const hashed=await bcrypt.hash(data.password,10)

const user=await this.usersService.create({
name:data.name,
email:data.email,
password:hashed
})

return user
}

async login(data:any){

const user=await this.usersService.findByEmail(data.email)

if(!user) throw new UnauthorizedException()

const valid=await bcrypt.compare(data.password,user.password)

if(!valid) throw new UnauthorizedException()

const token=this.jwtService.sign({
id:user.id,
email:user.email,
role:user.role
})

return {token}
}

}