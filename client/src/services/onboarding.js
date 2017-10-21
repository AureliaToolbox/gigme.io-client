import {Session} from 'services/session';
import {BindingEngine} from 'aurelia-framework';
import {OnboardWizard} from 'components/onboard-wizard';
import {DialogService} from 'aurelia-dialog';
import {UsersService} from 'services/users';

export class OnboardingService {
  static inject = [Session, BindingEngine, DialogService, UsersService];
  constructor(session, bindingEngine, dialogService, usersService) {
    this.session = session;
    this.bindingEngine = bindingEngine;
    this.dialogService = dialogService;
    this.usersService = usersService;
    let observer = this.bindingEngine.propertyObserver(this.session, 'currentUser');
    observer.subscribe((changes) => {
      this.checkIfOnboardingNeeded();
    });
    this.checkIfOnboardingNeeded();
  }
  checkIfOnboardingNeeded() {
    if (!this.session.currentUser) {
      return;
    }
    let user = this.session.currentUser;
    let onboardingNeeded = false;
    let missingName = !user.name;
    let missingAvailability = !user.availability;
    let missingExperienceLevel = !user.experience_level;
    let missingUserName = !user.username;
    if (missingName || missingAvailability || missingExperienceLevel || missingUserName) {
      this.startOnboarding(user);
    }
  }
  startOnboarding(user) {
    this.dialogService.open({ viewModel: OnboardWizard, model: user }).then(result => {
      if (!result.wasCancelled) {
        this.save(user);
      }
    });
  }
  save(user) {
    this.usersService.save(user).then(result => {
      console.log(result);
    });
  }
}
