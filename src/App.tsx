
import TopNav from './components/TopNav'
import Footer from './components/Footer'
import Feat from './components/Feat'
import Hero from './components/hero'
import LearningPaths from './components/Explore'
import PricingSection from './components/Program'
import FaqSection from './components/Faq'
import TestimonialsSection from './components/Testimonial'
import CalltoAction from './components/CalltoAction'
import Name from './components/names'
export default function App() {


  return (
    <div className="relative min-h-screen bg-white text-black overflow-x-hidden">
      <TopNav />
      <Hero />
      <Feat />
      <LearningPaths />
      <CalltoAction />
      <Name />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
  )
}
