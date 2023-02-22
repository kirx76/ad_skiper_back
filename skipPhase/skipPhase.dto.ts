import {IsNumber, IsOptional, IsString} from "class-validator";

export default class SkipPhaseDto {
    @IsString()
    public start: string;

    @IsString()
    public end: string;

    @IsNumber()
    @IsOptional()
    public rate?: number;
}
