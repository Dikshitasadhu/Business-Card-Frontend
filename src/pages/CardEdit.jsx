import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CardForm from "../components/CardForm/CardForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchCardById, updateCard } from "../redux/slices/cardSlice";
import { toast } from "react-hot-toast";

const CardEdit = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { card, loading, error } = useSelector((state) => state.card);

  useEffect(() => {
    dispatch(fetchCardById(id));
  }, [dispatch, id]);

  const handleSubmit = async (formData) => {
    const resultAction = await dispatch(updateCard({ id, formData }));
    if (updateCard.fulfilled.match(resultAction)) {
      toast.success("Card updated successfully!");
      navigate(`/card/${id}/view`);
    } else {
      toast.error(`Error: ${resultAction.payload || resultAction.error.message}`);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!card) return null;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <h1 className="text-center text-3xl font-bold mb-6">Edit Business Card</h1>
      <CardForm initialData={card} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
};

export default CardEdit;
