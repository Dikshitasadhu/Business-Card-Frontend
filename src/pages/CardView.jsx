import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { fetchCardById } from "../redux/slices/cardSlice";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import Navbar from "../components/home/Navbar";

const CardView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  // Defensive selector: handle both possible shapes after rehydration or API changes
  const { card, loading, error } = useSelector((state) => {
    // Defensive: handle undefined, wrong shape, or correct shape
    if (state.card && typeof state.card === "object" && "card" in state.card) {
      console.log("Card state (slice):", state.card.card);
      return state.card;
    }
    if (state.card && typeof state.card === "object") {
      // fallback: state.card is an object but missing 'card' key
      console.log("Card state (object fallback):", state.card);
      return { card: null, loading: false, error: null };
    }
    // fallback: state.card is undefined or not an object
    console.log("Card state (undefined fallback):", state.card);
    return { card: null, loading: false, error: null };
  });

  useEffect(() => {
    dispatch(fetchCardById(id));
    // No clearCard dispatch here to avoid flicker
  }, [dispatch, id]);

  useEffect(() => {
    console.log("Current card data in frontend:", card);
  }, [card]);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (error)
    return <div className="text-center text-red-600 py-10">Error: {error}</div>;

  if (!card)
    return <div className="text-center py-10">Business card not found.</div>;

  return (
    <div>
      <Navbar />
      <BusinessCard card={card} />
      <div className="mt-6">
        <Link
          to={`/card/${id}/edit`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Edit Card
        </Link>
        <Link
          to={`/card/${id}/delete`}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
        >
          Delete Card
        </Link>
      </div>
    </div>
  );
};

export default CardView;
