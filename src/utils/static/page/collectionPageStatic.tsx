import CardError from "@/components/my-components/card-error";
import { cn } from "@/lib/utils";
import { FetchError } from "@/types/fetchErr";
import { FaGreaterThan } from "react-icons/fa6";

type CollectionPageStaticProps = {
  children: React.ReactNode;
  collection: string;
  className ?: string; 
};
const CollectionPageStatic = ({
  children,
  collection,
  className
}: CollectionPageStaticProps) => {
  return (
    <div className={cn("happy-page" , className)} >
      <div className="happy-title-head flex items-center gap-2">
        <h1>Collection</h1>
        <FaGreaterThan size={16} />
        <span>{collection}</span>
      </div>
      <div className=" happy-page">{children}</div>
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
       {error ? <CardError error={error} /> : <CardError />}
    </CollectionPageStatic>
  );
};

