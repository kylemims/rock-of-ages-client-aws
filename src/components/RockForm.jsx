import { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const RockForm = ({ fetchRocks }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const initialRockState = {
    name: "",
    weight: 0,
    typeId: 0,
  };

  const [types, changeTypes] = useState([
    { id: 1, label: "Igneous" },
    { id: 2, label: "Volcanic" },
  ]);
  const [rock, updateRockProps] = useState(initialRockState);
  const navigate = useNavigate();

  const fetchTypes = useCallback(async () => {
    const response = await fetch(`${apiUrl}/types`, {
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
      },
    });
    const types = await response.json();
    changeTypes(types);
  }, [apiUrl]);

  useEffect(() => {
    fetchTypes();
  }, [fetchTypes]);

  const collectRock = async (evt) => {
    evt.preventDefault();

    await fetch(`${apiUrl}/rocks`, {
      method: "POST",
      headers: {
        Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rock),
    });

    await fetchRocks();

    navigate("/allrocks");
  };

  return (
    <main className="container--login">
      <section>
        <form
          className="form--login bg-zinc-900/60 border border-zinc-700 rounded-lg p-8"
          onSubmit={() => {}}>
          <h1 className="text-3xl text-[#ce9e62]">Collect a Rock</h1>
          <fieldset className="mt-4">
            <label className="block mb-1 text-slate-300" htmlFor="rock">
              Name:
            </label>
            <input
              id="rock"
              type="text"
              onChange={(e) => {
                const copy = { ...rock };
                copy.name = e.target.value;
                updateRockProps(copy);
              }}
              value={rock.name}
              className="form-control bg-zinc-800 border-zinc-700 text-slate-100 placeholder:text-slate-400"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label className="block mb-1 text-slate-300" htmlFor="weight">
              Weight in kg:
            </label>
            <input
              id="weight"
              type="number"
              onChange={(e) => {
                const copy = { ...rock };
                copy.weight = e.target.value;
                updateRockProps(copy);
              }}
              value={rock.weight}
              className="form-control bg-zinc-800 border-zinc-700 text-slate-100 placeholder:text-slate-400"
            />
          </fieldset>
          <fieldset className="mt-4">
            <label className="block mb-1 text-slate-300" htmlFor="type">
              {" "}
              Type{" "}
            </label>
            <select
              id="type"
              className="form-control bg-zinc-800 border-zinc-700 text-slate-100 mt-1"
              onChange={(e) => {
                const copy = { ...rock };
                copy.typeId = parseInt(e.target.value);
                updateRockProps(copy);
              }}>
              <option value={0}>- Select a type -</option>
              {types.map((t) => (
                <option key={`type-${t.id}`} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </fieldset>

          <fieldset>
            <button
              type="submit"
              onClick={collectRock}
              className="w-full px-4 py-2.5 rounded-md bg-neutral-400 text-amber-950 font-black mt-6 bg-shadow-sm hover:shadow focus:ring-2 focus:ring-gold/40 hover:bg-[#a83926] transition">
              Collect Rock
            </button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};

RockForm.propTypes = {
  fetchRocks: PropTypes.func.isRequired,
};
