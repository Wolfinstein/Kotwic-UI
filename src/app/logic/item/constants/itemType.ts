/**
 * Specific item type enumeration
 * Represents the exact type of item (e.g., Sword, Helmet, Ring)
 */
export enum ItemType {
  // Legs
  SZORTY = 'Szorty',
  SPODNIE = 'Spodnie',
  SPODNICA = 'Spodnica',
  KILT = 'Kilt',

  // Chest armor
  KURTKA = 'Kurtka',
  KAMIZELKA = 'Kamizelka',
  KOLCZUGA = 'Kolczuga',
  ZBROJA_WARSTWOWA = 'ZbrojaWarstwowa',
  KOSZULKA = 'Koszulka',
  MARYNARKA = 'Marynarka',
  PELNA_ZBROJA = 'PelnaZbroja',
  PELERYNA = 'Peleryna',
  GORSET = 'Gorset',
  SMOKING = 'Smoking',

  // Head armor
  CZAPKA = 'Czapka',
  KASK = 'Kask',
  HELM = 'Helm',
  MASKA = 'Maska',
  OBRECZ = 'Obrecz',
  KOMINIARKA = 'Kominiarka',
  KAPELUSZ = 'Kapelusz',
  KORONA = 'Korona',
  OPASKA = 'Opaska',
  BANDANA = 'Bandana',

  // Rings
  PIERSCIEN = 'Pierscien',
  SYGNET = 'Sygnet',
  BRANSOLETA = 'Bransoleta',

  // Neck/Amulets
  AMULET = 'Amulet',
  LANCUCH = 'Lancuch',
  NASZYJNIK = 'Naszyjnik',
  KRAWAT = 'Krawat',
  APASZKA = 'Apaszka',

  // 1-hand melee
  PALKA = 'Palka',
  NOZ = 'Noz',
  SZTYLET = 'Sztylet',
  RAPIER = 'Rapier',
  MIECZ = 'Miecz',
  TOPOR = 'Topor',
  KASTET = 'Kastet',
  KAMA = 'Kama',
  PIESC_NIEBIOS = 'PiescNiebios',
  WAKIZASHI = 'Wakizashi',

  // 2-hand melee
  MACZUGA = 'Maczuga',
  LOM = 'Lom',
  PIKA = 'Pika',
  TOPOR_DWUREZNY = 'ToporDwureczny',
  MIECZ_DWUREZNY = 'MieczDwureczny',
  KOSA = 'Kosa',
  KORBACZ = 'Korbacz',
  HALABARDA = 'Halabarda',
  KATANA = 'Katana',
  PILA_LANCUCHOWA = 'PilaLancuchowa',

  // 1-hand guns
  GLOCK = 'Glock',
  MAGNUM = 'Magnum',
  DESERT_EAGLE = 'DesertEagle',
  BERETTA = 'Beretta',
  UZI = 'Uzi',
  MP5K = 'Mp5k',
  SKORPION = 'Skorpion',

  // 2-hand guns
  KARABIN_MYSLIWSKI = 'KarabinMysliwski',
  STRZELBA = 'Strzelba',
  AK47 = 'AK47',
  MIOTACZ_PLOMIENI = 'MiotaczPlomieni',
  FN_FAL = 'FnFal',
  POLAUTOMATSNAJPERSKI = 'PolautomatSnajperski',
  KARABIN_SNAJPERSKI = 'KarabinSnajperski',

  // Ranged 1-hand
  KROTKI_LUK = 'KrotkiLuk',
  LUK = 'Luk',
  DLOUGI_LUK = 'DlugiLuk',
  OSZCZEP = 'Oszczep',
  PILUM = 'Pilum',
  NOZ_DO_RZUCANIA = 'NozDoRzucania',
  TOPOREK_DO_RZUCANIA = 'ToporekDoRzucania',

  // Ranged 2-hand
  KUSZA = 'Kusza',
  SHURIKEN = 'Shuriken',
  CIEZKA_KUSZA = 'CiezkaKusza',
  LUK_REFLEKSYJNY = 'LukRefleksyjny'
}
