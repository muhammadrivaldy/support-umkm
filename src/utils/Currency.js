/* eslint-disable no-shadow */
import {useState} from 'react';

export function FormattingNumberToMoneyWithState() {
  const [value, setValue] = useState(null);

  return {
    valueInNumber: value,
    getValue: () => {
      if (value !== null && value > 0) {
        return FormattingNumberToMoney(value);
      }

      return null;
    },
    setValue: value => {
      let valueStr = String(value);
      setValue(Number(valueStr.replaceAll('.', '')));
    },
  };
}

export function FormattingNumberToMoney(value) {
  let formatting = Intl.NumberFormat();
  let newValue = formatting.format(value);
  return newValue.replaceAll(',', '.');
}
