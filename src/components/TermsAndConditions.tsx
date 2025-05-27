import React, { useState, forwardRef, ReactNode } from 'react';

interface TermsAndConditionsProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: boolean;
  children?: ReactNode; // Allow custom label content
}

const TermsAndConditions = forwardRef<
  HTMLInputElement,
  TermsAndConditionsProps
>(({ checked, onChange, error, children }, ref) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className='flex flex-col items-start gap-2'>
      <label className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          className={`accent-blue-600 ${error ? 'ring-2 ring-red-500' : ''}`}
          ref={ref}
        />
        {children ? (
          children
        ) : (
          <span>
            Jag godkänner{' '}
            <button
              type='button'
              className='underline hover:text-blue-800 focus:outline-none'
              onClick={() => setModalOpen(true)}
              aria-haspopup='dialog'
              aria-expanded={modalOpen}
            >
              villkoren*
            </button>
          </span>
        )}
      </label>

      {modalOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
          role='dialog'
          aria-modal='true'
          tabIndex={-1}
          onClick={() => setModalOpen(false)}
        >
          <div
            className='bg-white dark:text-black rounded-lg shadow-lg max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className='absolute top-2 right-2 text-2xl text-gray-500 hover:text-black'
              onClick={() => setModalOpen(false)}
              aria-label='Stäng'
            >
              &times;
            </button>
            <h2 className='text-xl font-bold mb-4'>
              Villkor &amp; Bestämmelser
            </h2>
            <div className='text-sm space-y-4'>
              <p>
                <strong>ALMA Grupp AB</strong>, Org. nr 5593013872
                tillhandahåller hushållsnära tjänster såsom exempelvis städning,
                fönsterputs, renovering.
              </p>
              <p>
                Dessa allmänna villkor gäller mellan ALMA Grupp AB och en fysisk
                person som beställer en eller flera av Tjänsterna från ALMA
                Grupp AB. Sådan beställning kan ske genom undertecknandet av ett
                uppdragsavtal, eller genom beställning av Tjänsterna via ALMA
                Grupp hemsida, per e-post, SMS eller per telefon.
                Beställningen/uppdragsavtalet, tillsammans med dessa allmänna
                villkor och eventuella andra bilagor, utgör det avtal mellan
                ALMA Grupp AB och Kunden som reglerar villkoren för ALMA Grupp
                AB tillhandahållande av Tjänsterna till Kunden ("Avtalet"). För
                det fall det skulle förekomma motstridigheter mellan dessa
                allmänna villkor och beställningen/uppdragsavtalet (inklusive
                eventuella bilagor) ska beställningen/uppdragsavtalet (inklusive
                eventuella bilagor) äga företräde framför dessa allmänna
                villkor.
              </p>
              <ol className='list-decimal pl-5 space-y-2'>
                <li>
                  <strong>ALMA Grupp tjänster</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      1A. Kunden beställer tjänsterna enligt gällande prislista,
                      eller som ett abonnemang med fast månadsavgift, enligt vad
                      som framgår av avtalet.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>ALMA Grupp AB ÅTAGANDEN</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      2A. ALMA Grupp AB ska utföra tjänsterna i enlighet med
                      Avtalet. Tjänsterna ska utföras med omsorg och på ett i
                      övrigt fackmannamässigt sätt. ALMAS Grupp personal ska
                      inneha erforderlig utbildning för att utföra tjänsterna
                      och ALMA Grupp AB innehar de tillstånd som krävs för att
                      utföra tjänsterna på basis av kund inlämnad information.
                    </li>
                    <li>
                      2B. Om det särskilt avtalats att viss angiven personal ska
                      utföra tjänsterna kommer ALMA Grupp AB göra sitt bästa för
                      att åstadkomma detta.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>KUNDENS ÅTAGANDEN</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      3A. Kunden ska tillse att ALMA Grupp AB får tillträde till
                      de utrymmen, samt tillgång den utrustning och det material
                      som krävs för att ALMA Grupp AB ska kunna utföra
                      Tjänsterna i enlighet med Avtalet.
                    </li>
                    <li>
                      3B. Kunden ska löpande informera och samråda med ALMA
                      Grupp AB om förhållanden i hemmet som ALMA Grupp AB kan
                      antas behöva få kännedom om för att kunna utföra
                      tjänsterna. Detta innefattar korrekt information om
                      uppdragets omfattning. Kunden ska särskilt informera om
                      renoveringar samt förekomsten av värdefulla och/eller
                      ömtåliga föremål och material samt hur sådana föremål och
                      material ska hanteras.
                    </li>
                    <li>
                      3C. ALMA Grupp AB tar ansvar för nycklar som skriftligen
                      kvitterats ut från Kunden. Om Kunden och ALMA Grupp AB
                      kommer överens om att hantera nyckeln på annat sätt i
                      samband med uppdraget sker det på Kundens egen risk.
                      Kunden är skyldig att i samband med Avtalets upphörande
                      hämta upp och kvittera ut nycklar som lämnats till ALMA
                      Grupp AB på ALMAS GRUPP kontor, om inte annat skriftligen
                      avtalats. Om Kunden inte hämtat ut sina nycklar inom en
                      (1) månad från det att ALMA Grupp AB meddelat Kunden om
                      att upphämtning ska ske, kommer ALMA Grupp AB att se till
                      att nycklarna förstörs. ALMA Grupp AB kan på Kundens
                      skriftliga begäran, skicka tillbaka nycklar till Kunden
                      med rekommenderat brev eller på annat sätt. Sådant
                      återlämnande sker dock helt på Kundens risk och ALMA Grupp
                      AB bär inget ansvar i samband med detta.
                    </li>
                    <li>
                      3D. Kunden ska tillse att ALMAS Grupp personal vid
                      utförande av tjänsterna erbjuds en god och säker
                      arbetsmiljö i enlighet med gällande lagar och
                      förordningar.
                    </li>
                    <li>
                      3E. Om Kund inte fullföljer sin del eller delar av
                      åtagandet kan ALMA Grupp AB komma att debitera Kund enligt
                      rådande prislista.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>ALMAS Grupp AB RÄTT ATT NEKA TJÄNSTER</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      4A. ALMA Grupp AB har rätt att ensidigt vägra att utföra
                      tjänsterna om särskilda skäl föreligger. Med särskilda
                      skäl avses exempelvis att Kunden eller medlemmar i Kundens
                      hushåll inte uppträder på ett respektfullt sätt mot ALMAS
                      Grupp personal, har lämnat oriktig information i strid med
                      punkt 3B, att utrustning eller material som Kunden
                      tillhandahåller inte är lämpliga för ändamålet, att Kunden
                      inte kan garantera en god och säker arbetsmiljö för ALMAS
                      Grupp personal eller att det föreligger omständigheter som
                      är av sådan art att ALMA Grupp AB bedömer att det saknas
                      rimliga förutsättningar att utföra tjänsterna i enlighet
                      med Avtalet.
                    </li>
                    <li>
                      4B. Vid de fall ALMA Grupp AB åberopar rätten att neka
                      tjänsteutövande har ALMA Grupp AB rätt att debitera kund
                      enligt gällande prislista.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>AVBOKNING AV TJÄNSTER</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      5A. Kunden har rätt att avboka utförandet av en tjänst
                      kostnadsfritt förutsatt att sådan avbokning sker minst TRE
                      (3) arbetsdagar före den dag då tjänsten skulle ha
                      utförts. Om avbokningen av tjänsten görs med mindre än 3
                      arbetsdagar, då betalar kunden 35 procent av kostnaden för
                      det aktuella tjänstetillfället.
                    </li>
                    <li>
                      5B. Sker ombokning senare än tre (3) arbetsdagar före den
                      dag då städningen skulle ha utförts debiteras Kunden 10
                      procent av kostnaden för det aktuella tjänstetillfället.
                      Vid ombokning som senare avbokas av kunden, då är denne
                      skyldig att betala hela beloppet
                    </li>
                    <li>
                      5C. Avgifter för av och/eller ombokning är ej berättigade
                      till RUT-avdrag.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>PRISER OCH AVGIFTER</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      6A. Priser och eventuella avgifter för tjänsterna framgår
                      av Avtalet eller, om inget särskilt pris avtalats, av
                      ALMAS Grupp från tid till annan gällande prislista. Om
                      annat inte särskilt anges är samtliga priser angivna
                      inklusive mervärdesskatt och utan eventuellt RUT-avdrag
                      eller ROT-avdrag.
                    </li>
                    <li>
                      6B. ALMA Grupp AB har rätt att debitera Kunden en
                      serviceavgift som motsvarar ALMAS Grupp AB kostnader för
                      städmaterial och utrustning samt RUT- eller
                      ROT-administration.
                    </li>
                    <li>
                      6C. ALMA Grupp AB har rätt att göra justeringar av
                      avtalade priser baserat på utvecklingen av
                      konsumentprisindex (KPI), lönejusteringar för anställda,
                      andra förändringar i ALMAS Grupp AB kostnads bas, lag,
                      myndighetsbeslut, skatter, tullar eller andra offentliga
                      pålagor samt liknande situationer som påverkar priset för
                      Tjänsterna. Prisjusteringar ska meddelas Kunden minst två
                      (2) månad i förväg. Om Kunden inte accepterar en
                      prisjustering har Kunden rätt att inom två (2) veckor från
                      mottagandet av ALMAS Grupp AB meddelande om prisjustering
                      säga upp Avtalet till omedelbart upphörande.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>RUT- OCH ROTAVDRAG</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      7A. ALMA Grupp AB ansvarar för att ansöka om RUT-
                      och/eller ROT-avdrag hos Skatteverket. Kunden är ensamt
                      ansvarig för att säkerställa att denne har rätt till RUT-
                      eller ROT-avdrag för tjänsterna.
                    </li>
                    <li>
                      7B. Kunden har rätt att begära RUT- eller ROT-avdrag för
                      en del av kostnaden för Tjänsterna, om och i den mån RUT-
                      eller ROT-avdrag är tillämpligt. Kunden ska informera ALMA
                      Grupp AB om Kunden avser att utnyttja RUT- eller
                      ROT-avdrag.
                    </li>
                    <li>
                      7C. Om Skatteverket beslutar att kunden inte har rätt till
                      rut-avdrag, är det kundens skyldighet att erlägga den
                      delen till ALMA Grupp AB. För mer information om RUT- och
                      ROT-avdrag, se www.skatteverket.se
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>BETALNING</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      8A. Utförda Tjänster faktureras i efterskott och betalning
                      ska ske på i fakturan angivet förfallodatum.
                    </li>
                    <li>
                      8B. Vid utebliven betalning har ALMA Grupp AB rätt till
                      dröjsmålsränta samt eventuell påminnelseavgift om
                      ersättning för inkasso kostnader.
                    </li>
                    <li>
                      8C. Eventuella invändningar från Kunden mot fakturan ska
                      göras senast samma dag som fakturans förfallodag.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>FÖRSÄKRING</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      9A. ALMA Grupp AB ska under avtalsperioden inneha en
                      ansvarsförsäkring och, i förhållande till Tjänster som
                      utgör flytthjälp, en transport ansvarsförsäkring som är
                      lämplig i förhållande till Tjänsterna som omfattas av
                      Avtalet. ALMAS Grupp AB försäkring omfattar inte skador
                      orsakade av Kunden.
                    </li>
                    <li>
                      9B. I de fall kunds reklamation hanteras av ALMAS Grupp AB
                      försäkringsbolag kan den komma att hanteras till fullo av
                      försäkringsbolaget inklusive fortsatt dialog med kund.
                    </li>
                    <li>
                      9C. Kunden ska under avtalsperioden inneha en
                      hemförsäkring som omfattar de utrymmen där tjänsterna ska
                      utföras.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>REKLAMATION</strong>
                  <ul className='list-disc pl-5'>
                    <li>
                      10A. Om ALMA Grupp AB inte utför en Tjänst och det inte
                      beror på omständigheter hänförliga till Kunden, ska Kunden
                      inte debiteras för den aktuella Tjänsten.
                    </li>
                    <li>
                      10B. Vid fel eller brist i ALMAS Grupp AB utförande av en
                      Tjänst ska Kund återkomma inom 48 timmar efter att
                      Tjänsten har utförts och ALMA Grupp AB ges möjlighet att
                      avhjälpa felet/bristen inom skälig tid. Om felet/bristen
                      inte kan avhjälpas, eller om felet/bristen kvarstår efter
                      ALMAS Grupp AB försök till avhjälpande, kan Kunden ha rätt
                      till prisavdrag.
                    </li>
                    <li>
                      10C. Ersättning för skador på egendom som uppstår vid
                      ALMAS Grupp AB utförande av en Tjänst utgår endast om
                      Kunden kan visa att ALMA Grupp AB orsakat den påstådda
                      skadan.
                    </li>
                    <li>
                      10D. Kunden ska reklamera fel eller brist avseende en
                      utförd Tjänst till ALMA Grupp AB inom skälig tid från det
                      att Kunden märkt, eller borde ha märkt, felet/bristen.
                    </li>
                    <li>
                      10E. Om Kunden önskar reklamera en Tjänst ska ALMA Grupp
                      AB underrättas om detta via e-post.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>AVTALSTID OCH UPPSÄGNING</strong>
                  <ul className='list-decimal pl-5'>
                    <li>
                      11A. För att säga upp avtalet måste kunden meddela ALMA
                      Grupp AB med två (2) månader i förväg, och detta kan
                      endast göras via e-post eller skriftligen. gäller bara för
                      städ abonnemang.
                    </li>
                  </ul>
                </li>
                <li>
                  <strong>INTEGRITET</strong>
                  <ul className='list-decimal pl-5'>
                    <li>
                      12A. Vi skyddar dina personuppgifter enligt vår
                      internetpolicy
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default TermsAndConditions;
