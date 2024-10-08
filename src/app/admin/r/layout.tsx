interface props {
    children : React.ReactNode
}
const RequestLayout = ({children} : props) => {
  return (
    <section className=" p-3 w-full">
      {children}
    </section>
  )
}

export default RequestLayout
