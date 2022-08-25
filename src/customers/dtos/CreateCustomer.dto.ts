import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumberString,
  ValidateNested,
} from 'class-validator';
import { CreateAddressDto } from './CreateAddressDto.dto';

export class CreateCustomerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNumberString()
  @IsNotEmpty()
  id: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;
}
