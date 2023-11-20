export const toFloat = (value: string) => {
  let retVal = 0;
  try {
    retVal = parseFloat(value);
  } catch (e) {
    console.log(e);
  }
  if (!isFinite(retVal)) retVal = 0;
  return retVal;
};

export function toSignificant(value: string, decimals: number) {
  let x = toFloat(value).toPrecision(decimals),
    e;
  let xx = toFloat(x);
  if (Math.abs(xx) < 1.0) {
    e = parseInt(x.toString().split('e-')[1]);
    if (e) {
      x = xx.toString().split('e-')[0].replace('.', '');
      x = '0.' + new Array(e).join('0') + x;
    }
  }
  return x;
}
export function formatValue(value: string, defVal = '') {
  let inputValue = value ? value.toString() : defVal;
  if (inputValue.includes('.')) {
    const nums = inputValue.split('.');
    inputValue = nums[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',') + '.' + nums[1];
  } else {
    inputValue = inputValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return inputValue;
}
