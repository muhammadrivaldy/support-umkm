/* eslint-disable jest/no-focused-tests */
import {
  GetOrderStatusesAPI,
  GetOrderPaymentStatusesAPI,
  LoginAPI,
  GetCustomersAPI,
} from './Services';

describe('Login API', () => {
  test('Login Success', async () => {
    var data = await LoginAPI('admin@example.com', 'SayaAdmin');
    console.log(data);
  });
});

describe('Get Order Statuses API', () => {
  test('Get Order Statuses Success', async () => {
    var resp = await LoginAPI('admin@example.com', 'SayaAdmin');
    var data = await GetOrderStatusesAPI(resp.data.token);
    console.log(data);
  });
});

describe('Get Order Payment Statuses API', () => {
  test('Get Order Payment Statuses Success', async () => {
    var resp = await LoginAPI('admin@example.com', 'SayaAdmin');
    var data = await GetOrderPaymentStatusesAPI(resp.data.token);
    console.log(data);
  });
});

describe.only('Get Customers API', () => {
  test('Get Customers Success', async () => {
    var resp = await LoginAPI('admin@example.com', 'SayaAdmin');
    var data = await GetCustomersAPI(resp.data.token, null, 1, 10);
    console.log(data);
  });
});
