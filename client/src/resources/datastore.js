import {UsersService} from 'services/users';
import {DataLoader} from 'services/data-loader';
import {Lazy} from 'aurelia-dependency-injection';

export class Datastore {
  companies = [];
  listingTypes = [];
  paymentRequests = [];
  withdrawRequests = [];
  listings = [];
  availabilities = [];
  experienceLevels = [];
  users = [];

  static inject = [UsersService, Lazy.of(DataLoader)];
  constructor(usersService, dataLoader) {
    this.usersService = usersService;
    this.dataLoader = dataLoader;
    this.load();
  }
  load() {
    if (typeof this.dataLoader === 'function') {
      this.dataLoader = this.dataLoader();
    }
    this.dataLoader.load(this);
  }
  addUser(user) {
    this.users.push(user);
  }
  addListing(listing) {
    this.setupListing(listing);
    this.listings.push(listing);
  }
  addAvailability(availability) {
    this.availabilities.push(availability);
  }
  addExperienceLevel(experienceLevel) {
    this.experienceLevels.push(experienceLevel);
  }
  addListingType(listingType) {
    this.listingTypes.push(listingType);
  }
  addPaymentRequest(paymentRequest) {
    this.paymentRequests.push(paymentRequest);
  }
  addWithdrawRequest(withdrawRequest) {
    this.withdrawRequests.push(withdrawRequest);
  }
  setupListing(listing) {
    if (listing.company_id) {
      listing.company = this.companies.filter(company => {
        return getId(company._id) === getId(listing.company_id);
      })[0];
    }
    if (listing.listing_type_id) {
      listing.listing_type = this.listingTypes.filter(listingType => {
        return getId(listingType._id) === getId(listing.listing_type_id);
      })[0];
    }
  }
}

function getId(object) {
  return object.$oid;
}
