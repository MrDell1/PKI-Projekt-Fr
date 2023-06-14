import { Box, Flex, Spinner } from "@chakra-ui/react";
import { TopBar } from "@components/TopBar/TopBar";
import { useDashboardService } from "@services/DashboardService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement, useState } from "react";
import { Controller } from "./Controller/Controller";
import { TableViewer } from "./TableViewer/TableViewer";

export const Dashboard = (): ReactElement => {
  const dashboardService = useDashboardService();
  const { data, status } = useQuery(
    dashboardService.databaseDetailKey(),
    dashboardService.getDatabaseDetail
  );
  const [request, setRequest] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [table, setTable] = useState("");

  const handleTableChange = (value: string) => {
    setTable(value);
  };

  const handleRequestChange = (value: string) => {
    setRequest(value);
  };
  const handleRequestSubmit = () => {
    setIsSubmitted(true);
  };
  console.log(request);
  if (status === "loading") {
    return <Spinner />;
  }
  if (status === "error" || !data) {
    return <Box>Error</Box>;
  }
  return (
    <Box>
      <TopBar handleBack={setIsSubmitted} />
      <Flex
        alignItems="center"
        h="calc(100vh - 72px)"
        justifyContent="center"
        py="16"
      >
        {isSubmitted ? (
          <TableViewer request={request} tableName={table} />
        ) : (
          <Controller
            data={data}
            onRequestChange={handleRequestChange}
            onRequestSubmit={handleRequestSubmit}
            onTableChange={handleTableChange}
            request={request}
            table={table}
          />
        )}
      </Flex>
    </Box>
  );
};
