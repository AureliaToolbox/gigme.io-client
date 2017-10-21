import {Availability, ListingType, ExperienceLevel, User, Wallet, Company} from 'models/index';
import {Session} from 'services/session';
import {PaymentRequestsService} from 'services/payment-requests';
import {UsersService} from 'services/users';
import {CompaniesService} from 'services/companies';
import {WalletsService} from 'services/wallets';

export class DataLoader {
  datastore;

  static inject = [Session, PaymentRequestsService, UsersService, CompaniesService, WalletsService];
  constructor(session, paymentRequestsService, usersService, companiesService, walletsService) {
    this.session = session;
    this.paymentRequestsService = paymentRequestsService;
    this.usersService = usersService;
    this.companiesService = companiesService;
    this.walletsService = walletsService;
  }

  load(datastore) {
    this.datastore = datastore;
    this.loadPrimeData();
    this.loadUserData();
    this.loadCompaniesData();
    this.checkLoadUsers();
  }

  checkLoadUsers() {
    if (!window.dataLoader || !window.dataLoader.users) return;
    let users = JSON.parse(window.dataLoader.users);

    users.forEach(user => {
      this.datastore.addUser(new User(user));
    });
  }

  loadPrimeData() {
    if (!window.dataLoader || !window.dataLoader.availabilities) {
      this.usersService.getPrimeData().then(payload => {
        let availabilities = payload.availabilities;
        let listingTypes = payload.listing_types;
        let experienceLevels = payload.experience_levels;
        this.setPrimeData(availabilities, listingTypes, experienceLevels);
      });
    } else {
      let availabilities = JSON.parse(window.dataLoader.availabilities);
      let listingTypes = JSON.parse(window.dataLoader.listingTypes);
      let experienceLevels = JSON.parse(window.dataLoader.experienceLevels);

      this.setPrimeData(availabilities, listingTypes, experienceLevels);
    }
  }

  setPrimeData(availabilities, listingTypes, experienceLevels) {
    availabilities.forEach(avail => {
      this.datastore.addAvailability(new Availability(avail));
    });
    listingTypes.forEach(listingType => {
      this.datastore.addListingType(new ListingType(listingType));
    });
    experienceLevels.forEach(expLevel => {
      this.datastore.addExperienceLevel(new ExperienceLevel(expLevel));
    });
  }

  loadUserData() {
    if (!window.dataLoader || !window.dataLoader.currentUser) {
      this.usersService.getCurrentUser().then(payload => {
        let currentUser = payload.user;
        let additionalDetails = { email: payload.email, username: payload.username };
        let company = payload.company;
        let wallet = payload.wallet;
        let companyWallet = payload.companyWallet;

        this.setUserData(currentUser, additionalDetails, company, wallet, companyWallet);
      });
    } else {
      let currentUser = JSON.parse(window.dataLoader.currentUser);
      let additionalDetails = JSON.parse(window.dataLoader.additionalDetails);
      let company = JSON.parse(window.dataLoader.company);
      let wallet = JSON.parse(window.dataLoader.wallet);
      let companyWallet = JSON.parse(window.dataLoader.companyWallet);

      this.setUserData(currentUser, additionalDetails, company, wallet, companyWallet);
    }
  }

  setUserData(currentUser, additionalDetails, company, wallet, companyWallet) {
    this.session.currentUser = new User(currentUser);

    if (this.session.currentUser) {
      this.paymentRequestsService.getForUser(this.session.currentUser).then(result => {
        this.session.currentUser.payment_requests = result;
      });
    }
    if (additionalDetails) {
      Object.assign(this.session.currentUser, additionalDetails);
    }
    if (company) {
      let compData = new Company(company);
      this.session.currentUser.setCompany(compData);
    }
    if (wallet) {
      let walletData = new Wallet(wallet);
      this.session.currentUser.setWallet(walletData);
      this.walletsService.getUsersWallet();
    }
    if (companyWallet) {
      let companyWalletData = new Wallet(companyWallet);
      this.session.currentUser.company.setWallet(companyWalletData);
      this.walletsService.getUsersCompaniesWallet();
    }
  }

  loadCompaniesData() {
    this.loadCompanies();
    // this.loadListingTypes();
  }

  loadCompanies() {
    if (!window.dataLoader || !window.dataLoader.companies) {
      this.companiesService.getCompanies().then(result => {
        if (this.datastore && result.length > 0) {
          result.forEach(companyJson => {
            let company = new Company(companyJson);
            this.datastore.companies.push(company);
          });
        }
      });
    } else {
      let companies = JSON.parse(window.dataLoader.companies);

      if (this.datastore && companies.length > 0) {
        companies.forEach(companyJson => {
          let company = new Company(companyJson);
          this.datastore.companies.push(company);
        });
      }
    }
  }
}
