import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/utils/static/page/collectionPageStatic";
import CreateSectorDialog from "./CreateSectorDialog";
import { fetchAllEducation, fetchAllSector } from "@/services/data/fetchDataFn";
import AllSectorTable from "./allSectorTable";
// import AllEducationComponent from "./allEducationComponent"

interface props {
  collection: string;
}
const SectorPageDocument = async ({ collection }: props) => {
  const getSectors = await fetchAllSector();

  if ("message" in getSectors) {
    return <CollectionPageErrorStatic collection="Sector" error={getSectors} />;
  }

  const getEducation = await fetchAllEducation();

  if ("message" in getEducation) {
    return (
      <CollectionPageErrorStatic collection="education" error={getEducation} />
    );
  }

  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Sector for education</h2>
        <CreateSectorDialog education={getEducation}/>
      </div>
     <AllSectorTable educations={getEducation} collectionName="sector" sectors={getSectors} />
    </CollectionPageStatic>
  );
};

export default SectorPageDocument;
