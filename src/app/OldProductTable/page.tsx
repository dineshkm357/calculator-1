import React from 'react';

const OldItemTable: React.FC<{ oldItems: Array<{ itemName: string; productType: string; weight: string; ratePerGram: string; price: string }> }> = ({ oldItems = [] }) => {
  return (
    <table className="w-full border-collapse border border-gray-200 mt-4">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Old Item Name</th>
          <th className="border border-gray-300 p-2">Product Type</th>
          {/* <th className="border border-gray-300 p-2">Weight</th>
          <th className="border border-gray-300 p-2">Rate Per Gram</th> */}
          <th className="border border-gray-300 p-2">Price</th>
        </tr>
      </thead>
      <tbody>
        {oldItems.length > 0 ? (
          oldItems.map((item, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">{item.itemName}</td>
              <td className="border border-gray-300 p-2">{item.productType}</td>
              {/* <td className="border border-gray-300 p-2">{item.weight}</td>
              <td className="border border-gray-300 p-2">{item.ratePerGram}</td> */}
              <td className="border border-gray-300 p-2">
                {typeof item.price === 'string' ? parseFloat(item.price).toFixed(2) : 'Invalid price'}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={5} className="border border-gray-300 p-2 text-center">No old items</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OldItemTable;
