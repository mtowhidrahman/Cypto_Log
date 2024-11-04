import { Alert, AlertIcon } from "@chakra-ui/react";
import React from "react";

const ErrorComponenet = ({ msg }) => {
  return (
    <Alert
      bottom={"50%"}
      left={"50%"}
      position={"fixed"}
      status={"error"}
      transform={"translateX(-50%)"}
      w={"container"}
    >
      <AlertIcon />
      {msg}
    </Alert>
  );
};

export default ErrorComponenet;
