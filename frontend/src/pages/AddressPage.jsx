import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddressPage = () => {
  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save address logic here (e.g., API call or context update)
    navigate("/review", { state: { address } });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-800 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-emerald-400">Shipping Address</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="name"
          placeholder="Full Name"
          value={address.name}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="street"
          placeholder="Street Address"
          value={address.street}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="city"
          placeholder="City"
          value={address.city}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="state"
          placeholder="State"
          value={address.state}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="zip"
          placeholder="ZIP Code"
          value={address.zip}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 rounded bg-gray-700 text-white"
          type="text"
          name="country"
          placeholder="Country"
          value={address.country}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
        >
          Save Address
        </button>
      </form>
    </div>
  );
};

export default AddressPage;