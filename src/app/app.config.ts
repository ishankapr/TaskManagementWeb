import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { reducers, metaReducers } from './store';
import { TaskEffects } from './store/Tasks/task.effects';
import { UserEffects } from './store/Users/user.effects';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore(reducers, { metaReducers }),
    provideEffects([TaskEffects, UserEffects]),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({ closeButton: false }),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: false } } }),
  ]
};
