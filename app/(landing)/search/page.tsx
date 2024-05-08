import { getProductsBySearch } from '@/actions/get-product-by-search';
import React from 'react'

interface SearchPageProps {
  searchParams: { name: string };
}

const SearchPage = async({ searchParams }: SearchPageProps) => {
  console.log(searchParams)

  const products = await getProductsBySearch(searchParams)

  console.log(products)
  return (
    <div className='container min-h-[50%]'>
      Search page
    </div>
  )
}

export default SearchPage
