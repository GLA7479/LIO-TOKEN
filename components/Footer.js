export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white p-6 mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto">
        <p>© 2025 LIOSH Token. All rights reserved.</p>
        <div className="space-x-4 mt-4 md:mt-0 text-lg">
          <a href="#" className="hover:text-yellow-400">🐦 Twitter</a>
          <a href="#" className="hover:text-yellow-400">💬 Telegram</a>
          <a href="#" className="hover:text-yellow-400">🎮 Discord</a>
        </div>
      </div>
    </footer>
  );
}
