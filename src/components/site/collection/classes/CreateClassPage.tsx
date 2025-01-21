import DocumentPageStatic from "@/utils/static/page/documentPageStatic"
import CreateClassForm from "./createClassForm"

const CreateClassPage = () => {
  return (
    <DocumentPageStatic collectionName="classes" documentName="Class-add">
      <CreateClassForm />
    </DocumentPageStatic>
  )
}

export default CreateClassPage
