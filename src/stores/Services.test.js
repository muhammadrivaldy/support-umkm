import {LoginAPI} from './Services';

describe('Login API', () => {
  test('Login Success', async () => {
    var data = await LoginAPI('admin@example.com', 'SayaAdmin');
    console.log(data.message);
  });
});
