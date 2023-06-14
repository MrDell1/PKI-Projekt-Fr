import { Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/react";
import { useSessionStatus } from "@services/SessionService";
import { getGoogleUrl } from "@utils/getGoogleUrl";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Link, useLocation } from "react-router-dom";
import lp from "./assets/lp.jpg";

const LandingPage = (): ReactElement => {
  const location = useLocation();
  const from = ((location.state as any)?.from?.pathname as string) || "/";
  const status = useSessionStatus();
  return (
    <Flex
      bgImage={lp}
      bgPosition="top"
      bgRepeat="no-repeat"
      bgSize="cover"
      h="100vh"
      justifyContent="space-between"
      px="8"
      py="4"
      w="full"
    >
      <Flex flexDir="row" gap="16" textColor="light.100">
        <Heading>JWT Token</Heading>
      </Flex>
      <Flex
        alignItems="center"
        flexDir="column"
        gap="8"
        justifyContent="center"
        maxW="464px"
        mr="32"
      >
        <Box>
          <Heading fontSize="7xl" textColor="white">
            Check out JWT Tokens
          </Heading>
        </Box>
        {status === "anon" ? (
          <>
            <Flex justifyContent="space-between" w="full">
              <Link to={paths.signIn}>
                <Button>Sign in</Button>
              </Link>
              <Link to={paths.signUp}>
                <Button>Sign up</Button>
              </Link>
            </Flex>

            <Flex alignItems="center" w="full">
              <Divider orientation="horizontal" />
              <Text color="white" fontSize="sm" px="3">
                OR
              </Text>
              <Divider orientation="horizontal" />
            </Flex>
            <Flex gap="4" justifyContent="center" w="full">
              <Link to={getGoogleUrl(from)}>
                <Button bg="red.600" size="md">
                  Google
                </Button>
              </Link>
            </Flex>
          </>
        ) : (
          <Link to={paths.dashboard}>
            <Button>Dashboard</Button>
          </Link>
        )}
      </Flex>
    </Flex>
  );
};
export default LandingPage;
