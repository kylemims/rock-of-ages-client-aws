import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const existDialog = useRef();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((authInfo) => {
        if (authInfo.valid) {
          localStorage.setItem("rock_token", JSON.stringify(authInfo));
          navigate("/");
        } else {
          existDialog.current.showModal();
        }
      });
  };

  return (
    <main className="container--login">
      <dialog className="dialog dialog--auth" ref={existDialog}>
        <div>User does not exist</div>
        <button className="button--close" onClick={() => existDialog.current.close()}>
          Close
        </button>
      </dialog>

      <section>
        <form
          className="form--login bg-zinc-900/60 border border-zinc-700 rounded-lg p-8"
          onSubmit={handleLogin}>
          <h1 className="text-center text-3xl font-semibold text-gold mb-2">ROCK OF AGES</h1>
          <h2 className="text-lg text-slate-300 mb-8 text-center">Please sign in</h2>
          <fieldset className="mb-5">
            <label className="block mb-1 text-slate-300" htmlFor="inputEmail">
              {" "}
              Email address{" "}
            </label>
            <input
              type="email"
              id="inputEmail"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              className="form-control bg-zinc-800 border-zinc-700 text-slate-100 placeholder:text-slate-400"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset className="mb-6">
            <label className="block mb-1 text-slate-300" htmlFor="inputPassword">
              {" "}
              Password{" "}
            </label>
            <input
              type="password"
              id="inputPassword"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              className="form-control bg-zinc-800 border-zinc-700 text-slate-100 placeholder:text-slate-400"
              placeholder="Password"
            />
          </fieldset>
          <fieldset>
            <button
              type="submit"
              className="button w-full py-2.5 rounded-md bg-rust text-white hover:opacity-90 transition">
              Sign in
            </button>
          </fieldset>
        </form>
      </section>
      <div className="loginLinks">
        <section className="link--register">
          <Link className="underline text-slate-400 hover:text-gold" to="/register">
            Not a member yet?
          </Link>
        </section>
      </div>
    </main>
  );
};
