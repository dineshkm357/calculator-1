//"use client";
import React, { useState, useEffect } from 'react';

const BillDetails = ({ products, customerName, totalAmount, gstRate, gstAmount }) => {
    const handlePrint = () => {
        window.print();
    };
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    const formattedDate = currentDate.toLocaleDateString(undefined, options);

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-lg font-semibold mb-2 text-center">AJAY JEWELLERS</h1>
            <h4 className="text-sm font-semibold mb-2 text-center">Thana road Khukhundoo(Near Durga Mandir)<br />Mob.No- 7800352942</h4>
            <p className="text-center"><strong>Date:</strong> {formattedDate}</p>
            <h1>_________________________________________________</h1>
            <p><strong>Customer Name:</strong> {customerName}</p>
            {products.map((product, index) => (
                <div key={index}>
                    <p><strong>Item Name:_________</strong> {product.itemName}</p>
                    <p><strong>Weight (grams):____</strong> {product.weight}</p>
                    <p><strong>Rate per Gram:______</strong> {product.ratePerGram}</p>
                    <p><strong>Charge Amount:_____</strong> {product.chargeAmount}</p>
                    <p><strong>Total Price:__________</strong> {product.totalPrice}</p>
                </div>
            ))}
            <p><strong>GST ({(gstRate * 100).toFixed(2)}%)_______:</strong> {gstAmount.toFixed(2)}</p>
            <p><strong>Total Amount:_______</strong> {totalAmount.toFixed(2)}</p>
            <button onClick={handlePrint} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Print</button>---Thank you for shopping--
        </div>
    );
};

const ItemDetailsPage = () => {
    const [customerName, setCustomerName] = useState('');
    const [itemName, setItemName] = useState('');
    const [weight, setWeight] = useState('');
    const [ratePerGram, setRatePerGram] = useState('');
    const [chargeAmount, setChargeAmount] = useState('');
    const [products, setProducts] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [gstAmount, setGstAmount] = useState(0);
    const [chargePerGram, setChargePerGram] = useState(true);
    const [chargePerPiece, setChargePerPiece] = useState(false);
    const [showBill, setShowBill] = useState(false);
    const gstRate = 0.12; // GST rate (12%)

    const addProduct = () => {
        const weightFloat = parseFloat(weight);
        const ratePerGramFloat = parseFloat(ratePerGram);
        const chargeAmountFloat = parseFloat(chargeAmount);

        if (!isNaN(weightFloat) && !isNaN(ratePerGramFloat)) {
            let totalPrice;
            if (chargePerGram) {
                totalPrice = (weightFloat * ratePerGramFloat) + (weightFloat * chargeAmountFloat);
            } else if (chargePerPiece) {
                totalPrice = (weightFloat * ratePerGramFloat) + chargeAmountFloat;
            } else {
                totalPrice = weightFloat * ratePerGramFloat; // Default case if no checkbox is selected
            }

            setProducts([...products, { itemName, weight, ratePerGram, chargeAmount, totalPrice: totalPrice.toFixed(2) }]);
            setItemName('');
            setWeight('');
            setRatePerGram('');
            setChargeAmount('');
        }
    };

    const calculateTotal = () => {
        const total = products.reduce((sum, product) => sum + parseFloat(product.totalPrice), 0);
        const gst = total * gstRate;
        setTotalAmount(total+gst);
        setGstAmount(gst);
    };

    useEffect(() => {
        if (showBill) {
            calculateTotal();
        }
    }, [showBill, products]);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="max-w-md w-full bg-white shadow-md rounded-lg p-8">
                <h1 className="text-xl font-semibold mb-6 text-center">PRODUCT DETAILS</h1>
                <form>
                    <div className="mb-4">
                        <input type="text" placeholder="Enter the customer name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="mt-1 px-4 py-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <input type="text" placeholder="Product Name:" value={itemName} onChange={(e) => setItemName(e.target.value)} required className="mt-1 px-4 py-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <input type="text" placeholder="Weight (grams):" value={weight} onChange={(e) => setWeight(e.target.value)} required className="mt-1 px-4 py-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <input type="text" placeholder="Rate per Gram:" value={ratePerGram} onChange={(e) => setRatePerGram(e.target.value)} required className="mt-1 px-4 py-2 w-full border rounded-md" />
                    </div>
                    <div className="mb-4">
                        <input type="text" placeholder="Charge Amount:" value={chargeAmount} onChange={(e) => setChargeAmount(e.target.value)} className="mt-1 px-4 py-2 w-full border rounded-md" />
                    </div>
                    <div className="flex items-center mb-4">
                        <label className="mr-2">
                            <input type="checkbox" checked={chargePerGram} onChange={() => { setChargePerGram(!chargePerGram); setChargePerPiece(false); }} className="mr-1" />
                            Charge per Gram
                        </label>
                        <label className="mr-2">
                            <input type="checkbox" checked={chargePerPiece} onChange={() => { setChargePerPiece(!chargePerPiece); setChargePerGram(false); }} className="mr-1" />
                            Charge per Piece
                        </label>
                    </div>
                    <button type="button" onClick={addProduct} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Add Product</button>
                </form>
                <button type="button" onClick={() => setShowBill(true)} className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">View Bill</button>
                {showBill && (
                    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
                        <div className="max-w-md w-full bg-white rounded-lg p-8">
                            <BillDetails customerName={customerName} products={products} totalAmount={totalAmount} gstRate={gstRate} gstAmount={gstAmount} />
                            <button onClick={() => setShowBill(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Close</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ItemDetailsPage;
