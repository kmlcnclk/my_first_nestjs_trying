import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CustomersController } from './controllers/customers/customers.controller';
import { CustomersService } from './services/customers/customers.service';
import { ValidateCustomerMiddleware } from './middlewares/validate-customer.middleware';
import { ValidateCustomerAccountMiddleware } from './middlewares/validate-customer-account.middleware';

@Module({
  controllers: [CustomersController],
  providers: [CustomersService],
})
export class CustomersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        ValidateCustomerMiddleware,
        ValidateCustomerAccountMiddleware,
        (req: any, res: any, next: any) => {
          console.log('Lastttt');
          next();
        },
      )
      .exclude({
        path: 'api/customers/',
        method: RequestMethod.GET,
      })
      .forRoutes(
        // {
        //   path: 'customers/:id',
        //   method: RequestMethod.GET,
        // },
        // {
        //   path: 'customers/',
        //   method: RequestMethod.GET,
        // },
        CustomersController,
      );
  }
}
