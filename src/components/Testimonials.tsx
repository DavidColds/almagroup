const testimonials = [
  {
    name: 'Sophia L.',
    text: 'Absolutely fantastic service! My home has never felt cleaner. Highly recommended!',
  },
  {
    name: 'James R.',
    text: 'They paid attention to every detail. The deep cleaning was worth every penny!',
  },
  {
    name: 'Emma W.',
    text: 'Professional and efficient. They left my apartment spotless in no time!',
  },
  {
    name: 'Daniel K.',
    text: "The best cleaning service I've ever used. Great communication and results!",
  },
  {
    name: 'Olivia P.',
    text: 'I love their eco-friendly cleaning products. My house smells fresh and clean!',
  },
  {
    name: 'Michael B.',
    text: 'Super reliable! The team arrived on time and did an amazing job.',
  },
];

export default function Testimonials(): JSX.Element {
  return (
    <section className='px-4 py-24 bg-[#7e7e7e4f]'>
      <div className='container mx-auto '>
        <h2 className='mb-6 text-center text-3xl font-semibold'>
          What Our Clients Say
        </h2>
        <div className='relative overflow-x-auto scrollbar-custom scroll-smooth'>
          <div className='flex snap-x snap-mandatory space-x-6 px-4 py-5 sm:px-8'>
            {testimonials.map(({ name, text }, index) => (
              <div
                key={index}
                className='w-80 min-w-[320px] snap-center rounded-lg p-6 shadow-lg'
              >
                <p className='text-lg italic'>"{text}"</p>
                <p className='mt-4 text-right font-semibold'>- {name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
