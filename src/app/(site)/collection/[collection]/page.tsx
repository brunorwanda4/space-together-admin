interface props {
    params : {collection : string}
}
const CollectionPage = ({params : {collection}} : props) => {
  return (
    <div>
      collection is page {collection}
    </div>
  )
}

export default CollectionPage
