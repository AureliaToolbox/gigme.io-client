import {Wallet} from 'models/wallet';
import {WalletsService} from 'services/wallets';
import {bindable} from 'aurelia-framework';
import {DialogService} from 'aurelia-dialog';
import {SendMoney} from 'components/send-money';
import {ShowAddress} from 'components/show-address';
import {ShowAllAddresses} from 'components/show-all-addresses';
import {RequestDistribution} from 'components/request-distribution';

export class WalletDetails {
  @bindable title = '';
  @bindable wallet;
  @bindable canSendTo = false;
  @bindable ownsWallet = false;
  isAddingWallet = false;

  static inject = [WalletsService, DialogService];
  constructor(walletsService, dialogsService) {
    this.walletsService = walletsService;
    this.dialogsService = dialogsService;
  }
  activate(wallet) {
    this.wallet = wallet;
  }
  save() {
    return this.walletsService.update(this.wallet).then(result => {
      Object.assign(this.wallet, result);
      this.wallet.id = this.wallet.getId();
    });
  }
  cancel() {
    this.isAddingWallet = false;
  }
  sendMoney() {
    let dialogOptions = { viewModel: SendMoney, model: this.wallet.address };

    return this.dialogsService.open(dialogOptions).then(dialogResult => {
      return this.walletsService.getWalletInfo(this.wallet).then(result => {
        if (!result || !result.total_value) {
          return;
        }

        this.wallet.updateValues(result);
      });
    });
  }
  requestDistribution() {
    let dialogOptions = { viewModel: RequestDistribution, model: this.wallet };

    return this.dialogsService.open(dialogOptions).then(dialogResult => {
      return this.walletsService.getWalletInfo(this.wallet).then(result => {
        if (!result || !result.total_value) {
          return;
        }

        this.wallet.updateValues(result);
      });
    });
  }
  showNewAddress() {
    return this.walletsService.requestNewAddress().then(address => {
      let dialogOptions = { viewModel: ShowAddress, model: address };

      return this.dialogsService.open(dialogOptions);
    });
  }
  showAllAddresses() {
    let dialogOptions = { viewModel: ShowAllAddresses, model: this.wallet };

    return this.dialogsService.open(dialogOptions);
  }
}
