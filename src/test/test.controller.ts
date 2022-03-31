import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Logger } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import { GetTestFilterDto } from './dto/get-test-filter.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { ConfigService } from '@nestjs/config';

@Controller('test')
@UseGuards(AuthGuard())
export class TestController {
  constructor(
    private testService: TestService,
    private configService: ConfigService
  ) {
    console.log(configService.get('TEST_VALUE'))
  }

  @Get()
  getTest(@Query() filterDto: GetTestFilterDto, @GetUser() user: User): Promise<Test[]> {
    return this.testService.getTest(filterDto, user)
  }

  @Get('/:id')
  getTestById(@Param('id') id: string, @GetUser() user: User): Promise<Test> {
    return this.testService.getTestbyId(id, user)
  }

  @Post()
  createTest(
    @Body() createTestDto: CreateTestDto,
    @GetUser() user: User,
  ): Promise<Test> {
    return this.testService.createTest(createTestDto, user);
  }

  @Delete('/:id')
  deleteTest(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.testService.deleteTest(id, user)
  }

  @Patch('/:id/status')
  updateTestStatus(
    @Param('id') id: string,
    @Body() updateTestStatusDto: UpdateTestDto,
    @GetUser() user: User
  ): Promise<Test> {
    const { status } = updateTestStatusDto
    return this.testService.updateTestStatus(id, status, user)
  }
}
