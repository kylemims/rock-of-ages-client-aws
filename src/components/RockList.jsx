import { useEffect } from "react";
import PropTypes from "prop-types";

export const RockList = ({ rocks, fetchRocks, showAll }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetchRocks(showAll);
  }, [showAll, fetchRocks]);

  const displayRocks = () => {
    if (rocks && rocks.length) {
      return rocks.map((rock) => (
        <div
          key={`key-${rock.id}`}
          className="border border-zinc-700/70 p-5 rounded-md mt-5 bg-zinc-900/50 transition hover:ring-1 hover:ring-zinc-600/50 hover:-translate-y-px">
          <div className="text-slate-100 font-medium">
            {rock.name} <span className="text-silver font-normal">({rock.type.label})</span>
          </div>
          <div className="text-slate-400 mt-1">
            In the collection of {rock.user.first_name} {rock.user.last_name}
          </div>
          {showAll ? (
            ""
          ) : (
            <div>
              <button
                onClick={async () => {
                  const response = await fetch(`${apiUrl}/rocks/${rock.id}`, {
                    method: "DELETE",
                    headers: {
                      Authorization: `Token ${JSON.parse(localStorage.getItem("rock_token")).token}`,
                    },
                  });

                  if (response.status === 204) {
                    fetchRocks(showAll);
                  }
                }}
                className="mt-3 border border-zinc-700 bg-rust text-white px-3 py-1 rounded hover:opacity-90">
                Delete
              </button>
            </div>
          )}
        </div>
      ));
    }

    return <h3>Loading Rocks...</h3>;
  };

  return (
    <>
      <h1 className="text-3xl text-gold">Rock List</h1>
      {displayRocks()}
    </>
  );
};

RockList.propTypes = {
  rocks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.shape({
        id: PropTypes.number,
        label: PropTypes.string,
      }).isRequired,
      user: PropTypes.shape({
        first_name: PropTypes.string,
        last_name: PropTypes.string,
      }).isRequired,
    })
  ),
  fetchRocks: PropTypes.func.isRequired,
  showAll: PropTypes.bool,
};
