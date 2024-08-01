"use client";
import React, { useState, useEffect } from 'react';
import ItemForm from '../itemForm/page';
import ProductTable from '../ProductTable/page';
import BillCard from '../BillCard/page';
import OldItemForm from '../OldItemForm/page';

const ItemDetails: React.FC = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerMob, setCustomerMob] = useState('');

  const [itemName, setItemName] = useState('');
  const [weight, setWeight] = useState('');
  const [ratePerGram, setRatePerGram] = useState('');
  const [chargeAmount, setChargeAmount] = useState('');
  const [discount, setDiscount] = useState('');
  const [productType, setProductType] = useState('');
  const [chargeType, setChargeType] = useState('');
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [allTotal, setAllTotal] = useState(0);

  const [sgstAmount, setSgstAmount] = useState(0);
  const [cgstAmount, setCgstAmount] = useState(0);
  const [showBill, setShowBill] = useState(false);
  const [sgstRate, setSgstRate] = useState(1.5); 
  const [cgstRate, setCgstRate] = useState(1.5); 
  const [paidAmount, setPaidAmount] = useState(0); 
  const [remainingBalance, setRemainingBalance] = useState(0); 

  const [showOldItemForm, setShowOldItemForm] = useState(false);
  const [oldItems, setOldItems] = useState([]);

  const addProduct = () => {
    const weightFloat = parseFloat(weight);
    const ratePerGramFloat = parseFloat(ratePerGram);
    const chargeAmountFloat = parseFloat(chargeAmount);
    const discountFloat = parseFloat(discount);

    if (!isNaN(weightFloat) && !isNaN(ratePerGramFloat)) {
      let totalPrice;
      if (chargeType === '/gram') {
        totalPrice = (weightFloat * ratePerGramFloat) + (weightFloat * chargeAmountFloat) - discountFloat;
      } else if (chargeType === '/pieces') {
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

  const addOldItem = (item: any) => {
    setOldItems([...oldItems, item]);
  };

  const calculateTotal = () => {
    const newItemsTotal = products.reduce((sum, product) => sum + parseFloat(product.totalPrice || '0'), 0);
    const oldItemsTotal = oldItems.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);
    const total = newItemsTotal + oldItemsTotal;
    const sgst = newItemsTotal * (sgstRate / 100);
    const cgst = newItemsTotal * (cgstRate / 100);
    const grandTotal = total + sgst + cgst;
    setTotalAmount(grandTotal);
    setSgstAmount(sgst);
    setCgstAmount(cgst);
    setRemainingBalance(grandTotal - parseFloat(paidAmount || '0'));
  };

  const calculateAllTotal = () => {
    const total = products.reduce((sum, product) => sum + parseFloat(product.totalPrice || '0'), 0) +
                  oldItems.reduce((sum, item) => sum + parseFloat(item.price || '0'), 0);
    setAllTotal(total);
  };

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    calculateTotal();
  }, [products, oldItems, sgstRate, cgstRate, paidAmount]);

  useEffect(() => {
    calculateAllTotal();
  }, [products, oldItems]);

  const handleShowBill = () => {
    setShowBill(true);
  };

  return (
    <div className="container mx-auto p-4">
      {!showBill ? (
        <div className="w-full max-w-4xl p-6 bg-white shadow-md rounded-lg">
          <h1 className="text-2xl font-semibold mb-4">Item Details</h1>
          <ItemForm
            customerName={customerName}
            setCustomerName={setCustomerName}
            customerAddress={customerAddress}
            setCustomerAddress={setCustomerAddress}
            customerMob={customerMob}
            setCustomerMob={setCustomerMob}
            itemName={itemName}
            setItemName={setItemName}
            weight={weight}
            setWeight={setWeight}
            ratePerGram={ratePerGram}
            setRatePerGram={setRatePerGram}
            chargeAmount={chargeAmount}
            setChargeAmount={setChargeAmount}
            discount={discount}
            setDiscount={setDiscount}
            productType={productType}
            setProductType={setProductType}
            chargeType={chargeType}
            setChargeType={setChargeType}
            sgstRate={sgstRate}
            setSgstRate={setSgstRate}
            cgstRate={cgstRate}
            setCgstRate={setCgstRate}
            paidAmount={paidAmount}
            setPaidAmount={setPaidAmount}
            addProduct={addProduct}
            handleShowBill={handleShowBill}
          />

          <button
            onClick={() => setShowOldItemForm(true)}
            className="w-full bg-yellow-500 text-white py-2 rounded-md mb-4"
          >
            Add Old Items
          </button>

          {products.length > 0 && (
            <ProductTable products={products} />
          )}

          {oldItems.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold mb-2">Old Items</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Item Name</th>
                    <th className="px-4 py-2 border">Product Type</th>
                    <th className="px-4 py-2 border">Weight</th>
                    <th className="px-4 py-2 border">Rate Per Gram</th>
                    <th className="px-4 py-2 border">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {oldItems.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2 border">{item.itemName}</td>
                      <td className="px-4 py-2 border">{item.productType}</td>
                      <td className="px-4 py-2 border">{item.weight}</td>
                      <td className="px-4 py-2 border">{item.ratePerGram}</td>
                      <td className="px-4 py-2 border">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <BillCard
          customerName={customerName}
          customerAddress={customerAddress}
          customerMob={customerMob}
          products={products}
          oldItems={oldItems}
          totalAmount={totalAmount}
          sgstAmount={sgstAmount}
          cgstAmount={cgstAmount}
          formattedDate={new Date().toLocaleDateString()}
          handlePrint={handlePrint}
          paidAmount={paidAmount}
          remainingBalance={remainingBalance}
          allTotal={allTotal}
        />
      )}

      {showOldItemForm && (
        <OldItemForm closeModal={() => setShowOldItemForm(false)} addOldItem={addOldItem} />
      )}
    </div>
  );
};

export default ItemDetails;
