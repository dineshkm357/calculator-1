// src/app/utils/calculations.ts
export const calculateAmounts = (products: any[], sgstRate: number, cgstRate: number, paidAmount: number) => {
    let totalAmount = 0;
    let sgstAmount = 0;
    let cgstAmount = 0;
  
    products.forEach(product => {
      const productTotal = parseFloat(product.totalPrice);
      totalAmount += productTotal;
      sgstAmount += productTotal * (sgstRate / 100);
      cgstAmount += productTotal * (cgstRate / 100);
    });
  
    const allTotal = totalAmount + sgstAmount + cgstAmount;
    const remainingBalance = allTotal - paidAmount;
  
    return { totalAmount, sgstAmount, cgstAmount, allTotal, remainingBalance };
  };
  
  export const formatDate = (date: Date) => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };
  