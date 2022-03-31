import { PartialType } from '@nestjs/mapped-types';
import { IsEnum } from 'class-validator';
import { CreateTestDto } from './create-test.dto';
import { TestStatus } from '../test-status.enum'

export class UpdateTestDto extends PartialType(CreateTestDto) {
    @IsEnum(TestStatus)
    status: TestStatus;
}
