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
    services: {
      title: 'Services & Dependency Injection',
      description:
        'Share logic, manage state, and build scalable applications.',
      route: '/services-di',
      icon: 'injection',
      color: '#FF6B6B',
      level: 'intermediate',
      tags: ['di', 'providers', 'singletons', 'injectable'],
      longDescription:
        'Services are the backbone of Angular applications, enabling code reuse, state management, and separation of concerns. The Dependency Injection (DI) system provides these services where they are needed, making your code more testable, maintainable, and scalable.',
      prerequisites: [
        'Basic TypeScript knowledge',
        'Understanding of classes and constructors',
        'Angular component basics',
      ],
      learningObjectives: [
        'Create and register Angular services',
        'Understand the hierarchical DI system',
        'Use providedIn vs providers arrays',
        'Implement singletons and scoped instances',
        'Master injection tokens and factory providers',
      ],
      codeExamples: [
        {
          title: 'Creating a Basic Service',
          code: `import { Injectable } from '@angular/core';

    @Injectable({
      providedIn: 'root' // Available app-wide as a singleton
    })
    export class UserService {
      private users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
      ];

      getUsers() {
        return this.users;
      }

      addUser(user: { id: number; name: string }) {
        this.users.push(user);
      }
    }`,
          language: 'typescript',
          description: 'Creating and providing a service',
        },
        {
          title: 'Injecting a Service',
          code: `import { Component, inject } from '@angular/core';
    import { UserService } from './user.service';

    @Component({
      selector: 'app-user-list',
      standalone: true,
      template: '<ul><li *ngFor="let user of users">{{ user.name }}</li></ul>'
    })
    export class UserListComponent {
      // Modern way using inject()
      private userService = inject(UserService);

      users = this.userService.getUsers();

      // Classic constructor injection (still works)
      // constructor(private userService: UserService) {}
    }`,
          language: 'typescript',
          description: 'Injecting a service into a component',
        },
        {
          title: 'Custom Injection Token',
          code: `import { InjectionToken, inject } from '@angular/core';

    // Define a token with a type
    export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

    // Define the config interface
    export interface AppConfig {
      apiUrl: string;
      timeout: number;
    }

    // Provide the config
    export const appConfig: AppConfig = {
      apiUrl: 'https://api.example.com',
      timeout: 5000,
    };

    // Inject and use anywhere
    export class DataService {
      private config = inject(APP_CONFIG);

      getEndpoint() {
        return \`\${this.config.apiUrl}/data\`;
      }
    }`,
          language: 'typescript',
          description: 'Using Injection Tokens for non-class dependencies',
        },
      ],
      resources: [
        {
          title: 'Dependency Injection Guide',
          url: 'https://angular.io/guide/dependency-injection',
          type: 'doc',
          description: 'Official DI documentation',
        },
        {
          title: 'Hierarchical Injectors',
          url: 'https://angular.io/guide/hierarchical-dependency-injection',
          type: 'doc',
          description: 'Understanding DI scopes and providers',
        },
      ],
      estimatedTime: '50-60 minutes',
      difficulty: 'intermediate',
    },
    components: {
      title: 'Components & Templates',
      description:
        'Build reusable UI building blocks with templates and styles.',
      route: '/components-templates',
      icon: 'view_quilt',
      color: '#4CAF50',
      level: 'beginner',
      tags: ['components', 'templates', 'styling', 'lifecycle'],
      longDescription:
        'Components are the fundamental building blocks of Angular applications. They control a patch of screen called a view, encapsulating templates, styles, and logic. Understanding components and their templates is essential for building any Angular application.',
      prerequisites: [
        'HTML & CSS basics',
        'TypeScript fundamentals',
        'JavaScript classes',
      ],
      learningObjectives: [
        'Create and use Angular components',
        'Master component lifecycle hooks',
        'Style components with encapsulation',
        'Use template syntax effectively',
        'Pass data with inputs and outputs',
      ],
      codeExamples: [
        {
          title: 'Basic Component Structure',
          code: `import { Component, Input, Output, EventEmitter } from '@angular/core';

    @Component({
      selector: 'app-greeting',
      standalone: true,
      template: \`
        <div class="greeting">
          <h2>Hello, {{ name }}!</h2>
          <button (click)="onGreet()">Say Hello</button>
        </div>
      \`,
      styles: [\`
        .greeting {
          padding: 1rem;
          border-radius: 8px;
          background: #f0f0f0;
        }
        h2 {
          color: #333;
        }
      \`]
    })
    export class GreetingComponent {
      @Input() name: string = 'Guest';
      @Output() greeted = new EventEmitter<string>();

      onGreet() {
        this.greeted.emit(\`Greeted: \${this.name}\`);
      }
    }`,
          language: 'typescript',
          description: 'Creating a component with inputs and outputs',
        },
        {
          title: 'Lifecycle Hooks',
          code: `import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';

    @Component({
      selector: 'app-lifecycle',
      template: '<p>Check the console!</p>'
    })
    export class LifecycleComponent implements OnInit, AfterViewInit, OnDestroy {
      constructor() {
        console.log('1. Constructor runs');
      }

      ngOnInit() {
        console.log('2. OnInit - component initialized');
        // Perfect for API calls
      }

      ngAfterViewInit() {
        console.log('3. AfterViewInit - view is ready');
        // Access DOM elements here
      }

      ngOnDestroy() {
        console.log('4. OnDestroy - cleanup');
        // Unsubscribe, clear intervals
      }
    }`,
          language: 'typescript',
          description: 'Using component lifecycle hooks',
        },
        {
          title: 'View Encapsulation',
          code: `import { Component, ViewEncapsulation } from '@angular/core';

    // Emulated (default) - styles scoped to component
    @Component({
      selector: 'app-emulated',
      template: '<div class="box">Emulated</div>',
      styles: ['.box { border: 1px solid red; }'],
      encapsulation: ViewEncapsulation.Emulated
    })
    export class EmulatedComponent {}

    // None - styles affect globally
    @Component({
      selector: 'app-none',
      template: '<div class="box">Global styles</div>',
      styles: ['.box { border: 2px solid blue; }'],
      encapsulation: ViewEncapsulation.None
    })
    export class NoneComponent {}`,
          language: 'typescript',
          description: 'Different view encapsulation strategies',
        },
      ],
      resources: [
        {
          title: 'Components Overview',
          url: 'https://angular.io/guide/component-overview',
          type: 'doc',
          description: 'Official component documentation',
        },
        {
          title: 'Component Lifecycle',
          url: 'https://angular.io/guide/lifecycle-hooks',
          type: 'doc',
          description: 'Deep dive into lifecycle hooks',
        },
      ],
      estimatedTime: '40-50 minutes',
      difficulty: 'beginner',
    },
    dataBinding: {
      title: 'Data Binding',
      description:
        "Connect your data to the UI with Angular's powerful binding system.",
      route: '/databinding',
      icon: 'sync_alt',
      color: '#FF9800',
      level: 'beginner',
      tags: ['binding', 'templates', 'events', 'forms'],
      longDescription:
        "Data binding is the core mechanism that connects your component's data to the template. Angular provides a comprehensive set of binding techniques including interpolation, property binding, event binding, and two-way binding, making UI updates seamless and intuitive.",
      prerequisites: [
        'HTML basics',
        'JavaScript/TypeScript variables',
        'Component basics',
      ],
      learningObjectives: [
        'Master one-way data binding techniques',
        'Handle user events with event binding',
        'Implement two-way binding with ngModel',
        'Understand attribute vs property binding',
        'Use template reference variables',
      ],
      codeExamples: [
        {
          title: 'One-Way Data Binding',
          code: `import { Component } from '@angular/core';

    @Component({
      selector: 'app-binding',
      template: \`
        <div>
          <!-- Interpolation: displays value -->
          <h1>{{ title }}</h1>

          <!-- Property binding: sets property -->
          <img [src]="imageUrl" [alt]="altText">

          <!-- Attribute binding: for ARIA, colspan, etc -->
          <button [attr.aria-label]="'Close ' + title">X</button>

          <!-- Class and Style binding -->
          <div [class.active]="isActive" [style.color]="textColor">
            Conditional styles
          </div>
        </div>
      \`
    })
    export class BindingComponent {
      title = 'Data Binding Demo';
      imageUrl = 'https://angular.io/assets/images/logos/angular/angular.png';
      altText = 'Angular Logo';
      isActive = true;
      textColor = 'blue';
    }`,
          language: 'typescript',
          description:
            'Interpolation, property, attribute, class, and style binding',
        },
        {
          title: 'Event and Two-Way Binding',
          code: `import { Component } from '@angular/core';
    import { FormsModule } from '@angular/forms';

    @Component({
      selector: 'app-events',
      standalone: true,
      imports: [FormsModule],
      template: \`
        <!-- Event binding -->
        <button (click)="onClick($event)">Click Me</button>
        <input (input)="onInput($event)" placeholder="Type something">

        <!-- Two-way binding with ngModel -->
        <input [(ngModel)]="message" placeholder="Type here">
        <p>You typed: {{ message }}</p>

        <!-- Template reference variables -->
        <input #phone placeholder="Phone number">
        <button (click)="callPhone(phone.value)">Call</button>
      \`
    })
    export class EventsComponent {
      message = '';

      onClick(event: MouseEvent) {
        console.log('Button clicked!', event);
      }

      onInput(event: Event) {
        const value = (event.target as HTMLInputElement).value;
        console.log('Input changed:', value);
      }

      callPhone(phoneNumber: string) {
        console.log('Calling:', phoneNumber);
      }
    }`,
          language: 'typescript',
          description: 'Event binding, two-way binding, and template variables',
        },
        {
          title: 'Advanced Binding Patterns',
          code: `import { Component } from '@angular/core';

    @Component({
      selector: 'app-advanced-binding',
      template: \`
        <!-- Multiple classes/styles -->
        <div [class]="getClasses()">Dynamic classes</div>
        <div [style]="getStyles()">Dynamic styles</div>

        <!-- Safe navigation operator -->
        <p>{{ user?.address?.city || 'Unknown' }}</p>

        <!-- Pipes in bindings -->
        <p>{{ price | currency:'USD':'symbol' }}</p>
        <p>{{ timestamp | date:'fullDate' }}</p>

        <!-- Custom two-way binding with banana-in-a-box -->
        <app-counter [(count)]="parentCount"></app-counter>
        <p>Parent count: {{ parentCount }}</p>
      \`
    })
    export class AdvancedBindingComponent {
      user: any = null; // Will cause safe navigation to work
      price = 99.99;
      timestamp = Date.now();
      parentCount = 0;

      getClasses() {
        return {
          'btn': true,
          'btn-primary': this.isPrimary,
          'btn-large': this.isLarge
        };
      }

      getStyles() {
        return {
          'color': this.textColor,
          'font-size': this.fontSize + 'px'
        };
      }
    }`,
          language: 'typescript',
          description: 'Advanced binding techniques and patterns',
        },
      ],
      resources: [
        {
          title: 'Data Binding Guide',
          url: 'https://angular.io/guide/binding-syntax',
          type: 'doc',
          description: 'Official data binding documentation',
        },
        {
          title: 'Template Syntax',
          url: 'https://angular.io/guide/template-syntax',
          type: 'doc',
          description: 'Complete template syntax reference',
        },
      ],
      estimatedTime: '35-45 minutes',
      difficulty: 'beginner',
    },
    directives: {
      title: 'Directives Overview',
      description:
        'Extend HTML with custom behavior using built-in and custom directives.',
      route: '/directives',
      icon: 'code',
      color: '#9C27B0',
      level: 'intermediate',
      tags: ['directives', 'structural', 'attribute', 'custom'],
      longDescription:
        'Directives are classes that add behavior to elements in your Angular applications. They come in three types: components (directives with templates), structural directives (change DOM layout), and attribute directives (change appearance or behavior).',
      prerequisites: ['HTML & CSS', 'Angular components', 'Template syntax'],
      learningObjectives: [
        'Use built-in structural directives (*ngIf, *ngFor, *ngSwitch)',
        'Apply attribute directives (ngClass, ngStyle, ngModel)',
        'Create custom attribute directives',
        'Build custom structural directives',
        'Understand directive composition API',
      ],
      codeExamples: [
        {
          title: 'Built-in Structural Directives',
          code: `import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';

    @Component({
      selector: 'app-structural',
      standalone: true,
      imports: [CommonModule],
      template: \`
        <!-- *ngIf - Conditional rendering -->
        <div *ngIf="isLoggedIn; else loginTemplate">
          Welcome back, {{ username }}!
        </div>
        <ng-template #loginTemplate>
          <button (click)="login()">Login</button>
        </ng-template>

        <!-- *ngFor - List rendering -->
        <ul>
          <li *ngFor="let item of items; index as i; trackBy: trackById">
            {{ i + 1 }}. {{ item.name }}
          </li>
        </ul>

        <!-- *ngSwitch - Conditional templates -->
        <div [ngSwitch]="status">
          <p *ngSwitchCase="'success'">✅ Operation successful!</p>
          <p *ngSwitchCase="'error'">❌ Something went wrong.</p>
          <p *ngSwitchDefault>⏳ Waiting for result...</p>
        </div>
      \`
    })
    export class StructuralDirectivesComponent {
      isLoggedIn = false;
      username = 'John';
      items = [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' }
      ];
      status = 'loading';

      login() {
        this.isLoggedIn = true;
      }

      trackById(index: number, item: any) {
        return item.id;
      }
    }`,
          language: 'typescript',
          description: 'Using built-in structural directives',
        },
        {
          title: 'Built-in Attribute Directives',
          code: `import { Component } from '@angular/core';
    import { CommonModule } from '@angular/common';
    import { FormsModule } from '@angular/forms';

    @Component({
      selector: 'app-attribute',
      standalone: true,
      imports: [CommonModule, FormsModule],
      template: \`
        <!-- ngClass - Dynamic classes -->
        <div [ngClass]="{
          'highlight': isHighlighted,
          'error': hasError,
          'success': isSuccess
        }">
          Dynamic classes applied
        </div>

        <!-- ngStyle - Dynamic styles -->
        <div [ngStyle]="{
          'font-size': fontSize + 'px',
          'color': textColor,
          'background-color': bgColor
        }">
          Dynamic styles
        </div>

        <!-- ngModel - Two-way binding (attribute) -->
        <input [(ngModel)]="inputValue" placeholder="Type something">
        <p>Value: {{ inputValue }}</p>

        <!-- ngNonBindable - Disable binding -->
        <div ngNonBindable>
          {{ this will not be interpreted }} - shows as literal text
        </div>
      \`,
      styles: [\`
        .highlight { background: yellow; }
        .error { border: 2px solid red; color: red; }
        .success { border: 2px solid green; color: green; }
      \`]
    })
    export class AttributeDirectivesComponent {
      isHighlighted = true;
      hasError = false;
      isSuccess = true;
      fontSize = 16;
      textColor = '#333';
      bgColor = '#f9f9f9';
      inputValue = '';
    }`,
          language: 'typescript',
          description: 'Using built-in attribute directives',
        },
        {
          title: 'Custom Attribute Directive',
          code: `import { Directive, ElementRef, HostListener, Input } from '@angular/core';

    @Directive({
      selector: '[appHighlight]',
      standalone: true
    })
    export class HighlightDirective {
      @Input('appHighlight') highlightColor = 'yellow';
      @Input() defaultColor = 'transparent';

      constructor(private el: ElementRef) {}

      @HostListener('mouseenter') onMouseEnter() {
        this.highlight(this.highlightColor);
      }

      @HostListener('mouseleave') onMouseLeave() {
        this.highlight(this.defaultColor);
      }

      private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
      }
    }

    // Usage in a component:
    /*
    @Component({
      selector: 'app-demo',
      standalone: true,
      imports: [HighlightDirective],
      template: \`
        <p [appHighlight]="'lightblue'" defaultColor="white">
          Hover to highlight me!
        </p>
        <p appHighlight="lightgreen">
          Different highlight color
        </p>
      \`
    })
    export class DemoComponent {}
    */`,
          language: 'typescript',
          description: 'Creating a custom attribute directive',
        },
      ],
      resources: [
        {
          title: 'Directives Guide',
          url: 'https://angular.io/guide/built-in-directives',
          type: 'doc',
          description: 'Official directives documentation',
        },
        {
          title: 'Custom Directives',
          url: 'https://angular.io/guide/attribute-directives',
          type: 'doc',
          description: 'Creating your own directives',
        },
      ],
      estimatedTime: '40-55 minutes',
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
