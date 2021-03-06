/* eslint-disable prefer-destructuring */
import { Request, Response } from 'express';

import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import FindOrderService from '@modules/orders/services/FindOrderService';

export default class OrdersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;

    const findOrder = await container.resolve(FindOrderService);

    const orders = await findOrder.execute(id);

    return response.json(orders);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = await container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });

    return response.json(order);
  }
}
