"use client";
import { MdSettingsInputAntenna } from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UseTheme from "@/context/theme/use-theme";

function AdminButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="  " size="sm">
          <MdSettingsInputAntenna  />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent data-theme={UseTheme()} className="w-56">
        hello world
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AdminButton;
