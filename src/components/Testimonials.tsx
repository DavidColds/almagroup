const testimonials = [
  {
    name: 'Erik Matts G. (Stockholm)',
    stars: '★★★★★',
    date: '2023-12-10',
    heading: 'Jag rekommenderar att du vänder dig till ALMA Grupp AB',
    text: `Vill du anlita ett väldigt transparant företag som kan visa dig alla kvitton, rabatter och reala priser som du betalar. Jag rekommenderar att du vänder dig till ALMA Grupp AB. Jag gjorde detta och.... det var perfekt. Rekommenderar företaget till alla som vill sova gott. 100% nöjd.`,
  },
  {
    name: 'Martin A',
    stars: '★★★★★',
    date: '2025-02-17',
    heading: 'Vi rekommenderar till alla som vill renovera sitt hus!!!',
    text: `ALMA Grupp AB - Vi rekommenderar till alla som vill renovera sitt hus. Fullt fokus på allt med egna elektriker, rörmokare och bästa projektledare (Bogdan) allt fungerar som en klocka.`,
  },
  {
    name: 'Nina H. (Katrineholm)',
    stars: '★★★★★',
    date: '2024-03-06',
    heading: 'Kan rekommendera vidare detta företag.',
    text: `Jag tackar till ALMA Grupp AB (Bogdan ) och kan rekommendera vidare detta företag. Efter stora problem som vi haft med några oseriösa företag dom tog från början projekten och avsluta den i tid precis som vi avtalade den. BÄSTA..`,
  },
  {
    name: 'Wenbo',
    stars: '★★★★★',
    date: '2023-11-14',
    heading: 'Kitchen renovation',
    text: `ALMA Service works rigorously and communicates with us in a timely manner. He also gave us a lot of opinions and feedback during the renovation process. Our requirements were met as much as possible and we are very satisfied with the results.`,
  },
  {
    name: 'Kristina',
    stars: '★★★★★',
    date: '2019-08-15',
    heading: 'Altanbyggande',
    text: `Tusen tack för den hjälp vi fått från Alma Service med altanbygget. Trevlig och kunnig och ett mycket vinnande sätt i kombination med stort yrkeskunnande. Vi kan verkligen rekommendera Alma Service till det bästa och vi återkommer gärna om fler uppdrag uppstår.`,
  },
  {
    name: 'Leif',
    stars: '★★★★★',
    date: '2020-02-24',
    heading: 'Småfix för rörmokare',
    text: `Bogdan utförde arbetena på ett bra sätt och han var mån om att hitta ekonomiska lösningar för de olika problemen. Bra gjort!`,
  },
  {
    name: 'Jan-Peter och Jennifer',
    stars: '★★★★★',
    date: '2019-11-14',
    heading: 'Golvläggning av parkettgolv ek',
    text: `Bogdan Ali på ALMA Service gjorde ett fantastiskt bra arbete då han rev bort vårt gamla parkettgolv och lade dit ett nytt. Han är mycket skicklig i sina arbeten och mycket noggrann. Jag vill varmt rekommendera Bogdan.`,
  },
];

export default function Testimonials(): JSX.Element {
  return (
    <section className='p-6 py-24 white:bg-[#f5f5f5]'>
      <div className='container mx-auto'>
        <h2
          className='mb-10 pt-10 pb-10 lg:text-center text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white'
          tabIndex={-1}
          id='kundomdomen'
        >
          Från våra kunder
        </h2>
        <div className='relative overflow-x-auto scrollbar-custom scroll-smooth'>
          <div className='flex snap-x snap-mandatory space-x-8 pr-4 py-5 sm:px-8'>
            {testimonials.map(({ name, heading, text, stars, date }, index) => (
              <article
                key={index}
                className='w-80 min-w-[390px] snap-center rounded-xl p-8 shadow-lg bg-white dark:bg-[#232323] flex flex-col outline-none focus:ring-4 focus:ring-blue-400'
                tabIndex={0}
                aria-label={`Omdöme från ${name}`}
              >
                <span
                  aria-hidden='true'
                  className='font-serif mb-2 select-none block text-gray-400'
                  style={{ fontSize: '60px', lineHeight: '1' }}
                >
                  &ldquo;
                </span>
                <div className='flex flex-col justify-between flex-1'>
                  <p className='text-lg italic text-gray-900 dark:text-gray-100 mb-4'>
                    {text}
                  </p>
                  <div className='mt-4'>
                    <h3 className='font-bold text-lg mb-1'>{heading}</h3>
                    <div className='flex items-center gap-2 font-semibold text-base text-gray-800 dark:text-gray-200 mb-1'>
                      <span>{stars}</span>
                      <span>-</span>
                      <span>{date}</span>
                    </div>
                    <div className='font-semibold text-base text-gray-800 dark:text-gray-200'>
                      {name}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
