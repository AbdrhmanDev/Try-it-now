import {
  Component,
  computed,
  signal,
  OnInit,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { AuthService } from './../../../core/services/auth.service';
import { FormsModule } from '@angular/forms';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  description?: string;
  isMegaMenu?: boolean;
}

interface TopicCategory {
  title: string;
  icon: string;
  color: string;
  topics: TopicLink[];
}

interface TopicLink {
  label: string;
  path: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  isNew?: boolean;
  isPopular?: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  constructor(public authService: AuthService, private router: Router) {}

  // Reactive state
  get currentUser() {
    return this.authService.currentUser();
  }
  isScrolled = signal(false);
  isMenuOpen = signal(false);
  isMegaMenuOpen = signal(false);
  activeSubmenu = signal<string | null>(null);
  isMobile = signal(false);
  searchQuery = signal('');
  isSearchFocused = signal(false);

  // Navigation items
  navItems = signal<NavItem[]>([
    {
      label: 'Home',
      path: '/',
      icon: 'fas fa-home',
      description: 'Welcome to Angular Topics',
    },
    {
      label: 'Topics',
      path: '',
      icon: 'fas fa-layer-group',
      isMegaMenu: true,
      description: 'Explore Angular concepts',
    },
    {
      label: 'Tutorials',
      path: '/tutorials',
      icon: 'fas fa-graduation-cap',
      description: 'Step-by-step guides',
    },
    {
      label: 'Examples',
      path: '/examples',
      icon: 'fas fa-code',
      description: 'Live code demos',
    },
    {
      label: 'Blog',
      path: '/blog',
      icon: 'fas fa-blog',
      description: 'Latest insights',
    },
    {
      label: 'Community',
      path: '/community',
      icon: 'fas fa-users',
      description: 'Join discussions',
    },
  ]);

  // Topics mega menu content
  topicsCategories = signal<TopicCategory[]>([
    {
      title: 'Fundamentals',
      icon: 'fas fa-foundation',
      color: 'from-blue-500 to-cyan-500',
      topics: [
        {
          label: 'Components & Templates',
          path: '/topics/components',
          description: 'Building blocks of Angular apps',
          difficulty: 'Beginner',
          isPopular: true,
        },
        {
          label: 'Directives & Pipes',
          path: '/topics/directives',
          description: 'Enhance HTML with custom functionality',
          difficulty: 'Beginner',
        },
        {
          label: 'Services & DI',
          path: '/topics/services',
          description: 'Share data and logic across components',
          difficulty: 'Intermediate',
        },
        {
          label: 'Routing & Navigation',
          path: '/topics/routing',
          description: 'Navigate between views',
          difficulty: 'Intermediate',
        },
      ],
    },
    {
      title: 'State Management',
      icon: 'fas fa-database',
      color: 'from-purple-500 to-pink-500',
      topics: [
        {
          label: 'Signals & Reactivity',
          path: '/topics/signals',
          description: 'Modern reactive programming',
          difficulty: 'Intermediate',
          isNew: true,
        },
        {
          label: 'RxJS & Observables',
          path: '/topics/rxjs',
          description: 'Reactive extensions for JavaScript',
          difficulty: 'Advanced',
        },
        {
          label: 'NgRx Store',
          path: '/topics/ngrx',
          description: 'Redux pattern for Angular',
          difficulty: 'Advanced',
        },
        {
          label: 'State Patterns',
          path: '/topics/state-patterns',
          description: 'Best practices for state management',
          difficulty: 'Advanced',
        },
      ],
    },
    {
      title: 'Performance',
      icon: 'fas fa-rocket',
      color: 'from-green-500 to-emerald-500',
      topics: [
        {
          label: 'Change Detection',
          path: '/topics/change-detection',
          description: 'Optimize component updates',
          difficulty: 'Advanced',
          isPopular: true,
        },
        {
          label: 'Lazy Loading',
          path: '/topics/lazy-loading',
          description: 'Load modules on demand',
          difficulty: 'Intermediate',
        },
        {
          label: 'OnPush Strategy',
          path: '/topics/onpush',
          description: 'Improve performance with OnPush',
          difficulty: 'Advanced',
        },
        {
          label: 'Bundle Optimization',
          path: '/topics/optimization',
          description: 'Reduce bundle size and improve loading',
          difficulty: 'Advanced',
        },
      ],
    },
    {
      title: 'Modern Angular',
      icon: 'fas fa-sparkles',
      color: 'from-orange-500 to-red-500',
      topics: [
        {
          label: 'Standalone Components',
          path: '/topics/standalone',
          description: 'Module-free Angular development',
          difficulty: 'Intermediate',
          isNew: true,
        },
        {
          label: 'Angular Elements',
          path: '/topics/elements',
          description: 'Create custom elements',
          difficulty: 'Advanced',
        },
        {
          label: 'Dynamic Components',
          path: '/topics/dynamic',
          description: 'Create components at runtime',
          difficulty: 'Advanced',
        },
        {
          label: 'Micro Frontends',
          path: '/topics/micro-frontends',
          description: 'Scalable frontend architecture',
          difficulty: 'Advanced',
          isNew: true,
        },
      ],
    },
  ]);

  // Quick actions for authenticated users
  quickActions = computed(() => [
    { label: 'My Progress', icon: 'fas fa-chart-line', path: '/progress' },
    { label: 'Bookmarks', icon: 'fas fa-bookmark', path: '/bookmarks' },
    { label: 'Settings', icon: 'fas fa-cog', path: '/settings' },
  ]);

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled.set(window.scrollY > 20);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile.set(window.innerWidth < 768);
    if (!this.isMobile() && this.isMenuOpen()) {
      this.closeAllMenus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('.navbar')) {
      this.closeAllMenus();
    }
  }

  ngOnInit() {
    this.isMobile.set(window.innerWidth < 768);
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  toggleMenu() {
    this.isMenuOpen.update((current) => !current);
    if (this.isMenuOpen()) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }

  toggleMegaMenu() {
    this.isMegaMenuOpen.update((current) => !current);
  }

  setActiveSubmenu(category: string | null) {
    this.activeSubmenu.set(category);
  }

  closeAllMenus() {
    this.isMenuOpen.set(false);
    this.isMegaMenuOpen.set(false);
    this.activeSubmenu.set(null);
    this.isSearchFocused.set(false);
    document.body.style.overflow = '';
  }

  onSearchFocus() {
    this.isSearchFocused.set(true);
  }

  onSearchBlur() {
    setTimeout(() => {
      this.isSearchFocused.set(false);
    }, 200);
  }

  navigateToTopic(path: string) {
    this.router.navigate([path]);
    this.closeAllMenus();
  }

  getDifficultyColor(difficulty: string): string {
    switch (difficulty) {
      case 'Beginner':
        return 'text-green-500';
      case 'Intermediate':
        return 'text-yellow-500';
      case 'Advanced':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  }

  logout() {
    this.authService.logout();
    this.closeAllMenus();
  }
}
