"use client"

import Button, { ButtonType } from "../button"

interface CollectionHeadProps {
  title: string
  slug: string
  permalink: string
}

const CollectionHead = (props: CollectionHeadProps) => {
  const { title, permalink } = props

  return (
    <div className="grid grid-cols-4 tablet-lg:grid-cols-12">
      <div className="col-span-4 tablet-lg:col-span-12">
        <div className="flex justify-between py-3 pt-6 pb-5">
          <h2 className="text-4xl font-bold">{title}</h2>
          <Button link={permalink} text={`All ${title}`} type={ButtonType.Donate} />
        </div>
      </div>
    </div>
  )
}

export default CollectionHead
