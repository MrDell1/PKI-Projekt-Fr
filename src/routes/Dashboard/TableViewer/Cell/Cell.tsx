import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Td,
  Text,
} from "@chakra-ui/react";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ReactElement, useEffect, useState } from "react";
type Props = {
  value: string;
  columnName: string;
  id: string;
  idColumnName: string;
  tableName: string;
  handleCellChange: (request: string) => void;
};

export const Cell = ({
  value,
  columnName,
  id,
  idColumnName,
  tableName,
  handleCellChange,
}: Props): ReactElement => {
  const [isEditable, setIsEditable] = useState(false);
  const [content, setContent] = useState(value);

  useEffect(() => {
    setContent(value);
  }, [value]);

  return (
    <Td h="16" onClick={() => setIsEditable((prev) => !prev)} w="full">
      {isEditable ? (
        <InputGroup>
          <Input
            autoFocus
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <InputRightElement>
            <IconButton
              aria-label="save"
              icon={<CheckRoundedIcon />}
              onClick={() =>
                handleCellChange(`UPDATE ${tableName}
                SET ${columnName} = '${content}'
                WHERE ${idColumnName} = '${id}'`)
              }
              size="sm"
              variant="secondary"
            />
          </InputRightElement>
        </InputGroup>
      ) : (
        <Text py="10px">{value}</Text>
      )}
    </Td>
  );
};
