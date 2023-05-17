import { Box, Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { paths } from "@utils/paths";
import { ReactElement } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function uplodData(): Promise<Response> {
  const response = fetch("https://pkilab6.azurewebsites.net/resources/public", {
    method: "GET",
    headers: {
      "Access-Control-Allow-Origin":"https://pki-esj4-mrdell1.vercel.app",
    }
  });
  // const result = await response.json();
  return response;
}

const Public = (): ReactElement => {
  const query = useQuery(["publicData"], () =>
    uplodData().then((respone) => respone.json())
  );
  const navigate = useNavigate();
  if(query.status === "error"){
    return <Flex justifyContent="center" alignItems="center">Error please try again later</Flex>
  }
  if (query.status === "success") {
    return (
      <Flex flexDir="column">
        <Box w="full" px="16" py="4" backgroundColor="light.100" borderBottomRadius="xl" boxShadow="md">
        <Button onClick={() => navigate(paths.root)} size="sm" variant="tertiary">
          Home
        </Button>
        </Box>
        <Heading>{query?.data.user[0].data}</Heading>
      </Flex>
    );
  }
  return <Spinner size="xl" />;
};

export default Public;
