import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Presale() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const diff = targetDate.getTime() - now;
      if (diff <= 0) clearInterval(interval);
      else {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / (1000 * 60)) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const stages = [
    { stage: "Stage 1", price: "$0.0005", allocation: "20%" },
    { stage: "Stage 2", price: "$0.0010", allocation: "20%" },
    { stage: "Stage 3", price: "$0.0020", allocation: "30%" },
    { stage: "Stage 4", price: "$0.0050", allocation: "30%" },
  ];

  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white p-6 flex flex-col items-center justify-center overflow-hidden"
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
          src="/videos/presale-bg.mp4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 w-full max-w-4xl text-center">
          <h1 className="text-4xl text-yellow-400 font-bold mb-6">🚀 LIOSH Presale</h1>

          <div className="text-2xl font-bold mb-6">
            Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
          </div>

          <div className="w-full max-w-2xl mx-auto mb-6">
            <div className="bg-gray-700 rounded-full h-6">
              <div
                className="bg-yellow-400 h-6 rounded-full text-black text-sm font-bold flex items-center justify-center"
                style={{ width: `${progress}%` }}
              >
                {progress}%
              </div>
            </div>
            <p className="text-center mt-2 text-gray-300">{progress}% of tokens sold</p>
          </div>

          <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-bold text-lg hover:bg-yellow-500 transition transform hover:scale-105 mb-10">
            Connect Wallet
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Total Supply</h3>
              <p>1,000,000,000,000 LIOSH</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Presale Price</h3>
              <p>$0.0005 (Stage 1)</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-2">Network</h3>
              <p>BNB Smart Chain (BEP-20)</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto">
            <table className="table-auto w-full border border-gray-700 text-center">
              <thead className="bg-gray-800">
                <tr>
                  <th className="border px-4 py-2">Stage</th>
                  <th className="border px-4 py-2">Price</th>
                  <th className="border px-4 py-2">Allocation</th>
                </tr>
              </thead>
              <tbody>
                {stages.map((row, i) => (
                  <tr key={i} className="hover:bg-gray-700">
                    <td className="border px-4 py-2">{row.stage}</td>
                    <td className="border px-4 py-2">{row.price}</td>
                    <td className="border px-4 py-2">{row.allocation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
