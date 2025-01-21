import CreateClassPage from "@/components/site/collection/classes/CreateClassPage";
import  { DocumentPageStaticError } from "@/utils/static/page/documentPageStatic";

const AddNewItemInCollectionPage = async (props: {
    params: Promise<{ collectionName: string; documentId: string }>;
  }) => {
    const params = await props.params;
    const { collectionName, documentId } = params;
    
    switch (collectionName) {
      case "classes":
        return <CreateClassPage />;
      default:
        return <DocumentPageStaticError documentName={documentId} collectionName={collectionName} />;
    }
}

export default AddNewItemInCollectionPage
