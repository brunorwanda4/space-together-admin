"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { updateUserAPI } from "@/services/data/fetchDataFn";
import { UserModelPut } from "@/types/userModel";
import { startTransition } from "react";

interface props {
  id: string;
  disable?: boolean;
}

const UserDisableButton = ({ id, disable }: props) => {
  const handleSubmit = (values: UserModelPut, id: string) => {
    startTransition(async () => {
      const result = await updateUserAPI(values, id);

      if ("message" in result) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: result.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: `User ${result.nm} updated successfully`,
          description: <div>user: {result.nm}</div>,
        });
      }
    });
  };
  const disableUser: UserModelPut = { ds: true };
  const Enable: UserModelPut = { ds: false };
  return (
    <Button
      size="sm"
      variant="warning"
      onClick={() => handleSubmit(disable ? Enable : disableUser, id)}
    >
        {disable ? "Enable" : "Disable"} account
    </Button>
  );
};

export default UserDisableButton;
