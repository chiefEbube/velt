import Header from "./Header"
import Hero from "./Hero"
import KeyFeatures from "./KeyFeatures"
import WhyChooseUs from "./WhyChooseUs"
import SupportedAssets from "./SupportedAssets"
import Faq from "./Faq"
import Cta from "./Cta"
import Footer from "./Footer"

export default function LandingPage() {

    return (
        <div className="min-h-screen text-white  bg-[#0A0A0F]">
            <Header />
            <Hero />
            <KeyFeatures />
            <WhyChooseUs />
            <SupportedAssets />
            <Faq />
            <Cta />
            <Footer />
        </div >
    )
}
