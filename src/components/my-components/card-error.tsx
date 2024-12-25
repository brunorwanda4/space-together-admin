import { FetchError } from "@/types/fetchErr";
import React from "react";

interface props {
  error?: FetchError;
}

const CardError = ({ error }: props) => {
  if (error) {
    return (
      <div className=" card text-red-500 bg-error/20 p-6 border border-error ">
        <div className=" card-body  p-0 happy-line">
          <div className=" flex gap-2"><strong>Error:</strong> {error.message} </div>
          <div className=" flex gap-2"><strong>Details:</strong> {error.details} </div>
          {error.status && (
            <div>
              <strong>Status:</strong> {error.status}{" "}
            </div>
          )}
        </div>
      </div>
    );
  }
  return (
    <div className=" card text-red-500 bg-error/20 p-6 border border-error">
      <div className=" card-body  p-0">
        <div className=" flex"><strong>Error:</strong>Not found</div> 
        <div className=" flex gap-2"><strong>Details:</strong> Document UI is not available try other</div>
      </div>
    </div>
  );
};

export default CardError;
