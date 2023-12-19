import {GetOrderStatuses, LoginAPI} from './Services';

describe('Login API', () => {
  test('Login Success', async () => {
    var data = await LoginAPI('admin@example.com', 'SayaAdmin');
    console.log(data);
  });
});

describe('Get Order Statuses', () => {
  test('Get Statuses Success', async () => {
    var resp = await LoginAPI('admin@example.com', 'SayaAdmin');
    var data = await GetOrderStatuses(resp.data.token);
    console.log(data);
  });
});
