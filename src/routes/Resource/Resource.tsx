import { useAuthService } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { Admin } from "./Admin/Admin";
import { User } from "./User/User";
import { Flex, Text } from "@chakra-ui/react";

export const Resource = (): ReactElement => {
  const authService = useAuthService();
  return (
    <Flex flexDir="column" alignContent="flex-start" alignItems="center" mt="8" >
      <Text>Email: {authService.email}</Text>
      <Text>Username: {authService.username}</Text>
      <Text>Role: {authService.role}</Text>
      <Text>JWT: {authService.authorization}</Text>
      {authService.role === "user" ? <User /> : authService.role === "admin" ? <Admin /> : <Navigate to={paths.public} />}
    </Flex>
  )

};
