export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'list'],  moduleId: './routes/list', nav: false, title: 'List' },
      { route: 'details/:id',  moduleId: './routes/details', nav: false, title: 'Details' }
    ]);

    this.router = router;
  }
}
