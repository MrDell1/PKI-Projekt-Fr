import {
  Box,
  Button,
  Divider,
  Flex,
  Highlight,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { DatabaseDetail } from "@services/DashboardService";
import { ReactElement, useState } from "react";

type Props = {
  data: DatabaseDetail;
  onRequestChange: (value: string) => void;
  onRequestSubmit: () => void;
  request: string;
};

export const Controller = ({
  data,
  onRequestChange,
  onRequestSubmit,
  request,
}: Props): ReactElement => {
  //const [request, setRequest] = useState("");
  const [table, setTable] = useState("");

  return (
    <Flex
      alignItems="center"
      boxShadow="md"
      flexDir="column"
      gap="8"
      justifyContent="center"
      px="32"
      py="12"
      w="50%"
    >
      <Text fontSize="2xl" fontWeight="semibold" textAlign="center">
        <Highlight query={data.name} styles={{ fontWeight: "bold" }}>
          {`You are connected to ${data.name} database`}
        </Highlight>
      </Text>
      <Text fontSize="xl" fontWeight="semibold" textAlign="center">
        <Highlight query="table" styles={{ fontWeight: "bold" }}>
          Choose table to see the content
        </Highlight>
      </Text>
      <Select
        _active={{ borderColor: "light.300" }}
        _hover={{ borderColor: "light.100" }}
        borderColor="light.200"
        fontWeight="semibold"
        onChange={(e) => {
          setTable(e.target.value);
          onRequestChange(`SELECT * FROM ${e.target.value}`);
        }}
        placeholder="Select table"
        value={table}
      >
        {data.tables.map((table, key) => {
          return (
            <option key={key} value={table.tableName}>
              {table.tableName}
            </option>
          );
        })}
      </Select>
      <Button isDisabled={!table} onClick={() => onRequestSubmit()} size="md">
        Show table content
      </Button>
      <Flex alignItems="center" w="full">
        <Divider borderColor="light.100" />
        <Text fontWeight="semibold" px="2">
          OR
        </Text>
        <Divider borderColor="light.100" />
      </Flex>
      <Box w="full">
        <Text fontSize="xl" fontWeight="semibold" textAlign="center">
          Type your SQL request
        </Text>
        <Textarea
          _hover={{
            borderColor: "light.100",
          }}
          borderColor="light.200"
          maxH="28"
          onChange={(e) => onRequestChange(e.target.value)}
          placeholder="SELECT..."
          value={request}
        />
        <Flex justifyContent="flex-end" py="4" w="full">
          <Button onClick={() => onRequestSubmit()} size="md">
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};
