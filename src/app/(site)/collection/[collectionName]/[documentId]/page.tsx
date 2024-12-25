import UserPageDocument from "@/components/site/documentId/users/UserPageDocument";
import  { DocumentPageStaticError } from "@/utils/static/page/documentPageStatic";

const DocumentPage = async (props: {
  params: Promise<{ collectionName: string; documentId: string }>;
}) => {
  const params = await props.params;
  const { collectionName, documentId } = params;
  
  switch (collectionName) {
    case "users":
      return <UserPageDocument collectionName={collectionName} documentId={documentId}/>;
    default:
      return <DocumentPageStaticError documentName={documentId} collectionName={collectionName} />;
  }
};

export default DocumentPage;
