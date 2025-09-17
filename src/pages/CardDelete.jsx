import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchCardById, deleteCard, clearCard } from "../redux/slices/cardSlice";
import BusinessCard from "../components/BusinessCard/BusinessCard";
import { toast } from "react-hot-toast";

const CardDelete = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);

  const { card, loading, error } = useSelector(state => ({
    card: state.card.card,
    loading: state.card.loading,
    error: state.card.error,
  }));

  useEffect(() => {
    dispatch(fetchCardById(id));
    return () => {
      dispatch(clearCard());
    };
  }, [dispatch, id]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteCard(id)).unwrap();
      toast.success("Card deleted successfully");
      navigate("/mycards");
    } catch (err) {
      toast.error(`Failed to delete: ${err}`);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;
  if (!card) return <div className="text-center py-10">Card not found</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">Delete Business Card</h1>
      <BusinessCard card={card} />
      <div className="max-w-md mx-auto text-center mt-8">
        {!confirmDelete ? (
          <>
            <p>Are you sure you want to delete this card?</p>
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setConfirmDelete(true)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                disabled={loading}
              >
                Confirm Delete
              </button>
              <Link
                to={`/card/${id}/view`}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="text-red-700 font-semibold mb-4">Please click final confirm to delete</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleDelete}
                className="bg-red-800 text-white px-6 py-2 rounded hover:bg-red-900 transition"
                disabled={loading}
              >
                Final Confirm
              </button>
              <button
                onClick={() => setConfirmDelete(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                disabled={loading}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CardDelete;
