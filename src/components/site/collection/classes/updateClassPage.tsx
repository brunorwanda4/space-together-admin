import DocumentPageStatic, {
    DocumentPageStaticError,
  } from "@/utils/static/page/documentPageStatic";
  import { fetchAllClassesType, fetchAllEducation, getClassAPI } from "@/services/data/fetchDataFn";
import UpdateClassForm from "./updateClassForm";

interface props {
    classId : string 
}

  const UpdateClassPage = async ({classId} : props) => {
    const getEducations = await fetchAllEducation();
    const getClassTypes = await fetchAllClassesType();
    const getClass = await getClassAPI(classId);
  
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

    if ("message" in getClass) {
      return (
        <DocumentPageStaticError
          error={getClass}
          documentName={"Class-add"}
          collectionName={"classes"}
        />
      );
    }
  
    return (
      <DocumentPageStatic collectionName="classes" documentName="Class-update">
        <UpdateClassForm classModel={getClass} classTypes={getClassTypes} educations={getEducations} />
      </DocumentPageStatic>
    );
  };
  
  export default UpdateClassPage;
  