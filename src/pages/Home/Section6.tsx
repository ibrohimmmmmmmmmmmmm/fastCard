import React from 'react'
import CrudSection from '../../components/CrudSection/CrudSection'

export default function Section6() {
  return (
    <>
        <section className="w-[80%] m-auto pt-30 pb-15 py-10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-10 bg-red-500 rounded"></div>
              <span className="text-red-500 font-semibold">Our Products</span>
            </div>

            <div className="flex items-end gap-12">
              <h2 className="text-5xl font-semibold">Explore Our Products</h2>
            </div>
          </div>
        </div>
      </div>
    </section>
        <CrudSection />
    </>
  )
}
