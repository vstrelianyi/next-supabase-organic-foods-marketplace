import React from 'react';

interface FormAddressesProps {
  openAddressForm : boolean;
  setOpenAddressForm : ( openAddressForm : boolean ) => void;
  initialValues ?: any;
  formType ?: 'add' | 'edit';
}

function FormAddresses( {
  openAddressForm,
  setOpenAddressForm,
  initialValues,
  formType,
} : FormAddressesProps ) {
  return (
    <div>FormAddresses</div>
  );
}

export default FormAddresses;