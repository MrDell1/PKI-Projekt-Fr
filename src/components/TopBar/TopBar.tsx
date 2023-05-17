import { Button, Flex, Text } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

export const TopBar = (): ReactElement => {
  const authService = useAuthService();
  const navigate = useNavigate();
  return (
    <Flex justifyContent="space-between" alignItems="center" px="16" py="4" backgroundColor="light.100" borderBottomRadius="xl" boxShadow="md">
      <Flex gap="4">
      <Button onClick={() => navigate(paths.root)} size="sm" variant="tertiary">
        Home
      </Button>
      <Button onClick={() => authService.signOut()} size="sm" variant="tertiary">
        Sign Out
      </Button>
      </Flex>
      <Text fontWeight="bold">
        {authService.username}
      </Text>
    </Flex>
  );
};
