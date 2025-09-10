// app.routes.ts (updated)
import { Routes } from '@angular/router';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';
import { TestComponent } from './shared/components/test/test.component';
import { HomeComponent } from './feature/home/home.component';
import { ChangeDetectionComponent } from './feature/change-detection/change-detection.component';
import { LearningPlatformComponent } from './feature/change-detection/learn-change-detection/learn-change-detection.component';
import { SignalsLearningComponent } from './feature/signals-learning/signals-learning.component';
import { authGuard } from './core/services/auth.gaurd.service';
import { LoginComponent } from './feature/login/login.component';
import { delayResolver } from './shared/resolvers/data.resolver';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    resolve: { loaded: delayResolver },
  },
  {
    path: 'list',
    component: StockListComponent,
    resolve: { loaded: delayResolver },
    data: {
      // ✅ "data" property holds your custom metadata
      delay: 5000,
      title: 'Signals Lab',
    },
  },
  {
    path: 'signals',
    component: SignalsLearningComponent,
    resolve: { loaded: delayResolver },
    data: { delay: 5000 }, // 👈 5 seconds — signals need time to propagate! ⚡
  },
  {
    path: 'test',
    component: TestComponent,
    resolve: { loaded: delayResolver },
    data: { delay: 1500 }, // 👈 1.5s — quick test
  },

  {
    path: 'change-detecion', // ⚠️ Typo? Should be 'change-detection'?
    component: LearningPlatformComponent,
    canActivate: [authGuard],
    resolve: { loaded: delayResolver },
    data: { delay: 6000 }, // 👈 6 seconds — change detection is complex!
  },
  { path: 'login', component: LoginComponent },
  // Login stays fast — no resolver
];
