export type ServiceSeoContent = {
  heading: string;
  intro: string;
  body: string;
  faq: Array<{ q: string; a: string }>;
};

export const serviceSeoContent: Record<string, ServiceSeoContent> = {
  "malovani-bytu": {
    heading: "Malování bytů a pokojů v Praze bez zbytečných starostí",
    intro:
      "Malování bytů v Praze zajišťujeme od menších garsonek po větší rodinné byty a domy. Klienti nejčastěji řeší rychlý termín, čistý průběh prací a jistotu, že cena bude předem srozumitelná.",
    body:
      "Součástí zakázky může být zakrytí nábytku, oprava drobných prasklin, příprava podkladu i finální úklid. Pokud hledáte malíře pokojů v Praze, začněte v naší kalkulačce a následně vše společně upřesníme podle stavu zdí a rozsahu prací.",
    faq: [
      {
        q: "Jak dlouho trvá malování bytu?",
        a: "Většinu běžných bytů zvládneme vymalovat během jednoho až dvou dnů podle rozsahu oprav a počtu místností.",
      },
      {
        q: "Zahrnujete i zakrytí a úklid?",
        a: "Ano, zakrytí a úklid umíme zajistit jako součást zakázky podle toho, co si vyberete při poptávce.",
      },
    ],
  },
  "malovani-pred-prodejem": {
    heading: "Malování před prodejem nebo pronájmem pro rychlejší prezentaci nemovitosti",
    intro:
      "Před prodejem nebo pronájmem hraje velkou roli první dojem. Neutrální a čistá výmalba pomáhá prostor opticky zvětšit, sjednotit a připravit na focení i prohlídky.",
    body:
      "V Praze tuto službu nejčastěji realizujeme u bytů po nájemnících, před homestagingem nebo před uvedením nemovitosti na trh. Opravíme drobné vady, sladíme odstíny a připravíme prostor tak, aby působil svěže a udržovaně.",
    faq: [
      {
        q: "Má smysl malovat před prodejem bytu?",
        a: "Ano, ve většině případů pomůže čistá neutrální výmalba zvýšit atraktivitu nemovitosti na fotkách i při prohlídkách.",
      },
      {
        q: "Jak rychle zvládnete realizaci?",
        a: "Termín umíme často přizpůsobit tak, aby na malování navazoval fotograf, homestaging nebo předání bytu.",
      },
    ],
  },
  "malovani-kancelari": {
    heading: "Malování kanceláří v Praze s minimálním omezením provozu",
    intro:
      "Malování kanceláří řešíme tak, aby provoz firmy běžel co nejplynuleji. Často pracujeme mimo standardní pracovní dobu, o víkendech nebo po etapách podle dohody.",
    body:
      "Zajišťujeme malování open-space kanceláří, zasedacích místností, recepcí i menších komerčních provozů. Důraz klademe na čistou realizaci, ochranu techniky a dodržení termínu, protože právě to je u firemních zakázek nejdůležitější.",
    faq: [
      {
        q: "Malujete kanceláře i o víkendu?",
        a: "Ano, podle rozsahu zakázky umíme malování kanceláří naplánovat i na víkend nebo na večerní hodiny.",
      },
      {
        q: "Umíte sladit barvy s firemní identitou?",
        a: "Ano, u kanceláří a komerčních prostor běžně pracujeme s korporátními barvami a akcentními stěnami.",
      },
    ],
  },
  "malovani-svj": {
    heading: "Malování společných prostor domu a SVJ v Praze",
    intro:
      "Společné prostory domu jsou první věc, kterou vidí obyvatelé i návštěvy. U SVJ proto řešíme nejen samotnou výmalbu, ale i etapování, komunikaci a co nejmenší omezení provozu.",
    body:
      "Malujeme chodby, schodiště, vestibuly, sklepy i další společné části domu. Zakázky pro SVJ v Praze plánujeme po úsecích, aby byl pohyb v domě bezpečný a práce proběhla bez zbytečných komplikací.",
    faq: [
      {
        q: "Děláte i větší domy a více vchodů?",
        a: "Ano, rozsáhlejší zakázky řešíme etapově po patrech nebo vchodech podle provozu a domluvy s výborem SVJ.",
      },
      {
        q: "Připravíte nabídku pro výbor SVJ?",
        a: "Ano, připravíme přehledný rozpočet i návrh postupu, aby měl výbor podklady pro rozhodnutí.",
      },
    ],
  },
  "dekorativni-sterky": {
    heading: "Dekorativní stěrky, microcement a designové povrchy v Praze",
    intro:
      "Dekorativní stěrky jsou vhodné pro klienty, kteří chtějí výraznější a odolnější povrch než klasickou výmalbu. V Praze nejčastěji realizujeme microcement, betonový efekt a benátský štuk.",
    body:
      "Pomůžeme s výběrem materiálu, připravíme vzorky a navrhneme povrch podle typu prostoru. Dekorativní stěrky využíváme v obývacích pokojích, chodbách, koupelnách i reprezentativních komerčních interiérech.",
    faq: [
      {
        q: "Je microcement vhodný i do koupelny?",
        a: "Ano, při správně zvoleném systému je microcement vhodný i do koupelen a dalších vlhčích prostor.",
      },
      {
        q: "Děláte i vzorkování odstínů?",
        a: "Ano, před realizací připravujeme vzorky a doporučení, aby výsledný efekt odpovídal interiéru.",
      },
    ],
  },
  "komercni-objekty": {
    heading: "Malování komerčních objektů, restaurací a penzionů v Praze",
    intro:
      "U komerčních objektů řešíme hlavně termín, odolnost nátěrů a koordinaci s provozem. Proto plánujeme práce tak, aby co nejméně zasáhly do běžného fungování prostoru.",
    body:
      "Zajišťujeme malování restaurací, penzionů, hotelových pokojů i dalších provozoven v Praze. Výsledkem je čistý interiér připravený pro hosty, zákazníky i zaměstnance bez zbytečného výpadku provozu.",
    faq: [
      {
        q: "Můžete malovat mimo otevírací dobu?",
        a: "Ano, u komerčních objektů běžně plánujeme práce na večery, víkendy nebo méně vytížené dny.",
      },
      {
        q: "Jaké nátěry doporučujete do provozu?",
        a: "Podle typu prostoru doporučíme odolné a omyvatelné nátěry vhodné pro vyšší zátěž.",
      },
    ],
  },
};
