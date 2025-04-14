'use client';

import { useRouter, } from 'next/navigation';
import React, { useState, } from 'react';

import { Button, } from '@/components/ui/button';
import { Input, } from '@/components/ui/input';
import { Label, } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { productCategories, sortByOptions, } from '@/constants';

function Filters() {
  const [ search, setSearch, ] = useState( '' );
  const [ category, setCategory, ] = useState( '' );
  const [ sortBy, setSortBy, ] = useState( '' );

  const router = useRouter();

  const handleApplyFilters = () => {
    router.push( `/user/shop?searchText=${ search }&category=${ category }&sortBy=${ sortBy }` );
  };
  const onResetFilters = () => {
    setSearch( '' );
    setCategory( '' );
    setSortBy( '' );
    router.push( '/user/shop' );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">

      { /* SEARCH */ }
      <div className="flex flex-col gap-2">
        <Label>Search</Label>
        <Input
          type="text"
          value={ search }
          onChange={ ( e ) => setSearch( e.target.value ) }
        />
      </div>

      { /* CATEGORY */ }
      <div className="flex flex-col gap-2">
        <Label>Category</Label>
        <Select
          onValueChange={ ( value ) => setCategory( value ) }
          defaultValue={ category }
        >
          <SelectTrigger>
            <SelectValue
              placeholder="Select a verified email to display"
            />
          </SelectTrigger>
          <SelectContent>
            { productCategories.map( ( category ) => (
              <SelectItem
                key={ category?.value }
                value={ category?.value }
              >{ category.label }</SelectItem>
            ) ) }
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Sort By</Label>
        <Select
          onValueChange={ ( value ) => setSortBy( value ) }
          defaultValue={ category }
        >
          <SelectTrigger>
            <SelectValue placeholder="Sory by" />
          </SelectTrigger>
          <SelectContent>
            { sortByOptions.map( ( option : {
              label : string;
              value : string
            } ) => (
              <SelectItem
                key={ option?.value }
                value={ option?.value }
              >{ option.label }</SelectItem>
            ) ) }
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Button
          variant="outline"
          onClick={ onResetFilters }
        >Reset</Button>
        <Button onClick={ handleApplyFilters }>Apply</Button>
      </div>

    </div>
  );
}

export default Filters;