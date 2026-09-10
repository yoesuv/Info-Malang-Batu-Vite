export interface ChangelogEntry {
  version: string
  date: string
  changes: string[]
}

export const changelog: ChangelogEntry[] = [
  {
    version: '0.3.0',
    date: '2025-09-10',
    changes: [
      'Restructured app into four main routes: Places, Gallery, Maps, About',
      'Added client-side routing with React Router',
      'Introduced sticky bottom navigation on mobile',
    ],
  },
  {
    version: '0.2.0',
    date: '2025-08-12',
    changes: [
      'Added highlights stats section',
      'Redesigned destination cards with colored tag badges',
    ],
  },
  {
    version: '0.1.0',
    date: '2025-07-01',
    changes: ['Initial release with hero and destinations sections'],
  },
]

export interface Library {
  name: string
  url: string
  description: string
}

export const libraries: Library[] = [
  {
    name: 'React',
    url: 'https://react.dev',
    description: 'The library for web and native user interfaces',
  },
  {
    name: 'Vite',
    url: 'https://vite.dev',
    description: 'Next generation frontend tooling',
  },
  {
    name: 'Chakra UI',
    url: 'https://www.chakra-ui.com',
    description: 'Accessible component library for React',
  },
  {
    name: 'React Router',
    url: 'https://reactrouter.com',
    description: 'Declarative routing for React',
  },
  {
    name: 'React Icons',
    url: 'https://react-icons.github.io/react-icons',
    description: 'Popular icons as React components',
  },
  {
    name: 'next-themes',
    url: 'https://www.npmjs.com/package/next-themes',
    description: 'Color mode / theme management',
  },
  {
    name: 'TypeScript',
    url: 'https://www.typescriptlang.org',
    description: 'Typed superset of JavaScript',
  },
]
