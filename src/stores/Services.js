const axios = require('axios').default;
const baseURL = 'https://resolusilaundry.com';

export async function LoginAPI(email, password) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .post(baseURL + '/api/v1/security/login', null, {
      auth: {
        username: email,
        password: password,
      },
    })
    .then(response => {
      if (typeof response.data !== 'undefined') {
        result.code = response.data.code;
        result.message = response.data.message;
        result.data = response.data.data;
      }
    })
    .catch(error => {
      if (typeof error.response.data !== 'undefined') {
        result.code = error.response.data.code;
        result.message = error.response.data.message;
        result.data = error.response.data.data;
      }
    });

  return result;
}
