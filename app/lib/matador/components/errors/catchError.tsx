import { Alert, Text } from "@mantine/core";
import type { ThrownResponse } from "@remix-run/react";
import { BiMessageError } from "react-icons/bi";

export interface CatchErrorFallbackProps {
  error: ThrownResponse<number, any>;
}

export const CatchErrorFallback = ({ error }: CatchErrorFallbackProps) => {
  return (
    <Alert icon={<BiMessageError size={16} />} title="Error" color="red">
      <Text>Something wrong happened happened!</Text>
      <Text>{error.status}</Text>
    </Alert>
  );
};

export default CatchErrorFallback;
