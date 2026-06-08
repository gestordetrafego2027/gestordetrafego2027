'use client';

import { useRouter } from 'next/navigation';
import { pricingByService } from '@/lib/landingsContent';
import HmBullet from '@/app/components/HmBullet';

/**
 * Seção de pricing das landings de serviço.
 *
 * @param {string} service - chave em pricingByService (book, ensaio, ...)
 * @param {(ctaLocation: string, packageSelected: string) => void} openForm - handler do FormDrawer
 */
export default function LandingPricing({ service, openForm }) {
  const router = useRouter();
  const config = pricingByService[service];
  if (!config) return null;

  return (
    <section className="bg-white px-[40px]">
      <div className="bg-surface-container-lowest py-32 px-12 md:px-24">
        <div className="max-w-[1440px] mx-auto">
          <div className="text-center mb-24">
            <span
              className="font-label uppercase tracking-[0.2em] text-[10px] text-outline mb-4 block"
              data-aos="fade-up"
            >
              {config.sectionKicker}
            </span>
            <h2
              className="font-headline text-4xl md:text-5xl tracking-tight"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {config.sectionTitle}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            {config.tiers.map((tier, idx) => (
              <div
                key={tier.id}
                className="p-12 border border-surface-container-high flex flex-col justify-between h-full bg-white transition-all duration-300 hover:bg-black hover:text-white hover:scale-[1.02] group relative overflow-hidden"
                data-aos="fade-up"
                data-aos-delay={(idx + 1) * 100}
              >
                {tier.popular && (
                  <div className="absolute top-6 right-6">
                    <span className="font-label text-[8px] tracking-widest bg-black text-white px-2 py-1 group-hover:bg-white group-hover:text-black">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div>
                  <h3 className="font-headline text-2xl mb-8">{tier.name}</h3>
                  <div className="mb-12">
                    <span className="text-4xl font-headline italic">{tier.price}</span>
                    <span className="text-xs font-label text-outline group-hover:text-white/50 block mt-2">
                      {tier.priceLabel}
                    </span>
                  </div>
                  <ul className="space-y-4 mb-12">
                    {tier.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-sm text-on-surface-variant group-hover:text-white/80"
                      >
                        <HmBullet size="sm" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    if (tier.slug) {
                      router.push(`/checkout/studio/${tier.slug}`);
                    } else {
                      openForm(`package_${tier.id}`, `${tier.name} - ${tier.price}`);
                    }
                  }}
                  className="w-full border border-primary py-4 font-label uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all group-hover:border-white"
                >
                  {tier.ctaLabel}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
