import { getMessages } from '@/i18n/getMessages'; 
import SectionOne from '@/components/home/SectionOne';
import SectionTwo from '@/components/home/SectionTwo';
import SectionThree from '@/components/home/SectionThree';
import SectionFour from '@/components/home/SectionFour';
import StickyCar from '@/components/StickyCar';


import '@/styles/home.css';  

export default async function Home({ params }) {
  const { locale } = params;
  const messages = await getMessages(locale);

  return (
    <main className="home-container">
      <StickyCar /> {/* Moved StickyCar here to ensure visibility */}
      <div className="scroll-background-bar"></div>
      <SectionOne messages={messages}/>
      <SectionTwo messages={messages}/>
      <SectionThree messages={messages}/>
      <SectionFour messages={messages}/>
      {/* <SectionFive className="section-last" /> */}
    </main>
  );
}
