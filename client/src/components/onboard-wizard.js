import {DialogController} from 'aurelia-dialog';

export class OnboardWizard {
  user;
  canFinish = false;
  currentStep;
  steps = [
    { id: 1, viewModel: 'components/steps/start' },
    { id: 2, viewModel: 'components/steps/personal-details' },
    { id: 3, viewModel: 'components/steps/add-company' },
    { id: 4, viewModel: 'components/steps/work-details' },
    { id: 5, viewModel: 'components/steps/links' },
    { id: 6, viewModel: 'components/steps/end' }
  ];
  static inject = [DialogController];
  constructor(dialogController) {
    this.controller = dialogController;
  }
  activate(user) {
    this.user = user;
    this.currentStep = this.steps[0];
  }
  nextStep() {
    let currentStepIndex = this.steps.indexOf(this.currentStep);
    this.currentStep = this.steps[currentStepIndex + 1];
    if (currentStepIndex + 1 === this.steps.length - 1) {
      this.canFinish = true;
    }
  }
}
