function Home() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-8xl font-semibold text-[#ce9e62]">Rock of Ages</h1>
      <p className="mt-2 text-[#cbd1d9]">Collect, view, and manage your rocks.</p>
      <button
        onClick={() => (window.location.href = "/create")}
        className="mt-6 px-6 py-3 bg-[#a8a29e] font-black text-[#244244] rounded-md hover:bg-[#a83926] hover:text-white transition">
        Get Started
      </button>
    </main>
  );
}

export default Home;
