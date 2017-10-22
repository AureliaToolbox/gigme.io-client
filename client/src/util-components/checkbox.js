import { customElement, bindable, bindingMode } from 'aurelia-framework'

const checkedIcon = 'M8.46 16.32l4.26 4.32 10.02-10.08';
const uncheckedIcon = 'M8 8 l14 14 m-14 0 l14 -14';

@customElement('checkbox')
export class Checkbox {
  @bindable({
    defaultBindingMode: bindingMode.twoWay
  })
  value

  @bindable()
  readOnly

  valueChanged(isChecked) {
    this.icon = isChecked ? checkedIcon : uncheckedIcon;
  }
  
  toggle() {
    if (!this.readOnly && this.readOnly !== '') {
      this.value = !this.value;
    }
  }
}
