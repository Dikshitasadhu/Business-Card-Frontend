import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCards } from '../redux/slices/cardSlice';
import { Link } from 'react-router-dom';
import Navbar from '../components/home/Navbar';

const MyCardsPage = () => {
  const dispatch = useDispatch();
  const { cards, loading, error } = useSelector(state => ({
    cards: state.card.cards,
    loading: state.card.loading,
    error: state.card.error,
  }));

  useEffect(() => {
    dispatch(fetchUserCards());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">My Business Cards</h1>

        {loading && <p>Loading cards...</p>}
        {error && <p className="text-red-600">Error: {error}</p>}

        {cards && cards.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200 border">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {cards.map(card => (
                <tr key={card._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{card.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{card.position}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{card.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link to={`/card/${card._id}/view`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No cards found. <Link to="/card/create" className="text-blue-600">Create one</Link></p>
        )}
      </div>
    </>
  );
};

export default MyCardsPage;
