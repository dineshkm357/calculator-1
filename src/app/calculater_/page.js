"use client";
import React, { useState, useEffect } from 'react';

const BillCard = ({ customerName, customerAddress, customerMob, products, totalAmount, sgstAmount, cgstAmount, formattedDate, handlePrint }) => {
  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h1 className="text-lg font-semibold mb-4 text-center">AJAY JEWELLERS</h1>
      <h4 className="text-sm font-semibold mb-4 text-center">
        Thana road Khukhundoo, Deoria (Near Durga Mandir)<br />
        Mob. No- 7800352942
      </h4>
      <p className="text-center mb-6"><strong>Date:</strong> {formattedDate}</p>
      <div className="ml-0 mb-4">
        <p><strong>Customer Name:-</strong> {customerName}</p>
        <p><strong>Customer Address:-</strong> {customerAddress}</p>
        <p><strong>Customer Mob:-</strong> {customerMob}</p>
      </div>

      <table className="w-full mb-4 border-collapse border border-gray-200 mr-20">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Sr.No</th>
            <th className="border border-gray-300 px-4 py-2">Item Name</th>
            <th className="border border-gray-300 px-4 py-2">Product Type</th>
            <th className="border border-gray-300 px-4 py-2">Weight</th>
            <th className="border border-gray-300 px-4 py-2">Rate</th>
            <th className="border border-gray-300 px-4 py-2">Charge Amount</th>
            {/* <th className="border border-gray-300 px-4 py-2">Charge Type</th> */}
            <th className="border border-gray-300 px-4 py-2">Discount</th>
            <th className="border border-gray-300 px-4 py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-300 px-4 py-2">{product.itemName}</td>
              <td className="border border-gray-300 px-4 py-2">{product.productType}</td>
              <td className="border border-gray-300 px-4 py-2">{product.weight}</td>
              <td className="border border-gray-300 px-4 py-2">{product.ratePerGram}</td>
              <td className="border border-gray-300 px-4 py-2">{product.chargeAmount} {product.chargeType}</td>
              {/* <td className="border border-gray-300 px-4 py-2">{product.chargeType}</td> */}
              <td className="border border-gray-300 px-4 py-2">{product.discount}</td>
              <td className="border border-gray-300 px-4 py-2">{product.totalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border-collapse border border-gray-200 mb-4">
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">SGST------1.50%</td>
            <td className="border border-gray-300 px-4 py-2">{sgstAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">CGST------1.50%</td>
            <td className="border border-gray-300 px-4 py-2">{cgstAmount.toFixed(2)}</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-semibold">Total Amount</td>
            <td className="border border-gray-300 px-4 py-2 font-semibold">{totalAmount.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>

      <div className="text-center mt-4">
        <button
          type="button"
          onClick={handlePrint}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
};

const ItemDetailsPage = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMob, setCustomerMob] = useState('');

  const [itemName, setItemName] = useState('');
  const [weight, setWeight] = useState('');
  const [ratePerGram, setRatePerGram] = useState('');
  const [chargeAmount, setChargeAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [productType, setProductType] = useState('');
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [sgstAmount, setSgstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [chargeType, setChargeType] = useState('');
  const gstRate = 0.015; // SGST and CGST rate (1.50%)

  const addProduct = () => {
    const weightFloat = parseFloat(weight);
    const ratePerGramFloat = parseFloat(ratePerGram);
    const chargeAmountFloat = parseFloat(chargeAmount);
    const discountFloat = parseFloat(discount);

    if (!isNaN(weightFloat) && !isNaN(ratePerGramFloat)) {
      let totalPrice;
      if (chargeType === 'parti/gram') {
        totalPrice = (weightFloat * ratePerGramFloat) + (weightFloat * chargeAmountFloat) - discountFloat;
      } else if (chargeType === 'parti/pieces') {
        totalPrice = (weightFloat * ratePerGramFloat) + chargeAmountFloat - discountFloat;
      } else {
        totalPrice = (weightFloat * ratePerGramFloat) - discountFloat; // Default case if no checkbox is selected
      }

      setProducts([...products, {customerName, itemName, productType, weight, ratePerGram, chargeAmount, discount, chargeType, totalPrice: totalPrice.toFixed(2) }]);
      setItemName('');
      setWeight('');
      setRatePerGram('');
      setChargeAmount('');
      setDiscount('');
      setProductType('');
      setChargeType('');
    }
  };

  const calculateTotal = () => {
    const total = products.reduce((sum, product) => sum + parseFloat(product.totalPrice), 0);
    const sgst = total * gstRate;
    const cgst = total * gstRate;
    setTotalAmount(total + sgst + cgst);
    setSgstAmount(sgst);
    setCgstAmount(cgst);
  };

  useEffect(() => {
    if (showBill) {
      calculateTotal();
    }
  }, [showBill, products]);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date();
  const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
  const formattedDate = currentDate.toLocaleDateString(undefined, options);

  const handleChargeTypeChange = (event) => {
    setChargeType(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-4xl px-4">
        {!showBill ? (
          <div className="bg-white shadow-md rounded-lg p-8">
            <h1 className="text-xl font-semibold mb-6 text-center">PRODUCT DETAILS</h1>
            <form>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter the customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter the customer address"
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Enter the customer Mobile No.-"
                  value={customerMob}
                  onChange={(e) => setCustomerMob(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Product Type"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Weight (grams)"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Rate per Gram"
                  value={ratePerGram}
                  onChange={(e) => setRatePerGram(e.target.value)}
                  required
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label className="inline-flex items-center mr-4">
                  <input
                    type="radio"
                    value="parti/pieces"
                    checked={chargeType === 'parti/pieces'}
                    onChange={handleChargeTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">parti/pieces</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="parti/gram"
                    checked={chargeType === 'parti/gram'}
                    onChange={handleChargeTypeChange}
                    className="form-radio"
                  />
                  <span className="ml-2">parti/gram</span>
                </label>
              </div>
              {chargeType && (
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder={`Charge Amount (${chargeType})`}
                    value={chargeAmount}
                    onChange={(e) => setChargeAmount(e.target.value)}
                    className="mt-1 px-4 py-2 w-full border rounded-md"
                  />
                </div>
              )}
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Discount"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="mt-1 px-4 py-2 w-full border rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={addProduct}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Product
              </button>
            </form>
            <button
              type="button"
              onClick={() => setShowBill(true)}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              View Bill
            </button>
          </div>
        ) : (
          <BillCard
            customerName={customerName}
            customerAddress={customerAddress}
            customerMob={customerMob}
            products={products}
            totalAmount={totalAmount}
            sgstAmount={sgstAmount}
            cgstAmount={cgstAmount}
            formattedDate={formattedDate}
            handlePrint={handlePrint}
          />
        )}
      </div>
    </div>
  );
};

export default ItemDetailsPage;
