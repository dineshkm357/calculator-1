import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box } from '@mui/material';

const ProductTable: React.FC<{ products: Array<any> }> = ({ products }) => {
  const productsWithId = products.map((product, index) => ({ id: index, ...product }));

  const columns: GridColDef[] = [
    { field: 'itemName', headerName: ' Name', flex: 0.01 },
    { field: 'productType', headerName: ' Type', flex:  0.01 },
    { field: 'weight', headerName: 'Weight', flex:  0.01 },
    { field: 'ratePerGram', headerName: 'Rate ', flex:  0.01 },
    {
      field: 'chargeDetails',
      headerName: 'Charge ',
      flex:  0.01,
      renderCell: (params) => (
        <div>
          {params.row.chargeAmount} {params.row.chargeType}
        </div>
      ),
    },
    { field: 'discount', headerName: 'Discount', flex:  0.01 },
    { field: 'totalPrice', headerName: 'Total Price', flex:  0.01 },
    { field: '', headerName: '', flex:  0.01 },

  ];

  return (
    <Box
      sx={{
        width: '100%',
        '& .MuiDataGrid-cell': {
          borderRight: '1px solid rgba(224, 224, 224, 1)',
        },
        '& .MuiDataGrid-columnHeaders': {
          borderBottom: '1px solid rgba(224, 224, 224, 1)',
        },
      }}
    >
      <DataGrid
        rows={productsWithId}
        columns={columns}
        hideFooter
        autoHeight
      />
    </Box>
  );
};

export default ProductTable;
