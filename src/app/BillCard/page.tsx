import React from 'react';
import ProductTable from '../ProductTable/page';
import OldProductTable from '../OldProductTable/page';

const BillCard = ({
  customerName,
  customerAddress,
  customerMob,
  products,
  oldItems = [],
  totalAmount = 0,
  allTotal = 0,
  sgstAmount = 0,
  cgstAmount = 0,
  formattedDate,
  handlePrint,
  paidAmount = 0,
  remainingBalance = 0,
}) => {
  const newItemsTotal = products.reduce((sum, product) => sum + parseFloat(product.totalPrice || '0'), 0);
  const oldItemsTotal = oldItems.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);

  return (
    <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Bill_____ Details</h1>
      <div className=" flex justify-between ml-0 mb-4">
      <div>
      <p><strong>Customer Name:-</strong> {customerName}</p>
      <p><strong>Customer Address:-</strong> {customerAddress}</p>
      <p><strong>Customer Mob:-</strong> {customerMob}</p>
      </div>
      <div>
      <p className="text-center mb-6"><strong>Date:</strong> {formattedDate}</p>
      </div>
    </div>
      <ProductTable products={products} />
      <OldProductTable oldItems={oldItems} /> {/* Display old items */}
      <div className="mt-4">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">Sub Total (New Items)</td>
              <td className="px-4 py-2 border">{newItemsTotal.toFixed(2)}</td>
            </tr>
          
            <tr>
              <td className="px-4 py-2 border">SGST ({sgstAmount.toFixed(2)})</td>
              <td className="px-4 py-2 border">{sgstAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">CGST ({cgstAmount.toFixed(2)})</td>
              <td className="px-4 py-2 border">{cgstAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Sub Total (Old Items)</td>
              <td className="px-4 py-2 border">{oldItemsTotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Total Amount</td>
              <td className="px-4 py-2 border">{totalAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Paid Amount</td>
              <td className="px-4 py-2 border">{paidAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">Remaining Balance</td>
              <td className="px-4 py-2 border">{remainingBalance.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <button
        onClick={handlePrint}
        className="w-full bg-blue-500 text-white py-2 rounded-md mt-4"
      >
        Print Bill
      </button>
    </div>
  );
};

export default BillCard;
