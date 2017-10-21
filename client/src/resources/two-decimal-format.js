import numeral from 'numeral';

export class TwoDecimalFormatValueConverter {
  toView(value) {
    return numeral(value).format('(0,0.00)');
  }
}
