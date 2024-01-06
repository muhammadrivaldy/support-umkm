/* eslint-disable no-shadow */
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
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
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
    });

  return result;
}

export async function PatchOrderStatusAPI(token, orderNo, status) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .patch(baseURL + `/api/v1/orders/${orderNo}/status/${status}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
    });

  return result;
}

export async function PatchPaymentStatusAPI(
  token,
  orderNo,
  status,
  paid,
  paymentMethod,
) {
  let result = {
    code: 500,
    message: 'unexpected error',
    data: null,
  };

  await axios
    .patch(
      baseURL + `/api/v1/orders/${orderNo}/payment/status/${status}`,
      {
        paid: paid,
        payment_method: paymentMethod,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    )
    .then(response => {
      result.code = response.data.code;
      result.message = response.data.message;
      result.data =
        typeof response.data !== 'undefined' ? response.data.data : null;
    })
    .catch(error => {
      result.code = error.response.data.code;
      result.message = error.response.data.message;
      result.data = null;
    });

  return result;
}

// ================== NEW APPROACH ==================

export function GetCustomerByPhoneAndStoreAPI(token, phone, storeId) {
  return axios.get(
    baseURL + `/api/v1/users/customers/phones/${phone}/stores/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export function GetServicesByStoreIdAPINew(token, storeId) {
  return axios.get(baseURL + `/api/v1/packages/services/stores/${storeId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function GetPackagesByServiceIdAndStoreIdAPINew(
  token,
  serviceId,
  storeId,
) {
  return axios.get(
    baseURL + `/api/v1/packages/services/${serviceId}/stores/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
}

export function GetPriceTypesAPI(token) {
  return axios.get(baseURL + '/api/v1/packages/prices/types', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export function PutServiceByServiceIdAndStoreIdAPI(
  token,
  serviceId,
  storeId,
  name,
  priceType,
) {
  return axios.put(
    baseURL + `/api/v1/packages/services/${serviceId}/stores/${storeId}`,
    {
      name: name,
      price_type: priceType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function PutPackageByPackageIdAndStoreIdAPI(
  token,
  packageId,
  storeId,
  price,
  estimationHours,
) {
  return axios.put(
    baseURL + `/api/v1/packages/${packageId}/stores/${storeId}`,
    {
      price: price,
      estimation_hours: estimationHours,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function PostPackageByStoreIdAPI(
  token,
  storeId,
  serviceId,
  price,
  estimationHours,
) {
  return axios.post(
    baseURL + `/api/v1/packages/stores/${storeId}`,
    {
      service: serviceId,
      price: price,
      estimation_hours: estimationHours,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function DeletePackageAPI(token, storeId, packageId) {
  return axios.delete(
    baseURL + `/api/v1/packages/${packageId}/stores/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function DeleteServiceAPI(token, storeId, serviceId) {
  return axios.delete(
    baseURL + `/api/v1/packages/services/${serviceId}/stores/${storeId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function PutPackageByStoreIdAPI(
  token,
  storeId,
  packageId,
  price,
  estimationHours,
) {
  return axios.put(
    baseURL + `/api/v1/packages/${packageId}/stores/${storeId}`,
    {
      price: price,
      estimation_hours: estimationHours,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function PostServiceByStoreIdAPI(token, storeId, name, priceType) {
  return axios.post(
    baseURL + `/api/v1/packages/services/stores/${storeId}`,
    {
      name: name,
      price_type: priceType,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    },
  );
}

export function GetStatisticIncomesByStoreIdAPI(token, storeId, time, value) {
  let params = [];
  params.push({time: time});
  value !== null ? params.push({value: value}) : params.push({value: 'empty'});

  let queryParams = '';
  params.map(val => {
    let key = Object.keys(val)[0];
    let value = val[key];
    queryParams +=
      queryParams !== '' ? '&' + key + '=' + value : key + '=' + value;
  });

  var buildPathURL = `/api/v1/stores/${storeId}/incomes/statistic`;
  if (queryParams !== '') {
    buildPathURL += '?' + queryParams;
  }

  return axios.get(baseURL + buildPathURL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
