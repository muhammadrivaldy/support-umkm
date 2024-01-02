/* eslint-disable no-shadow */
import {useState} from 'react';

const {format: formatCurrency} = Intl.NumberFormat('id-ID', {
  currency: 'IDR',
  style: 'currency',
});

export function FormatCurrency() {
  const [value, setValue] = useState(null);

  function handleChange(value) {
    const decimal = Number(value.replace(/\D/g, '')) / 100;
    setValue(formatCurrency(decimal || 0).replace('R$\xa0', ''));
  }

  return [value, handleChange];
}
