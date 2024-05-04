export type Career = {
  startDate: Date;
  endDate?: Date | undefined;
  position: string;
  type?: string;
  company: string;
  descriptions: string;
  stack: string[];
};

export const careers: Career[] = [
  {
    startDate: new Date('2023-09'),
    endDate: undefined,
    position: 'Representative',
    company: 'IT Student Organization Tech.Uni',
    descriptions: 'I am managing the organization with over 150 members and taking command for many event operations.',
    stack: [],
  },
  {
    startDate: new Date('2023-08'),
    endDate: new Date('2024-05-31'),
    position: 'Software Engineer',
    type: 'Internship',
    company: 'Re-era, inc.',
    descriptions:
      'I developed the internal web system for sales support using Next.js, Django, and more. I also developed a new mobile app for linking between people and places using Flutter, and I managed the mobile team consists of 3 internship members.',
    stack: ['TypeScript', 'React', 'Next.js', 'Python', 'Django', 'MySQL', 'Dart', 'Flutter', 'Supabase', 'GCP'],
  },
  {
    startDate: new Date('2023-08'),
    endDate: new Date('2023-12'),
    position: 'Software Engineer',
    type: 'Subcontract',
    company: '',
    descriptions: 'I developed a entirely new mobile app using ReactNative as a subcontract.',
    stack: ['TypeScript', 'ReactNative', 'Supabase'],
  },
  {
    startDate: new Date('2022-10'),
    endDate: new Date('2023-08'),
    position: 'Deputy Representative',
    company: 'IT Student Organization Tech.Uni',
    descriptions:
      'I supported the representative and migrated to Discord from Slack. I also involved the internal reorganization to operate more efficiently.',
    stack: [],
  },
  {
    startDate: new Date('2022-08'),
    endDate: new Date('2022-11'),
    position: 'Software Engineer',
    type: 'Subcontract',
    company: 'Crosshare, inc.',
    descriptions:
      'This is the my first job as a software engineer. I developed an Android TV app and a mobile app to control the TV using Flutter.',
    stack: ['Dart', 'Flutter', 'Firebase'],
  },
];
