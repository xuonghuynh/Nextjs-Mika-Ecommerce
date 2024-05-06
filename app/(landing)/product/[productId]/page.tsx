import { getProductById } from '@/actions/get-product-by-id';
import React from 'react'

const ProductDetails = async({ params }: { params: { productId: string } }) => {
    const { productId } = params
    const product = await getProductById(productId);
  return (
    <div>
      {JSON.stringify(product)}
    </div>
  )
}

export default ProductDetails
