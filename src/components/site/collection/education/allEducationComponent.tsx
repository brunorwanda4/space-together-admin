import MyImage from "@/components/my-components/myImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import UpdateEducationDialog from "./updateEducationDialog";
import { fetchAllEducation } from "@/services/data/fetchDataFn";
import { CollectionPageErrorStatic } from "@/utils/static/page/collectionPageStatic";

const AllEducationComponent = async () => {
  const getEducations = await fetchAllEducation();

  if ("message" in getEducations) {
    return (
      <CollectionPageErrorStatic collection="education" error={getEducations} />
    );
  }
  return (
    <div className="">
      <div className=" space-y-2">
        {getEducations.map((item) => (
          <Accordion
            key={item.id}
            type="single"
            collapsible
            className="w-full happy-card"
          >
            <AccordionItem value={"hello"} className=" ">
              <AccordionTrigger className="p-0 hover:no-underline">
                <div className=" flex justify-between w-full items-center mr-4">
                  <div className=" flex space-x-3 text-start">
                    <MyImage src="/icons/education.png" className=" size-12" />
                    <div>
                      <h4 className=" font-medium text-lg">{item.name}</h4>
                      <span>@ {item.username}</span>
                    </div>
                  </div>
                  <div className=" space-x-3">
                    <Button type="button" variant="outline" size="sm">
                      Sector 2
                    </Button>
                    <UpdateEducationDialog />
                    <Button type="button" size="sm">
                      Delete
                    </Button>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className=" mt-2">
                  <p>{item.description}</p>
                  <div className=" flex space-x-2">
                    <strong className=" text-myGray">
                      {new Date(item.created_on).toDateString()}
                    </strong>
                    <span className=" text-myGray">
                      {item.updated_on &&
                        `Update: ${new Date(item.updated_on).toDateString()}`}
                    </span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default AllEducationComponent;
