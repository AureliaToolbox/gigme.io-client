export class BusinessAgreement {
  requesting_company;
  requesting_company_id;

  other_company;
  other_company_id;

  other_agreement;
  other_agreement_id;

  constructor(data) {
    Object.assign(this, data);
    if (this._id) {
      this.id = this.getId();
    }
  }
  getId() {
    return this._id.$oid;
  }
}
