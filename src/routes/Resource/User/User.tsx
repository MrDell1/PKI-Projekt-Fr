import { Box, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const User = (): ReactElement => {
  const authService = useAuthService();
  const query = useQuery(["userData"], () =>
    authService
      .fetcher("https://pkilab6.azurewebsites.net/resources/user", { method: "GET" })
      .then((response) => response.json())
  );
  if (
    query.status === "error" &&
    query.error instanceof Error &&
    query.error.message === "jwt expired"
  ) {
    authService.signOut();
    return <Navigate to={paths.signIn} />;
  }
  if(query.status === "error"){
    return <Flex justifyContent="center" alignItems="center">Error please try again later</Flex>
  }
  if (query.status === "success") {
    return (
      <Box>
        <Heading>{query?.data.user[0].data}</Heading>
      </Box>
    );
  }
  return <Spinner size="xl" />;
};
