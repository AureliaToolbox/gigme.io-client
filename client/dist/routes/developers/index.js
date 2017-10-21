'use strict';

System.register(['services/users', 'models/index', 'resources/datastore', 'aurelia-dialog', 'components/developer-details', 'components/message-user', 'services/onboarding'], function (_export, _context) {
  "use strict";

  var UsersService, User, Datastore, DialogService, DeveloperDetails, MessageUser, OnboardingService, _class, _temp, Index;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesUsers) {
      UsersService = _servicesUsers.UsersService;
    }, function (_modelsIndex) {
      User = _modelsIndex.User;
    }, function (_resourcesDatastore) {
      Datastore = _resourcesDatastore.Datastore;
    }, function (_aureliaDialog) {
      DialogService = _aureliaDialog.DialogService;
    }, function (_componentsDeveloperDetails) {
      DeveloperDetails = _componentsDeveloperDetails.DeveloperDetails;
    }, function (_componentsMessageUser) {
      MessageUser = _componentsMessageUser.MessageUser;
    }, function (_servicesOnboarding) {
      OnboardingService = _servicesOnboarding.OnboardingService;
    }],
    execute: function () {
      _export('Index', Index = (_temp = _class = function () {
        function Index(usersService, datastore, dialogService, onboardingService) {
          _classCallCheck(this, Index);

          this.developers = [];

          this.usersService = usersService;
          this.datastore = datastore;
          this.dialogService = dialogService;
          this.onboardingService = onboardingService;
        }

        Index.prototype.activate = function activate() {
          var _this = this;

          return this.usersService.getAll().then(function (result) {
            _this.developers = result;
          });
        };

        Index.prototype.openDetails = function openDetails(developer) {
          var _this2 = this;

          var settings = {
            viewModel: DeveloperDetails,
            model: developer
          };
          this.dialogService.open(settings).then(function (response) {
            if (!response.wasCancelled) {
              console.log(response.output);
              _this2.sendMessage(response.output);
            } else {
              console.log('bad');
            }
          });
        };

        Index.prototype.sendMessage = function sendMessage(developer) {
          var settings = {
            viewModel: MessageUser,
            model: developer
          };
          this.dialogService.open(settings).then(function (response) {
            if (!response.wasCancelled) {
              console.log(response.output);
            } else {
              console.log('bad');
            }
          });
        };

        return Index;
      }(), _class.inject = [UsersService, Datastore, DialogService, OnboardingService], _temp));

      _export('Index', Index);
    }
  };
});
//# sourceMappingURL=index.js.map
