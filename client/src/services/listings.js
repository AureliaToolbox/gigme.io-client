import { HttpWrapper } from 'services/http-wrapper';
import { Listing } from 'models/listing';
import { ListingType } from 'models/listing-type';
import { Session } from 'services/session';

export class ListingsService {
  static inject = [HttpWrapper, Session];
  /**
   * @param {HttpWrapper} httpWrapper
   * @param {Session} session
   */
  constructor(httpWrapper, session) {
    this.session = session;
    this.http = httpWrapper;
  }
  getListingTypes() {
    return this.http.get('listing_types.json').then(result => {
      return result.content;
    });
  }
  saveListingType() {
    let listingType = new ListingType();
    listingType.name = 'Full-time';
    return this.http.post('listing_types/create.json', listingType).then(result => {
      return result.content;
    });
  }
  getListings() {
    return this.http.get('listings.json').then(result => {
      return result.content.map(listing => {
        return new Listing(listing);
      });
    });
  }
  getListingsByCompany(company) {
    return this.http.get(`companies/${company.id}/listings.json`).then(result => {
      return result.content.map(listing => {
        return new Listing(listing);
      });
    });
  }
  getListingById(id) {
    return this.http.get(`listings/${id}.json`).then(result => {
      return new Listing(result.content);
    });
  }
  save(listing) {
    listing.company_id = getId(listing.company);
    listing.listing_type_id = getId(listing.listing_type);
    return this.http.post('listings.json', listing).then(result => {
      let updatedListingInfo = new Listing(result.content);
      Object.assign(listing, updatedListingInfo);
    });
  }
}

function getId(object) {
  return object._id.$oid;
}
