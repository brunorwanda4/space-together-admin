import AllCollectionInCollection from "@/components/site/dashboard/collections/all_collection-in-collections";
import CollectionInDBMain from "@/components/site/dashboard/collections/collection-in-DB-main";
import Link from "next/link";

const CollectionPage = () => {
  return (
    <div className=" happy-page">
      <h1 className="happy-title-head">Collections</h1>
      <div className=" w-full space-y-4">
        <CollectionInDBMain className=" grid-cols-4 w-full" />{" "}
        <h2 className="  happy-title-base">All collections</h2>
      </div>
      <div>
        <AllCollectionInCollection />
      </div>
    </div>
  );
};

export default CollectionPage;
