/* eslint-disable no-shadow */
import {useState} from 'react';

export function FormattingNumberToMoney() {
  const [value, setValue] = useState(null);

  return {
    valueInNumber: value,
    getValue: () => {
      if (value !== null && value > 0) {
        let formatting = Intl.NumberFormat();
        let newValue = formatting.format(value);
        return newValue.replaceAll(',', '.');
      }

      return null;
    },
    setValue: value => {
      let valueStr = String(value);
      setValue(Number(valueStr.replaceAll('.', '')));
    },
  };
}
