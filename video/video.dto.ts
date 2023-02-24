import { IsNumber, IsString } from "class-validator";

export default class CreateVideoDto {
  @IsString()
  public url: string;

  @IsNumber()
  public from: string;

  @IsNumber()
  public to: string;

  @IsString()
  public hashID: string;
}
