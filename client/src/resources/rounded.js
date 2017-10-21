export class RoundedValueConverter {
  toView(value) {
    let returnValue = (parseFloat(value).toFixed(4));
    return returnValue;
  }
}
