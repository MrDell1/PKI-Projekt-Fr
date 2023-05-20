import {
  Box,
  Flex,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useDashboardService } from "@services/DashboardService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";

type Props = {
  request: string;
};

export const TableViewer = ({ request }: Props): ReactElement => {
  const dashboardService = useDashboardService();
  const { data, status, error } = useQuery(
    dashboardService.tableKey(request),
    dashboardService.getTableValues
  );

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "error" || !data) {
    console.log(error);
    return (
      <Box>
        <Text>{error.message}</Text>
      </Box>
    );
  }
  console.log(data);
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      gap="16"
      h="calc(100vh - 72px)"
      justifyContent="center"
      px="64"
    >
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {data[0].cells.map((value, key) => {
                return <Th key={key}>{value.columnName}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((row, key) => {
              return (
                <Tr key={key}>
                  {row.cells.map((cell, key) => {
                    return <Td key={key}>{cell.value}</Td>;
                  })}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
