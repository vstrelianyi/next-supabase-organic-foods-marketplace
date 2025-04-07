'use client';

import { zodResolver, } from '@hookform/resolvers/zod';
import { useForm, } from 'react-hook-form';
import { z, } from 'zod';
import Image from 'next/image';

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
import { Description, } from '@radix-ui/react-dialog';
import { Textarea, } from '@/components/ui/textarea';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { productCategories, } from '@/constants/index';
import { useMemo, useState, } from 'react';

interface TFormProduct{
  formType ?: 'add' | 'edit'
  initialValues ?: {
    name ?: string,
    description ?: string,
    price ?: number,
    category ?: string,
    stock ?: number,
    images ?: [string],
  }
}

function FormProduct( { formType = 'add', initialValues = {}, } : TFormProduct ) {
  const [ selectedFiles, setSelectedFiles, ] = useState<any[]>( [] );
  const formSchemaProduct = z.object( {
    name: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().positive(),
    category: z.string().nonempty(),
    stock: z.number().positive(),
  } );
  const form = useForm<z.infer<typeof formSchemaProduct>>( {
    resolver: zodResolver( formSchemaProduct ),
    defaultValues: {
      name: initialValues?.name || '',
      description: initialValues?.description || '',
      price: initialValues?.price || 0,
      category: initialValues?.category || '',
      stock: initialValues?.stock || 0,
    },
  } );

  function onSubmit( values : z.infer<typeof formSchemaProduct> ) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log( values );
  }

  const imageUrlsToDisplay = useMemo( () => {
    const urls : any = [];
    if ( selectedFiles.length === 0 ){
      return urls;
    }

    selectedFiles.forEach( ( file ) => {
      urls.push( URL.createObjectURL( file ) );
    } );
  }, [ selectedFiles, ] );

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
                  placeholder="Enter product stock"
                  { ...field }
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

        <Input
          className="col-span-3"
          placeholder="Select product images"
          type="file"
          multiple
          onChange={ ( e : any ) => setSelectedFiles( Array.from( e.target.files ) ) }
        />

        <div className="flex gap-5">
          { imageUrlsToDisplay.map( ( url : any, index : number ) => {
            return(
              <div key={ index }>
                <Image
                  src={ url }
                  alt="alt"
                />
              </div>
            );
          } ) }
        </div>

        <Button
          type="submit"
          className="col-span-3"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default FormProduct;