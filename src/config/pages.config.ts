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
    id: 'services',
    path: '/services',
    translations: {
      en: 'Services',
      he: 'שירותים',
    },
    icon: 'Settings',
    isProtected: false,
  },
  {
    id: 'gallery',
    path: '/gallery',
    translations: {
      en: 'Gallery',
      he: 'גלריה',
    },
    icon: 'Image',
    isProtected: false,
  },
  {
    id: 'contact',
    path: '/contact',
    translations: {
      en: 'Contact',
      he: 'צור קשר',
    },
    icon: 'Mail',
    isProtected: false,
  },
];
