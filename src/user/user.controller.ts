import { Body, Controller, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { GetCurrentUserId } from 'src/auth/common/decorators';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto';
import { UserRO } from './types';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Patch(':id')
  update(
    @GetCurrentUserId() userId: number,
    @Param('id', ParseIntPipe) paramId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserRO> {
    return this.userService.update(paramId, userId, updateUserDto);
  }

  // TODO
  // @Delete(':id')
  // delete(@GetCurrentUserId() userId: number, @Param('id', ParseIntPipe) paramId: number) {
  //   return this.userService.delete(paramId, userId);
  // }
}
