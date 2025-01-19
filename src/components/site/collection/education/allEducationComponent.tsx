import MyImage from "@/components/my-components/myImage";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AllEducationComponent = () => {
  return (
    <div className="">
      <Accordion type="single" collapsible className="w-full happy-card">
        <AccordionItem value={"hello"} className=" ">
          <AccordionTrigger className="p-0 hover:no-underline">
            <div className=" flex space-x-3 text-start">
              <MyImage src="/icons/education.png" className=" size-12" />
              <div>
                <h4 className=" font-medium text-lg">
                  Rwanda Basic Education Board
                </h4>
                <span>@ REB</span>
              </div>
            </div>
            <div>
                Sector
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-2 ps-7 text-muted-foreground">
            hello
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default AllEducationComponent;
