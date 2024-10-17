import { ApplicationConfig, ErrorHandler } from '@angular/core';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

import { provideToastr } from 'ngx-toastr';
import { DomManager, NotetypeChecker, PatternChecker } from '@app/utils';
import { CustomErrorHandlerService } from '@app/services';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
    provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 1500,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }), NotetypeChecker, PatternChecker, DomManager, {provide: ErrorHandler, useClass: CustomErrorHandlerService}
  ], // Toastr providers],
};
