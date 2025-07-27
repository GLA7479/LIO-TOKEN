import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

export default function Gallery() {
  const items = [
    ...Array.from({ length: 10 }, (_, i) => ({ type: "image", src: `/images/dog${i + 1}.jpg` })),
    { type: "video", src: "/videos/video1.mp4" },
    { type: "video", src: "/videos/video2.mp4" },
  ];

  const [selectedIndex, setSelectedIndex] = useState(null);

  const openModal = (index) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevItem = () => setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  const nextItem = () => setSelectedIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));

  return (
    <>
      <Header />
      <motion.main
        className="relative min-h-screen text-white flex flex-col items-center justify-center p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl text-yellow-400 mb-6 font-bold">🐾 LIOSH Gallery</h1>

        {/* Grid of Thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="cursor-pointer rounded-lg overflow-hidden hover:scale-105 transform transition"
              onClick={() => openModal(index)}
            >
              {item.type === "image" ? (
                <img src={item.src} alt={`media-${index}`} className="w-40 h-40 object-cover" />
              ) : (
                <video src={item.src} className="w-40 h-40 object-cover" muted />
              )}
            </div>
          ))}
        </div>

        {/* Modal */}
        {selectedIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
            <div className="relative max-w-4xl max-h-[90vh]">
              {items[selectedIndex].type === "image" ? (
                <img
                  src={items[selectedIndex].src}
                  alt="selected"
                  className="max-h-[90vh] rounded-lg"
                />
              ) : (
                <video
                  src={items[selectedIndex].src}
                  autoPlay
                  controls
                  className="max-h-[90vh] rounded-lg"
                />
              )}

              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
              >
                ✖ Close
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={prevItem}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-500"
              >
                ⬅
              </button>
              <button
                onClick={nextItem}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-500"
              >
                ➡
              </button>
            </div>
          </div>
        )}
      </motion.main>
      <Footer />
    </>
  );
}
