import { Metadata } from 'next';
import * as React from 'react';

export const metadata: Metadata = {
  title: 'Tack för ditt meddelande!',
};

export default function ThankYou() {
  return (
    <main>
      <section className='w-full px-4 sm:px-8 lg:px-28 pt-48 lg:pt-48 p-4 lg:p-8 '>
        <h1 className='text-2xl font-bold mb-4'>
          Allmänna bestämmelser för Hantverkarformuläret –17
        </h1>
        <p className='text-base text-gray-800 dark:text-gray-200 mb-6'>
          Dessa allmänna bestämmelser är framtagna av Konsumentverket,
          Villaägarnas Riksförbund och Sveriges Byggindustrier och avsedda att
          användas tillsammans med Hantverkarformuläret –17. Vid uppförande av
          eller tillbyggnad till småhus bör istället allmänna bestämmelser för
          småhusentreprenader – ABS – användas.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8 text-base text-gray-800 dark:text-gray-200'>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold mt-8 mb-2'>
              1. Tillämplighet
            </h2>
            <p>
              För entreprenaden gäller konsumenttjänstlagen (1985:716) och vad
              som föreskrivs nedan i dessa bestämmelser. Vissa paragrafer i
              konsumenttjänstlagen återges i grå rutor.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              2. Arbetets utförande
            </h2>
            <p>
              Hantverkaren ska utföra arbetet fackmässigt. Hantverkaren ska
              också med tillbörlig omsorg ta till vara beställarens intressen
              och samråda med beställaren i den utsträckning det behövs och är
              möjligt, t.ex. om det under arbetets gång visar sig att tjänsten
              inte är till rimlig nytta för beställaren eller om kostnaden blir
              betydligt högre än beställaren räknat med. Hantverkaren kan vid
              tilläggsarbeten ha rätt till pristillägg enligt punkt 6.
              <br />
              Behövs intrimningsåtgärder efter arbetets avslutande åtar sig
              hantverkaren att inom skälig tid och, om inte annat avtalats, utan
              särskild kostnad utföra åtgärderna. Behov av sådana åtgärder är
              inte att betrakta som avvikelser från ett fackmässigt utförande.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              3. Ritningar m.m.
            </h2>
            <p>
              Alla ritningar och tekniska handlingar som hantverkaren överlämnat
              till beställaren förblir hantverkarens egendom och får inte i ett
              illojalt syfte delges eller överlämnas till utomstående. Bilagor
              till anbud, som inte antas, ska återlämnas till hantverkaren.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              4. Tillträde – iordningställande
            </h2>
            <p>
              Beställaren ska lämna hantverkaren erforderligt tillträde samt
              genom att flytta bohag och andra föremål, se till att
              arbetsplatsen är i ett sådant skick att arbetet kan utföras.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              5. Arbetets avbrytande m.m.
            </h2>
            <p>
              Om det sedan arbetet har påbörjats visar sig att det inte kan
              anses vara till rimlig nytta för beställaren eller att priset för
              arbetet kan bli betydligt högre än beställaren hade kunnat räkna
              med, ska hantverkaren underrätta beställaren om förhållandet och
              begära beställarens anvisningar.
              <br />
              Kan beställaren inte anträffas eller lämnar beställaren av annan
              orsak inte anvisningar till hantverkaren inom rimlig tid ska
              arbetet avbrytas. Detta gäller dock ej om det finns särskilda skäl
              att anta att beställaren ändå önskar få arbetet utfört.
              <br />
              Avbryter hantverkaren ett påbörjat arbete med stöd av andra
              stycket har hantverkaren rätt till ersättning för extra kostnader.
              Medför avbrottet en väsentlig olägenhet för hantverkaren får
              hantverkaren, under de förutsättningar som anges i
              konsumenttjänstlagen, häva avtalet.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              6. Ändringar, tilläggsarbeten och pristillägg
            </h2>
            <p>
              Om det, när arbetet utförs, framkommer behov av arbete, som på
              grund av sambandet med det beställda arbetet lämpligen bör utföras
              samtidigt med detta (tilläggsarbete) ska hantverkaren underrätta
              beställaren och begära beställarens anvisningar.
              <br />
              Med tilläggsarbeten enligt föregående stycke likställs arbete som
              föranleds av att uppgifter m.m. som beställaren svarar för inte är
              riktiga, att arbetsområdet eller andra förhållanden av betydelse
              avviker från vad hantverkaren haft rätt att förutsätta, eller att
              förhållandena i övrigt inte är sådana som de kunnat antas vara vid
              en fackmässig bedömning.
              <br />
              Kan beställaren inte anträffas eller lämnar beställaren inte
              anvisningar inom rimlig tid får hantverkaren utföra
              tilläggsarbetet – om kostnaderna för tilläggsarbetet inte
              överstiger 15 % av kostnaderna för det beställda arbetet eller –
              om det finns särskilda skäl att anta att beställaren önskar
              tilläggsarbetet utfört i samband med det beställda arbetet.
              <br />
              Hantverkaren är skyldig att utföra tilläggsarbeten som inte kan
              skjutas upp utan fara för allvarlig skada för beställaren, om
              beställarens anvisningar inte kan inhämtas eller om beställaren
              begär det.
              <br />
              Har hantverkaren utfört tilläggsarbeten enligt denna punkt eller
              har arbetet fördyrats på grund av omständigheter som är att
              hänföra till beställaren och som hantverkaren inte borde ha
              förutsett när avtalet ingicks har hantverkaren rätt till
              pristillägg.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              Påföljder vid fel
            </h2>
            <p>
              <strong>16 §</strong> Är tjänsten felaktig utan att det beror på
              något förhållande på konsumentens sida, får konsumenten hålla inne
              betalningen enligt 19 §. Han får vidare kräva att felet avhjälps
              enligt 20 § första stycket eller också göra avdrag på priset eller
              häva avtalet enligt 21 §.
              <br />
              Dessutom får konsumenten kräva skadestånd av näringsidkaren enligt
              vad som sägs i 31 §.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>Avhjälpande</h2>
            <p>
              <strong>20 §</strong> Konsumenten har rätt att kräva att
              näringsidkaren avhjälper felet, om det inte medför olägenheter
              eller kostnader för näringsidkaren som är oskäligt stora i
              förhållande till felets betydelse för konsumenten.
              <br />
              Även om konsumenten inte kräver det får näringsidkaren avhjälpa
              felet, om han efter det att reklamation har kommit honom tillhanda
              utan uppskov erbjuder sig att göra detta och konsumenten inte har
              något särskilt skäl att avvisa erbjudandet.
              <br />
              Avhjälpande skall ske inom skälig tid efter det att konsumenten
              har gett näringsidkaren tillfälle till det.
              <br />
              Avhjälpande skall ske utan kostnad för konsumenten. Detta gäller
              dock inte kostnader som skulle ha uppkommit även om tjänsten hade
              utförts felfritt eller, om felet beror på en olyckshändelse eller
              därmed jämförlig händelse, kostnader för att ersätta material som
              konsumenten enligt avtalet om tjänsten har tillhandahållit och
              bekostat.
            </p>
            <h2 className='text-xl font-semibold mt-8 mb-2'>
              7. Hantverkarens rätt till tidsförlängning m.m.
            </h2>
            <p>
              Kontraktsarbetena ska vara färdigställda och tillgängliga för
              slutbesiktning vid kontraktstidens utgång.
              <br />
              Kontraktstiden ska förlängas eller avkortas i den utsträckning
              ändringar och tilläggsarbeten föranleder ökad eller minskad
              tidsåtgång.
              <br />
              Om någon tid för färdigställande inte har avtalats, ska
              entreprenaden vara färdigställd inom den tid som är skälig med
              hänsyn till särskilt vad som är normalt för en entreprenad av
              samma art och omfattning. Intrimning, justering eller provning som
              ingår i entreprenaden ska vara fullgjord inom entreprenadtiden om
              inte lämplig årstid eller entreprenadens ibruktagande bör
              avvaktas.
              <br />
              Hantverkaren har rätt till erforderlig förlängning av
              kontraktstiden, om hantverkaren hindras att färdigställa
              kontraktsarbetena inom kontraktstiden på grund av omständigheter
              utanför hantverkarens kontroll som hantverkaren inte skäligen
              kunde ha förväntas ha räknat med vid avtalets ingående samt att
              hantverkaren inte heller skäligen kunde ha undvikit eller
              övervunnit dess menliga inverkan.
              <br />
              Part ska utan dröjsmål underrätta motparten om förhållande som
              parten insett eller borde ha insett skulle medföra försening. Om
              part underlåter att lämna sådan underrättelse, får parten inte
              åberopa förhållandet annat än om motparten insett eller borde ha
              insett detsamma.
              <br />
              Dröjsmål på hantverkarens sida föreligger om hantverkaren
              överskrider kontraktstiden eller den ändrade tid för
              färdigställande som ska gälla enligt ovan.
              <br />
              Dröjsmål på hantverkarens sida föreligger också, om hantverkaren
              inte iakttar en överenskommen tid för påbörjande av
              kontraktsarbetena eller för ett arbetes framskridande, under
              förutsättning att hantverkaren inte har rätt till tidsförlängning
              enligt ovan.
            </p>
          </div>
          <div className='space-y-4'>
            <h2 className='text-xl font-semibold mt-8 mb-2'>
              Påföljder vid dröjsmål
            </h2>
            <p>
              <strong>25 §</strong> Vid dröjsmål på näringsidkarens sida får
              konsumenten hålla inne betalningen enligt 27 §. Han får välja
              mellan att kräva att näringsidkaren utför tjänsten enligt 28 § och
              att häva avtalet enligt 29 §. Dessutom får konsumenten kräva
              skadestånd av näringsidkaren enligt vad som sägs i 31 §.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              Reklamation vid fel och dröjsmål
            </h2>
            <p>
              <strong>17 § 1 st.</strong> Vill konsumenten åberopa att tjänsten
              är felaktig, skall han underrätta näringsidkaren om detta inom
              skälig tid efter det att han märkt eller borde ha märkt felet
              (reklamation). Underrättelse som sker inom två månader efter det
              att konsumenten märkt felet skall alltid anses ha skett i rätt
              tid. Reklamation får dock inte ske senare än tre år eller, i fråga
              om arbete på mark eller på byggnader eller andra anläggningar på
              mark eller i vatten eller på andra fasta saker, tio år efter det
              att uppdraget avslutades, såvida inte annat följer av en garanti
              eller liknande utfästelse.
              <br />
              <strong>26 § 1 st.</strong> Har uppdraget avslutats, får
              konsumenten häva avtalet eller fordra skadestånd på grund av ett
              dröjsmål endast under förutsättning att han senast inom skälig tid
              efter uppdragets avslutande har underrättat näringsidkaren om att
              han vill åberopa dröjsmålet (reklamation).
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>8. Besiktning</h2>
            <p>
              Har avtal träffats om slutbesiktning ska hantverkaren underrätta
              beställaren om när sådan besiktning kan ske.
              <br />
              Beställaren eller hantverkaren får begära
              <br />
              – garantibesiktning om garantitid har avtalats,
              garantibesiktningen hålls före garantitidens utgång,
              <br />
              – efterbesiktning av arbete som utförts för att avhjälpa fel.
              <br />
              Beställaren utser en opartisk besiktningsman som i god tid kallar
              parterna till besiktning.
              <br />
              Beställaren står kostnaden för slutbesiktning och
              garantibesiktning. Kostnaden för efterbesiktning betalas av
              hantverkaren om fel kvarstår och i annat fall av beställaren.
              <br />
              Besiktningsmannen ska upprätta ett utlåtande över en utförd
              besiktning.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>9. Skadestånd</h2>
            <p>
              I enlighet med förutsättningarna i konsumenttjänstlagen har
              beställaren rätt till ersättning för skada – t.ex. utgifter och
              förluster – som orsakats honom genom fel eller dröjsmål.
              Hantverkaren ska också, under de förutsättningar som anges i
              konsumenttjänstlagen, ersätta skada på beställarens egendom, som
              inträffat då egendomen varit under hantverkarens kontroll.
              Skadestånd omfattar dock inte ersättning för förlust i
              näringsverksamhet.
              <br />
              Beställaren ska så långt det är möjligt vidta åtgärder för att
              begränsa verkningarna av skadan.
              <br />
              Personskador regleras inte av dessa bestämmelser.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              10. Ungefärlig prisuppgift
            </h2>
            <p>
              En ungefärlig prisuppgift omfattar endast de arbeten och åtaganden
              som anges under rubriken Omfattning i Hantverkarformuläret –17.
              Priset får inte överskrida den ungefärliga prisuppgiften med mer
              än 15 %, om inte hantverkaren har rätt till ersättning utöver
              kontraktssumman enligt dessa allmänna bestämmelser eller
              konsumenttjänstlagen.
              <br />
              Till den del det ungefärliga priset avser markarbeten,
              rivningsarbeten eller annat som kräver undersökningar som
              hantverkaren normalt inte är skyldig att utföra i anbudsskedet,
              ska prisgränsen enligt föregående stycke i stället vara 25 %.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>11. ROT-avdrag</h2>
            <p>
              Vid ROT-avdrag gäller följande. Beställaren är skyldig att på
              begäran uppvisa ett intyg från Skatteverket som visar hur mycket
              skattereduktion som beställaren utnyttjat under året.
              <br />
              Beställaren är skyldig att betala återstående arbetskostnad till
              hantverkaren om Skatteverket helt eller delvis inte medger
              utbetalning efter hantverkarens ansökan eller återkräver redan
              utbetalt skattereduktionsbelopp. Detta gäller inte om skälet för
              att utbetalningen inte medges eller återkrävs beror på någon
              omständighet som hantverkaren är ansvarig för.
              <br />
              Betalning av återstående arbetskostnad ska ske inom 10 dagar från
              den dag hantverkaren framställt krav. Därefter löper
              dröjsmålsränta enligt räntelagen.
              <br />
              Beställaren försäkrar att beställaren är ägare/innehavare av
              angiven fastighet/bostadsrätt/ägarlägenhet, samt att beställaren
              nyttjar densamma.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              12. Beställarens avbeställningsrätt
            </h2>
            <p>
              Beställaren har rätt att avbeställa arbetet innan det avslutas mot
              ersättning till hantverkaren enligt konsumenttjänstlagens
              bestämmelser.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              Näringsidkarens rätt att inställa arbetet
            </h2>
            <p>
              <strong>45 §</strong> Skall betalning enligt avtalet ske helt
              eller delvis innan tjänsten har utförts och betalar inte
              konsumenten i rätt tid, får näringsidkaren inställa arbetet till
              dess att konsumenten betalar. Om det följer av avtalet att
              konsumenten skall medverka till tjänstens utförande och han inte i
              rätt tid lämnar sådan medverkan som utgör en väsentlig
              förutsättning för utförandet, får näringsidkaren inställa arbetet
              till dess att konsumenten lämnar sin medverkan.
              <br />
              Har tjänsten påbörjats, är näringsidkaren dock skyldig att såvitt
              möjligt utföra arbete som inte kan uppskjutas utan risk för
              allvarlig skada för konsumenten, om inte arbetet medför väsentliga
              kostnader eller olägenheter för näringsidkaren.
              <br />
              Inställer näringsidkaren arbetet enligt första stycket, har han
              rätt till ersättning för kostnader och andra förluster som detta
              åsamkar honom, om konsumenten inte visar att dröjsmålet ej beror
              på försummelse på hans sida.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>
              13. Hantverkarens försäkringar
            </h2>
            <p>
              Hantverkaren ska ha allriskförsäkring för skador på entreprenaden.
              Beställaren ska vara medförsäkrad.
              <br />
              Hantverkaren ska vidare ha ansvarsförsäkring för
              entreprenadverksamhet under entreprenadtiden och under två år
              efter entreprenadens godkännande.
            </p>

            <h2 className='text-xl font-semibold mt-8 mb-2'>14. Tvist</h2>
            <p>
              Tvist avgörs av allmän domstol. Beställaren (konsumenten) kan
              också anmäla tvister till Allmänna reklamationsnämnden
              (www.arn.se), Box 174, 101 23 Stockholm. Konsumenter kan även få
              vägledning av hemkommunens konsumentvägledare eller Hallå
              konsument.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
