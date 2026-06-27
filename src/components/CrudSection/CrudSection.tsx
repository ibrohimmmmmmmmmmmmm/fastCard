import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import { useHomeStore } from '../../pages/Home/HomeZustand'
import ProductCard from '../ProductCard/ProductCard'

export default function CrudSection() {
    const { products, getProducts } = useHomeStore()

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <div className="w-[80%] m-auto relative pb-10">
            <style>{`
                .crud-swiper {
                    padding: 10px 4px 30px;
                }
                .crud-swiper .swiper-slide {
                    opacity: 0;
                    animation: fadeUp 0.6s ease forwards;
                }
                @keyframes fadeUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .crud-swiper .swiper-slide:nth-child(1) { animation-delay: 0.05s; }
                .crud-swiper .swiper-slide:nth-child(2) { animation-delay: 0.1s; }
                .crud-swiper .swiper-slide:nth-child(3) { animation-delay: 0.15s; }
                .crud-swiper .swiper-slide:nth-child(4) { animation-delay: 0.2s; }
                .crud-swiper .swiper-slide:nth-child(5) { animation-delay: 0.25s; }
                .crud-swiper .swiper-slide:nth-child(n+6) { animation-delay: 0.3s; }

                .crud-swiper .swiper-slide > div {
                    transition: transform 0.35s ease, box-shadow 0.35s ease;
                }
                .crud-swiper .swiper-slide:hover > div {
                    transform: translateY(-8px) scale(1.02);
                    box-shadow: 0 20px 40px -10px rgba(19, 26, 46, 0.25);
                }

                .crud-nav-btn {
                    position: absolute;
                    top: 40%;
                    z-index: 10;
                    width: 44px;
                    height: 44px;
                    border-radius: 50%;
                    background: #131a2e;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 8px 20px rgba(19, 26, 46, 0.3);
                    transition: transform 0.25s ease, background 0.25s ease;
                }
                .crud-nav-btn:hover {
                    transform: translateY(-50%) scale(1.1);
                    background: #1f2a4d;
                }
                .crud-nav-btn.swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                }
                .crud-prev { left: -22px; }
                .crud-next { right: -22px; }
            `}</style>

            <Swiper
                modules={[Navigation]}
                navigation={{
                    prevEl: '.crud-prev',
                    nextEl: '.crud-next',
                }}
                spaceBetween={24}
                slidesPerView={4.2}
                breakpoints={{
                    0: { slidesPerView: 1.4, spaceBetween: 16 },
                    640: { slidesPerView: 2.2, spaceBetween: 18 },
                    1024: { slidesPerView: 3.2, spaceBetween: 20 },
                    1280: { slidesPerView: 4.2, spaceBetween: 24 },
                }}
                className="crud-swiper"
            >
                {products.map((p) => (
                    <SwiperSlide key={p.id}>
                        <ProductCard product={p} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="crud-nav-btn crud-prev">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                </svg>
            </div>
            <div className="crud-nav-btn crud-next">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                </svg>
            </div>
        </div>
    )
}