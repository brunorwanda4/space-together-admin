import CollectionPageStatic, {
    CollectionPageErrorStatic,
  } from "@/utils/static/page/collectionPageStatic";
  import { fetchAllEducation, fetchAllSector } from "@/services/data/fetchDataFn";
import CreateTradeDialog from "./createTradeDialog";
  // import AllEducationComponent from "./allEducationComponent"
  
  interface props {
    collection: string;
  }
  const TradePageDocument = async ({ collection }: props) => {
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
          <h2 className=" happy-title-base">Trades for sectors</h2>
          <CreateTradeDialog sectors={getSectors} education={getEducation} />
        </div>
      </CollectionPageStatic>
    );
  };
  
  export default TradePageDocument;
  