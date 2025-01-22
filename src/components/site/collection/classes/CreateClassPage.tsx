import DocumentPageStatic, {
  DocumentPageStaticError,
} from "@/utils/static/page/documentPageStatic";
import CreateClassForm from "./createClassForm";
import { fetchAllClassesType, fetchAllEducation } from "@/services/data/fetchDataFn";

const CreateClassPage = async () => {
  const getEducations = await fetchAllEducation();
  const getClassTypes = await fetchAllClassesType();

  if ("message" in getEducations) {
    return (
      <DocumentPageStaticError
        error={getEducations}
        documentName={"Class-add"}
        collectionName={"classes"}
      />
    );
  }
  if ("message" in getClassTypes) {
    return (
      <DocumentPageStaticError
        error={getClassTypes}
        documentName={"Class-add"}
        collectionName={"classes"}
      />
    );
  }

  return (
    <DocumentPageStatic collectionName="classes" documentName="Class-add">
      <CreateClassForm classTypes={getClassTypes} educations={getEducations} />
    </DocumentPageStatic>
  );
};

export default CreateClassPage;
