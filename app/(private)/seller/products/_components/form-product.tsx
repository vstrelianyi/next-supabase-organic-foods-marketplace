'use client';

import { zodResolver, } from '@hookform/resolvers/zod';
import { X, } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, } from 'next/navigation';
import { useMemo, useState, } from 'react';
import { useForm, } from 'react-hook-form';
import toast from 'react-hot-toast';
import { z, } from 'zod';

import { addNewProduct, editProductById, } from '@/actions/products';
import { Button, } from '@/components/ui/button';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea, } from '@/components/ui/textarea';
import { productCategories, } from '@/constants/index';
import usersStore, { IUsersStore, } from '@/store/store-users';
import { uploadFileAndGetUrl, } from '@/utils/file-uploads';

interface TFormProduct{
  formType ?: 'add' | 'edit'
  initialValues ?: {
    id ?: string,
    name ?: string,
    description ?: string,
    price ?: number,
    category ?: string,
    stock ?: number,
    images ?: [string],
  }
}

function FormProduct( { formType = 'add', initialValues = {}, } : TFormProduct ) {
  const { user, } = usersStore() as IUsersStore;
  const router = useRouter();
  const [ selectedFiles, setSelectedFiles, ] = useState<any[]>( [] );
  const [ existingProductImages, setExistingProductImages, ] = useState<any[]>( initialValues?.images || [] );
  const [ loading, setLoading, ] = useState<boolean>( false );

  const schemaFormProduct = z.object( {
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    category: z.string().nonempty(),
    stock: z.number().positive(),
  } );
  const form = useForm<z.infer<typeof schemaFormProduct>>( {
    resolver: zodResolver( schemaFormProduct ),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      price: initialValues?.price || 0,
      category: initialValues?.category || '',
      stock: initialValues?.stock || 0,
    },
  } );

  async function onSubmit( values : z.infer<typeof schemaFormProduct> ) {
    try {
      setLoading( true );
      const urls = [ ...existingProductImages, ];
      for ( const file of selectedFiles ) {
        const response = await uploadFileAndGetUrl( file );
        if ( response.success ) {
          urls.push( response.url );
        } else {
          throw new Error( response.message );
        }
      }

      const payload = {
        ...values,
        images: urls,
        seller_id: user?.id,
      };

      let response : any = null;

      if ( formType === 'add' ) {
        response = await addNewProduct( payload );
      }
      if ( formType === 'edit' ) {
        response = await editProductById( initialValues.id || '', payload );
      }

      if ( !response.success ) {
        throw new Error( response.message );
      } else {
        toast.success( response.message );
        router.push( '/seller/products' );
      }
    } catch ( error ) {
      console.log( error );
      toast.error( 'Error submitting form data' );
    } finally {
      setLoading( false );
    }
  }

  const imageUrlsToDisplay = useMemo( () => {
    const urls : any = [];
    if ( selectedFiles.length === 0 ) {
      return urls;
    }

    selectedFiles.forEach( ( file ) => {
      urls.push( URL.createObjectURL( file ) );
    } );

    return urls;
  }, [ selectedFiles, ] );

  const onSelectedImageDelete = ( index : number ) => {
    try {
      const filteredFiles = selectedFiles.filter( ( _, i : number ) => i !== index );
      setSelectedFiles( filteredFiles );
    } catch ( error ) {
      toast.error( 'Error deleting image' );
    }
  };

  const onExistingImageDelete = ( index : number ) => {
    try {
      const filteredImages = existingProductImages.filter( ( _, i : number ) => i !== index );
      setExistingProductImages( filteredImages );
    } catch ( error ) {
      toast.error( 'Error deleting image' );
    }
  };

  return (
    <Form { ...form }>
      <form
        onSubmit={ form.handleSubmit( onSubmit ) }
        className="grid grid-cols-3 gap-4"
      >
        <FormField
          control={ form.control }
          name="name"
          render={ ( { field, } ) => (
            <FormItem className="flex flex-col gap-2 col-span-3">
              <FormLabel>
                Name
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product name"
                  { ...field }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="description"
          render={ ( { field, } ) => (
            <FormItem className="flex flex-col gap-2 col-span-3">
              <FormLabel>
                Product description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter product description"
                  { ...field }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="category"
          render={ ( { field, } ) => (
            <FormItem className="select-none flex flex-col gap-2 col-span-1">
              <FormLabel>Category</FormLabel>
              <Select
                onValueChange={ field.onChange }
                defaultValue={ field.value }
              >
                <FormControl className="!w-full !h-[50px]">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  { productCategories.map( ( category ) => (
                    <SelectItem
                      key={ category?.value }
                      value={ category?.value }
                    >{ category.label }</SelectItem>
                  ) ) }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="price"
          render={ ( { field, } ) => (
            <FormItem className="flex flex-col gap-2 col-span-1">
              <FormLabel>
                Price
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter product price"
                  { ...field }
                  type="number"
                  value={ field.value }
                  onChange={ ( e ) => {
                    field.onChange( parseFloat( e.target.value ) );
                  } }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        <FormField
          control={ form.control }
          name="stock"
          render={ ( { field, } ) => (
            <FormItem className="flex flex-col gap-2 col-span-1">
              <FormLabel>
                Stock
              </FormLabel>
              <FormControl>
                <Input
                  { ...field }
                  placeholder="Enter product stock"
                  value={ field.value }
                  type="number"
                  onChange={ ( e ) => {
                    console.log( e.target.value );
                    field.onChange( parseFloat( e.target.value ) );
                  } }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          ) }
        />

        { existingProductImages?.length > 0 && (
          <div className="flex gap-5 col-span-3">
            { existingProductImages?.map( ( url : any, index : number ) => {
              return (
                <div
                  key={ index }
                  className="flex flex-col gap-2 border p-4 border-gray-300 items-center justify-between relative"
                >
                  <div className="wrapper-image relative w-[70px] h-[70px]">
                    <Image
                      src={ url }
                      alt="alt"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    className="text-sm underline cursor-pointer absolute top-[0px] right-[0px]"
                    onClick={ () => onExistingImageDelete( index ) }
                    type="button"
                  >
                    <X
                      color="red"
                      size={ 24 }
                    />
                  </button>
                </div>
              );
            } ) }
          </div>
        ) }

        <Input
          className="col-span-3"
          placeholder="Select product images"
          type="file"
          multiple
          onChange={ ( e : any ) => {
            const filesArr = Array.from( e.target.files );
            setSelectedFiles( filesArr );
          } }
        />

        { /* IMAGES */ }
        { imageUrlsToDisplay?.length > 0 && (
          <div className="flex gap-5 col-span-3">
            { imageUrlsToDisplay?.map( ( url : any, index : number ) => {
              return (
                <div
                  key={ index }
                  className="flex flex-col gap-2 border p-4 border-gray-300 items-center justify-between relative"
                >
                  <div className="wrapper-image relative w-[70px] h-[70px]">
                    <Image
                      src={ url }
                      alt="alt"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <button
                    className="text-sm underline cursor-pointer absolute top-[0px] right-[0px]"
                    onClick={ () => onSelectedImageDelete( index ) }
                    type="button"
                  >
                    <X
                      color="red"
                      size={ 24 }
                    />
                  </button>
                </div>
              );
            } ) }
          </div>
        ) }

        <div className="col-span-3 flex justify-between">
          <Button
            asChild
            variant="outline"
          >
            <Link href="/seller/products" >Back</Link>
          </Button>
          <Button
            type="submit"
            className="w-[300px]"
            disabled={ loading }
          >
            { formType === 'add' ? 'Add Product' : 'Update Product' }
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default FormProduct;
