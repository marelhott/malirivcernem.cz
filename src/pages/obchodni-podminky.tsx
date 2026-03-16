export default function TermsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Obchodní podmínky
        </h1>
        <div className="space-y-6 text-base leading-8 text-foreground/80">
          <p>
            Tento web slouží k odeslání nezávazné poptávky malířských prací. Odeslání
            formuláře samo o sobě nepředstavuje uzavření smlouvy.
          </p>
          <p>
            Konkrétní rozsah prací, termín realizace, cena a platební podmínky jsou vždy
            potvrzeny individuálně na základě domluvy, prohlídky nebo odsouhlasené nabídky.
          </p>
          <p>
            Orientační výpočet ceny na webu má informativní charakter a může se lišit podle
            skutečného stavu podkladu, rozsahu přípravných prací, použitých materiálů a
            dalších požadavků zákazníka.
          </p>
          <p>
            Pro závazné podmínky konkrétní zakázky platí individuálně potvrzená nabídka a
            následná smluvní nebo objednávková dokumentace.
          </p>
          <p className="text-sm text-foreground/60">
            Doporučení: před veřejným nasazením doplňte finální právní verzi obchodních
            podmínek podle skutečného procesu objednávek a fakturace.
          </p>
        </div>
      </section>
    </main>
  );
}
