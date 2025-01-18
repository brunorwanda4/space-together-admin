import AllCollectionInCollection from "@/components/site/dashboard/collections/all_collection-in-collections";
import CollectionInDBMain from "@/components/site/dashboard/collections/collection-in-DB-main";
import Link from "next/link";

const CollectionPage = () => {
  return (
    <div className=" happy-page">
      <h1 className="happy-title-head">Collections</h1>
      <div className=" w-full space-y-4">
        <CollectionInDBMain className=" grid-cols-4 w-full" />{" "}
        <Link
          href={`/collections/all`}
          className=" happy-card link justify-center flex items-center"
        >
          View all collections
        </Link>
      </div>
      <div>
        <AllCollectionInCollection />
      </div>
    </div>
  );
};

export default CollectionPage;
