import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-3">
        <img
          src="/images/logo.png"
          alt="LIOSH Logo"
          className="w-24 h-24 object-contain"
        />
        <h1 className="text-2xl font-extrabold">LIOSH Token</h1>
      </div>

      <nav className="space-x-6 text-lg font-semibold">
        <Link href="/">Home</Link>
        <Link href="/tokenomics">Tokenomics</Link>
        <Link href="/presale">Presale</Link>
        <Link href="/staking">Staking</Link>
        <Link href="/gallery">Gallery</Link>
        <Link href="/whitepaper">Whitepaper</Link>
      </nav>
    </header>
  );
}
