import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { UserData } from "../Admin";
import { Deactivate } from "../Deactivate/Deactivate";
import { Activate } from "../Activate/Activate";
import { Fragment, ReactElement } from "react";
import { Table, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";

type Props = {
    data: UserData[];
}

export const AdminTable = ({data}:Props): ReactElement => {
    const columns: ColumnDef<UserData>[] = [        
        {
          header: 'Username',
          accessorKey: 'username',
        },
        {
          header: 'Email',
          accessorKey: 'email',
        },
        {
          header: 'Role',
          accessorKey: 'role',
        },
        {
          header: "Activate/Deactivate",
          accessorKey: "isActive",
          cell: ({row}) => {
            if(row.original.isActive === 1 ){
              return <Deactivate id={row.original.idusers} />
            }
              return <Activate id={row.original.idusers} />
            
          }
        },
    ];
    const { getHeaderGroups, getRowModel } = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
      });

    return (
        <Table variant="simple">
        <Thead>
          {getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th fontSize="md" key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {getRowModel().rows.map((row) => (
            <Fragment key={row.id}>
              <Tr>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            </Fragment>
          ))}
        </Tbody>
      </Table>
    )
}