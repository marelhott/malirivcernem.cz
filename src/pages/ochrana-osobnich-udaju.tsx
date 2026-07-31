export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="max-w-4xl mx-auto px-6 md:px-10 pt-32 pb-20">
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-8">
          Ochrana osobních údajů
        </h1>
        <div className="space-y-6 text-base leading-8 text-foreground/80">
          <p>
            Správcem osobních údajů získaných prostřednictvím tohoto webu je provozovatel
            značky Malíři v černém. Ve věcech ochrany osobních údajů nás můžete kontaktovat
            na <a className="underline underline-offset-4" href="mailto:info@malirivcernem.cz">info@malirivcernem.cz</a>
            {" "}nebo na telefonu <a className="underline underline-offset-4" href="tel:+420732333550">+420 732 333 550</a>.
          </p>
          <p>
            Při odeslání kontaktního formuláře nebo kalkulace zpracováváme údaje, které nám
            sami poskytnete, zejména jméno, e-mail, telefon, adresu nebo oblast realizace,
            požadovaný termín a informace o zakázce. Technické ochranné prvky mohou krátkodobě
            pracovat také s IP adresou za účelem omezení zneužití.
          </p>
          <p>
            Údaje používáme k vyřízení poptávky, přípravě nabídky a případné realizaci zakázky.
            Zpracování probíhá zejména proto, abychom mohli na vaši žádost učinit kroky před
            uzavřením smlouvy; zabezpečení formulářů vychází z našeho oprávněného zájmu.
          </p>
          <p>
            Údaje uchováváme pouze po dobu potřebnou k vyřízení poptávky a navazující komunikaci.
            Pokud dojde k realizaci, mohou být potřebné údaje dále uchovány po dobu vyžadovanou
            právními předpisy. Technické zpracování zajišťují hosting Vercel a e-mailová služba
            Resend, a to jen v rozsahu nutném pro provoz webu a doručení zpráv.
          </p>
          <p>
            Můžete požadovat přístup ke svým údajům, jejich opravu, výmaz nebo omezení
            zpracování a vznést námitku proti zpracování založenému na oprávněném zájmu.
            Máte také právo podat stížnost u Úřadu pro ochranu osobních údajů.
          </p>
          <p className="text-sm text-foreground/60">Poslední aktualizace: 31. července 2026.</p>
        </div>
      </section>
    </main>
  );
}
