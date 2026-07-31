export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Obchodní podmínky
        </h1>
        <div className="space-y-6 text-base leading-8 text-foreground/80">
          <p>
            Tento web provozuje značka Malíři v černém. Kontaktovat nás můžete na
            {" "}<a className="underline underline-offset-4" href="mailto:info@malirivcernem.cz">info@malirivcernem.cz</a>
            {" "}nebo na telefonu <a className="underline underline-offset-4" href="tel:+420732333550">+420 732 333 550</a>.
          </p>
          <p>
            Odeslání kontaktního formuláře nebo kalkulace představuje nezávaznou poptávku a
            samo o sobě neuzavírá smlouvu ani nezakládá povinnost službu objednat.
          </p>
          <p>
            Konkrétní rozsah prací, termín realizace, cena a platební podmínky jsou vždy
            potvrzeny individuálně na základě domluvy, prohlídky nebo odsouhlasené nabídky.
          </p>
          <p>
            Výsledek online kalkulačky je orientační. Skutečná cena se může lišit podle stavu
            a členitosti povrchů, výšky stropů, rozsahu přípravných prací, zvolených materiálů,
            dostupnosti prostoru a dalších požadavků. Závazná je až individuálně potvrzená nabídka.
          </p>
          <p>
            Informace, ceny a termíny uvedené na webu průběžně aktualizujeme, mohou se však měnit.
            Konkrétní výsledek vždy závisí na podkladu, materiálu a dohodnutém zadání.
          </p>
          <p className="text-sm text-foreground/60">Poslední aktualizace: 31. července 2026.</p>
        </div>
      </section>
    </main>
  );
}
