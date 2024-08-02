"use client";
import React, { useState, useEffect } from 'react';

const OldItemForm: React.FC<{ closeModal: () => void; addOldItem: (item: any) => void }> = ({ closeModal, addOldItem }) => {
  const [itemName, setItemName] = useState('');
  const [productType, setProductType] = useState('');
  const [weight, setWeight] = useState('');
  const [ratePerGram, setRatePerGram] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    const weightFloat = parseFloat(weight);
    const ratePerGramFloat = parseFloat(ratePerGram);
    if (!isNaN(weightFloat) && !isNaN(ratePerGramFloat)) {
      setPrice((weightFloat * ratePerGramFloat).toFixed(2));
    }
  }, [weight, ratePerGram]);

  const handleAddOldItem = () => {
    const newItem = {
      itemName,
      productType,
      weight,
      ratePerGram,
      price,
    };

    addOldItem(newItem);
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Old Item</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Product Type</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Weight (grams)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rate Per Gram</label>
          <input
            type="number"
            value={ratePerGram}
            onChange={(e) => setRatePerGram(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            value={price}
            readOnly
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <button
          onClick={handleAddOldItem}
          className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
        >
          Add Old Item
        </button>
        <button
          onClick={closeModal}
          className="w-full bg-red-500 text-white py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default OldItemForm;
