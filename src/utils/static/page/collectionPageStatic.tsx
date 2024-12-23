import { FetchError } from "@/types/fetchErr";
import { FaGreaterThan } from "react-icons/fa6";

type CollectionPageStaticProps = {
  children: React.ReactNode;
  collection: string;
};
const CollectionPageStatic = ({
  children,
  collection,
}: CollectionPageStaticProps) => {
  return (
    <div className=" happy-page">
      <div className="happy-title-head flex items-center gap-2">
        <h1>Collection</h1>
        <FaGreaterThan size={16} />
        <span>{collection}</span>
      </div>
      <div>{children}</div>
      <div className=" h-screen"></div>
    </div>
  );
};

export default CollectionPageStatic;

type CollectionPageErrorStaticProps = {
  error?: FetchError;
  collection: string;
};

export const CollectionPageErrorStatic = ({
  collection,
  error,
}: CollectionPageErrorStaticProps) => {
  return (
    <CollectionPageStatic collection={collection}>
      {error ? (
        <div className="text-red-500 bg-error/20 p-6 rounded-md border border-error">
          <strong>Error:</strong> {error.message} <br />
          <strong>Details:</strong> {error.details} <br />
          {error.status && <div><strong>Status:</strong> {error.status} </div>}
        </div>
      ) : (<div className=" text-red-500 bg-error/20 p-6 rounded-md border border-error">
        <strong>Error:</strong> Collection not found <br />
        <strong>Details:</strong> Collection UI is not available try other 
      </div>)}
    </CollectionPageStatic>
  );
};
