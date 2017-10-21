import numeral from 'numeral';

export class UsdFormatValueConverter {
  toView(value) {
    return numeral(value).format('($0,0.00)');
  }
}
