import CardError from "@/components/my-components/card-error";
import { cn } from "@/lib/utils";
import { FetchError } from "@/types/fetchErr";
import Link from "next/link";
import { FaGreaterThan } from "react-icons/fa6";

interface props {
  children: React.ReactNode;
  className?: string;
  classname?: string;
  collectionName: string;
  documentName: string;
}
const DocumentPageStatic = ({
  children,
  className,
  classname,
  documentName,
  collectionName,
}: props) => {
  return (
    <div className={cn("happy-page", className)}>
      <div className=" flex gap-2 items-center happy-title-head">
        Collection
        <FaGreaterThan size={16} />{" "}
        <Link className=" link-hover" href={`/collection/${collectionName}`}>
          {collectionName}
        </Link>
        <FaGreaterThan size={16} /> <span>{documentName}</span>
      </div>
      <div className={cn("min-h-40", classname)}>{children}</div>
    </div>
  );
};

export default DocumentPageStatic;

interface DocumentPageStaticProps {
  error?: FetchError;
  collectionName: string;
  documentName: string;
}

export const DocumentPageStaticError = ({
  collectionName,
  documentName,
  error,
}: DocumentPageStaticProps) => {
  return (
    <DocumentPageStatic
      collectionName={collectionName}
      documentName={documentName}
    >
      {error ? <CardError error={error} /> : <CardError />}
    </DocumentPageStatic>
  );
};
