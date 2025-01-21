import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/utils/static/page/documentPageStatic";
import CreateClassForm from "./createClassForm";
import { fetchAllEducation } from "@/services/data/fetchDataFn";

const CreateClassPage = async () => {
  const getEducations = await fetchAllEducation();

  if ("message" in getEducations) {
    return (
      <DocumentPageStaticError
        error={getEducations}
        documentName={"Class-add"}
        collectionName={"classes"}
      />
    );
  }
  return (
    <DocumentPageStatic collectionName="classes" documentName="Class-add">
      <CreateClassForm educations={getEducations} />
    </DocumentPageStatic>
  );
};

export default CreateClassPage;
