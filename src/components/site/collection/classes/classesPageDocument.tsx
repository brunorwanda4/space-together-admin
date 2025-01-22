import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/utils/static/page/collectionPageStatic";
import ClassesCollectionDetails from "./classCollectionDetails";
import {
  fetchAllClasses,
  fetchAllClassesType,
  fetchAllEducation,
} from "@/services/data/fetchDataFn";
import ClassRoles from "./classesRoles";
import AllClassesTable from "./allClassesTable";

interface props {
  collection: string;
}
const ClassesPageDocument = async ({ collection }: props) => {
  const getClasses = await fetchAllClasses();

  if ("message" in getClasses) {
    return (
      <CollectionPageErrorStatic collection="education" error={getClasses} />
    );
  }

  const getClassesType = await fetchAllClassesType();
  if ("message" in getClassesType) {
    return (
      <CollectionPageErrorStatic
        collection="education"
        error={getClassesType}
      />
    );
  }

    const getEducations = await fetchAllEducation();
     if ("message" in getEducations) {
        return (
          <CollectionPageErrorStatic
            error={getEducations}
            collection={"classes"}
          />
        );
      }

  return (
    <CollectionPageStatic collection={collection}>
      <div className="min-h-48 flex gap-4 justify-between">
        <ClassesCollectionDetails
          totalClassesRole={getClassesType.length}
          totalClasses={getClasses.length}
        />
        <ClassRoles roles={getClassesType} />
      </div>
      <AllClassesTable classTypes={getClassesType} educations={getEducations} collectionName={collection} classes={getClasses}/>
    </CollectionPageStatic>
  );
};

export default ClassesPageDocument;
