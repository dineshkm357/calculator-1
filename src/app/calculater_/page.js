/* eslint-disable react/jsx-no-undef */
"use client";
import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
const BillCard = ({
  customerName,
  customerAddress,
  customerMob,
  products,
  totalAmount,
  allTotal,
  sgstAmount,
  cgstAmount,
  formattedDate,
  handlePrint,
  paidAmount,
  remainingBalance,
}) => (
  <div className="w-full bg-white shadow-lg rounded-lg p-6 border border-gray-200">
    <h1 className="text-lg font-semibold mb-4 text-center">AJAY JEWELLERS</h1>
    <h4 className="text-sm font-semibold mb-4 text-center">
      Thana road Khukhundoo, Deoria (Near Durga Mandir)<br />
      Mob. No- 7007052900
    </h4>
    <h4 className="text-sm font-semibold mb-4 text-center">
    
    सोन व चांदी के आभूषणों के निर्माता व विक्रेता
    </h4>
    <div className=" flex justify-between ml-0 mb-4">
      <div>
      <p><strong>Customer Name:-</strong> {customerName}</p>
      <p><strong>Customer Address:-</strong> {customerAddress}</p>
      <p><strong>Customer Mob:-</strong> {customerMob}</p>
      </div>
      <div>
      <p className="text-center mb-6"><strong>Date:</strong> {formattedDate}</p>

      {/* <p><strong>Salesman</strong> </p>
      <p><strong>GSTIN:- 9999999999</strong> </p>
      <p><strong>PAN:-100000000</strong> </p>
       */}
      </div>
    </div>

    <table className="w-full mb-4 border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 px-4 py-2">Sr.No</th>
          <th className="border border-gray-300 px-4 py-2">Item Name</th>
          <th className="border border-gray-300 px-4 py-2">Product Type</th>
          <th className="border border-gray-300 px-4 py-2">W/g</th>
          <th className="border border-gray-300 px-4 py-2">Rate</th>
          <th className="border border-gray-300 px-4 py-2">Charge </th>
          <th className="border border-gray-300 px-4 py-2">Dis.</th>
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
            <td className="border border-gray-300 px-4 py-2">{product.discount}</td>
            <td className="border border-gray-300 px-4 py-2">{product.totalPrice}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <table className="w-full border-collapse border border-gray-200 mb-4">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold"> Total Amount</td>
          <td className="border border-gray-300 px-1.5 py-2 font-semibold">{allTotal.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <table className="w-full border-collapse border border-gray-200 mb-4">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold">SGST</td>
          <td className="border border-gray-300 px-4 py-2">{sgstAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold">CGST</td>
          <td className="border border-gray-300 px-4 py-2">{cgstAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold"> All Total Amount:-</td>
          <td className="border border-gray-300 px-4 py-2 font-semibold">{totalAmount.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <table className="w-full border-collapse border border-gray-200 mb-4">
      <tbody>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold">Pay on Cash</td>
          <td className="border border-gray-300 px-4 py-2">{paidAmount.toFixed(2)}</td>
        </tr>
        <tr>
          <td className="border border-gray-300 px-4 py-2 font-semibold">Remaining Balance</td>
          <td className="border border-gray-300 px-4 py-2 font-semibold">{remainingBalance.toFixed(2)}</td>
        </tr>
      </tbody>
    </table>
    <div className="text-center mt-4">
     <p>Thank you for shopping</p>

    </div>
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
  const [allTotal, setAllTotal] = useState(0);

  const [sgstAmount, setSgstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [chargeType, setChargeType] = useState('');
  const [sgstRate, setSgstRate] = useState(1.5); 
  const [cgstRate, setCgstRate] = useState(1.5); 
  const [paidAmount, setPaidAmount] = useState(0); 
  const [remainingBalance, setRemainingBalance] = useState(0); 

  const addProduct = () => {
    const weightFloat = parseFloat(weight);
    const ratePerGramFloat = parseFloat(ratePerGram);
    const chargeAmountFloat = parseFloat(chargeAmount);
    const discountFloat = parseFloat(discount);

    if (!isNaN(weightFloat) && !isNaN(ratePerGramFloat)) {
      let totalPrice;
      if (chargeType === 'per/gram') {
        totalPrice = (weightFloat * ratePerGramFloat) + (weightFloat * chargeAmountFloat) - discountFloat;
      } else if (chargeType === 'per/pieces') {
        totalPrice = (weightFloat * ratePerGramFloat) + chargeAmountFloat - discountFloat;
      } else {
        totalPrice = (weightFloat * ratePerGramFloat) - discountFloat; // Default case if no checkbox is selected
      }

      setProducts([...products, { itemName, productType, weight, ratePerGram, chargeAmount, discount, chargeType, totalPrice: totalPrice.toFixed(2) }]);
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
    const sgst = total * (sgstRate / 100);
    const cgst = total * (cgstRate / 100);
    const grandTotal = total + sgst + cgst;
    setTotalAmount(grandTotal);
    setSgstAmount(sgst);
    setCgstAmount(cgst);
    setRemainingBalance(grandTotal - paidAmount);
  };

  const calculateAllTotal = () => {
    const total = products.reduce((sum, product) => sum + parseFloat(product.totalPrice), 0);
    setAllTotal(total);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    calculateTotal();
  }, [products, sgstRate, cgstRate, paidAmount]);

  useEffect(() => {
    calculateAllTotal();
  }, [products]);

  const handleShowBill = () => {
    setShowBill(true);
  };

  return (
    <Card>
    <div className="flex flex-col items-center start-left min-h-screen bg-gray-100">
      {!showBill ? (
        <div className=" w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Item Details</h1>

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
              <label className="block text-sm font-medium mb-1">Rate per Gram</label>
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
         
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">SGST Rate (%)</label>
            <input
              type="number"
              value={sgstRate}
              onChange={(e) => setSgstRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">CGST Rate (%)</label>
            <input
              type="number"
              value={cgstRate}
              onChange={(e) => setCgstRate(parseFloat(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded-md"
            /> 
          </div>
          </div>
          <div className=" flex justify-center mb-4">
            <label className="block text-sm font-medium mb-1">Charge Type-- </label>
            <div className="flex items-center">
              <label className="mr-2">
                <input
                  type="radio"
                  name="chargeType"
                  value="per/gram"
                  checked={chargeType === 'per/gram'}
                  onChange={(e) => setChargeType(e.target.value)}
                />
                Per Gram
              </label>
              <label>
                <input
                  type="radio"
                  name="chargeType"
                  value="per/pieces"
                  checked={chargeType === 'per/pieces'}
                  onChange={(e) => setChargeType(e.target.value)}
                />
                Per Pieces
              </label>
            </div>
          </div>




          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={addProduct}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Pay on Cash</label>
            <input
              type="number"
              value={paidAmount}
              onChange={(e) => setPaidAmount(parseFloat(e.target.value))}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

        

          <div className="flex justify-center mt-6">
            <button
              type="button"
              onClick={handleShowBill}
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Show Bill
            </button>
          </div>
        </div>
      ) : (
        <BillCard
          customerName={customerName}
          customerAddress={customerAddress}
          customerMob={customerMob}
          products={products}
          totalAmount={totalAmount}
          allTotal={allTotal}
          sgstAmount={sgstAmount}
          cgstAmount={cgstAmount}
          formattedDate={new Date().toLocaleDateString()}
          handlePrint={handlePrint}
          paidAmount={paidAmount}
          remainingBalance={remainingBalance}
        />
      )}
    </div>
    </Card>
  );
};

export default ItemDetailsPage;
