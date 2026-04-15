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
  const messages = await getMessages(locale);

  return (
    <>
      <SiteNav locale={locale} msg={messages.navbar} />
      <main className="home-container">
        <WrapHero msg={messages.hero} />
        <TransformationGallery msg={messages.gallery} />
        <ElTaller msg={messages.taller} />
        <TailoredSolutions msg={messages.solutions} />
        <MaterialsLab msg={messages.materials} />
        <InteractiveDesignLab msg={messages.lab} />
        <ProcesoWrap msg={messages.proceso} />
        <FoodTruckElite msg={messages.foodtruck} />
        <FAQSection msg={messages.faq} />
        <QuoteForm msg={messages.quote} />
        <SiteFooter msg={messages.footer} />
      </main>
    </>
  );
}
