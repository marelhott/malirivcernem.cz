export type PortfolioProject = {
  id: number;
  slug: string;
  title: string;
  category: string;
  tag: string;
  location: string;
  area: string;
  duration: string;
  price: string;
  date: string;
  desc: string;
  longDesc: string;
  tasks: string[];
  cover: string;
  gallery: string[];
  relatedServiceSlug: string;
  relatedServiceLabel: string;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    id: 1,
    slug: "byt-3kk-vinohrady",
    title: "Byt 3+kk Vinohrady",
    category: "Byty",
    tag: "Rezidenční",
    location: "Praha 2 – Vinohrady",
    area: "92 m²",
    duration: "4 dny",
    price: "38 500 Kč",
    date: "Březen 2026",
    desc: "Kompletní výmalba bytu 3+kk v prvorepublikovém činžovním domě na Vinohradech. Stropy 3,2 m, štuková výzdoba.",
    longDesc:
      "Klient požadoval kompletní obnovu výmalby v celém bytě včetně chodby a koupelny. Štuky na stropech byly nejprve pečlivě očištěny a otmeleny, praskliny v omítkách sanovány. Použili jsme prémiovou barvu Caparol Indeko Plus ve třech teplých odstínech — obývací pokoj v jemném béžovém tónu, ložnice v uklidňující šedozelené a dětský pokoj v hravé pastelové. Celý byt byl zakryt fóliemi včetně dřevěných podlah, které jsme po dokončení kompletně vyčistili.",
    tasks: [
      "Zakrytí nábytku a podlah",
      "Sanace prasklin v omítkách",
      "Oprava štukové výzdoby na stropech",
      "Penetrace všech stěn a stropů",
      "Malování 2× vrstva Caparol Indeko Plus",
      "Finální úklid celého bytu",
    ],
    cover:
      "https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQzODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1545165375-583920dc2f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwZnJlc2hseSUyMHBhaW50ZWQlMjB3YWxsc3xlbnwxfHx8fDE3NzEzNDM4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1751879886435-e6436fd5bda4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaGx5JTIwcGFpbnRlZCUyMGNoaWxkcmVuJTIwcm9vbSUyMGNvbG9yZnVsfGVufDF8fHx8MTc3MTM0Mzg4OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-bytu",
    relatedServiceLabel: "Malování bytů a pokojů",
  },
  {
    id: 2,
    slug: "rodinny-dum-cernosice",
    title: "Rodinný dům Černošice",
    category: "Domy",
    tag: "Rezidenční",
    location: "Černošice u Prahy",
    area: "240 m²",
    duration: "8 dní",
    price: "72 000 Kč",
    date: "Únor 2026",
    desc: "Kompletní výmalba dvoupatrového rodinného domu po rekonstrukci. 7 místností, schodiště, chodby.",
    longDesc:
      "Po celkové rekonstrukci rodinného domu jsme provedli kompletní výmalbu všech prostor včetně schodiště a technické místnosti. Nové sádrokartonové příčky vyžadovaly speciální přípravu — bandážování spojů, dvojité tmelení a jemné broušení. V obývacím pokoji s krbem jsme aplikovali tepelně odolný nátěr v okolí komína. Klient si přál minimalistickou paletu v odstínech bílé a světle šedé s jednou akcentní stěnou v obývacím pokoji v odstínu Deep Navy.",
    tasks: [
      "Příprava nových SDK povrchů (bandáž, tmel, brus)",
      "Penetrace a základní nátěr všech místností",
      "Malování stěn a stropů — 14 místností",
      "Tepelně odolný nátěr okolí krbu",
      "Akcentní stěna v obývacím pokoji",
      "Nátěry dřevěných rámů oken a dveří",
      "Závěrečný úklid a předání",
    ],
    cover:
      "https://images.unsplash.com/photo-1654939655317-c38553fb03f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwcGFpbnRpbmclMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3NXww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1605538794065-dd2671432ca7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBob3VzZSUyMGV4dGVyaW9yJTIwUHJhZ3VlJTIwYXJjaGl0ZWN0dXJlfGVufDF8fHx8MTc3MTM0Mzg4Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1761330439671-a7f20c285c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tJTIwd2hpdGUlMjB3YWxscyUyMHJlbm92YXRpb258ZW58MXx8fHwxNzcxMzQzODc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-bytu",
    relatedServiceLabel: "Malování bytů a domů",
  },
  {
    id: 3,
    slug: "kancelare-it-firmy-karlin",
    title: "Kanceláře IT firmy Karlín",
    category: "Kanceláře",
    tag: "Komerční",
    location: "Praha 8 – Karlín",
    area: "420 m²",
    duration: "5 dní (víkend + noční směny)",
    price: "89 000 Kč",
    date: "Leden 2026",
    desc: "Open-space kanceláře technologické firmy. Realizace přes víkend s minimálním narušením provozu.",
    longDesc:
      "Technologická firma v karlínském business parku potřebovala kompletní přemalování open-space kanceláře, 4 meetingových místností a vstupní recepce. Klíčovým požadavkem bylo dokončení přes víkend, aby v pondělí mohli zaměstnanci normálně pracovat. Nasadili jsme tým 6 malířů ve dvou směnách (pátek večer – neděle odpoledne). Barvy byly zvoleny podle korporátní identity klienta — neutrální šedá s akcentními stěnami v brandové modré. Meetingové místnosti dostaly magnetický nátěr pro psaní fixem.",
    tasks: [
      "Zakrytí veškeré elektroniky a nábytku",
      "Oprava poškozených míst od kotvení nábytku",
      "Malování open-space — 280 m² stěn",
      "4× meetingová místnost s magnetickým nátěrem",
      "Recepce s korporátní modrou akcentní stěnou",
      "Kompletní úklid a odvětrání do pondělí",
    ],
    cover:
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzEyOTA0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1761818645915-260598d569a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcGVuJTIwcGxhbiUyMG9mZmljZSUyMGNvd29ya2luZyUyMHNwYWNlJTIwbW9kZXJufGVufDF8fHx8MTc3MTM0Mzg4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-kancelari",
    relatedServiceLabel: "Malování kanceláří",
  },
  {
    id: 4,
    slug: "svj-biskupcova-18",
    title: "SVJ Biskupcova 18",
    category: "Chodby a schodiště",
    tag: "SVJ",
    location: "Praha 3 – Žižkov",
    area: "680 m²",
    duration: "12 dní (etapově)",
    price: "124 000 Kč",
    date: "Prosinec 2025",
    desc: "Malování společných prostor bytového domu — 6 pater schodiště, chodby, sklepy a vstupní vestibul.",
    longDesc:
      "Bytový dům z 30. let s 24 bytovými jednotkami potřeboval kompletní obnovu společných prostor. Práce probíhaly etapově — vždy dvě patra najednou, aby obyvatelé mohli normálně používat schodiště. Vstupní vestibul s původní mozaikovou dlažbou dostal speciální péči — štuky byly restaurovány a natřeny v původním odstínu. Schodišťové stěny byly opatřeny omyvatelným nátěrem Primalex Polar do výšky 1,5 m pro snadnou údržbu. Sklepní prostory byly ošetřeny protiplísňovým nátěrem.",
    tasks: [
      "Očištění a oprava omítek na schodišti",
      "Restaurování štukové výzdoby ve vestibulu",
      "Protiplísňový nátěr sklepních prostor",
      "Omyvatelný nátěr schodiště do výšky 1,5 m",
      "Malování stropů na schodišti — 6 pater",
      "Nátěr zábradlí a dveřních rámů",
      "Etapová realizace bez omezení provozu",
    ],
    cover:
      "https://images.unsplash.com/photo-1768321910296-004afb7228cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHN0YWlyY2FzZSUyMGhhbGx3YXklMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758448721149-aa0ce8e1b2c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNpZGVudGlhbCUyMGJ1aWxkaW5nJTIwZW50cmFuY2UlMjBsb2JieSUyMG1vZGVybnxlbnwxfHx8fDE3NzEzNDM4ODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1768321910296-004afb7228cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMHN0YWlyY2FzZSUyMGhhbGx3YXklMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-svj",
    relatedServiceLabel: "Malování společných prostor domu a SVJ",
  },
  {
    id: 5,
    slug: "microcement-loft-holesovice",
    title: "Microcement loft Holešovice",
    category: "Stěrky",
    tag: "Speciální",
    location: "Praha 7 – Holešovice",
    area: "65 m² stěn + 40 m² podlahy",
    duration: "10 dní",
    price: "185 000 Kč",
    date: "Listopad 2025",
    desc: "Microcementová stěrka na stěnách a podlaze v loftovém bytě. Industriální betonový look ve 4 vrstvách.",
    longDesc:
      "Mladý pár v holešovickém loftu chtěl autentický industriální vzhled bez kompromisů na komfortu. Aplikovali jsme microcement Topciment Sttandard ve 4 vrstvách na stěny obývacího pokoje a koupelny, plus microcementovou podlahu v celém open-space prostoru. Podlahová stěrka byla opatřena polyuretanovým lakem ve 2 vrstvách pro maximální odolnost. V koupelně jsme použili vodotěsný systém s hydroizolační membránou. Výsledný efekt — hladký betonový monolitický povrch v teplém šedém odstínu.",
    tasks: [
      "Příprava podkladu — broušení, vyrovnání",
      "Hydroizolační membrána v koupelně",
      "Microcement Topciment — 4 vrstvy stěny",
      "Microcementová podlaha — 3 vrstvy + lak",
      "Polyuretanový ochranný lak 2× vrstva",
      "Finální leštění a impregnace",
    ],
    cover:
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "dekorativni-sterky",
    relatedServiceLabel: "Dekorativní stěrky a microcement",
  },
  {
    id: 6,
    slug: "hotel-wellness-na-slupi",
    title: "Hotel & Wellness Na Slupi",
    category: "Hotel",
    tag: "Hospitality",
    location: "Praha 2 – Nové Město",
    area: "1 200 m²",
    duration: "18 dní",
    price: "310 000 Kč",
    date: "Říjen 2025",
    desc: "Kompletní renovace výmalby boutique hotelu — 22 pokojů, lobby, restaurace a wellness zóna.",
    longDesc:
      "Boutique hotel Na Slupi procházel celkovou renovací interiéru. Naším úkolem bylo kompletní přemalování 22 hotelových pokojů, vstupní lobby s recepcí, hotelové restaurace a wellness zóny. Každý pokoj dostal individuální barevnou paletu v rámci tří kolekcí (Earth, Water, Forest). Lobby bylo natřeno v teplém pískovém odstínu s měděnými akcentními pruhy. Ve wellness zóně jsme aplikovali speciální voděodolný nátěr odolný vlhkosti a páře. Práce probíhaly po patrech, aby hotel mohl částečně fungovat.",
    tasks: [
      "22× hotelový pokoj — individuální barevné palety",
      "Lobby a recepce — písková barva + měděné akcentní pruhy",
      "Restaurace — tmavě zelená s dřevěnými obklady",
      "Wellness zóna — voděodolný nátěr",
      "Chodby a schodiště — omyvatelný nátěr",
      "Protipožární nátěry ocelových konstrukcí",
      "Realizace po patrech bez uzavření hotelu",
    ],
    cover:
      "https://images.unsplash.com/photo-1759264244746-140bbbc54e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MTM0Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758193783649-13371d7fb8dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGxvYmJ5JTIwcmVjZXB0aW9uJTIwbHV4dXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1759264244746-140bbbc54e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwcm9vbSUyMGludGVyaW9yJTIwZGVzaWdufGVufDF8fHx8MTc3MTM0Mzg3N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "komercni-objekty",
    relatedServiceLabel: "Malování komerčních objektů",
  },
  {
    id: 7,
    slug: "kavarna-misto-letna",
    title: "Kavárna Místo, Letná",
    category: "Kavárna",
    tag: "Hospitality",
    location: "Praha 7 – Letná",
    area: "85 m²",
    duration: "3 dny",
    price: "42 000 Kč",
    date: "Září 2025",
    desc: "Kompletní přemalování kavárny s důrazem na barevný koncept a odolnost nátěrů v provozu.",
    longDesc:
      "Majitelé oblíbené letenské kavárny chtěli osvěžit interiér novým barevným konceptem, který podtrhne útulnou atmosféru. Hlavní stěna za barem dostala hluboký terrakotový odstín, boční stěny zůstaly v teplé krémové. Strop jsme natřeli v kontrastní tmavé antracitové, což opticky snížilo prostor a dodalo intimní charakter. Všechny povrchy byly opatřeny omyvatelným nátěrem kategorie 1 (dle ČSN EN 13300) pro snadnou údržbu v gastronomickém provozu. Práce proběhly od neděle večer do středy rána.",
    tasks: [
      "Barový pult a zázemí — zakrytí a ochrana",
      "Akcentní stěna za barem — terrakotový odstín",
      "Boční stěny — teplá krémová 2× vrstva",
      "Strop — antracitový nátěr pro intimní atmosféru",
      "Omyvatelné nátěry kategorie 1 na všech plochách",
      "Realizace mimo provozní dobu (ne–st)",
    ],
    cover:
      "https://images.unsplash.com/photo-1765894711185-63800b16dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBjb3p5fGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1767393909805-c61c5502a4bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwY291bnRlciUyMGJhciUyMGludGVyaW9yJTIwd2FybXxlbnwxfHx8fDE3NzEzNDM4ODF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1765894711185-63800b16dbba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjYWZlJTIwaW50ZXJpb3IlMjBkZXNpZ24lMjBjb3p5fGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "komercni-objekty",
    relatedServiceLabel: "Malování komerčních objektů",
  },
  {
    id: 8,
    slug: "penthouse-smichov-city",
    title: "Penthouse Smíchov City",
    category: "Byty",
    tag: "Rezidenční",
    location: "Praha 5 – Smíchov",
    area: "180 m²",
    duration: "6 dní",
    price: "95 000 Kč",
    date: "Srpen 2025",
    desc: "Luxusní penthouse s výhledem na Prahu. Prémiové barvy, akcentní stěny a dekorativní prvky.",
    longDesc:
      "Majitel nového penthouse v projektu Smíchov City požadoval prémiovou výmalbu odpovídající standardu nemovitosti. V hlavním obytném prostoru s panoramatickými okny jsme použili Farrow & Ball Ammonite — jemný teplý tón, který krásně pracuje s přirozeným světlem. Ložnice dostala uklidňující Farrow & Ball Hague Blue jako akcentní stěnu za postelí. Vstupní hala s vysokým stropem (4,5 m) vyžadovala práci z lešení. Koupelny byly opatřeny speciálním nátěrem proti vlhkosti.",
    tasks: [
      "Práce z lešení — vstupní hala 4,5 m strop",
      "Prémiové barvy Farrow & Ball — 5 odstínů",
      "Akcentní stěna Hague Blue v ložnici",
      "Nátěr stropů v celém bytě",
      "Koupelny — speciální vlhkostní nátěr",
      "Zakrytí panoramatických oken a podlahového vytápění",
    ],
    cover:
      "https://images.unsplash.com/photo-1758448756350-3d0eec02ba37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2UlMjBjaXR5JTIwdmlldyUyMGxpdmluZyUyMHJvb218ZW58MXx8fHwxNzcxMzQzODg4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1545165375-583920dc2f23?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwZnJlc2hseSUyMHBhaW50ZWQlMjB3YWxsc3xlbnwxfHx8fDE3NzEzNDM4Nzh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1758448018619-4cbe2250b9ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBiYXRocm9vbSUyMGludGVyaW9yJTIwcmVub3ZhdGlvbiUyMHRpbGVzfGVufDF8fHx8MTc3MTM0Mzg3OXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1634672050277-16639332c727?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBraXRjaGVuJTIwaW50ZXJpb3IlMjB3aGl0ZSUyMGNsZWFufGVufDF8fHx8MTc3MTM0Mzg3OHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-bytu",
    relatedServiceLabel: "Malování bytů a domů",
  },
  {
    id: 9,
    slug: "stomatologicka-klinika-dentpro",
    title: "Stomatologická klinika DentPro",
    category: "Kanceláře",
    tag: "Komerční",
    location: "Praha 4 – Nusle",
    area: "160 m²",
    duration: "3 dny (víkend)",
    price: "52 000 Kč",
    date: "Červenec 2025",
    desc: "Malování zubní kliniky s 5 ordinacemi. Antibakteriální nátěry, realizace přes víkend.",
    longDesc:
      "Stomatologická klinika s pěti ordinacemi, čekárnou a zázemím vyžadovala speciální přístup — antibakteriální nátěry certifikované pro zdravotnická zařízení, absolutní čistota během realizace a dokončení přes víkend, aby v pondělí mohli přijímat pacienty. Použili jsme Caparol Sylitol Bio Innenfarbe s antibakteriální certifikací. Čekárna dostala uklidňující pastelové odstíny, ordinace čistou bílou pro optimální barevné vnímání při práci se zuby.",
    tasks: [
      "Zakrytí a ochrana zdravotnického vybavení",
      "Antibakteriální nátěr Caparol Sylitol Bio",
      "5× ordinace — čistá bílá pro barevnou věrnost",
      "Čekárna — pastelové uklidňující tóny",
      "Zázemí a sociální zařízení",
      "Kompletní desinfekce a úklid do pondělí",
    ],
    cover:
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1771147445405-153493dca398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZpY2UlMjBjb3JyaWRvciUyMGhhbGx3YXklMjBtb2Rlcm4lMjBsaWdodGluZ3xlbnwxfHx8fDE3NzEzNDM4Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1574911460152-cfa027a6ea8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZW50YWwlMjBjbGluaWMlMjBvZmZpY2UlMjBjbGVhbiUyMHdoaXRlJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzcxMzQzODg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1703355685639-d558d1b0f63e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjBpbnRlcmlvciUyMGRlc2lnbiUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NzEyOTA0MzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "malovani-kancelari",
    relatedServiceLabel: "Malování kanceláří a ordinací",
  },
  {
    id: 10,
    slug: "benatsky-stuk-vila-troja",
    title: "Benátský štuk vila Troja",
    category: "Stěrky",
    tag: "Speciální",
    location: "Praha – Troja",
    area: "38 m² stěn",
    duration: "7 dní",
    price: "145 000 Kč",
    date: "Červen 2025",
    desc: "Ruční aplikace benátského štuku Stucco Veneziano v reprezentativní hale rodinné vily.",
    longDesc:
      "Majitel vily v Troji si přál v reprezentativní vstupní hale s 5 m stropem autentický benátský štuk v teplém zlatavém odstínu. Aplikovali jsme tradiční Stucco Veneziano ve 5 vrstvách s postupným leštěním každé vrstvy ocelovým hladítkem. Finální povrch má charakteristický hloubkový lesk a mramorový efekt. Na závěr jsme nanesli přírodní včelí vosk, který chrání povrch a dodává mu hedvábný dotek. Práce vyžadovala absolutní preciznost — každá vrstva musela schnout 12 hodin.",
    tasks: [
      "Příprava podkladu — vyrovnání a penetrace",
      "Stucco Veneziano — 5 vrstev ruční aplikace",
      "Leštění každé vrstvy ocelovým hladítkem",
      "Barevná gradace — 3 tóny zlatavé",
      "Finální vrstva přírodního včelího vosku",
      "Práce z lešení — stropy 5 m",
    ],
    cover:
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    gallery: [
      "https://images.unsplash.com/photo-1758801305613-5e26c5e5aa0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaWNyb2NlbWVudCUyMGNvbmNyZXRlJTIwd2FsbCUyMG1vZGVybiUyMGludGVyaW9yfGVufDF8fHx8MTc3MTM0Mzg4MHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1654939655317-c38553fb03f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3VzZSUyMGludGVyaW9yJTIwcGFpbnRpbmclMjByZW5vdmF0aW9ufGVufDF8fHx8MTc3MTM0Mzg3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1748636023571-7d3f1b9a8edf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWNvcmF0aXZlJTIwcGxhc3RlciUyMHZlbmV0aWFuJTIwc3R1Y2NvJTIwd2FsbCUyMHRleHR1cmV8ZW58MXx8fHwxNzcxMzQzODc3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    relatedServiceSlug: "dekorativni-sterky",
    relatedServiceLabel: "Dekorativní stěrky a benátský štuk",
  },
];

export const PORTFOLIO_PROJECT_SLUGS = portfolioProjects.map((project) => project.slug);

export function getPortfolioProjectBySlug(slug: string) {
  return portfolioProjects.find((project) => project.slug === slug) ?? null;
}
