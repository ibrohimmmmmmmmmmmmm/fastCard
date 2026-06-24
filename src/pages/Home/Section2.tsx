import { ArrowLeft, ArrowRight } from 'lucide-react'
import CrudSection from '../../components/CrudSection/CrudSection'

export default function Section2() {
  return (
    <>
       <section className="w-[90%] sm:w-[80%] m-auto pt-10 sm:pt-30 pb-15 py-10 overflow-hidden">
  <div className="container mx-auto px-4">
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
      {/* Left Side */}
      <div className="w-full">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-10 bg-red-500 rounded"></div>
          <span className="text-red-500 font-semibold">Today's</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-12">
          <h2 className="text-3xl sm:text-5xl font-semibold">Flash Sales</h2>

          {/* Timer */}
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium">Days</p>
              <h3 className="text-2xl sm:text-5xl font-bold">03</h3>
            </div>

            <span className="text-red-500 text-xl sm:text-3xl font-bold">:</span>

            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium">Hours</p>
              <h3 className="text-2xl sm:text-5xl font-bold">23</h3>
            </div>

            <span className="text-red-500 text-xl sm:text-3xl font-bold">:</span>

            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium">Minutes</p>
              <h3 className="text-2xl sm:text-5xl font-bold">19</h3>
            </div>

            <span className="text-red-500 text-xl sm:text-3xl font-bold">:</span>

            <div className="text-center">
              <p className="text-xs sm:text-sm font-medium">Seconds</p>
              <h3 className="text-2xl sm:text-5xl font-bold">56</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side Buttons */}
      <div className="flex gap-3 self-end sm:self-auto">
        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition">
          <ArrowLeft size={18} />
        </button>

        <button className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-gray-100 transition">
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  </div>
</section>
    <CrudSection />
    </>
  )
}
