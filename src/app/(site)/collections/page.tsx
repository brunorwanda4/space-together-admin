import CollectionInDBMain from "@/components/site/dashboard/collections/collection-in-DB-main"

const CollectionPage = () => {
  return (
    <div className=" happy-page">
      <h1 className="happy-title-head">Collections</h1>
      <div className=" w-full"><CollectionInDBMain className=" grid-cols-4 w-full"/></div>
    </div>
  )
}

export default CollectionPage
