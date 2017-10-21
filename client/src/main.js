export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-dialog')
    .globalResources('resources/date-format')
    .globalResources('resources/usd-format');

  aurelia.start().then(() => aurelia.setRoot());
}
