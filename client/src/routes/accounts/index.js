export class Index {
  configureRouter(config, router) {
    config.map([
      { route: ['', 'details'],  moduleId: './routes/details', nav: false, title: 'Details' },
      { route: 'company-details/:id',  moduleId: './routes/company-details', nav: false, title: 'Company Details' }
    ]);

    this.router = router;
  }
}
