import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Work, { Stack } from '@/components/Work';
import Statement from '@/components/Statement';
import Engineering from '@/components/Engineering';
import Glance from '@/components/Glance';
import { Numbers, Skills } from '@/components/Numbers';
import Footer from '@/components/Footer';
import Ribbon from '@/components/Ribbon';
import Motion from '@/components/Motion';

export default function Page() {
  return (
    <>
      <a className="skip" href="#work">
        Skip to work
      </a>
      <Ribbon />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Work />
        <Statement />
        <Engineering />
        <Glance />
        <Numbers />
        <Skills />
      </main>
      <Footer />
      <Motion />
    </>
  );
}
