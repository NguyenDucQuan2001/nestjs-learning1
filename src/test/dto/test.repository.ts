import { Test } from "../entities/test.entity";
import { EntityRepository } from "typeorm";
import { Repository } from "typeorm/repository/Repository";
import { CreateTestDto } from "./create-test.dto";
import { TestStatus } from "../test-status.enum";
import { GetTestFilterDto } from "./get-test-filter.dto";
import { User } from "src/auth/user.entity";

@EntityRepository(Test)
export class TestRepository extends Repository<Test>{
    async getTest(filterDto: GetTestFilterDto, user: User): Promise<Test[]> {
        const { status, search } = filterDto
        const query = this.createQueryBuilder('test')

        query.andWhere('test.status = :status', { status })

        if (status) {
            query.andWhere('test.status = :status', { status })
        }

        if (search) {
            query.andWhere('LOWER(test.title) LIKE LOWER(:search) OR LOWER(test.description) LIKE LOWER(:search)',
                { search: `%${search}%` })
        }

        const test = await query.getMany()
        return test
    }

    async createTest(createTestDto: CreateTestDto, user: User): Promise<Test> {
        const { title, description } = createTestDto

        const test = this.create({
            title,
            description,
            status: TestStatus.OPEN,
            user,
        })

        await this.save(test)

        return test
    }
}