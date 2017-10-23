import { Datastore } from 'resources/datastore';

export class App {
  static inject = [Datastore];
  
  /**
   * @param {Datastore} datastore
   */
  constructor(datastore) {
    this.datastore = datastore;
  }

  configureRouter(config, router) {
    config.title = 'GigMe.io';
    config.map([{
        route: ['', 'listings'],
        name: 'listings',
        moduleId: 'routes/listings/index',
        nav: true,
        title: 'Listings'
      },
      {
        route: 'accounts',
        name: 'accounts',
        moduleId: 'routes/accounts/index',
        nav: true,
        title: 'Accounts'
      },
      {
        route: 'companies',
        name: 'companies',
        moduleId: 'routes/companies/index',
        nav: true,
        title: 'Companies'
      },
      {
        route: 'messages',
        name: 'messages',
        moduleId: 'routes/messages/index',
        nav: true,
        title: 'Messages'
      },
      {
        route: 'payment-requests',
        name: 'payment-requests',
        moduleId: 'routes/payment-requests/index',
        nav: true,
        title: 'Payment Requests'
      }
    ]);

    this.router = router;
  }
}
