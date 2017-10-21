export class ToCurrencyValueConverter {
  toView(value, exchangeRate) {
    return value * exchangeRate;
  }
}
