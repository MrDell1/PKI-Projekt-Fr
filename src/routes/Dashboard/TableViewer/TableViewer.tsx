import {
  Box,
  Button,
  Flex,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Row, useDashboardService } from "@services/DashboardService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ReactElement, useEffect, useState } from "react";
import { AddRow } from "./AddRow/AddRow";
import { Cell } from "./Cell/Cell";
import { DeleteRow } from "./DeleteRow/DeleteRow";

type Props = {
  request: string;
  tableName: string;
};

export const TableViewer = ({ request, tableName }: Props): ReactElement => {
  const dashboardService = useDashboardService();
  const toast = useToast();
  const [isNew, setIsNew] = useState(false);
  const [tableData, setTableData] = useState<Row[]>();
  const { data, status, error, refetch } = useQuery(
    dashboardService.tableKey(request),
    dashboardService.getTableValues,
    {
      refetchOnWindowFocus: false,
    }
  );
  const [sorted, setSorted] = useState<{ reversed: boolean }[]>([]);
  useEffect(() => {
    if (data) {
      setTableData(data);
      const columnsNames = data[0].cells.map((value) => value.columnName);
      const sortArray = columnsNames.map(() => {
        return {
          reversed: false,
        };
      });

      setSorted(sortArray);
    }
  }, [data]);

  const { mutate } = useMutation(dashboardService.sendSQLRequest);

  const handleTableChange = (request: string) => {
    mutate(request, {
      onSuccess: () => {
        toast({
          status: "success",
          title: "Successfully edited a cell",
        });
        refetch();
      },
      onError: (error) => {
        toast({
          status: "error",
          title: "Error",
          description: `${error}`,
        });
      },
    });
  };

  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "error" || !data || !tableData) {
    return (
      <Box>
        <Text>{(error as Error).message}</Text>
      </Box>
    );
  }

  const sortData = (columnId: number) => {
    const sortArray = sorted;
    const isReversed = sortArray.splice(columnId, 1, {
      reversed: !sorted[columnId].reversed,
    });

    setSorted(sortArray);
    const tableDataCopy = [...tableData];
    tableDataCopy.sort((a, b) => {
      const aValue = a.cells[columnId].value;
      const bValue = b.cells[columnId].value;
      if (aValue && bValue) {
        if (typeof aValue === "number" && typeof bValue === "number") {
          if (isReversed[0].reversed) {
            return Number(aValue) - Number(bValue);
          }
          return Number(bValue) - Number(aValue);
        } else {
          if (isReversed[0].reversed) {
            return aValue.toLowerCase().localeCompare(bValue.toLowerCase());
          }
          return bValue.toLowerCase().localeCompare(aValue.toLowerCase());
        }
      }
      return 1;
    });
    setTableData(tableDataCopy);
  };

  return (
    <Flex
      alignItems="center"
      flexDir="column"
      gap="16"
      h="calc(100vh - 72px)"
      justifyContent="center"
      maxW="100vw"
      px="32"
    >
      <Flex flexDir="column" gap="8" w="full">
        <Heading textAlign="center">Table Editor</Heading>
        <Text textAlign="center">
          To edit cell click on chosen one edit value and click check button. To
          add new row click on "Add" button, fill values of all columns and
          press check button in last column. To delete row click on bin icon in
          last row and confirm it. To sort columns press button next to column
          name.
        </Text>
        <Flex flexDir="row" justifyContent="flex-end">
          {isNew ? (
            <Button onClick={() => setIsNew(false)} size="sm" variant="primary">
              Cancel
            </Button>
          ) : (
            <Button
              onClick={() => setIsNew(true)}
              size="sm"
              variant="secondary"
            >
              Add
            </Button>
          )}
        </Flex>
      </Flex>
      <TableContainer w="full">
        <Table variant="simple">
          <Thead>
            <Tr>
              {tableData[0].cells.map((value, key) => {
                return (
                  <Th key={key}>
                    <Flex gap="2">
                      {value.columnName}
                      <IconButton
                        aria-label="sort"
                        icon={<ArrowDropDownIcon />}
                        onClick={() => sortData(key)}
                      />
                    </Flex>
                  </Th>
                );
              })}
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {isNew && (
              <AddRow
                onSubmit={handleTableChange}
                tableData={tableData[0]}
                tableName={tableName}
              />
            )}
            {tableData.map((row, rowKey) => {
              let id = "";
              let idColumnName = "";

              return (
                <Tr key={rowKey}>
                  {row.cells.map((cell, cellKey) => {
                    if (cell.columnName.toLowerCase().includes("_id")) {
                      id = cell.value;
                      idColumnName = cell.columnName;
                    }
                    return (
                      <Cell
                        columnName={cell.columnName}
                        handleCellChange={handleTableChange}
                        id={id ? id : cell.value}
                        idColumnName={
                          idColumnName ? idColumnName : cell.columnName
                        }
                        key={cellKey}
                        tableName={tableName}
                        value={cell.value}
                      />
                    );
                  })}
                  <Td>
                    <DeleteRow
                      handleRowDelete={handleTableChange}
                      request={`DELETE FROM ${tableName} WHERE ${idColumnName} = '${id}'`}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Flex>
  );
};
