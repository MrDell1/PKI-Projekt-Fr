import { Button, Flex, Text } from "@chakra-ui/react";
import { useAuthService } from "@services/SessionService";
import { ReactElement } from "react";

type Props = {
  handleBack: (value: React.SetStateAction<boolean>) => void;
};

export const TopBar = ({ handleBack }: Props): ReactElement => {
  const authService = useAuthService();
  return (
    <Flex
      alignItems="center"
      backgroundColor="light.100"
      borderBottomRadius="xl"
      boxShadow="md"
      justifyContent="space-between"
      px="16"
      py="4"
    >
      <Flex gap="4">
        <Button onClick={() => handleBack(false)} size="sm" variant="tertiary">
          Home
        </Button>
        <Button
          onClick={() => authService.signOut()}
          size="sm"
          variant="tertiary"
        >
          Sign Out
        </Button>
      </Flex>
      <Text fontWeight="bold">{authService.username}</Text>
    </Flex>
  );
};
