import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { Clipboard } from '@angular/cdk/clipboard';
import { Subject, takeUntil } from 'rxjs';

export interface Topic {
  title: string;
  description: string;
  route: string;
  icon: string;
  color: string;
  level?: 'beginner' | 'intermediate' | 'advanced';
}

export interface TopicDetail extends Topic {
  longDescription: string;
  prerequisites?: string[];
  learningObjectives: string[];
  codeExamples: CodeExample[];
  resources: Resource[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags?: string[];
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description: string;
  explanation?: string;
}

export interface Resource {
  title: string;
  url: string;
  type: 'doc' | 'video' | 'article' | 'github' | 'stackblitz';
  description?: string;
}

@Component({
  selector: 'app-topic-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatChipsModule,
  ],
  templateUrl: './topic-detail.component.html',
  styleUrls: ['./topic-detail.component.scss'],
})
export class TopicDetailComponent implements OnInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private clipboard = inject(Clipboard);
  private destroy$ = new Subject<void>();

  topic = signal<TopicDetail | null>(null);
  loading = signal(true);
  activeTab = signal(0);
  copiedCodeIndex = signal<number | null>(null);

  // Enhanced mock data with more examples and better structure
  private topicsData: { [key: string]: TopicDetail } = {
    signals: {
      title: 'Signals & Reactivity',
      description: 'Explore fine-grained reactivity with Angular Signals.',
      route: '/signals',
      icon: 'bolt',
      color: '#673AB7',
      level: 'intermediate',
      tags: ['reactivity', 'performance', 'angular-16+'],
      longDescription:
        'Signals are a new reactive primitive in Angular that provide fine-grained reactivity, enabling more efficient change detection and better performance for your applications. They represent a fundamental shift in how we handle state and reactivity in Angular.',
      prerequisites: [
        'Basic Angular knowledge',
        'Understanding of components',
        'TypeScript fundamentals',
      ],
      learningObjectives: [
        'Understand what signals are and how they work',
        'Learn the difference between signals and observables',
        'Master computed signals and effects',
        'Implement signals in real-world scenarios',
        'Optimize performance with fine-grained reactivity',
      ],
      codeExamples: [
        {
          title: 'Basic Signal Creation',
          code: `import { signal } from '@angular/core';

  // Create a signal with initial value
  const count = signal(0);

  // Read the value
  console.log(count()); // Output: 0

  // Update the value
  count.set(5);
  console.log(count()); // Output: 5

  // Update based on current value
  count.update(current => current + 1);
  console.log(count()); // Output: 6`,
          language: 'typescript',
          description: 'Creating and manipulating basic signals',
        },
        {
          title: 'Computed Signals',
          code: `import { signal, computed } from '@angular/core';

  const count = signal(0);
  const price = signal(29.99);

  // Computed signal that depends on other signals
  const total = computed(() => count() * price());

  const discount = signal(0.1);
  const finalPrice = computed(() => total() * (1 - discount()));

  console.log(finalPrice()); // Automatically updates when count, price, or discount changes`,
          language: 'typescript',
          description: 'Derived values with computed signals',
        },
        {
          title: 'Effects',
          code: `import { signal, effect } from '@angular/core';

  const user = signal({ name: 'John', age: 25 });

  // Effect runs whenever dependent signals change
  effect(() => {
    console.log(\`User updated: \${user().name}, \${user().age}\`);
    // This could update localStorage, send analytics, etc.
  });

  // Trigger the effect
  user.set({ name: 'Jane', age: 30 });`,
          language: 'typescript',
          description: 'Side effects with signal changes',
        },
      ],
      resources: [
        {
          title: 'Official Signals Documentation',
          url: 'https://angular.io/guide/signals',
          type: 'doc',
          description: 'Complete guide to Angular Signals',
        },
        {
          title: 'Signals RFC Discussion',
          url: 'https://github.com/angular/angular/discussions/49090',
          type: 'github',
          description: 'Technical discussion and design decisions',
        },
      ],
      estimatedTime: '45-60 minutes',
      difficulty: 'intermediate',
    },
    standalone: {
      title: 'Standalone Components',
      description: 'Build without NgModules. Simpler, faster, modern.',
      route: '/standalone',
      icon: 'extension',
      color: '#009688',
      level: 'intermediate',
      tags: ['components', 'bootstrapping', 'angular-14+'],
      longDescription:
        'Standalone components provide a simplified way to build Angular applications without NgModules, reducing boilerplate and making your code more modular and tree-shakable.',
      prerequisites: [
        'Angular Components',
        'Basic TypeScript',
        'Understanding of NgModules',
      ],
      learningObjectives: [
        'Create standalone components and directives',
        'Bootstrap application without NgModules',
        'Lazy load standalone components',
        'Migrate from NgModules to standalone',
        'Understand dependency injection in standalone apps',
      ],
      codeExamples: [
        {
          title: 'Basic Standalone Component',
          code: `import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterLink } from '@angular/router';

  @Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [CommonModule, RouterLink],
    template: '<div class="profile"><h1>{{ user.name }}</h1><p>Email: {{ user.email }}</p><a routerLink="/settings">Settings</a></div>',
    styles: ['.profile { padding: 1rem; border: 1px solid #ccc; }']
  })
  export class UserProfileComponent {
    user = { name: 'John Doe', email: 'john@example.com' };
  }`,
          language: 'typescript',
          description: 'Creating a standalone component with imports',
        },
        {
          title: 'Standalone Bootstrap',
          code: `import { bootstrapApplication } from '@angular/platform-browser';
  import { AppComponent } from './app/app.component';
  import { provideRouter } from '@angular/router';
  import { routes } from './app/app.routes';

  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(routes)
    ]
  });`,
          language: 'typescript',
          description: 'Bootstrapping a standalone application',
        },
      ],
      resources: [
        {
          title: 'Standalone Components Guide',
          url: 'https://angular.io/guide/standalone-components',
          type: 'doc',
          description: 'Official documentation and examples',
        },
      ],
      estimatedTime: '30-45 minutes',
      difficulty: 'intermediate',
    },
  };
  ngOnInit() {
    this.route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const topicId = params.get('id');
      this.loadTopic(topicId);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadTopic(topicId: string | null) {
    this.loading.set(true);

    // Simulate API call
    setTimeout(() => {
      if (topicId && this.topicsData[topicId]) {
        this.topic.set(this.topicsData[topicId]);
      } else {
        // Topic not found - redirect to home
        this.router.navigate(['/']);
      }
      this.loading.set(false);
    }, 800); // Slightly longer for better UX
  }

  onTabChange(index: number) {
    this.activeTab.set(index);
  }

  copyCode(code: string, index: number) {
    this.clipboard.copy(code);
    this.copiedCodeIndex.set(index);

    // Reset copied indicator after 2 seconds
    setTimeout(() => {
      this.copiedCodeIndex.set(null);
    }, 2000);
  }

  getResourceIcon(type: string): string {
    const icons: { [key: string]: string } = {
      doc: 'description',
      video: 'play_circle',
      article: 'article',
      github: 'code',
      stackblitz: 'integration_instructions',
    };
    return icons[type] || 'link';
  }

  getResourceTypeLabel(type: string): string {
    const labels: { [key: string]: string } = {
      doc: 'Documentation',
      video: 'Video Tutorial',
      article: 'Article',
      github: 'GitHub',
      stackblitz: 'Live Demo',
    };
    return labels[type] || 'Resource';
  }

  // Safe accessor methods for template
  safeTopic() {
    return {
      title: this.topic()?.title || 'Untitled Topic',
      description: this.topic()?.description || '',
      longDescription: this.topic()?.longDescription || '',
      prerequisites: this.topic()?.prerequisites || [],
      learningObjectives: this.topic()?.learningObjectives || [],
      codeExamples: this.topic()?.codeExamples || [],
      resources: this.topic()?.resources || [],
      estimatedTime: this.topic()?.estimatedTime || 'Not specified',
      level: this.topic()?.level || 'beginner',
      icon: this.topic()?.icon || 'help',
      color: this.topic()?.color || '#666666',
      tags: this.topic()?.tags || [],
    };
  }

  getTheme(): string {
    return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
  }

  // Navigation
  navigateToHome() {
    this.router.navigate(['/']);
  }
}
