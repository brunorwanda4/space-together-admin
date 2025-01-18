import AllCollectionInCollection from "@/components/site/dashboard/collections/all_collection-in-collections";

const CollectionPage = () => {
  return (
    <div className=" happy-page">
      <h1 className="happy-title-head">Collections</h1>
      <div className=" w-full space-y-4">
        <AllCollectionInCollection />
      </div>
      <div>
      </div>
    </div>
  );
};

export default CollectionPage;
