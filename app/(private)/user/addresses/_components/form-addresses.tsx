import { zodResolver, } from '@hookform/resolvers/zod';
import React, { useState, } from 'react';
import { useForm, } from 'react-hook-form';
import { toast, } from 'react-hot-toast';
import { z, } from 'zod';

import { addNewAddress, updateAddressById, } from '@/actions/addresses';
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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input, } from '@/components/ui/input';
import { Textarea, } from '@/components/ui/textarea';
import usersStore, { IUsersStore, } from '@/store/store-users';

interface FormAddressesProps {
  openAddressForm : boolean;
  setOpenAddressForm : ( openAddressForm : boolean ) => void;
  initialValues ?: any;
  formType ?: 'add' | 'edit';
  onSave ?: () => void;
}

function FormAddresses( {
  openAddressForm,
  setOpenAddressForm,
  initialValues,
  formType,
  onSave,
} : FormAddressesProps ) {
  const [ loading, setLoading, ] = useState( false );
  const { user, } = usersStore() as IUsersStore;

  const schemaFormAddress = z.object( {
    name: z.string().nonempty(),
    email: z.string().email(),
    phone_number: z.string().nonempty(),
    country: z.string().nonempty(),
    city: z.string().nonempty(),
    postal_code: z.string().nonempty(),
    address: z.string().nonempty(),
  } );
  const form = useForm<z.infer<typeof schemaFormAddress>>( {
    resolver: zodResolver( schemaFormAddress ),
    defaultValues: {
      name: initialValues?.name || '',
      email: initialValues?.email || '',
      phone_number: initialValues?.phone_number || '',
      country: initialValues?.country || '',
      city: initialValues?.city || '',
      postal_code: initialValues?.postal_code || '',
      address: initialValues?.address || '',
    },
  } );

  async function onSubmit( values : z.infer<typeof schemaFormAddress> ) {
    try {
      setLoading( true );

      if ( formType === 'add' ) {
        const { success, message, } = await addNewAddress( {
          ...values,
          user_id: user.id,
        } );
        if ( success ) {
          toast.success( message );
          setOpenAddressForm( false );
          form.reset();
          onSave?.();
        } else {
          toast.error( message );
        }
      } else if ( formType === 'edit' ) {
        console.log( values );
        const { success, message, } = await updateAddressById( initialValues.id, values );
        if ( success ) {
          toast.success( message );
          setOpenAddressForm( false );
          form.reset();
          onSave?.();
        } else {
          toast.error( message );
        }
      }
    } catch ( error ) {
      console.error( error );
      toast.error( 'Error submitting form' );
    } finally {
      setLoading( false );
    }
  }

  return (
    <Dialog
      open={ openAddressForm }
      onOpenChange={ setOpenAddressForm }
    >
      <DialogContent className="lg:max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>{ formType === 'add' ? 'Add New Address' : 'Edit Address' }</DialogTitle>
          <DialogDescription>
            Add / Edit your address details for the shipping and billing purposes.
          </DialogDescription>
        </DialogHeader>

        <Form { ...form }>
          <form
            onSubmit={ form.handleSubmit( onSubmit ) }
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            <FormField
              control={ form.control }
              name="name"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your name"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="email"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="phone_number"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      { ...field }
                      value={ field.value }
                      onChange={ ( e ) => {
                        const value = e.target.value;
                        field.onChange( value.replace( /[^0-9]/g, '' ) );
                      } }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="country"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Country
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter country"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="city"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    City
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter city"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="postal_code"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel>
                    Postal Code
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter postal code"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <FormField
              control={ form.control }
              name="address"
              render={ ( { field, } ) => (
                <FormItem className="flex flex-col gap-2 col-span-3">
                  <FormLabel>
                    Address
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter address"
                      { ...field }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              ) }
            />

            <div className="col-span-3 flex justify-between mt-4">
              <Button
                variant="outline"
                onClick={ () => setOpenAddressForm( false ) }
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="w-[300px]"
                disabled={ loading }
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>

  );
}

export default FormAddresses;