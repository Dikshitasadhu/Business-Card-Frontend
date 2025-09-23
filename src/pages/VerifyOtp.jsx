import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../redux/slices/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthLoading, error } = useSelector(state => state.auth);

  // Pre-fill email from navigation state if available
  const prefillEmail = location.state?.email || '';
  const [email, setEmail] = useState(prefillEmail);
  const [otp, setOtp] = useState('');

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !otp) {
    toast.error('Please enter both email and OTP');
    return;
  }
  const result = await dispatch(verifyOtp({ email, otp }));
  if (verifyOtp.fulfilled.match(result)) {
    toast.success('OTP Verified successfully!');
    navigate('/card/create'); // protected route
  } else {
    toast.error(result.payload?.error || 'OTP verification failed');
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="max-w-md w-full bg-white p-8 rounded shadow space-y-4">
        <h2 className="text-lg font-semibold text-center">Verify OTP</h2>

        <input
          type="email"
          placeholder="Enter your email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full border p-2 rounded"
          value={otp}
          onChange={e => setOtp(e.target.value)}
          required
          maxLength={6}
        />

        <button
          type="submit"
          disabled={isAuthLoading}
          className="w-full bg-blue-600 text-white p-3 rounded disabled:opacity-50"
        >
          {isAuthLoading ? 'Verifying...' : 'Verify OTP'}
        </button>

        {error && <p className="text-red-600 text-center">{error}</p>}
      </form>
    </div>
  );
};

export default VerifyOtp;
