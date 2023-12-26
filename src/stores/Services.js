const axios = require('axios').default;
// const baseURL = 'https://dev.resolusilaundry.com';
const baseURL = 'https://e101-103-149-34-9.ngrok-free.app';

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

export async function PostCustomersAPI(token, name, phone_number, address) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .post(
      baseURL + '/api/v1/users/customer',
      {
        name: name,
        phone_number: phone_number,
        address: address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
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

export async function GetStoresByUserIdAPI(token, userId) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + `/api/v1/stores/user/${userId}`, {
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

export async function GetServicesByStoreIdAPI(token, storeId) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + `/api/v1/packages/services/stores/${storeId}`, {
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

export async function GetPackagesByServiceIdAndStoreIdAPI(
  token,
  serviceId,
  storeId,
) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .get(baseURL + `/api/v1/packages/services/${serviceId}/stores/${storeId}`, {
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

export async function GetOrdersAPI(
  token,
  search,
  page,
  limit,
  startDate,
  endDate,
  orderStatus,
  paymentStatus,
) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  let params = [];
  params.push({page: page});
  params.push({limit: limit});
  search !== '' ? params.push({search: search}) : null;
  startDate > 0 ? params.push({start_date: startDate}) : null;
  endDate > 0 ? params.push({end_date: endDate}) : null;
  orderStatus.length > 0
    ? orderStatus.map(val => {
        params.push({order_status: val});
      })
    : null;
  paymentStatus.length > 0
    ? paymentStatus.map(val => {
        params.push({payment_status: val});
      })
    : null;

  let queryParams = '';
  params.map(val => {
    let key = Object.keys(val)[0];
    let value = val[key];
    queryParams +=
      queryParams !== '' ? '&' + key + '=' + value : key + '=' + value;
  });

  var buildPathURL = '/api/v1/orders';
  if (queryParams !== '') {
    buildPathURL += '?' + queryParams;
  }

  await axios
    .get(baseURL + buildPathURL, {
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

export async function PostOrdersAPI(
  token,
  customerId,
  totalPayment,
  paidPayment,
  paymentMethod,
  packages,
) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  var packagesForPayload = [];

  packages.map(idx => {
    packagesForPayload.push({
      package_id: idx.packageId,
      service_name: idx.serviceName,
      quantity: idx.quantity,
      package_price: idx.packagePrice,
      final_price: idx.finalPrice,
      member: idx.member,
      note: idx.note,
    });
  });

  await axios
    .post(
      baseURL + '/api/v1/orders',
      {
        customer_id: customerId,
        total_payment: totalPayment,
        paid_payment: paidPayment,
        payment_method: paymentMethod,
        packages: packagesForPayload,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )
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
