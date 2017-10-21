import {bindable} from 'aurelia-framework';
import {BusinessAgreementsService} from 'services/business-agreements';

export class BusinessAgreementList {
  @bindable agreements = [];
  @bindable canApprove = false;
  @bindable canCancel = false;
  @bindable relatedCompanyPropName;
  @bindable relatedCompanyProp;

  static inject = [BusinessAgreementsService];
  constructor(businessAgreementsService) {
    this.businessAgreementsService = businessAgreementsService;
  }

  approve(agreement) {
    return this.businessAgreementsService.approveToDoBusiness(agreement).then(result => {
      console.log('approved!')
      console.log(result)
    });
  }

  cancel() {
    console.log('Cancel the business agreement')
  }
}
