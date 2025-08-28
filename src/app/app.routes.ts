import { Routes } from '@angular/router';
import { StockListComponent } from './feature/stock-list/stock-list/stock-list.component';
import { TestComponent } from './shared/components/test/test.component';
import { HomeComponent } from './feature/home/home.component';
import { ChangeDetectionComponent } from './feature/change-detection/change-detection.component';
import { LearningPlatformComponent } from './feature/change-detection/learn-change-detection/learn-change-detection.component';
import { SignalsLearningComponent } from './feature/signals-learning/signals-learning.component';
import { authGuard } from './core/services/auth.gaurd.service';
import { LoginComponent } from './feature/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: StockListComponent },
  { path: 'stock', component: SignalsLearningComponent },
  { path: 'test', component: TestComponent },
  {
    path: 'change-detecion',
    component: LearningPlatformComponent,
    canActivate: [authGuard],
  },
  { path: 'login', component: LoginComponent },
];
