import { Get, Injectable, NotFoundException, Param, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { takeLast } from 'rxjs';
import { User } from 'src/auth/user.entity';
import { CreateTestDto } from './dto/create-test.dto';
import { GetTestFilterDto } from './dto/get-test-filter.dto';
import { TestRepository } from './dto/test.repository';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';
import { TestStatus } from './test-status.enum';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(TestRepository)
    private testRepository: TestRepository
  ) { }

  getTest(filterDto: GetTestFilterDto, user: User): Promise<Test[]> {
    return this.testRepository.getTest(filterDto, user)
  }

  async getTestbyId(id: string, user: User): Promise<Test> {
    const found = await this.testRepository.findOne({ id, user })

    if (!found) {
      throw new NotFoundException(`test with ID ${id} not found`)
    }
    return found
  }

  createTest(createTestDto: CreateTestDto, user: User): Promise<Test> {
    return this.testRepository.createTest(createTestDto, user)
  }

  async deleteTest(id: string, user: User): Promise<void> {
    const result = await this.testRepository.delete({id, user})

    if (result.affected === 0) {
      throw new NotFoundException(`Test with ${id} not found`)

    }
  }

  async updateTestStatus(id: string, status: TestStatus, user: User): Promise<Test> {
    const test = await this.getTestbyId(id, user)

    test.status = status
    await this.testRepository.save(test)

    return test
  }
}
