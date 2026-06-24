import { ArrowLeft, ArrowRight } from 'lucide-react'
import React from 'react'
import Categories from '../../components/Categories/Categories'

export default function Section3() {
  return (
    <>
        <section className="w-[80%] m-auto pt-30 pb-15 py-10">
              <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                  {/* Left Side */}
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-5 h-10 bg-red-500 rounded"></div>
                      <span className="text-red-500 font-semibold">Categories</span>
                    </div>
        
                    <div className="flex items-end gap-12">
                      <h2 className="text-5xl font-semibold">Browse by Category</h2>
                    </div>
                  </div>
        
                  {/* Right Side Buttons */}
                  <div className="flex gap-3">
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition">
                      <ArrowLeft size={20} />
                    </button>
        
                    <button className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition">
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </section>
            <Categories/>
    </>
  )
}
