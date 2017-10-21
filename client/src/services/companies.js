import {HttpWrapper} from 'services/http-wrapper';
import {Company} from 'models/company';
import {Session} from 'services/session';

export class CompaniesService {
  static inject = [HttpWrapper, Session];
  constructor(httpWrapper, session) {
    this.session = session;
    this.http = httpWrapper;
  }
  getCompanies() {
    return this.http.get('companies.json').then(result => {
      return result.content;
    });
  }
  create(company) {
    return this.http.post('companies/create.json', company).then(result => {
      return result.content;
    });
  }
}
