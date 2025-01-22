import UpdateClassPage from "@/components/site/collection/classes/updateClassPage";
import  { DocumentPageStaticError } from "@/utils/static/page/documentPageStatic";

const AddNewItemInCollectionPage = async (props: {
    params: Promise<{ collectionName: string; updateDocumentId: string }>;
  }) => {
    const params = await props.params;
    const { collectionName, updateDocumentId } = params;
    
    switch (collectionName) {
      case "classes":
        return <UpdateClassPage classId={updateDocumentId}/>;
      default:
        return <DocumentPageStaticError documentName={updateDocumentId} collectionName={collectionName} />;
    }
}

export default AddNewItemInCollectionPage
