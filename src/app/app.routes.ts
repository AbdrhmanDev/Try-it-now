import { Routes } from '@angular/router';
import { authGuard } from './core/services/auth.gaurd.service';
import { LearningPlatformComponent } from './feature/change-detection/learn-change-detection/learn-change-detection.component';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { SignalsLearningComponent } from './feature/signals-learning/signals-learning.component';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';
import { TopicDetailComponent } from './feature/topic-detail/topic-detail.component';
import { TestComponent } from './shared/components/test/test.component';
import { delayResolver } from './shared/resolvers/data.resolver';

export const routes: Routes = [
  { path: '', component: HomeComponent }, // Direct component, no redirect
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
      delay: 5000,
      title: 'Signals Lab',
    },
  },
  {
    path: 'signals',
    component: SignalsLearningComponent,
    resolve: { loaded: delayResolver },
    data: { delay: 5000 },
  },
  {
    path: 'test',
    component: TestComponent,
    resolve: { loaded: delayResolver },
    data: { delay: 1500 },
  },
  {
    path: 'change-detection', // Fixed typo
    component: LearningPlatformComponent,
    canActivate: [authGuard],
    resolve: { loaded: delayResolver },
    data: { delay: 6000 },
  },
  {
    path: 'login',
    component: LoginComponent,
    resolve: { loaded: delayResolver },
  },
  { path: 'topic/:id', component: TopicDetailComponent },
  { path: '**', redirectTo: '' }, // Catch-all route
];
