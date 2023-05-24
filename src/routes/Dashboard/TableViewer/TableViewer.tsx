import { Box, Spinner, Text } from "@chakra-ui/react";
import { useDashboardService } from "@services/DashboardService";
import { useQuery } from "@tanstack/react-query";
import { ReactElement } from "react";
import { TableData } from "./TableData/TableData";
type Props = {
  request: string;
};

export const TableViewer = ({ request }: Props): ReactElement => {
  const dashboardService = useDashboardService();
  const { data, status, error } = useQuery(
    dashboardService.tableKey(request),
    dashboardService.getTableValues,
    {
      refetchOnWindowFocus: false,
    }
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

  return <TableData data={data} />;
};
