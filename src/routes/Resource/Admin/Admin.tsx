import { Box, Button, Flex, Heading, Spinner , Table, Tbody, Td, Text, Th, Thead, Tr} from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { AdminTable } from "./AdminTable/AdminTable";

export type UserData = {
  username: string,
  email: string,
  role: string,
  isActive: number,
  idusers: string,
}

export const Admin = (): ReactElement => {
  const authService = useAuthService();
  const query = useQuery(["adminData"], () =>
    authService
      .fetcher("https://pkilab6.azurewebsites.net/resources/admin", { method: "GET" })
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
  if (query.status === "success" && query.data.users) {
    console.log(query.data.users);
    return (
      <Flex flexDir="column" alignItems="center" my="4">
        <Heading>{query?.data.user[0].data}</Heading>
       <AdminTable data={query.data.users} />
      </Flex>
    );
  }
  return <Spinner size="xl" />;
};
