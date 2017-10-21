import {HttpWrapper} from 'services/http-wrapper';
import {BusinessAgreement} from 'models/business-agreement';

export class BusinessAgreementsService {
  static inject = [HttpWrapper];
  constructor(httpWrapper) {
    this.http = httpWrapper;
  }
  requestToDoBusiness(requestingCompany, otherCompany) {
    let payload = {
      requesting_company_id: requestingCompany.id,
      other_company_id: otherCompany.id
    };
    return this.http.post('business_agreements.json', payload).then(result => {
      return result.content;
    });
  }
  approveToDoBusiness(agreement) {
    return this.http.get(`business_agreements/${agreement.id}/approve.json`).then(result => {
      return result.content;
    });
  }
  getRequestedToDoBusiness() {
    return this.http.get('business_agreements/requested.json').then(result => {
      return result.content.map(item => {
        return new BusinessAgreement(item);
      });
    });
  }
  getRequestingToDoBusiness() {
    return this.http.get('business_agreements/requesting.json').then(result => {
      return result.content.map(item => {
        return new BusinessAgreement(item);
      });
    });
  }
}
