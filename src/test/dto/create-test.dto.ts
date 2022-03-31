import { IsNotEmpty } from "class-validator";

export class CreateTestDto {
    @IsNotEmpty()
    title: string;
    @IsNotEmpty()
    description: string;
}
