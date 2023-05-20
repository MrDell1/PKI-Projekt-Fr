import { Flex } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, Outlet } from "react-router-dom";

const Protected = (): ReactElement => {
  const status = useSessionStatus();
  if (status === "anon") {
    return <Navigate replace to={paths.signIn} />;
  }

  return (
    <Flex flexDirection="column" h="100vh">
      <Outlet />
    </Flex>
  );
};

export default Protected;
