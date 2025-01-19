import CollectionPageStatic, {
  CollectionPageErrorStatic,
} from "@/utils/static/page/collectionPageStatic";
import { fetchAllEducation, fetchAllSector, fetchAllTrade } from "@/services/data/fetchDataFn";
import CreateTradeDialog from "./createTradeDialog";
import AllTradeTable from "./AllTradeTable";
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

  const getTrades = await fetchAllTrade();
  if ("message" in getTrades) {
    return (
      <CollectionPageErrorStatic collection="education" error={getTrades} />
    );
  }

  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Trades for sectors</h2>
        <CreateTradeDialog sectors={getSectors} />
      </div>
      <AllTradeTable collectionName={collection} trades={getTrades} sectors={getSectors}/>
    </CollectionPageStatic>
  );
};

export default TradePageDocument;
