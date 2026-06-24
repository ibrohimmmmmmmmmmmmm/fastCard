import React, { useEffect } from 'react'
import { useHomeStore } from '../../pages/Home/HomeZustand'
import ProductCard from '../ProductCard/ProductCard'

export default function CrudSection() {
    const {products,getProducts} = useHomeStore()

    useEffect(() => {
        getProducts()
    },[])
  return (
    <div className="w-[80%] m-auto overflow-x-auto pb-10 custom-scrollbar">
      <div className="flex gap-6 min-w-max">
        {products.map((p) => (
            <div key={p.id} className="w-[280px]">
                <ProductCard product={p} />
            </div>
        ))}
      </div>
    </div>
  )
}
