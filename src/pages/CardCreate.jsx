import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCard } from "../redux/slices/cardSlice";
import CardForm from "../components/CardForm/CardForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/home/Navbar";

const CardCreate = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.card.loading);
  const error = useSelector((state) => state.card.error);
  const navigate = useNavigate();

  const handleSubmit = async (formData) => {
  const resultAction = await dispatch(createCard(formData));
  if (createCard.fulfilled.match(resultAction)) {
    const cardId = resultAction.payload._id;  // resultAction.payload is the card object
    if (cardId) {
      localStorage.setItem("myCardId", cardId);
      toast.success("Card created successfully!");
      navigate(`/card/${cardId}/view`);  // redirect to card view page
    } else {
      toast.error("Unexpected response: Card ID missing");
    }
  } else {
    toast.error(`Error: ${resultAction.payload || resultAction.error.message}`);
  }
};



  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 ">
        <CardForm onSubmit={handleSubmit} loading={loading} />
        {error && <div className="text-center text-red-600 mt-2">{error}</div>}
      </div>
    </>
  );
};

export default CardCreate;
