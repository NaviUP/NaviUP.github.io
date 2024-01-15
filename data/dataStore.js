export const settings = {
  columnCreatorText: 'Add new column',
  cardCreatorText: 'Add new card',
  creator: {
    buttonOK: 'OK',
    buttonCancel: 'Cancel',
    defaultText: 'Add new item',
  },
  defaultListDescription: '<p>I can do all the things!!!</p>',
  defaultColumnIcon: 'list-alt',
};

export const pageContents = {
  menu: [
    {
      key: 0,
      href: 'project',
      text: 'O projekcie',
    },
    {
      key: 1,
      href: 'about',
      text: 'O nas',
    },
    {
      key: 2,
      href: 'contact',
      text: 'Kontakt',
    },
    {
      key: 3,
      href: '.',
      text: 'Main',
    },
    {
      key: 4,
      href: 'view',
      text: 'View',
    },
    {
      key: 5,
      href: 'pathfinding',
      text: 'PathFinding',
    }
  ],
  login: 'Zaloguj się',
  footer: 'SKN Geodetów Uniwersytetu Przyrodniczego we Wrocławiu &copy; 2022-2024. All rights reserved',
};

export const contactData = {
  header: 'Przewodniczący',
  basicInfo: {
      mail: ' skn_geodetow@upwr.edu.pl',
      address: ' ul. Grunwaldzka 53, 50-357 Wrocław'
    },
  people: [
    {
      key: 0,
      role: 'Przewodniczący',
      name: 'Maurycy Hechmann',
      mail: ' maurycyhechmann@gmail.com',
      phone: ' +48 697 592 660',
    },
    {
      key: 1,
      role: 'Z-ca Przewodniczącego',
      name: 'Wiktoria Kowalczyk',
      mail: ' wiktoriakowalczyk05@gmail.com',
      phone: ' +48 883 521 625',
    },
    {
      key: 2,
      role: 'Członkini Zarządu',
      name: ' Emilia Biczel',
      mail: ' emilia.biczel@gmail.com',
    },
  ]
}

export const flipData = {
  text: 'Aby poprawnie wyświetlić model obróć telefon',
  img: 'src/images/flip.png',
}

export const aboutData = {
  title: 'O nas',
  paragraphs: {
    p1: 'Jako studenci naszego Uniwersytetu zaobserwowaliśmy problem, którym był brak narzędzia pozwalającego na szybkie odnajdywanie gabinetu wykładowcy bądź sali, w której mamy zajęcia. Prezentujemy Wam nowoczesną wyszukiwarkę połączeń między wybranymi pomieszczeniami dla części budynku C1.',
    p2: 'Nasz projekt został wykonany z największą starannością: począwszy od wywiadu terenowego i pomiarów fizycznych, aż po zbudowanie modelu oraz wygenerowanie ścieżek nawigacyjnych. Dzięki nam bez problemu odnajdziecie się na uczelni.',
    p3: 'Nasz zespół to członkowie SKN Geodetów Uniwersytetu Przyrodniczego we Wrocławiu. NaviUP to efekt naszej wspólnej pracy i pierwszy krok w kierunku poprawy mobilności społeczności akademickiej.',
  },
  firstBlocks: [
    {
      key: 0,
      id: 'care',
      groupName: 'Opiekunowie naukowi projektu:',
      people: [
        {
          key: 0,
          name: ' dr inż. Paweł Bogusławski',
        },
        {
          key: 1,
          name: ' dr inż. Kamil Kaźmierski',
        },
        {
          key: 2,
          name: ' dr inż. Adrian Kaczmarek',
        },
      ]
    },
    {
      key: 1,
      id: 'head',
      groupName: 'Osoba od wektoryzacji',
      people: [
        {
          key: 0,
          name: ' Wiktoria Kowalczyk',
        },
      ]
    },
    {
      key: 2,
      id: 'help',
      groupName: 'Wsparcie dodatkowe:',
      people: [
        {
          key: 0,
          name: ' mgr inż. Adam Pałęcki',
        },
        {
          key: 1,
          name: ' mgr inż. Adrian Kulik',
        },
        {
          key: 2,
          name: ' mgr inż. Filip Gałdyn',
        },
      ]
    },
    {
      key: 3,
      id: 'code',
      groupName: 'Ekipa programistów:',
      people: [
        {
          key: 0,
          name: ' Konrad Kostrzanowski',
        },
        {
          key: 1,
          name: ' Mikołaj Janas',
        },
        {
          key: 2,
          name: ' Marysia Pięk',
        },
        {
          key: 3,
          name: ' Miłosz Olszewski',
        },
        {
          key: 4,
          name: ' Adam Skórski',
        },
      ]
    },
  ],
  imfSource: 'src/images/team2.jpg',
  secondBlocks: [
    {
      key: 0,
      id: 'art',
      groupName: 'Drużynowy artysta:',
      people: [
        {
          key: 0,
          name: ' Maurycy Hechmann',
        },
      ]
    },
    {
      key: 1,
      id: 'data',
      groupName: 'Ludzie od danych:',
      people: [
        {
          key: 0,
          name: ' Julia Piszak',
        },
        {
          key: 1,
          name: ' Karol Błaszczok',
        },
        {
          key: 2,
          name: ' Wiktor Cholewa',
        },
        {
          key: 3,
          name: ' Adrianna Kieres',
        },
        {
          key: 4,
          name: ' Michaela Szłapa',
        },
      ]
    },
    {
      key: 2,
      id: 'FME',
      groupName: 'Osoba od algorytmów FME:',
      people: [
        {
          key: 0,
          name: ' Weronika Wysopal',
        },
      ]
    },
  ],
  music: 'src/vendor/Jim Yosef - Stamp On The Ground.mp3',
}

export const projectData = {
  title: 'O projekcie',
  paragraphs: {
    h4: 'Projekt NaviUP to inicjatywa członków Studenckiego Koła Naukowego Geodetów działającego przy Instytucie Geodezji i Geoinformatyki Uniwersytetu Przyrodniczego we Wrocławiu.',
    p1: 'Stworzyliśmy to narzędzie, aby ułatwić poruszanie się po obiekcie naszej uczelni, a w przyszłości chcemy rozwinąć projekt dla kolejnych budynków naszego kampusu. Planujemy równiez uwzględnić optymalne trasy przejść dla osób niepełnosprawnych oraz wyjścia ewakuacyjne.',
    p2: 'Jesteśmy przekonani, ze NaviUP poprawi mobilność całej społeczności akademickiej na naszym Uniwersytecie.',
    p3: 'Projekt został dofinansowany przez Uniwersytet Przyrodniczy we Wrocławiu w ramach IV edycji konkursu „Projekty badawcze SKN” w roku 2022.',
  },
  konkursLink: 'https://upwr.edu.pl/studia/studencka-aktywnosc/studenckie-projekty-badawcze/projekty-badawcze-skn/zwyciezcy-iv-edycji-2022',
  konkursText: 'Wyniki konkursu',
  image: 'src/images/upwr-logotyp-pl-poziomy.png',
}

export const heroData = {
  skn: [
    {
      href: 'https://www.facebook.com/SKNGeodetow/',
      shortcut: 'SKN',
      image: 'src/images/geodeci.png',
      p1: 'Geodetów',
      p2: 'Uniwersytetu Przyrodniczego we Wrocławiu',
    }
  ],
  links: [
    {
      key: 0,
      href: 'https://www.igig.up.wroc.pl/?menu=Aktualnosci',
      image: {
          className: 'igig',
          src: 'src/images/IGG.png',
        },
    },
    {
      key: 1,
      href: 'https://upwr.edu.pl/',
      image: {
          className: 'upwr',
          src: 'src/images/upwr-logotyp-pl-poziomy.png',
          srcSmall: 'src/images/upwr-logotyp.png',
        },
    },
  ],
};
