import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Whitepaper() {
  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white flex flex-col items-center justify-center p-6 overflow-hidden"
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
          src="/videos/whitepaper-bg.mp4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 text-center max-w-xl">
          <h1 className="text-4xl text-yellow-400 mb-6 font-bold">📄 LIOSH Whitepaper</h1>
          <p className="mb-4 text-lg">
            Discover everything about LIOSH Token – tokenomics, roadmap, and the vision behind the project.
          </p>
          <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105">
            Download PDF
          </button>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
