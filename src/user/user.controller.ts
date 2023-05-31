import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import {UserService} from './user.service'
import { userdto } from './user.userdto';

@Controller('api/user')
export class UserController {
    constructor(private userService:UserService , ) {}

    @Get(':id')
    async getAlluser(@Param('id') id:Number) {
        return this.userService.getUserbyId(id)
    }

    
    @Get(':id/avatar')
    async getUserByID(@Param('id') id:Number) {
        return this.userService.getUserAvatar(id)
    }
    
    @Post()
    async postUser(@Body() user:userdto) {
        return this.userService.postUsers(user)
    }
    
    @Delete(':id/avatar')
    async deleteUser(@Param('id') id:Number) {
        return this.userService.deleteUserById(id)
    }
}
