'use strict';

System.register(['aurelia-dialog'], function (_export, _context) {
  "use strict";

  var DialogController, _class, _temp, OnboardWizard;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_aureliaDialog) {
      DialogController = _aureliaDialog.DialogController;
    }],
    execute: function () {
      _export('OnboardWizard', OnboardWizard = (_temp = _class = function () {
        function OnboardWizard(dialogController) {
          _classCallCheck(this, OnboardWizard);

          this.canFinish = false;
          this.steps = [{ id: 1, viewModel: 'components/steps/start' }, { id: 2, viewModel: 'components/steps/personal-details' }, { id: 3, viewModel: 'components/steps/work-details' }, { id: 4, viewModel: 'components/steps/links' }, { id: 5, viewModel: 'components/steps/end' }];

          this.controller = dialogController;
        }

        OnboardWizard.prototype.activate = function activate(user) {
          this.user = user;
          this.currentStep = this.steps[0];
        };

        OnboardWizard.prototype.nextStep = function nextStep() {
          var currentStepIndex = this.steps.indexOf(this.currentStep);
          this.currentStep = this.steps[currentStepIndex + 1];
          if (currentStepIndex + 1 === this.steps.length - 1) {
            this.canFinish = true;
          }
        };

        return OnboardWizard;
      }(), _class.inject = [DialogController], _temp));

      _export('OnboardWizard', OnboardWizard);
    }
  };
});
//# sourceMappingURL=onboard-wizard.js.map
