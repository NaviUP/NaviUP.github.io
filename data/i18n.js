import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'pl',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          flipData: {
            text: 'To display the model correctly, rotate your phone',
            img: 'src/images/flip.png',
          },
          aboutData: {
            title: 'About Us',
            paragraphs: {
              p1: "As students of our University, we noticed a problem: the lack of a tool that would allow us to quickly find a lecturer's office or the room where we have classes. We present you a modern search engine for connections between selected rooms for part of the C1 building",
              p2: 'Our project was carried out with the greatest care: from field interviews and physical measurements, to building the model and generating navigation paths. Thanks to us, you will easily find your way on the university.',
              p3: 'Our team consists of members of the SKN Geodetów of the University of Environmental and Life Sciences in Wrocław. NaviUP is the result of our joint work and the first step towards improving the mobility of the academic community.',
            },
            firstBlocks: [
              {
                groupName: 'Scientific supervisors of the project:',
              },
              {
                groupName: 'Vectorization person:',
              },
              {
                groupName: 'Additional support:',
              },
              {
                groupName: 'Development team:',
              },
            ],
            secondBlocks: [
              {
                groupName: 'Team artist:',
              },
              {
                groupName: 'Data people:',
              },
              {
                groupName: 'FME algorithms person:',
              },
            ],
          },
          contactData: {
            header: 'Office',
            basicInfo: {
              mail: ' skn_geodetow@upwr.edu.pl',
              address: ' ul. Grunwaldzka 53, 50-357 Wrocław'
            },
            people: [
              {
                key: 0,
                role: 'Chairman',
                name: 'Maurycy Hechmann',
                mail: ' maurycyhechmann@gmail.com',
                phone: ' +48 697 592 660',
              },
              {
                key: 1,
                role: 'Deputy-Chairman',
                name: 'Wiktoria Kowalczyk',
                mail: ' wiktoriakowalczyk05@gmail.com',
                phone: ' +48 883 521 625',
              },
              {
                key: 2,
                role: 'Member of the Management Board',
                name: ' Emilia Biczel',
                mail: ' emilia.biczel@gmail.com',
              },
            ]
          },
          projectData: {
            title: 'About project',
            paragraphs: {
              h4: 'The NaviUP project is an initiative of members of the Student Scientific Circle of Geodesy operating at the Institute of Geodesy and Geoinformatics of the Wrocław University of Environmental and Life Sciences.',
              p1: "We created this tool to make it easier to navigate around our university's facilities, and in the future we want to develop the project for other buildings on our campus. We also plan to take into account optimal passage routes for disabled people and emergency exits.",
              p2: 'We are convinced that NaviUP will improve the mobility of the entire academic community at our University.',
              p3: 'The project was co-financed by the Wrocław University of Environmental and Life Sciences as part of the 4th edition of the "SKN Research Projects" competition in 2022.',
            },
            konkursLink: 'https://upwr.edu.pl/studia/studencka-aktywnosc/studenckie-projekty-badawcze/projekty-badawcze-skn/zwyciezcy-iv-edycji-2022',
            konkursText: 'Competition results (website in Polish)',
            image: 'src/images/upwr-logotyp-pl-poziomy.png',
          },
          mainData: {
            whereAreYou: 'Where are you?',
            person1: 'Person',
            room1: 'Room',
            building1: 'Building',
            description1: 'I am at/in e.g. Kaczmarek Adrian, 202',
            whereAreYouGoing: 'What are you looking for?',
            person2: 'Person',
            room2: 'Room',
            building2: 'Building',
            description2: 'I search e.g. Kaczmarek Adrian, 202',
            search: 'Find path'
          },
          pageContentData: {
            menu: [
              {
                text: 'Search'
              },
              {
                text: 'View model'
              },
              {
                text: 'About project'
              },
              {
                text: 'About Us'
              },
              {
                text: 'Contact'
              },
              {
                text: 'PathFinding'
              }
            ],
            login: {
              buttonText: 'Log in',
              header: 'Show that you are from UPWR!',
              placeholder: 'Enter your university email address',
              submit: 'Submit',
              close: 'Close'
            },
            footer: 'SKN Geodetów Wrocław University of Environmental and Life Science \u00A9; 2022-2024. All rights reserved'
          },
          funnyTexts: {
            buildingSame: 'Searching path to the building you are already in is not really smart<br> ༼ つ ◕_◕ ༽つ',
            buildingConnected: 'Buildings are connected<br>so try searching in Rooms<br>ヾ(•ω•`)o',
            roomSame: 'You are already in the room you are searching for so there is no need searching path to it!<br> \\(@^0^@)/'
          },
          infoData: {
            title: 'Academic degree',
            email: 'E-mail adress',
            institute: 'The university unit to which this person belongs'
          },
          modelData: {
            sideView: 'Floors side view',
            startFloor: 'Starting floor',
            endFloor: 'Final floor'
          }
        }
      },
      pl: {
        translation: {
          flipData: {
            text: 'Aby poprawnie wyświetlić model obróć telefon',
            img: 'src/images/flip.png',
          },
          aboutData: {
            title: 'O nas',
            paragraphs: {
              p1: 'Jako studenci naszego Uniwersytetu zaobserwowaliśmy problem, którym był brak narzędzia pozwalającego na szybkie odnajdywanie gabinetu wykładowcy bądź sali, w której mamy zajęcia. Prezentujemy Wam nowoczesną wyszukiwarkę połączeń między wybranymi pomieszczeniami dla części budynku C1.',
              p2: 'Nasz projekt został wykonany z największą starannością: począwszy od wywiadu terenowego i pomiarów fizycznych, aż po zbudowanie modelu oraz wygenerowanie ścieżek nawigacyjnych. Dzięki nam bez problemu odnajdziecie się na uczelni.',
              p3: 'Nasz zespół to członkowie SKN Geodetów Uniwersytetu Przyrodniczego we Wrocławiu. NaviUP to efekt naszej wspólnej pracy i pierwszy krok w kierunku poprawy mobilności społeczności akademickiej.',
            },
            firstBlocks: [
              {
                groupName: 'Opiekunowie naukowi projektu:',
              },
              {
                groupName: 'Osoba od wektoryzacji',
              },
              {
                groupName: 'Wsparcie dodatkowe:',
              },
              {
                groupName: 'Ekipa programistów:',
              },
            ],
            secondBlocks: [
              {
                groupName: 'Drużynowy artysta:',
              },
              {
                groupName: 'Ludzie od danych:',
              },
              {
                groupName: 'Osoba od algorytmów FME:',
              },
            ],
          },
          contactData: {
            header: 'Biuro',
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
          },
          projectData: {
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
          },
          mainData: {
            whereAreYou: 'Gdzie jesteś?',
            person1: 'Osoba',
            room1: 'Pomieszczenie',
            building1: 'Budynek',
            description1: 'Jestem u/w np. Kaczmarek Adrian, 202',
            whereAreYouGoing: 'Czego szukasz?',
            person2: 'Osoby',
            room2: 'Pomieszczenia',
            building2: 'Budynku',
            description2: 'Szukam np. Kaczmarek Adrian, 202',
            search: 'Szukaj drogi'
          },
          pageContentData: {
            menu: [
              {
                text: 'Wyszukiwarka'
              },
              {
                text: 'Zobacz model'
              },
              {
                text: 'O projekcie'
              },
              {
                text: 'O nas'
              },
              {
                text: 'Kontakt'
              },
              {
                text: 'PathFinding'
              }
            ],
            login: {
              buttonText: 'Zaloguj się',
              header: 'Pokaż że jesteś z UPWR!',
              placeholder: 'Podaj mail uczelniany',
              submit: 'Wprowadź',
              close: 'Zamknij'
            },
            footer: 'SKN Geodetów Uniwersytetu Przyrodniczego we Wrocławiu \u00A9; 2022-2024. All rights reserved'
          },
          funnyTexts: {
            buildingSame: 'Szukanie drogi do budynku w którym się już znajdujesz nie jest zbyt inteligentne<br> ༼ つ ◕_◕ ༽つ',
            buidlingConnected: 'Budunki są ze sobą połączone.<br>Spróbuj poszukać w Pomieszczeniach<br>ヾ(•ω•`)o',
            roomSame: 'Jesteś już w pomieszczeniu do którego chcesz dotrzeć więc jesteś już na miejscu! \\(@^0^@)/'
          },
          infoData: {
            title: 'Stopień naukowy',
            email: 'Adres e-mail',
            institute: 'Jednostka uczelniana do której ta osoba przynależy'
          },
          modelData: {
            sideView: 'Widok pięter z boku',
            startFloor: 'Piętro startowe',
            endFloor: 'Piętro końcowe'
          }
        }
      }
    }
  });

export default i18n;