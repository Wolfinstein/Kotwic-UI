import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CharacterService } from '../../services/character.service';
import { Character, EquipmentItem, ItemRarity } from '../../models/character';

// ─── Equipment Dictionaries ───────────────────────────────────────────────────

export type SlotCategory = 'head' | 'chest' | 'legs' | 'neck' | 'finger' | 'weapon1h' | 'weapon2h';

export interface BaseItemDef {
name: string;
category: SlotCategory;
hasPrefix: boolean;
hasSuffix: boolean;
}

export const RARITIES: ItemRarity[] = ['ZWYKLY' , 'DOBRY' , 'DOSKONALY' , 'LEGENDARNY' , 'LEGENDARNY_DOBRY' , 'LEGENDARNY_DOSKONALY' , 'EPICKI'];

export const BASE_ITEMS: BaseItemDef[] = [
{ name: 'Czapka',            category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Kask',              category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Helm',              category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Maska',             category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Obrecz',            category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Kominiarka',        category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Kapelusz',          category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Korona',            category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Opaska',            category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Bandana',            category: 'head',     hasPrefix:true,  hasSuffix: true},
{ name: 'Kurtka',            category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Kamizelka',         category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Kolczuga',          category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'ZbrojaWarstwowa',   category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Koszulka',          category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Marynarka',         category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'PelnaZbroja',       category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Peleryna',          category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Gorset',            category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Smoking',            category: 'chest',    hasPrefix:true,  hasSuffix: true},
{ name: 'Szorty',            category: 'legs',     hasPrefix:true,  hasSuffix: true},
{ name: 'Spodnie',           category: 'legs',     hasPrefix:true,  hasSuffix: true},
{ name: 'Kilt',              category: 'legs',     hasPrefix:true,  hasSuffix: true},
{ name: 'Spodnica',          category: 'legs',     hasPrefix:true,  hasSuffix: true},
{ name: 'Amulet',            category: 'neck',     hasPrefix:true,  hasSuffix: true},
{ name: 'Apaszka',            category: 'neck',     hasPrefix:true,  hasSuffix: true},
{ name: 'Naszyjnik',         category: 'neck',     hasPrefix:true,  hasSuffix: true},
{ name: 'Lancuch',           category: 'neck',     hasPrefix:true,  hasSuffix: true},
{ name: 'Krawat',            category: 'neck',     hasPrefix:true,  hasSuffix: true},
{ name: 'Pierscien',           category: 'finger',   hasPrefix:true,  hasSuffix: true},
{ name: 'Bransoleta',          category: 'finger',   hasPrefix:true,  hasSuffix: true},
{ name: 'Sygnet',              category: 'finger',   hasPrefix:true,  hasSuffix: true},
{ name: 'Palka',           category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Noz',            category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Sztylet',        category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Rapier',         category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Miecz',          category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Topor',          category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Kastet',         category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Kama',           category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'PiescNiebios',   category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Wakizashi',      category: 'weapon1h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Glock',          category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Magnum',         category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'DesertEagle',    category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Beretta',        category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Uzi',            category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Mp5k',           category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Skorpion',       category: 'weapon1h',  hasPrefix:false,  hasSuffix: false},
{ name: 'KarabinMysliwski',        category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Strzelba',                category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'AK47',                    category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'MiotaczPlomieni',         category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'FnFal',                   category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'PolautomatSnajperski',    category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'KarabinSnajperski',       category: 'weapon2h',  hasPrefix:false,  hasSuffix: false},
{ name: 'Maczuga',                  category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Lom',                      category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Pika',                     category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'ToporDwureczny',           category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'MieczDwureczny',           category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Kosa',                     category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Korbacz',                  category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Halabarda',                category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'Katana',                   category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'PilaLancuchowa',           category: 'weapon2h',  hasPrefix:true,  hasSuffix: true},
{ name: 'KrotkiLuk',               category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'Luk',                     category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'DlugiLuk',                category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'Oszczep',                 category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'Pilum',                   category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'NozDoRzucania',           category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'ToporekDoRzucania',       category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'Kusza',                   category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'Shuriken',                category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'CiezkaKusza',             category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
{ name: 'LukRefleksyjny',          category: 'weapon2h',  hasPrefix:false,  hasSuffix: true},
];

export const PREFIXES_BY_CATEGORY: Record<SlotCategory, string[]> = {
head:     ['Ozdobna', 'Utwardzana', 'Elegancka', 'Pomocna', 'Kosztowny', 'Wzmocniony', 'Magnetyczna', 'Rogata', 'Bojowa', 'Zlosliwa', 'Leniwa', 'Kuloodporne', 'Szturmowy', 'Szamanska', 'Runiczne', 'Krwawy', 'Tygrysi', 'Smiercionosny', 'Rytualny'],
chest:    ['Wzmocniony', 'Wladcza', 'Cwiekowany', 'Lekki', 'Kuloodporne', 'Luskowa', 'Gietki', 'Plytowa', 'Szamanska', 'Lowiecka', 'Elfie', 'Bojowa', 'Tygrysi', 'Smiercionosny', 'Krwawy', 'Runiczne'],
legs:     ['Pikowany', 'Wzmocniony', 'Cwiekowany', 'Lekki', 'Krotkie', 'Aksamitne', 'Kolcze', 'Kuloodporne', 'Gietki', 'Pancerne', 'Kompozytowe', 'Elfie', 'Runiczne', 'Szamanska', 'Tygrysi', 'Krwawy', 'Smiercionosny'],
neck:     ['Miedziany', 'Srebrny', 'Szmaragdowy', 'Zloty', 'Platynowy', 'Rubinowy', 'Dystyngowany', 'Przebiegly', 'Niedzwiedzi', 'Twardy', 'Gwiezdny', 'Elastyczny', 'Kardynalski', 'Nekromancki', 'Plastikowy', 'Tytanowy', 'Diamentowy', 'Msciwy', 'Spaczony', 'Zdradziecki', 'Archaiczny', 'Hipnotyczny', 'Tanczacy', 'Zwierzecy', 'Jastrzebi', 'Pajeczy', 'Sloneczny', 'Czarny'],
finger:   ['Miedziany', 'Szmaragdowy', 'Srebrny', 'Rubinowy', 'Zloty', 'Platynowy', 'Dystyngowany', 'Przebiegly', 'Niedzwiedzi', 'Twardy', 'Gwiezdny', 'Elastyczny', 'Kardynalski', 'Nekromancki', 'Plastikowy', 'Tytanowy', 'Diamentowy', 'Msciwy', 'Spaczony', 'Zdradziecki', 'Archaiczny', 'Hipnotyczny', 'Tanczacy', 'Zwierzecy', 'Pajeczy', 'Sloneczny', 'Jastrzebi', 'Czarny'],
weapon1h: ['Ostry', 'Kasajacy', 'Okrutny', 'Krysztalowy', 'Przyjacielski', 'Jadowity', 'Lekki', 'Zebaty', 'Wzmacniajacy', 'Opiekunczy', 'Mistyczny', 'Swiecacy', 'Kosciany', 'Zatruty', 'Antyczny', 'Zabojczy', 'Zwinny', 'Szybki', 'Przeklety', 'Demoniczny'],
weapon2h: ['Ostry', 'Kasajacy', 'Kosztowny', 'Wzmacniajacy', 'Lekki', 'Okrutny', 'Jadowity', 'Swiecacy', 'Krysztalowy', 'Ciezki', 'Szeroki', 'Opiekunczy', 'Mistyczny', 'Napromieniowany', 'Antyczny', 'Zebaty', 'Zatruty', 'Zabojczy', 'Przeklety', 'Demoniczny', 'Zwinny'],
};

export const SUFFIXES_BY_CATEGORY: Record<SlotCategory, string[]> = {
head:     ['Miss', 'Mistera', 'Podroznika', 'Przezornosci', 'Wytrzymalosci', 'Ochrony', 'Zmyslow', 'Narkomana', 'Gladiatora', 'Wieszcza', 'SmoczejLuski', 'Mocy', 'Kary', 'Pasterza', 'Krwi', 'Magii', 'Adrenaliny', 'Prekognicji'],
chest:    ['Narkomana', 'Zlodzieja', 'Straznika', 'Silacza', 'Gwardzisty', 'Adepta', 'Adrenaliny', 'SkorupyZolwia', 'Zabojcy', 'Kobry', 'Unikow', 'Centuriona', 'Szermierza', 'Kaliguli', 'Odpornosci', 'Grabiezcy', 'Mistrza', 'Orchidei', 'SiewcySmierci', 'Szybkosci'],
legs:     ['Narkomana', 'Silacza', 'Rzezimieszka', 'CichychRuchow', 'Skrytosci', 'Przemytnika', 'Slonca', 'LowcyCieni', 'HandlarzaBronia', 'Inkow', 'Unikow', 'Weza', 'Pasterza', 'Tropiciela', 'Nocy'],
neck:     ['Urody', 'Wladzy', 'Wystepku', 'Mlodosci', 'Sily', 'Geniuszu', 'Madrosci', 'TwardejSkory', 'Pielgrzyma', 'Celnosci', 'Przebieglosci', 'Sztuki', 'Wilkolaka', 'Szalenca', 'Koncentracji', 'Lewitacji', 'Krwi', 'Zdolnosci', 'Szczescia'],
finger:   ['Urody', 'Wladzy', 'Wystepku', 'Sily', 'Geniuszu', 'Madrosci', 'Lisa', 'TwardejSkory', 'Sztuki', 'Mlodosci', 'Celnosci', 'Przebieglosci', 'Wilkolaka', 'Koncentracji', 'Lewitacji', 'Nietoperza', 'Krwi', 'Szalenca', 'Szczescia'],
weapon1h: ['Sekty', 'Zdobywcy', 'Mocy', 'Dowodcy', 'Zwinnosci', 'Trafienia', 'Kontuzji', 'Wladzy', 'Bolu', 'Odwagi', 'Precyzji', 'Krwi', 'Przodkow', 'Zarazy', 'Drakuli', 'Zemsty', 'Mestwa', 'Klanu', 'Podkowy', 'Bieglosci', 'Samobojcy', 'Imperatora'],
weapon2h: ['Podstepu', 'Hazardzisty', 'Olowiu', 'Mocy', 'Zdrady', 'Wladzy', 'Zdobywcy', 'Bolu', 'Krwiopijcy', 'Inkwizytora', 'Krwi', 'Drakuli', 'Zarazy', 'Zemsty', 'Podkowy', 'Bazyliszka', 'Autokraty', 'Samobojcy','DalekiegoZasiegu', 'Precyzji', 'Driady', 'Zemsty', 'Szybkostrzelnosci', 'Wilka', 'Doskonalosci', 'Reakcji'],
};

const SLOT_TO_CATEGORY: Record<string, SlotCategory> = {
head:    'head',
chest:   'chest',
legs:    'legs',
neck:    'neck',
finger1: 'finger',
finger2: 'finger',
weapon1: 'weapon1h',
weapon2: 'weapon1h',
};

@Component({
selector: 'app-character-input',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './character-input.component.html',
styleUrl: './character-input.component.css'
})
export class CharacterInputComponent implements OnInit {
character: Character | null = null;

// ─── Modal flags ────────────────────────────────────────────────────────────
showEquipmentModal = false;
showRunesModal     = false;
showUmagiModal     = false;

// ─── Equipment modal state ──────────────────────────────────────────────────
selectedEquipmentSlot = '';
weaponMode: 'dual1h' | '2h' = 'dual1h';

/** Draft being edited inside the modal */
draftItem: EquipmentItem = { rarity: null, prefix: null, base: null, suffix: null };
/** For 2H weapon mode the single item */
draft2hItem: EquipmentItem = { rarity: null, prefix: null, base: null, suffix: null };

// ─── Equipment dictionaries ─────────────────────────────────────────────────
rarities = RARITIES;

// ─── Runes ──────────────────────────────────────────────────────────────────
runeOptions     = ['obrazenia 1', 'obrazenia 2', 'obrazenia 3', 'obrazenia 5', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'ignore 2', 'ignore 4', 'ignore 6', 'ignore 10', 'sila 1', 'sila 2', 'sila 3', 'sila 4', 'spostrzegawczosc 1', 'spostrzegawczosc 2', 'spostrzegawczosc 3', 'spostrzegawczosc 4', 'inteligencja 1', 'inteligencja 2', 'inteligencja 3', 'inteligencja 4', 'wiedza 1', 'wiedza 2', 'wiedza 3', 'wiedza 4', 'zwinnosc 1', 'zwinnosc 2', 'zwinnosc 3', 'zwinnosc 4', 'obrona 1', 'obrona 2', 'obrona 3', 'obrona 4', 'odpornosc 1', 'odpornosc 2', 'odpornosc 3', 'odpornosc 4', 'twardosc 1', 'twardosc 2', 'twardosc 3', 'twardosc 4', 'zycie 50', 'zycie 100', 'zycie 150', 'zycie 250', 'szczescie 3', 'szczescie 4', 'szczescie 8', 'szczescie 12', 'multi 2', 'multi 4', 'multi 6', 'multi 10'];
selectedRunes: string[] = [];
runeFilter      = '';
selectedRuneIndex: number | null = null;

// ─── Umagi ──────────────────────────────────────────────────────────────────
umagiOptions    = ['obrazenia 1/4', 'ignore 4', 'ignore 6', 'ignore 10', 'ignore 15', 'dodatkowyAtak', 'obrazenia 5', 'obrazenia 7', 'obrazenia 10', 'obrazenia 20', 'kryt 3', 'kryt 5', 'kryt 8', 'kryt 12', 'trafienie 5', 'trafienie 12', 'trafienie 18', 'trafienie 25', 'zycie 25', 'zycie 50', 'zycie 100', 'zycie 250', 'zycie 500', 'zycie 1000', 'obrona 3/4', 'obrona 6/4', 'unik 3', 'unik 5', 'unik 7', 'unik 11', 'obrona 20', 'obrona 30', 'obrona 50', 'obrona 75', 'szczescie 2', 'szczescie 5', 'szczescie 7', 'szczescie 10', 'szczescie 15', 'szczescie 20', 'inicjatywa 36', 'spostrzegawczosc 2', 'spostrzegawczosc 4', 'spostrzegawczosc 8', 'spostrzegawczosc 14', 'zwinnosc 2', 'zwinnosc 4', 'zwinnosc 8', 'zwinnosc 14', 'sila 2', 'sila 4', 'sila 8', 'sila 14', 'charyzma 2', 'charyzma 4', 'charyzma 8', 'charyzma 14', 'wplywy 2', 'wplywy 4', 'wplywy 8', 'wplywy 14', 'odpornosc 2', 'odpornosc 4', 'odpornosc 8', 'odpornosc 14', 'inteligencja 2', 'inteligencja 4', 'inteligencja 8', 'inteligencja 14', 'wiedza 2', 'wiedza 4', 'wiedza 8', 'wiedza 14', 'wyglad 2', 'wyglad 4', 'wyglad 8', 'wyglad 14'];
selectedUmagi: string[] = [];
umagiFilter     = '';
selectedUmagiIndex: number | null = null;




// ─── Attributes metadata ────────────────────────────────────────────────────
attributes = [
{ key: 'sila',              label: 'Sila' },
{ key: 'zwinnosc',          label: 'Zwinnosc' },
{ key: 'odpornosc',         label: 'Odpornosc' },
{ key: 'wyglad',            label: 'Wyglad' },
{ key: 'charyzma',          label: 'Charyzma' },
{ key: 'wplywy',             label: 'Wplywy' },
{ key: 'spostrzegawczosc',  label: 'Spostrzegawczosc' },
{ key: 'inteligencja',      label: 'inteligencja' },
{ key: 'wiedza',            label: 'wiedza' },
];

evolutions = [
{ key: 'skrzydla',                label: 'Skrzydla' },
{ key: 'pancerz',                 label: 'Pancerz' },
{ key: 'klyPazuryKolce',          label: 'Kly/Pazury/Kolce' },
{ key: 'gruczolyJadowe',          label: 'Gruczoly jadowe' },
{ key: 'wzmocnioneSciegna',       label: 'Wzmocnione sciegna' },
{ key: 'dodatkowaKomora',         label: 'Dodatkowa komora' },
{ key: 'krewDemona',              label: 'Krew demona' },
{ key: 'mutacjaDna',              label: 'Mutacja DNA' },
{ key: 'oswiecony',               label: 'Oswiecony' },
{ key: 'szostyZmysl',             label: 'Szosty zmysl' },
{ key: 'absorpcja',               label: 'Absorpcja' },
{ key: 'harmonijnyRozwo',         label: 'Harmonijny rozwoj' },
{ key: 'pietnoDemona',            label: 'Pietno demona' },
{ key: 'wzmocnioneMiesnie',        label: 'Wzmocnione miesnie' },

];

talizmanAttributes = [
{ key: 'ambicja',            label: 'Ambicja' },
{ key: 'lewiatan',           label: 'Lewiatan' },
{ key: 'behemot',            label: 'Behemot' },
{ key: 'kamienZla',          label: 'Kamien zla' },
{ key: 'kamienDobra',        label: 'Kamien dobra' },
{ key: 'kamienPrzestrzeni',  label: 'Kamien przestrzeni' },
{ key: 'kamienCzasu',        label: 'Kamien czasu' },
{ key: 'spaonNocy',          label: 'Spaon nocy' },
{ key: 'zycieISmierc',       label: 'Zycie i smierc' },
{ key: 'otchlaniCiszy',      label: 'Otchlani ciszy' },
{ key: 'potegaMocy',         label: 'Potega mocy' },
{ key: 'furiaBestii',        label: 'Furia bestii' },
{ key: 'auraBestii',         label: 'Aura bestii' },
{ key: 'maskaWladzy',        label: 'Maska wladzy' },
{ key: 'maskaStachu',        label: 'Maska strachu' },
{ key: 'cichylowca',         label: 'Cichy lowca' },
{ key: 'piesnKrwi',          label: 'Piesn krwi' },
];

arcaneAttributes = [
{ key: 'maskaAdonisa',        label: 'Maska Adonisa',      type: 'int'     },
{ key: 'maskaKaliguli',       label: 'Maska Kaliguli',     type: 'int'     },
{ key: 'majestat',            label: 'Majestat',           type: 'int'     },
{ key: 'krewZycia',           label: 'Krew Zycia',         type: 'int'     },
{ key: 'kocieSciezki',        label: 'Kocie Sciezki',      type: 'int'     },
{ key: 'zarKrwi',             label: 'Zar krwi',           type: 'boolean' },
{ key: 'ciszaKrwi',           label: 'Cisza Krwi',         type: 'int'     },
{ key: 'wyssanieMocy',        label: 'Wyssanie mocy',      type: 'int'     },
{ key: 'mocKrwi',             label: 'Moc krwi',           type: 'int'     },
{ key: 'dzikiSzal',           label: 'Dziki szal',         type: 'int'     },
{ key: 'skoraBestii',         label: 'Skora Bestii',       type: 'int'     },
{ key: 'cienBestii',          label: 'Cien bestii',        type: 'boolean' },
{ key: 'nocnyLowca',          label: 'Nocny lowca',        type: 'int'     },
{ key: 'tchnienieSmierci',    label: 'Tchnienie Smierci',  type: 'int'     },
{ key: 'groza',               label: 'Groza',              type: 'boolean' },
];

huntBonuses    = ['Juggernaut', 'Ronin', 'Adrenalina', 'SokoleOko', 'Rzenik'];
dailyBonuses   = ['Klątwa Bogów','Noc Długich Noży','Noc Starych Bogów','Noc poszukiwaczy','Dzień poszukiwaczy','Dzień Vlada','Dzień Gwiazd Północy','Świąteczna wizja Kaina','Świąteczna Wizja Kaina (deluxe)','Potrójna wizja Kaina','Pożeracz serc','Potęga hormonów','Dzień neandertalczyka','Pisanki Kaina','May the 4th be with you','Dzień Przemiany','Dzień poszukiwaczy','Świąteczna wizja Kaina (deluxe)','Więzy krwi','Krew z krwi','Wszyscy jesteśmy Francuzami','Pierwszy gol','Pierwszy serwis','szczescie Sprzyja Lepszym','Tylko Dla Orłów','Zwycięzca Jest Tylko Jeden'];
oneTimeBonuses = ['Krew wilka','Jabłko żelaznego drzewa','Płetwa rekina','Eliksir zmysłów','Święcona woda','Łza feniksa','Magiczna pieczęć','Serce nietoperza','Kwiat lotosu','Jad Wielkopchły','Serum oświecenia','Wywar z czarnego kota','Węgiel','Sierść kreta','Saletra','Sok z żuka','Esencja młodości','Paznokieć trolla','Wilcza jagoda','Oko kota','Absynt','Łuski salamandry','Woda źródlana','Kość męczennika','Napój miłosny','Jad skorpiona','Korzeń mandragory','Gwiezdny pył','Fiolka kwasu','Siarka','Czarny diament','Oko topielca','Boska łza','Ząb ghula','Wywar z koralowca','Serce proroka','Pazur bazyliszka','Łuski demona','Skrzydła chrząszcza','Maska gargulca','Sok z modliszki','Oddech smoka','Ząb wiedźmy','Grimoire','Czarna żółć','Palec kowala','Kwiat bzu','Ogień z serca ziemi'];

expandedBonuses: { [key: string]: boolean } = {
silver: false, gold: false, hunt: false, daily: false, kaplica: false, oneTime: false
};

// ─── Issues/Fixes ───────────────────────────────────────────────────────────
issues = [
'opiekun i podkowa razem',
'punkty krwi liczenie',
'policzyc zar',
'minimalne roznice na krawatach i innych gownach',
'jak jest tchnienie to zrob dwie wersje',
'wez pod uwage w dps effective trafienie vs przeciwnik',
'lekki rozjazd inicjatywa i trafienie',
];

showIssuesDropdown = false;

selectedHuntBonuses: string[] = [];
selectedEventBonus: string | null = null;
selectedOneTimeBonus: string | null = null;

constructor(private characterService: CharacterService, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.characterService.getCharacter$().subscribe(char => {
      this.character = char;
      if (char) {
        this.selectedHuntBonuses = [...(char.huntBonuses || [])];
        this.selectedEventBonus = char.eventBonus || null;
        this.selectedOneTimeBonus = char.oneTimeBonus || null;
      }
      if (char?.runeValues) {
        this.selectedRunes = [...char.runeValues];
      }
      if ((char as any)?.umagiValues) {
        this.selectedUmagi = [...(char as any).umagiValues];
      }
      if (char?.equipment?.weaponMode) {
        this.weaponMode = char.equipment.weaponMode;
      }
    });
  }

  // ─── Equipment helpers ───────────────────────────────────────────────────────

  /** Derive slot category, considering current weapon mode */
  private getSlotCategory(slot: string): SlotCategory {
    if (slot === 'weapon1' || slot === 'weapon2') {
      return this.weaponMode === '2h' ? 'weapon2h' : 'weapon1h';
    }
    return SLOT_TO_CATEGORY[slot] ?? 'head';
  }

  /** Base items available for the given slot */
  baseItemsForSlot(slot: string): BaseItemDef[] {
    const cat = this.getSlotCategory(slot);
    return BASE_ITEMS.filter(b => b.category === cat);
  }

  /** Base items available for the 2H weapon slot */
  get baseItems2h(): BaseItemDef[] {
    return BASE_ITEMS.filter(b => b.category === 'weapon2h');
  }

  /** Prefixes available for the selected base item */
  prefixesForDraft(draft: EquipmentItem, slot: string): string[] {
    if (!draft.base) return [];
    const def = BASE_ITEMS.find(b => b.name === draft.base);
    if (!def || !def.hasPrefix) return [];
    return PREFIXES_BY_CATEGORY[def.category] ?? [];
  }

  /** Suffixes available for the selected base item */
  suffixesForDraft(draft: EquipmentItem, slot: string): string[] {
    if (!draft.base) return [];
    const def = BASE_ITEMS.find(b => b.name === draft.base);
    if (!def || !def.hasSuffix) return [];
    return SUFFIXES_BY_CATEGORY[def.category] ?? [];
  }

  /** Does selected base item support a prefix? */
  draftHasPrefix(draft: EquipmentItem): boolean {
    if (!draft.base) return false;
    return !!BASE_ITEMS.find(b => b.name === draft.base)?.hasPrefix;
  }

  /** Does selected base item support a suffix? */
  draftHasSuffix(draft: EquipmentItem): boolean {
    if (!draft.base) return false;
    return !!BASE_ITEMS.find(b => b.name === draft.base)?.hasSuffix;
  }

  /** Clear prefix/suffix when base changes */
  onBaseChange(draft: EquipmentItem) {
    draft.prefix = null;
    draft.suffix = null;
  }

  /** Build display label from an EquipmentItem */
  buildItemLabel(item: EquipmentItem | undefined | null): string {
    if (!item || !item.base) return '';
    const parts: string[] = [];
    if (item.rarity)  parts.push(item.rarity);
    if (item.prefix)  parts.push(item.prefix);
    parts.push(item.base);
    if (item.suffix)  parts.push(item.suffix);
    return parts.join(' ');
  }

  /** Button label for a given slot */
  slotButtonLabel(slot: string): string {
    if (!this.character) return this.defaultSlotLabel(slot);
    const item = (this.character.equipment as any)[slot] as EquipmentItem | undefined;
    if (item && item.base) {

      if(item.prefix == null){
        item.prefix = ''
      }

      if(item.suffix == null){
        item.suffix = ''
      }

      return item.prefix + ' ' + item.base + ' '+ item.suffix;
    }
    return this.defaultSlotLabel(slot);
  }

  defaultSlotLabel(slot: string): string {
    const labels: Record<string, string> = {
      head: 'Głowa', chest: 'Tułów', legs: 'Nogi',
      neck: 'Szyja', finger1: 'Palec 1', finger2: 'Palec 2',
      weapon1: '1H Lewy', weapon2: this.weaponMode === '2h' ? '2H' : '1H Prawy',
    };
    return labels[slot] ?? slot;
  }

  /** Is weapon2 locked (2H mode) */
  get weapon2Locked(): boolean {
    return this.weaponMode === '2h';
  }

  openEquipmentModal(slot: string) {
    if (slot === 'weapon2' && this.weaponMode === '2h') return; // locked
    this.selectedEquipmentSlot = slot;
    const existing = this.character?.equipment
      ? (this.character.equipment as any)[slot] as EquipmentItem | undefined
      : undefined;
    this.draftItem = existing
      ? { ...existing }
      : { rarity: null, prefix: null, base: null, suffix: null };
    this.showEquipmentModal = true;
  }

  /** Toggle weapon mode between dual-1h and 2h */
  toggleWeaponMode() {
    this.weaponMode = this.weaponMode === 'dual1h' ? '2h' : 'dual1h';
    if (!this.character) return;
    // When switching to 2h clear weapon2; weapon1 becomes the 2h slot
    const updated: any = {
      ...this.character.equipment,
      weaponMode: this.weaponMode,
    };
    if (this.weaponMode === '2h') {
      updated.weapon2 = undefined;
    }
    this.characterService.updateCharacter({ ...this.character, equipment: updated });
  }

  saveEquipmentItem() {
    if (!this.character) return;
    const updated = {
      ...this.character.equipment,
      [this.selectedEquipmentSlot]: { ...this.draftItem },
      weaponMode: this.weaponMode,
    };
    this.characterService.updateCharacter({ ...this.character, equipment: updated });
    this.showEquipmentModal = false;
  }

  clearEquipmentSlot(slot: string) {
    if (!this.character) return;
    const updated: any = { ...this.character.equipment };
    updated[slot] = undefined;
    this.characterService.updateCharacter({ ...this.character, equipment: updated });
  }

  // ─── Attribute helpers ───────────────────────────────────────────────────────

  getAttrValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.attributes as any)[key] || 0;
  }

  setAttrValue(key: string, value: number) {
    this.characterService.updateAttributes({ [key]: value } as any);
  }

    getEvoValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.evolutions as any)[key] || 0;
  }

  setEvoValue(key: string, value: number) {
    this.characterService.updateEvolutions({ [key]: value } as any);
  }

  getTalizmanValue(key: string): number {
    if (!this.character) return 0;
    return (this.character.talizmanLevels as any)[key] || 0;
  }

  setTalizmanValue(key: string, value: number) {
    this.characterService.updateTalizmanLevels({ [key]: value } as any);
  }

  getArcaneValue(key: string): any {
    if (!this.character) return 0;
    return (this.character.arcaneLevels as any)[key] || 0;
  }

  setArcaneValue(key: string, value: any) {
    this.characterService.updateArcaneLevels({ [key]: value } as any);
  }

  updateCharacterField(field: string, value: any) {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, [field]: value });
    }
  }

  closeModal() {
    this.showEquipmentModal = false;
    this.showRunesModal     = false;
    this.showUmagiModal     = false;
  }

  importCharacter() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        try {
          const imported = JSON.parse(event.target.result);

          this.ngZone.run(() => {
            // Migrate old bonusValues format to new properties if needed
            if (imported?.bonusValues && !imported?.huntBonuses) {
              imported.huntBonuses = imported.bonusValues.hunt || [];
              imported.eventBonus = imported.bonusValues.daily || null;
              imported.oneTimeBonus = imported.bonusValues.oneTime || null;
              delete imported.bonusValues;
            }

            // Update service which will emit new value
            this.characterService.updateCharacter(imported);

            // Sync component properties from imported character
            if (imported) {
              this.selectedHuntBonuses = imported.huntBonuses || [];
              this.selectedEventBonus = imported.eventBonus || null;
              this.selectedOneTimeBonus = imported.oneTimeBonus || null;
            }
            if (imported?.runeValues) {
              this.selectedRunes = imported.runeValues;
            }
            if (imported?.umagiValues) {
              this.selectedUmagi = imported.umagiValues;
            }
            if (imported?.equipment?.weaponMode) {
              this.weaponMode = imported.equipment.weaponMode;
            }

            // Force change detection immediately
            this.cdr.detectChanges();
          });
        } catch (error) {
          console.error('Error importing character:', error);
        }
      };
      reader.readAsText(file);
    };
    input.click();
  }

  exportCharacter() {
    if (!this.character) return;
    const dataStr  = JSON.stringify(this.character, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url      = URL.createObjectURL(dataBlob);
    const link     = document.createElement('a');
    link.href      = url;
    link.download  = `character-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  toggleBonusExpand(bonusType: string) {
    this.expandedBonuses[bonusType] = !this.expandedBonuses[bonusType];
  }

  toggleBonusSelection(bonusType: string, bonus: string, isSingleSelect = false) {
    if (bonusType === 'hunt') {
      const index = this.selectedHuntBonuses.indexOf(bonus);
      if (index >= 0) this.selectedHuntBonuses.splice(index, 1);
      else this.selectedHuntBonuses.push(bonus);
    } else if (bonusType === 'daily') {
      this.selectedEventBonus = this.selectedEventBonus === bonus ? null : bonus;
    } else if (bonusType === 'oneTime') {
      this.selectedOneTimeBonus = this.selectedOneTimeBonus === bonus ? null : bonus;
    }

    if (this.character) {
      this.characterService.updateCharacter({
        ...this.character,
        huntBonuses: this.selectedHuntBonuses,
        eventBonus: this.selectedEventBonus,
        oneTimeBonus: this.selectedOneTimeBonus
      });
    }
  }

  isBonusSelected(bonusType: string, bonus: string): boolean {
    if (bonusType === 'hunt') {
      return this.selectedHuntBonuses.includes(bonus);
    } else if (bonusType === 'daily') {
      return this.selectedEventBonus === bonus;
    } else if (bonusType === 'oneTime') {
      return this.selectedOneTimeBonus === bonus;
    }
    return false;
  }

  // ─── Runes ──────────────────────────────────────────────────────────────────

  get filteredRuneOptions(): string[] {
    if (!this.runeFilter.trim()) return this.runeOptions;
    const f = this.runeFilter.toLowerCase();
    return this.runeOptions.filter(r => r.toLowerCase().includes(f));
  }

  openRunesModal() {
    this.selectedRunes    = this.character?.runeValues ? [...this.character.runeValues] : [];
    this.runeFilter       = '';
    this.selectedRuneIndex = null;
    this.showRunesModal   = true;
  }

  addRune(rune: string) { this.selectedRunes = [...this.selectedRunes, rune]; }

  removeRuneAt(index: number) {
    this.selectedRunes = this.selectedRunes.filter((_, i) => i !== index);
    if (this.selectedRuneIndex === index) this.selectedRuneIndex = null;
    else if (this.selectedRuneIndex !== null && this.selectedRuneIndex > index) this.selectedRuneIndex--;
  }

  moveRuneUp(index: number) {
    if (index === 0) return;
    const r = [...this.selectedRunes];
    [r[index - 1], r[index]] = [r[index], r[index - 1]];
    this.selectedRunes = r;
    this.selectedRuneIndex = index - 1;
  }

  moveRuneDown(index: number) {
    if (index >= this.selectedRunes.length - 1) return;
    const r = [...this.selectedRunes];
    [r[index], r[index + 1]] = [r[index + 1], r[index]];
    this.selectedRunes = r;
    this.selectedRuneIndex = index + 1;
  }

  saveRunes() {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, runeValues: [...this.selectedRunes] });
    }
    this.showRunesModal = false;
  }

  getRuneCount(rune: string): number { return this.selectedRunes.filter(r => r === rune).length; }

  // ─── Umagi ──────────────────────────────────────────────────────────────────

  get filteredUmagiOptions(): string[] {
    if (!this.umagiFilter.trim()) return this.umagiOptions;
    const f = this.umagiFilter.toLowerCase();
    return this.umagiOptions.filter(u => u.toLowerCase().includes(f));
  }

  openUmagiModal() {
    this.selectedUmagi     = (this.character as any)?.umagiValues ? [...(this.character as any).umagiValues] : [];
    this.umagiFilter       = '';
    this.selectedUmagiIndex = null;
    this.showUmagiModal    = true;
  }

  addUmagi(umagi: string) { this.selectedUmagi = [...this.selectedUmagi, umagi]; }

  removeUmagiAt(index: number) {
    this.selectedUmagi = this.selectedUmagi.filter((_, i) => i !== index);
    if (this.selectedUmagiIndex === index) this.selectedUmagiIndex = null;
    else if (this.selectedUmagiIndex !== null && this.selectedUmagiIndex > index) this.selectedUmagiIndex--;
  }

  moveUmagiUp(index: number) {
    if (index === 0) return;
    const list = [...this.selectedUmagi];
    [list[index - 1], list[index]] = [list[index], list[index - 1]];
    this.selectedUmagi = list;
    this.selectedUmagiIndex = index - 1;
  }

  moveUmagiDown(index: number) {
    if (index >= this.selectedUmagi.length - 1) return;
    const list = [...this.selectedUmagi];
    [list[index], list[index + 1]] = [list[index + 1], list[index]];
    this.selectedUmagi = list;
    this.selectedUmagiIndex = index + 1;
  }

  saveUmagi() {
    if (this.character) {
      this.characterService.updateCharacter({ ...this.character, umagiValues: [...this.selectedUmagi] } as any);
    }
    this.showUmagiModal = false;
  }

  getUmagiCount(umagi: string): number { return this.selectedUmagi.filter(u => u === umagi).length; }
}
