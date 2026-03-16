export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Ochrana osobních údajů
        </h1>
        <div className="space-y-6 text-base leading-8 text-foreground/80">
          <p>
            Při odeslání poptávky nebo kontaktního formuláře zpracováváme osobní údaje v
            rozsahu, který nám sami poskytnete, zejména jméno, telefon, email, adresu
            realizace a informace o zakázce.
          </p>
          <p>
            Údaje používáme výhradně za účelem vyřízení poptávky, přípravy nabídky,
            komunikace k realizaci zakázky a plnění souvisejících zákonných povinností.
          </p>
          <p>
            Osobní údaje neposkytujeme třetím stranám, s výjimkou nezbytných technických
            zpracovatelů (například nástrojů pro odeslání formuláře nebo provoz webu), a to
            pouze v rozsahu nutném pro zajištění služby.
          </p>
          <p>
            Máte právo požadovat přístup ke svým údajům, jejich opravu, výmaz nebo omezení
            zpracování. V případě dotazů nás kontaktujte na emailu{" "}
            <a className="underline underline-offset-4" href="mailto:info@malirivcernem.cz">
              info@malirivcernem.cz
            </a>
            .
          </p>
          <p className="text-sm text-foreground/60">
            Tento text je základní informační přehled. Pro finální právní znění doporučujeme
            doplnění podle konkrétního způsobu fakturace, účetnictví a používaných služeb.
          </p>
        </div>
      </section>
    </main>
  );
}
