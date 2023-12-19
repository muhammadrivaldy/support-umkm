const axios = require('axios').default;
const baseURL = 'https://dev.resolusilaundry.com';

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

export async function RefreshTokenAPI(refreshToken) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .post(baseURL + '/api/v1/security/refresh', null, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
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

export async function GetOrderStatusesAPI(token) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + '/api/v1/orders/statuses', {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function GetOrderPaymentStatusesAPI(token) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + '/api/v1/orders/payment/statuses', {
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function GetCustomersAPI(token, search, page, limit) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + '/api/v1/users/customer', {
      params: {
        search: search,
        page: page,
        limit: limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
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

export async function DeleteCustomersAPI(token, customerId) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .delete(baseURL + `/api/v1/users/customer/${customerId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
