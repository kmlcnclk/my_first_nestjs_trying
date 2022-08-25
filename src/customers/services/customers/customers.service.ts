import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from '../../dtos/CreateCustomer.dto';
import { ICustomer } from '../../types/Customer.type';

@Injectable()
export class CustomersService {
  private customers: ICustomer[] = [
    {
      id: 1,
      name: 'a',
      email: 'a@gmail.com',
    },
    {
      id: 2,
      name: 'b',
      email: 'b@gmail.com',
    },
    {
      id: 3,
      name: 'c',
      email: 'c@gmail.com',
    },
  ];

  getCustomerById(id: number): object {
    return this.customers.find((user) => user?.id === id);
  }

  createCustomer(customerDto: CreateCustomerDto): void {
    this.customers.push(customerDto);
  }

  getAllCustomers(): ICustomer[] {
    return this.customers;
  }
}
