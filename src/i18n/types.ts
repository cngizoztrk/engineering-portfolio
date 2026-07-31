export interface Dictionary {
  nav: {
    ariaLabel: string;
    research: string;
    projects: string;
    notes: string;
    about: string;
    search: string;
    langSwitch: string;
  };
  meta: {
    defaultDescription: string;
  };
  pdf: {
    downloadLabel: string;
  };
  code: {
    copy: string;
    copied: string;
    failed: string;
  };
  home: {
    metaDescription: string;
    heroLabel: string;
    focusTitle: string;
    focusText: string;
    approachLabel: string;
    approachText: string;
    aboutTitle: string;
    cvView: string;
    cvComingSoon: string;
    cvComingSoonTitle: string;
    emailLabel: string;
    linkedinLabel: string;
    featuredTitle: string;
    projectLabel: string;
    viewDetails: string;
    viewAllProjects: string;
    viewAllResearch: string;
  };
  about: {
    metaTitle: string;
    metaDescription: string;
    profileLabel: string;
    interestsTitle: string;
    interestsText: string;
    quote: string;
  };
  research: {
    indexTitle: string;
    indexMetaTitle: string;
    indexMetaDescription: string;
    label: string;
    sourceSuffix: string;
    openLink: string;
    pdfView: string;
    updatedLabel: string;
  };
  projects: {
    indexTitle: string;
    indexMetaTitle: string;
    indexMetaDescription: string;
    label: string;
    detailLabel: string;
    viewTemplate: string;
    githubLink: string;
    pdfView: string;
    updatedLabel: string;
    uncategorized: string;
  };
  notes: {
    indexTitle: string;
    indexMetaTitle: string;
    indexMetaDescription: string;
    label: string;
    openNote: string;
    updatedLabel: string;
  };
  search: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    placeholder: string;
    noResults: string;
    viewLink: string;
    sectionResearch: string;
    sectionProject: string;
    sectionNote: string;
  };
  tags: {
    titlePrefix: string;
    metaDescriptionPrefix: string;
    openLink: string;
  };
  filter: {
    category: string;
    tag: string;
    tool: string;
    all: string;
    reset: string;
    empty: string;
  };
  changelog: {
    title: string;
    version: string;
    date: string;
    note: string;
  };
  gallery: {
    title: string;
    close: string;
    altSuffix: string;
  };
  untranslated: {
    message: string;
    backLink: string;
  };
}
