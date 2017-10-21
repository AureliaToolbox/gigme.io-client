export class CompletedFilterValueConverter {
  toView(value, isCompleted = true) {
    let items = value.slice(0);
    return items.filter(item => {
      return item.completed === isCompleted;
    });
  }
}
