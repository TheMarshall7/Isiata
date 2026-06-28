import { GARMENT_CATALOG } from '@/lib/garments/catalog'
import { GarmentCard } from './GarmentCard'

export function GarmentGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {GARMENT_CATALOG.map((item) => (
        <GarmentCard key={item.slug} item={item} />
      ))}
    </div>
  )
}
