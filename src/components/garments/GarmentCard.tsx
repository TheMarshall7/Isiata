import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import type { GarmentProduct } from '@/lib/garments/catalog'

interface GarmentCardProps {
  item: GarmentProduct
}

export function GarmentCard({ item }: GarmentCardProps) {
  return (
    <Link
      href={`/objects/${item.slug}`}
      className="group block flashlight-card depth-shadow hover-depth border border-white/10 rounded-lg overflow-hidden"
    >
      <div className="relative aspect-[3/4] flex items-center justify-center bg-black">
        <img
          src={item.image}
          alt={item.title}
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div className="absolute top-4 right-4">
          <Badge status={item.status} />
        </div>
      </div>

      <div className="space-y-2 px-4 py-5">
        <h3 className="text-lg font-semibold text-white group-hover:text-zinc-300 transition-colors">
          {item.title}
        </h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
        <p className="text-xs uppercase tracking-widest text-zinc-600 pt-1 group-hover:text-zinc-400 transition-colors">
          View product →
        </p>
      </div>
    </Link>
  )
}
