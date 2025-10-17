import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  return (
    <main className="px-6 py-8">
      <div className="page-container">
        <div className="title-container">
          <span className="first-word">Rock</span>
          <span className="other-words">of Ages</span>
        </div>

        <p className="mt-2 text-[#cbd1d9] rock-paragraph">Collect, view, and manage your rocks.</p>
        <button
          onClick={() => navigate("/create")}
          className="mt-6 px-6 py-3 bg-[#a8a29e] font-black text-[#244244] rounded-md hover:bg-[#a83926] hover:text-white transition">
          Get Started
        </button>
      </div>
    </main>
  );
}

export default Home;
