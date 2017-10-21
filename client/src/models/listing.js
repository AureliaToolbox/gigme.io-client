export class Listing {
  _id = '';
  title = '';
  description = '';
  company;
  company_id;
  listing_type;
  completed = false;
  require_agreement = false;

  canEdit = false;

  constructor(data) {
    Object.assign(this, data);
    if (this._id) {
      this.id = this.getId();
    }
  }
  setCompany(company) {
    this.company = company;
    this.company_id = company.id;
  }
  getId() {
    return this._id.$oid;
  }
}
