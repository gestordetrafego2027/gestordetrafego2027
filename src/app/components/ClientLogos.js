'use client'

import { useEffect } from 'react'
import Image from 'next/image'
export default function ClientLogos() {
    useEffect(() => {
        const track = document.getElementById('logos-track')
        if (!track) return
        const totalLogos = 13
        const step = 4
        let current = 0
        const advance = () => {
            current += step
            track.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            track.style.transform = 'translateX(-' + (current * 25) + '%)'
            if (current >= totalLogos) {
                setTimeout(() => {
                    track.style.transition = 'none'
                    current = current - totalLogos
                    track.style.transform = 'translateX(-' + (current * 25) + '%)'
                }, 850)
            }
        }
        const interval = setInterval(advance, 3500)
        return () => clearInterval(interval)
    }, [])

    const logos = [
        'wepink', 'oceane', 'elyah', 'jequiti',
        'natalia-beauty', 'signus', 'bonne-soiree', 'poema-paris',
        'dumond', 'unique-chic', 'beatco', 'saue',
        'camilla-scarpa'
    ]
    const looped = [...logos, ...logos]

    return (
        <section className="bg-white border-b border-neutral-100 py-16 relative overflow-hidden">
            <style>{`
                .logos-slider-track {
                    display: flex;
                    align-items: center;
                    transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                }
                .logos-slider-item {
                    flex: 0 0 25%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100px;
                    padding: 0 24px;
                }
                .logos-slider-item img {
                    opacity: 0.5;
                    transition: opacity 0.3s;
                }
                .logos-slider-item img:hover { opacity: 1; }
            `}</style>
            <div className="max-w-7xl mx-auto px-8 overflow-hidden">
                <div className="logos-slider-track" id="logos-track">
                    {looped.map((name, i) => (
                        <div key={`${name}-${i}`} className="logos-slider-item relative">
                            <Image src={`/images/angelo/logos/${name}.png`} alt={name} width={140} height={70} className="object-contain" style={{maxHeight: '70px', width: 'auto'}} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
