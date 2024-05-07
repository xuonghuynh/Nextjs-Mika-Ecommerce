import CollectionFilter from '@/app/(landing)/collections/[collectionId]/_components/CollectionFilter'
import React from 'react'

type CollectionSidebarProps = {
  collectionId?: string
}
const CollectionSidebar = ({collectionId}: CollectionSidebarProps) => {
  return (
    <div className='hidden md:block w-[400px] h-full'>
      <CollectionFilter collectionId={collectionId} />
    </div>
  )
}

export default CollectionSidebar
