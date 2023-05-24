import { ReactElement, useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useTimeout,
} from "@chakra-ui/react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Row } from "@services/DashboardService";

type Props = {
  data: Row[];
};

export const TableData = ({ data }: Props): ReactElement => {
  const [isSorting, setIsSorting] = useState(false);
  const manipulateData = useMemo(() => {
    setIsSorting(false);
    return data;
  }, [data, isSorting]);

  const handleSortString = (id: number) => {
    setIsSorting(true);
    manipulateData.sort((a, b) => {
      if (a.cells[id].value > b.cells[id].value) {
        return 1;
      }
      return -1;
    });
    console.log(manipulateData);
  };
  console.log(manipulateData);
  return (
    <Flex
      alignItems="center"
      flexDir="column"
      h="calc(100vh - 72px)"
      justifyContent="center"
      maxW="100vw"
      px="16"
    >
      <TableContainer maxW="100vw" w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {manipulateData[0].cells.map((value, key) => {
                return (
                  <Th key={key}>
                    {value.columnName}
                    <IconButton
                      aria-label="sort"
                      icon={<KeyboardArrowDownIcon />}
                      onClick={() => handleSortString(key)}
                    />
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {manipulateData.map((row, key) => {
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
