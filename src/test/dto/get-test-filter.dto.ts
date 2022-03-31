import { IsEnum, IsOptional, IsString } from "class-validator";
import { TestStatus } from "../test-status.enum";

export class GetTestFilterDto {
    @IsOptional()
    @IsEnum(TestStatus)
    status?: TestStatus;

    @IsOptional()
    @IsString()
    search?: string;
}