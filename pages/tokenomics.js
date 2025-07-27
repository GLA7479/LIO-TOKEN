import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Tokenomics() {
  const data = {
    labels: [
      "Presale (40%)",
      "Liquidity & Marketing (30%)",
      "Staking Rewards (20%)",
      "Team & Advisors (10%)",
    ],
    datasets: [
      {
        data: [40, 30, 20, 10],
        backgroundColor: ["#facc15", "#3b82f6", "#22c55e", "#a855f7"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white flex flex-col items-center justify-center p-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* 🔹 וידאו רקע */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/gallery-bg.mp4"  // אותו וידאו כמו בעמוד הגלריה
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 max-w-3xl text-center">
          <h1 className="text-4xl text-yellow-400 font-bold mb-6">📊 LIOSH Tokenomics</h1>
          <p className="mb-6 text-lg">
            Detailed breakdown of LIOSH token allocation to ensure transparency and sustainable growth.
          </p>

          <div className="bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
            <Pie data={data} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left mb-6">
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-yellow-400 font-bold">Presale – 40%</h3>
              <p>Reserved for early investors during presale stages.</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-yellow-400 font-bold">Liquidity & Marketing – 30%</h3>
              <p>For exchange listings, liquidity pools, and promotions.</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-yellow-400 font-bold">Staking Rewards – 20%</h3>
              <p>Incentives for long-term holders through staking pools.</p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <h3 className="text-yellow-400 font-bold">Team & Advisors – 10%</h3>
              <p>Allocated to the core team and advisors (locked).</p>
            </div>
          </div>

          <div className="text-center">
            <Link href="/">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105">
                ⬅ Back to Home
              </button>
            </Link>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
