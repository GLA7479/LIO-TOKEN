import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/home-bg.mp4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 text-center max-w-2xl p-6">
          <h1 className="text-6xl font-extrabold text-yellow-400 mb-4">LIOSH Token</h1>
          <p className="text-xl mb-6">
            The ultimate meme coin inspired by Shiba Inu! Join our presale and become part of the next crypto revolution.
          </p>

          <div className="space-x-4">
            <Link href="/presale">
              <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105">
                🚀 Join Presale
              </button>
            </Link>
            <Link href="/staking">
              <button className="bg-gray-900 border border-yellow-400 text-yellow-400 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-400 hover:text-black transition transform hover:scale-105">
                💰 Stake Now
              </button>
            </Link>
          </div>

          {/* Running dog preview */}
          <div className="mt-10 mx-auto flex justify-center">
            <div className="dog-run" aria-label="Running dog animation" />
          </div>
        </div>
      </motion.main>

      {/* 🔹 Roadmap Section */}
      <section className="bg-black text-white py-16">
        <h2 className="text-4xl text-yellow-400 font-bold text-center mb-10">🚀 Roadmap</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-center px-4">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Phase 1</h3>
            <p>Token Launch, Website, Community Building</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Phase 2</h3>
            <p>Presale Stages, Marketing Campaigns</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Phase 3</h3>
            <p>Exchange Listings, Staking Launch</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Phase 4</h3>
            <p>Major Partnerships & Metaverse Utility</p>
          </div>
        </div>
      </section>

      {/* 🔹 Tokenomics Section */}
      <section className="bg-gray-900 text-white py-16">
        <h2 className="text-4xl text-yellow-400 font-bold text-center mb-10">📊 Tokenomics</h2>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-center px-4">
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Total Supply</h3>
            <p>1,000,000,000,000 LIOSH</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Presale Allocation</h3>
            <p>40% – Available for early investors</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Liquidity & Marketing</h3>
            <p>30% – Locked for liquidity & promotions</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Staking Rewards</h3>
            <p>20% – For staking pools and incentives</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-2">Team & Advisors</h3>
            <p>10% – Team allocation (locked)</p>
          </div>
        </div>

        <div className="text-center mt-8">
          <Link href="/tokenomics">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105">
              📊 Learn More
            </button>
          </Link>
        </div>
      </section>

      {/* 🔹 Contact Section */}
      <section className="bg-gray-800 text-white py-16">
        <h2 className="text-3xl text-yellow-400 font-bold text-center mb-6">📩 Get in Touch</h2>
        <div className="flex justify-center space-x-6 text-lg">
          <a href="mailto:contact@liosh.com" className="hover:text-yellow-400">📧 Email</a>
          <a href="#" className="hover:text-yellow-400">🐦 Twitter</a>
          <a href="#" className="hover:text-yellow-400">💬 Telegram</a>
          <a href="#" className="hover:text-yellow-400">🌐 Discord</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
