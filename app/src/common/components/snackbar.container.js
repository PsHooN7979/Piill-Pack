import React from 'react';
import { useSelector } from 'react-redux';
import Snackbar from './snack.bar';

function SnackbarContainer() {
  const snackbars = useSelector((state) => state.snackBar.snackbars);
  return (
    <>
      {snackbars.map((snackbar) => (
        <Snackbar key={snackbar.id} id={snackbar.id} message={snackbar.message} />
      ))}
    </>
  );
}

export default SnackbarContainer;
