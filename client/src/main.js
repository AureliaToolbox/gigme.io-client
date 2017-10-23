export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-dialog')
    .globalResources([
      'resources/date-format',
      'resources/usd-format',
      'util-components/checkbox'
    ])
  ;

  aurelia.start().then(() => aurelia.setRoot());
}
