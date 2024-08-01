import React from 'react';

const ItemForm = ({
  customerName,
  setCustomerName,
  customerAddress,
  setCustomerAddress,
  customerMob,
  setCustomerMob,
  itemName,
  setItemName,
  weight,
  setWeight,
  ratePerGram,
  setRatePerGram,
  chargeAmount,
  setChargeAmount,
  discount,
  setDiscount,
  productType,
  setProductType,
  chargeType,
  setChargeType,
  sgstRate,
  setSgstRate,
  cgstRate,
  setCgstRate,
  paidAmount,
  setPaidAmount,
  addProduct,
  handleShowBill,
}) => {
  return (
    <div>
      {/* Customer Details */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Name</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Address</label>
        <input
          type="text"
          value={customerAddress}
          onChange={(e) => setCustomerAddress(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Customer Mob</label>
        <input
          type="text"
          value={customerMob}
          onChange={(e) => setCustomerMob(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1">Item Name</label>
          <input
            type="text"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Product Type</label>
          <input
            type="text"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Rate Per Gram</label>
          <input
            type="number"
            value={ratePerGram}
            onChange={(e) => setRatePerGram(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Charge Amount</label>
          <input
            type="number"
            value={chargeAmount}
            onChange={(e) => setChargeAmount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Discount</label>
          <input
            type="number"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Charge Type</label>
          <select
            value={chargeType}
            onChange={(e) => setChargeType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Charge Type</option>
            <option value="/gram">Per Gram</option>
            <option value="/pieces">Per Pieces</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">SGST Rate</label>
          <input
            type="number"
            value={sgstRate}
            onChange={(e) => setSgstRate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CGST Rate</label>
          <input
            type="number"
            value={cgstRate}
            onChange={(e) => setCgstRate(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Paid Amount</label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(parseFloat(e.target.value) || 0)}
            className="w-full border border-gray-300 p-2 rounded-md"
          />
        </div>
      </div>

      <button
        onClick={addProduct}
        className="w-full bg-blue-500 text-white py-2 rounded-md mb-4"
      >
        Add Product
      </button>
      <button
        onClick={handleShowBill}
        className="w-full bg-green-500 text-white py-2 rounded-md mb-4"
      >
        Show Bill
      </button>
    </div>
  );
};

export default ItemForm;
