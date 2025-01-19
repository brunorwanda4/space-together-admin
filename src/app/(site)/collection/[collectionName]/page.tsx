import { CollectionPageErrorStatic } from "@/utils/static/page/collectionPageStatic";
import UserPageCollection from "@/components/site/collection/users/UserPageCollection";
import EducationPageDocument from "@/components/site/collection/education/educationPageDocument";
import SectorPageDocument from "@/components/site/collection/sector/sectorPageComponet";

export default async function CollectionPage(props: {
  params: Promise<{ collectionName: string }>;
}) {
  const params = await props.params;
  const { collectionName } = params;

  switch (collectionName) {
    case "users":
      return <UserPageCollection collectionName={collectionName} />;
      case "educations":
        return <EducationPageDocument collection={collectionName}/>
      case "sector":
        return <SectorPageDocument collection={collectionName}/>
    default:
      return <CollectionPageErrorStatic collection={collectionName} />;
  }
}
