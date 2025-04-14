import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
  AddressElement,
} from '@stripe/react-stripe-js';
import { useState, } from 'react';
import toast from 'react-hot-toast';

import { Button, } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface FormCheckoutProps {
  openCheckoutForm : boolean;
  setOpenCheckoutForm : ( openCheckoutForm : boolean ) => void;
  onPaymentSuccess ?: () => void;
}

function FormCheckout( { openCheckoutForm, setOpenCheckoutForm, onPaymentSuccess, } : FormCheckoutProps ) {
  const [ loading, setLoading, ] = useState( false );
  const stripe = useStripe();
  const elements = useElements();
  const [ errorMessage, setErrorMessage, ] = useState<string | undefined>( undefined );

  const handleSubmit = async ( event : any ) => {
    setLoading( true );
    event.preventDefault();

    if ( elements == null || stripe == null ) {
      return;
    }
    const { error: submitError, } = await elements.submit();
    if ( submitError ) {
      setErrorMessage( submitError.message );

      return;
    }

    const { error, } = await stripe.confirmPayment( {
      elements,
      redirect: 'if_required',
      // confirmParams: {
      // return_url: `${window.location.origin}/user/checkout/success`,
      // },
    } );
    onPaymentSuccess?.();

    if ( error ) {
      setErrorMessage( error.message );
      toast.error( error.message || '' );
    }
    setLoading( false );
  };

  return (
    <Dialog
      open={ openCheckoutForm }
      onOpenChange={ setOpenCheckoutForm }
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Checkout</DialogTitle>
          <DialogDescription className="text-xs text-gray-500">
            Please enter your payment details to complete the checkout process.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={ handleSubmit }>
          <PaymentElement className="mb-4" />
          <AddressElement
            className="mb-4"
            options={ {
              mode: 'billing',
              allowedCountries: [ 'UA', ],
            } }
          />
          <div className="flex justify-between">
            <Button
              disabled={ loading }
              variant="outline"
              onClick={ () => setOpenCheckoutForm( false ) }
            >Cancel</Button>
            <Button
              type="submit"
              disabled={ loading }
            >
              Pay
            </Button>
          </div>
          { errorMessage && <div className="text-red-500">{ errorMessage }</div> }
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default FormCheckout;
