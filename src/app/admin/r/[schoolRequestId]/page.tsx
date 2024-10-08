import { MyImage } from "@/components/ui/myImage"

interface props {
    params: {schoolRequestId : string}
}
const SchoolRequestIdPage = ({
    params : {schoolRequestId}
} : props) => {
  return (
    <div className=" w-full">
        <div className=" min-h-screen w-full">
        <div className=" flex  justify-between w-full items-center">
            <h3 className='text-xl font-bold lg:text-2xl'>School Request</h3>
            <div className=" font-semibold text-xl">School_username</div>
        </div>
        <div className=" card w-full bg-base-200 min-h-80 shadow-lg p-2 mt-4">
            {/* header */}
            <div className=" flex justify-between items-center">
                <div className=" flex gap-2 items-center">
                    <MyImage src="/logo.png" className=" size-14"/>
                    <div className=" flex flex-col gap-1">
                        <div className=" font-me  text-lg">School name</div>
                        <div className=" text-sm"><span className=" text-info ">@</span>School_username</div>
                    </div>
                </div>
                
            </div>
        </div>
    </div>
    </div>
  )
}

export default SchoolRequestIdPage
