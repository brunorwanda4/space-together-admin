import CollectionPageStatic from "@/utils/static/page/collectionPageStatic"
import CreateEducationDialog from "./createEducationDialog"

interface props {
  collection : string
}
const EducationPageDocument = ({collection} : props) => {
  return (
    <CollectionPageStatic collection={collection}>
      <div className=" flex justify-between items-center">
        <h2 className=" happy-title-base">Education system supported</h2>
        <CreateEducationDialog />
      </div>
    </CollectionPageStatic>
  )
}

export default EducationPageDocument
