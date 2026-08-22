// Quest list, sourced from the game's spreadsheet (Strefa 1-5).
// "act" is a manually-assigned, read-only indicator of which Act a quest
// becomes completable in — edit these values directly in this file.
export interface Quest {
  lp: number;
  task: string;
  howTo: string;
  reward: string;
  act: 1 | 2 | null;
  exampleLink?: string;
}

export interface QuestZone {
  zone: number;
  quests: Quest[];
}

export const QUEST_ZONES: QuestZone[] = [
  {
    zone: 5,
    quests: [
    { lp: 1, task: 'Twój stan majątkowy budzi nasz niepokój, Akolito. Masz za zadanie rozbudować Dom Publiczny do 3 poziomu.', howTo: 'Rozbuduj dom publiczny do 3 poziomu.', reward: 'xp', act: 1 },
    { lp: 2, task: 'Krew jest źródłem naszej siły. Dokonaj rozbudowy Rzeźni do 5 poziomu.', howTo: 'Rozbuduj rzeźnie do 5 poziomu.', reward: 'xp', act: 1 },
    { lp: 3, task: 'Zdobdź 10 poziom.', howTo: 'Zdobdź 10 poziom.', reward: 'xp', act: 1 },
    { lp: 4, task: 'Groźny mutant przedostał się ze strefy zewnętrznej, trzeba go znaleźć i powstrzymać zanim wyrządzi więcej szkód (…)', howTo: 'Podczas wypraw w okolice miasta pokonaj mutanta.', reward: 'xp + evo', act: 1, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=32890388&key=4c3fce4d8f' },
    { lp: 5, task: 'Zbadaj dokładnie Okolice Miasta.', howTo: 'Zalicz wszystkie wyrawy w okolice miasta.', reward: 'xp', act: 1 },
    { lp: 6, task: 'Każdy szanujący się wampir powinien posiadać kolekcję artefaktów. Ukończ wszystkie Dalekie Wyprawy.', howTo: 'Zalicz wszystkie dalekie wyrawy.', reward: 'xp', act: 1 },
    { lp: 7, task: 'Tylko najlepsi z najlepszych są warci tego zadania i tylko oni posiadają przedmioty Mocy. (…)', howTo: 'Zalicz pierwszą pielgrzymkę.', reward: 'xp', act: 1 },
    { lp: 8, task: 'W naszym kwadracie grasuje wataha wilkołaków. Trzeba je zabić, atakując je we własnej kryjówce.', howTo: 'Załóż oblężenie na swój klocej i z pomocą klanu pokonaj przeciwnika.', reward: 'xp + zielona lv1 + evo', act: 1 },
    { lp: 9, task: 'Pieniądze i handel bronią to czynniki, które pozwolą Ci przetrwać. Osiągnij stabilizację (…)', howTo: 'Rozbuduj dom publiczny na 10 poziom oraz postaw stary rynek.', reward: 'xp + evo', act: 1 },
    { lp: 10, task: 'Urodziłeś się po to, by awansować. Udowodnij to, awansując do IV strefy.', howTo: 'Przejmij klocek w 4 strefie.', reward: 'xp + evo', act: 1 },
    { lp: 11, task: 'Rozszerz swoje wpływy w świecie mroku zdobywając wasala (…)', howTo: 'Stwóż nową postać kożystając z linku z sali tronowej.', reward: 'xp', act: 1 },
    ]
  },
  {
    zone: 4,
    quests: [
    { lp: 1, task: 'Jest kilka sposobów zdobywania reputacji w świecie umarlaków. (…)', howTo: 'Zalicz 4 pielgrzymki.', reward: 'xp', act: 1 },
    { lp: 2, task: 'Masz pieniądze i wiesz jak je zdobywać. Teraz musisz zyskać reputację wśród Trzody. (…)', howTo: 'Rozbuduj pośredniak do 15 poziomu.', reward: 'xp', act: 1 },
    { lp: 3, task: 'Przywódca okolicznego stada wilkołaków poprzysiągł Ci zemstę za zniszczenie watahy w Twoim kwadracie. (…)', howTo: 'Udaj się na daleką wyprawę i pokonaj Rotmistrza i jego gwardzistów.', reward: 'xp + evo', act: 1, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=26507479&key=d5fd86c544' },
    { lp: 4, task: 'Ludzie w Twoim kwadracie zaczęli zapadać na dziwną chorobę. (…)', howTo: 'Udaj się na bliską wyprawę i pokonaj Ghoule.', reward: 'xp + evo', act: 1, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=26416862&key=06dbab55b9' },
    { lp: 5, task: 'Zdobądź poziom 35.', howTo: 'Zdobądź poziom 35.', reward: 'xp + evo', act: 1 },
    { lp: 6, task: 'Gdy byłeś na wyprawie, wampir-uzurpator zajął Twoją siedzibę. Odbij ją wraz z członkami klanu.', howTo: 'Załóż oblężenie na swój klocej i z pomocą klanu pokonaj przeciwnika.', reward: 'xp + evo', act: 1 },
    { lp: 7, task: 'Wybuduj wszystkie budynki ze strefy czwartej.', howTo: 'Wybuduj wszystkie budynki ze strefy czwartej.', reward: 'xp', act: 1 },
    { lp: 8, task: 'Władza!! Awansuj do strefy Trzeciej. I zasiądź w Wewnętrznym Kręgu.', howTo: 'Przejmij klocek w 3 strefie.', reward: 'xp + evo', act: 1 },
    { lp: 9, task: 'Jak nakazuje wampirza tradycja, każdy nowo mianowany Inkwizytor wyprawia wystawną ucztę, (…)', howTo: 'W momencie posiadania na koncie 5 000 000 PLN kliknij w link w zadaniu.', reward: 'xp', act: 2 },
    { lp: 10, task: 'Twoi zwiadowcy poinformowali Cię o dziwnych zjawiskach zachodzących na Wielkim Stepie. (…)', howTo: 'Przygotować ekspedycję na Wielki Step. Tam natrafić i zabić Ducha Elizabeth.', reward: 'xp + czerwona lv2', act: 2 },
    { lp: 11, task: 'Ważne osobistości mają zawsze wielu wrogów, dlatego przydaje się dodatkowa ochrona. (…)', howTo: 'Wybudować Posterunek Policji i Schronisko na 18 poziom.', reward: 'xp', act: 2 },
    { lp: 12, task: 'Kolejne zmasakrowane ciała, ludzie okrutnie pozbawieni wnętrzności, korpusy bez głów. (…)', howTo: 'Szpieguj swój klocek aż rozwiążesz co się dzieje.', reward: 'xp', act: 2 },
    { lp: 13, task: 'Informacje uzyskane od młodego człowieka prowadzą do karczmy na przedmieściach miasta. (…)', howTo: 'Załóż oblężenie na swój klocek i pokonaj miecz inkwizycji.', reward: 'xp', act: 2 },
    { lp: 14, task: 'Gdy obudziłeś się wieczorem, na biurku znalazłeś dziwny list. (…)', howTo: 'Zalicz wyprawę daleką lub pielgrzymkę, gdzie szansa powodzenia to średnia testu zwinności i inteligencji.', reward: 'xp', act: 2 },
    { lp: 15, task: 'Wykaż się męstwem. Tylko to przyciągnie pod Twój sztandar wytrawnych łowców.', howTo: 'Zaliczyć dowolną daleką.', reward: 'xp', act: 2 },
    ]
  },
  {
    zone: 3,
    quests: [
    { lp: 1, task: 'Wykonaj wszystkie Pielgrzymki w Nieznane.', howTo: 'Zalicz wszystkie Pielgrzymki w Nieznane.', reward: 'xp', act: 1 },
    { lp: 2, task: 'W nieznanych zakątkach pustkowia Wilczy Król zbiera stada, (…)', howTo: 'Na pielgrzymce czeka cię walka.', reward: 'xp + evo', act: 1 },
    { lp: 3, task: 'Zdobądź poziom 50.', howTo: 'Osiągnij 50Lv.', reward: 'xp + evo', act: 1 },
    { lp: 4, task: 'Wybuduj wszystkie budynki z trzeciej strefy.', howTo: 'Wybuduj wszystkie budynki z trzeciej strefy.', reward: 'xp', act: 1 },
    { lp: 5, task: 'Od dawna wiadomo, że najlepszą obroną jest atak. Rozbuduj Sklep z Bronią do 5 poziomu.', howTo: 'Rozbuduj Sklep z Bronią do 5 poziomu.', reward: 'xp', act: 1 },
    { lp: 6, task: 'Ostatnio przeciwnicy zawsze są o krprzed Tobą. (…)', howTo: 'Rozbuduj Dziennik Lokalny do 4 poziomu.', reward: 'xp', act: 1 },
    { lp: 7, task: 'Twoi agenci odkryli kryjówkę wrogiej szajki szpiegowskiej. (…)', howTo: 'Załóż oblężenie na swój klocej i z pomocą klanu pokonaj przeciwnika.', reward: 'xp + runy lv2 + evo', act: 1, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=26702562&key=bd3a573264' },
    { lp: 8, task: 'Od samego początku byłeś pewny, że ten czas kiedyś nastanie... Dostań się do Rady, awansując do Drugiej Strefy!.', howTo: 'Przejmij S2.', reward: 'xp', act: 1 },
    { lp: 9, task: 'Obowiązkiem każdego wampira wysokiej rangi jest dostarczenie ludzi do posługi w Katedrze. (…)', howTo: 'Zgromadź 500 000 ludzi i kliknij w link.', reward: 'xp + evo', act: 2 },
    { lp: 10, task: 'Minęło już wiele dni, odkąd Twój syn wyruszył na wyprawę w nieznane, (…)', howTo: 'Zaliczyć pielgrzymkę, gdzie szansa powodzenia to średnia testu spostrzegawczości i inteligencji.', reward: 'xp', act: 2 },
    { lp: 11, task: 'Wpływy, władza, splendor... aby to wszystko utrzymać, potrzebujesz pieniędzy. (…)', howTo: 'Wybudój dom publiczny na 14 poziom.', reward: 'xp', act: 2 },
    { lp: 12, task: 'Twoja pozycja, sława i bogactwo sprawiły, że jesteś uważany za jednego z bardziej wpływowych wampirów w mieście. (…)', howTo: 'Zasadzka, pokonaj członka szajki, na dalekiej wyprawie. Na kogo trafisz zdecyduje los.', reward: 'xp + evo', act: 2 },
    { lp: 13, task: 'Dokonaj heroicznego czynu. (…)', howTo: 'Zaliczyć dowolną pielgrzymkę (mając już wcześniej wykonane wszystkie pielgrzymki ) .', reward: 'xp', act: 2 },
    ]
  },
  {
    zone: 2,
    quests: [
    { lp: 1, task: 'Zdobądź poziom 80.', howTo: 'Osiągnij 80 poziom.', reward: 'xp + evo', act: 2 },
    { lp: 2, task: 'Udowodnij swój zmysł do biznesu. Wybuduj Cmentarz oraz Bank Krwi.', howTo: 'Wybuduj Cmentarz oraz Bank Krwi.', reward: 'xp', act: 1 },
    { lp: 3, task: 'Zdobądź serca i umysły tłumu. Osiągnij 50 pkt. charyzmy.', howTo: 'Osiągnij 50 pkt. charyzmy w treningu.', reward: 'xp', act: 1 },
    { lp: 4, task: 'Zakon Świętego Benedykta wysłał przeciwko Tobie skrytobójcę. Znajdź go w Okolicach Miasta.', howTo: 'Na wyprawie w okolice miasta czeka cię walka.', reward: 'xp + evo', act: 1 },
    { lp: 5, task: 'Zostań władcą ciemnych zaułków Miasta. Osiągnij 55 pkt. wpływów .', howTo: 'Osiągnij 55 wpływów w treningu.', reward: 'xp', act: 1 },
    { lp: 6, task: 'Twój kwadrat został najechany przez paladynów z Zakonu Świętego Benedykta. (…)', howTo: 'Zorganizuj oblężenie na swój klocek i wraz z klanem pokonaj przeciwnika.', reward: 'xp + 1500 evo', act: 1, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=26958476&key=d8520d114d' },
    { lp: 7, task: 'Wielki Mistrz Zakonu uszedł z życiem z poprzedniej batalii. (…)', howTo: 'Pielga bojowo', reward: 'xp + 1500 evo', act: 1 },
    { lp: 8, task: 'Zostań Władcą Miasta. Tu i teraz.', howTo: 'Przejmij S1', reward: 'xp + evo', act: 1 },
    { lp: 9, task: 'Pan Ciemności wymaga, aby w jego Katedrze nigdy nie brakowało krwi. (…)', howTo: 'Uzbieraj 800 000 litrów krwi i kliknij w link w zadaniu.', reward: 'xp + evo', act: 2 },
    { lp: 10, task: 'Prawdziwe doświadczenie można zdobyć tylko przemierzając niebezpieczne szlaki. (…)', howTo: 'Zaliczyć 15 udanych pielgrzymek po pojawieniu się zadania.', reward: 'xp', act: 2 },
    { lp: 11, task: 'Dotarły do Ciebie plotki o dziwnej anomalii, znajdującej się gdzieś na pustkowiach. (…)', howTo: 'Zaliczyć pielgrzymkę, gdzie szansa powodzenia to średnia testu wiedzy i inteligencji.', reward: 'xp', act: 2 },
    { lp: 12, task: 'Twoi ludzie donieśli, że przy rabusiu zabitym w okolicach miasta znaleziono list. (…)', howTo: 'Wykonaj expedycję na której będzie inny przeciwnik', reward: 'xp + 1500 evo', act: 2, exampleLink: 'https://r20.bloodwars.pl/showmsg.php?mid=26951636&key=61bfb7fb5b' },
    { lp: 13, task: 'Całe miasto patrzy na członków Wewnętrznego Kręgu. (…)', howTo: 'Wybudój Szpital na 7 poziom i Rzeźnie na 22 poziom.', reward: 'xp + evo', act: 2 },
    { lp: 14, task: 'Zdobądź 84 poziom.', howTo: 'Osiągnij 84 poziom.', reward: 'xp + evo', act: 2 },
    ]
  },
  {
    zone: 1,
    quests: [
    { lp: 1, task: 'Prestiż wśród wampirów to nie tylko bogactwo i władza. (…)', howTo: 'Wygraj 15 kolejnych ataków.', reward: 'xp', act: 2 },
    { lp: 2, task: 'Pomimo ostrzeżeń doradców, wyprawiasz się czasami na samotne spacery w okolice miasta. (…)', howTo: 'Udaj się na bliską wyprawę i pokonaj Assasyna.', reward: 'xp + 1500 evo', act: 2 },
    { lp: 3, task: 'Zdobądź 110 poziom.', howTo: 'Zdobądź 110 poziom.', reward: 'xp + evo', act: 2 },
    { lp: 4, task: 'Treść dokładnie nie znana, wiadomo tylko tyle, że trzeba się uporać z Bractwem Chaosu', howTo: 'Wygraj oblężenie na Bractwo.', reward: 'xp + 1500 evo', act: 2 },
    ]
  },
];
