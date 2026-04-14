import { getMessages } from '@/i18n/getMessages';
import SiteNav from '@/components/ArknicaNav';
import WrapHero from '@/components/home/ArknicaHero';
import TransformationGallery from '@/components/home/TransformationGallery';
import InteractiveDesignLab from '@/components/home/InteractiveDesignLab';
import {
  ElTaller,
  TailoredSolutions,
  MaterialsLab,
  ProcesoWrap,
  FoodTruckElite,
  FAQSection,
  QuoteForm,
  SiteFooter,
} from '@/components/home/AllSections';

import '@/styles/home.css';
import '@/styles/sections/all-sections.css';

export const metadata = {
  title: 'We Wrap It For U | Vehicle Wrapping & Design',
  description: 'Especialistas en rotulación de vehículos de alta gama. Carros de lujo, vans corporativas y Food Trucks.',
};

export default async function Home({ params }) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  return (
    <>
      <SiteNav locale={locale} />
      <main className="home-container">
        <WrapHero />
        <TransformationGallery />
        <ElTaller />
        <TailoredSolutions />
        <MaterialsLab />
        <InteractiveDesignLab />
        <ProcesoWrap />
        <FoodTruckElite />
        <FAQSection />
        <QuoteForm />
        <SiteFooter />
      </main>
    </>
  );
}
