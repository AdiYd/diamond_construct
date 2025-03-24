interface PageConfig {
  id: string;
  path: string;
  translations: {
    en: string;
    he?: string;
  };
  icon?: string;
  isProtected?: boolean;
}

export const pagesConfig: PageConfig[] = [
  {
    id: 'home',
    path: '/',
    translations: {
      en: 'Home',
      he: 'בית',
    },
    icon: 'Home',

    isProtected: false,
  },
  {
    id: 'about',
    path: '/about',
    translations: {
      en: 'About',
      he: 'אודות',
    },
    icon: 'Info',
    isProtected: false,
  },
  {
    id: 'blog',
    path: '/blog',
    translations: {
      en: 'Blog',
      he: 'בלוג',
    },
    icon: 'FileText',
    isProtected: false,
  },
];
