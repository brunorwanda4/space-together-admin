import MyImage from "@/components/my-components/myImage";
import { Button } from "@/components/ui/button";
import UpdateEducationDialog from "./updateEducationDialog";
import {
  fetchAllEducation,
  fetchAllSectorByEducation,
} from "@/services/data/fetchDataFn";
import { CollectionPageErrorStatic } from "@/utils/static/page/collectionPageStatic";
import { BsDot } from "react-icons/bs";
import Link from "next/link";

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
        {getEducations.map(async (item) => {
          const getSector = await fetchAllSectorByEducation(item.id);

          if ("message" in getSector)
            return (
              <CollectionPageErrorStatic
                key={item.id}
                collection="education"
                error={getSector}
              />
            );
          return (
            <div key={item.id} className="w-full happy-card">
              <div className=" ">
                <div className="p-0 hover:no-underline">
                  <div className=" flex justify-between w-full items-center mr-4">
                    <div className=" flex space-x-3 text-start">
                      <MyImage
                        src="/icons/education.png"
                        className=" size-12"
                      />
                      <div>
                        <h4 className=" font-medium text-lg">{item.name}</h4>
                        <div>
                          <span className=" link-hover">
                            @ {item.username}{" "}
                          </span>
                          {item.updated_on ? (
                            <span className=" text-myGray text-sm">
                              {item.updated_on &&
                                `Update: ${new Date(
                                  item.updated_on
                                ).toDateString()}`}
                            </span>
                          ) : (
                            <span className=" text-myGray text-sm">
                              {new Date(item.created_on).toDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className=" space-x-3">
                      <Button type="button" variant="outline" size="sm">
                        Sector {getSector.length}
                      </Button>
                      <UpdateEducationDialog />
                      {getSector.length == 0 && (
                        <Button type="button" size="sm">
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <div className=" mt-2 space-y-2">
                    <p className="flex space-x-2 ">{item.description}</p>
                    {/* sector */}
                    <div>
                      <h3 className=" font-medium text-lg"> Sectors</h3>
                      {getSector.map((sector) => (
                        <div key={sector.id} className=" flex">
                          <BsDot />
                          <div className=" space-y-2">
                            <div className=" flex gap-2 items-center">
                              <h5 className=" font-medium">{sector.name}</h5>
                              <span className=" text-sm link-hover">
                                @ {sector.username}
                              </span>
                                {item.updated_on ? (
                                  <span className=" text-myGray text-sm">
                                    {item.updated_on &&
                                      `Update: ${new Date(
                                        item.updated_on
                                      ).toDateString()}`}
                                  </span>
                                ) : (
                                  <span className=" text-myGray text-sm">
                                    {new Date(item.created_on).toDateString()}
                                  </span>
                                )}
                            </div>
                            <p className=" text-sm">{sector.description}</p>
                          </div>
                        </div>
                      ))}
                      <Link href={`/collection/sector`} className=" link text-info justify-center flex">All Sectors</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllEducationComponent;
