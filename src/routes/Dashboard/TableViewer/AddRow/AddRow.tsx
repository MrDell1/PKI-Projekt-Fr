import { IconButton, Input, Td, Tr } from "@chakra-ui/react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { Row } from "@services/DashboardService";
import { ReactElement, useEffect, useState } from "react";

type Props = {
  tableData: Row;
  tableName: string;
  onSubmit: (request: string) => void;
};

export const AddRow = ({
  tableData,
  tableName,
  onSubmit,
}: Props): ReactElement => {
  const [newRow, setNewRow] = useState(new Map());
  useEffect(() => {
    tableData.cells.map((value) => {
      setNewRow((prev) => prev.set(value.columnName, ""));
    });
  }, [tableData]);
  const handleAddRow = () => {
    const columns: string[] = [];
    const values: string[] = [];
    newRow.forEach((value, key) => {
      columns.push(key);
      values.push(`'${value}'`);
    });
    onSubmit(
      `INSERT INTO ${tableName} (${columns.toString()}) VALUES (${values.toString()})`
    );
  };
  return (
    <Tr>
      {tableData.cells.map((value, key) => {
        return (
          <Td key={key}>
            <Input
              borderColor="light.100"
              onChange={(e) =>
                setNewRow(
                  (prev) => new Map(prev.set(value.columnName, e.target.value))
                )
              }
              value={newRow.get(value.columnName)}
            />
          </Td>
        );
      })}
      <Td>
        <IconButton
          aria-label="save"
          icon={<CheckRoundedIcon />}
          onClick={handleAddRow}
          size="sm"
          variant="secondary"
        />
      </Td>
    </Tr>
  );
};
