import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";

export default function Staking() {
  const pools = [
    { name: "30 Days", apy: 50, color: "bg-yellow-400 text-black" },
    { name: "90 Days", apy: 100, color: "bg-blue-500 text-white" },
    { name: "180 Days", apy: 150, color: "bg-green-500 text-white" },
  ];

  const [amount, setAmount] = useState(1000);

  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white p-10 flex flex-col items-center justify-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          src="/videos/staking-bg.mp4"
        />
        <div className="absolute inset-0 bg-black bg-opacity-70 z-0"></div>

        <div className="relative z-10 w-full max-w-5xl text-center">
          <h1 className="text-4xl text-yellow-400 mb-10 font-bold">💰 Staking Dashboard</h1>

          <p className="text-lg mb-4">Enter the amount of LIOSH tokens you want to stake:</p>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="text-black px-4 py-2 rounded mb-8"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pools.map((pool, index) => {
              const profit = ((amount * pool.apy) / 100).toFixed(2);

              return (
                <motion.div
                  key={index}
                  className={`p-6 rounded-lg shadow-lg ${pool.color}`}
                  whileHover={{ scale: 1.05 }}
                >
                  <h2 className="text-3xl font-bold mb-2">{pool.name}</h2>
                  <p className="text-xl mb-4">APY: {pool.apy}%</p>
                  <p className="text-lg mb-4">Expected Profit: {profit} LIOSH</p>
                  <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800">
                    Stake Now
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.main>
      <Footer />
    </>
  );
}
