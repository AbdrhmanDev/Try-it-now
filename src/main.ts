import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations'; // 👈
bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(), // 👈 Add this
    ...appConfig.providers,
  ],
}).catch((err) => console.error(err));
