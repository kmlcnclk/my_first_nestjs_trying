import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
  Body,
  UseInterceptors,
  UploadedFile,
  UsePipes,
  ValidationPipe,
  BadRequestException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CustomersService } from '../../services/customers/customers.service';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { FormDataRequest } from 'nestjs-form-data';

@Controller('customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get(':id')
  getCustomerById(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
    const customer = this.customersService.getCustomerById(id);

    if (!customer) throw new BadRequestException('Customer not found!');
    // throw new HttpException('Customer not found!', HttpStatus.BAD_REQUEST);

    return res.status(HttpStatus.OK).json({
      status: true,
      customer,
    });
  }

  @Get('')
  getAllCustomers() {
    return this.customersService.getAllCustomers();
  }

  @Post('create')
  // @UseInterceptors(FileInterceptor('asddad'))
  // @UseInterceptors(AnyFilesInterceptor())
  // @UsePipes(ValidationPipe)
  createCustomer(
    // @UploadedFile() file,
    @Body() createCustomerDto: CreateCustomerDto,
    @Res() res: Response,
  ) {
    console.log('====================================');
    console.log(createCustomerDto);
    console.log('====================================');
    this.customersService.createCustomer(createCustomerDto);

    return res.status(HttpStatus.CREATED).json({
      success: true,
      message: 'Customer successfully created',
    });
  }
}
