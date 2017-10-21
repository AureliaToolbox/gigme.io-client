'use strict';

System.register(['services/session', 'aurelia-framework', 'components/onboard-wizard', 'aurelia-dialog'], function (_export, _context) {
  "use strict";

  var Session, BindingEngine, OnboardWizard, DialogService, _class, _temp, OnboardingService;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_servicesSession) {
      Session = _servicesSession.Session;
    }, function (_aureliaFramework) {
      BindingEngine = _aureliaFramework.BindingEngine;
    }, function (_componentsOnboardWizard) {
      OnboardWizard = _componentsOnboardWizard.OnboardWizard;
    }, function (_aureliaDialog) {
      DialogService = _aureliaDialog.DialogService;
    }],
    execute: function () {
      _export('OnboardingService', OnboardingService = (_temp = _class = function () {
        function OnboardingService(session, bindingEngine, dialogService) {
          var _this = this;

          _classCallCheck(this, OnboardingService);

          this.session = session;
          this.bindingEngine = bindingEngine;
          this.dialogService = dialogService;
          var observer = this.bindingEngine.propertyObserver(this.session, 'currentUser');
          observer.subscribe(function (changes) {
            _this.checkIfOnboardingNeeded();
          });
          this.checkIfOnboardingNeeded();
        }

        OnboardingService.prototype.checkIfOnboardingNeeded = function checkIfOnboardingNeeded() {
          if (!this.session.currentUser) {
            return;
          }
          var user = this.session.currentUser;
          var onboardingNeeded = false;
          var missingName = !user.name;
          var missingAvailability = !user.availablity;
          var missingListingType = !user.listing_type;
          var missingExperienceLevel = !user.experience_level;
          var missingUserName = !user.username;
          if (missingName || missingAvailability || missingListingType || missingExperienceLevel || missingUserName) {
            this.startOnboarding(user);
          }
        };

        OnboardingService.prototype.startOnboarding = function startOnboarding(user) {
          this.dialogService.open({ viewModel: OnboardWizard, model: user }).then(function (result) {
            console.log(result);
          });
        };

        return OnboardingService;
      }(), _class.inject = [Session, BindingEngine, DialogService], _temp));

      _export('OnboardingService', OnboardingService);
    }
  };
});
//# sourceMappingURL=onboarding.js.map
