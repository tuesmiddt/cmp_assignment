import { Flex, TableContainer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from '@chakra-ui/icons';
import Header from 'components/declaration_form/header';
import { getSubmissions } from '@/lib/api';
import {
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  chakra,
  Button,
  HStack,
} from '@chakra-ui/react';
import type { Submission } from '@/lib/api';
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  SortingState,
} from '@tanstack/react-table';

const DataTable = ({ data }: { data: Array<Submission> }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const columnHelper = createColumnHelper<Submission>();
  const columns = [
    columnHelper.accessor('name', {
      cell: (info) => info.getValue(),
      header: 'Name',
    }),
    columnHelper.accessor('temperature', {
      cell: (info) => info.getValue(),
      header: 'Temperature',
    }),
    columnHelper.accessor('hasSymptoms', {
      cell: (info) => (info.getValue() ? 'yes' : 'no'),
      header: 'Symptoms',
    }),
    columnHelper.accessor('hasContact', {
      cell: (info) => (info.getValue() ? 'yes' : 'no'),
      header: 'Close Contact',
    }),
    columnHelper.accessor('createdAt', {
      cell: (info) => {
        const date = info.getValue();
        return date == null
          ? ''
          : `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      },
      header: 'Date',
    }),
  ];

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
  });

  return (
    <TableContainer w="100%">
      <Table>
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <chakra.span>
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === 'desc' ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack dir="row" mt="4px">
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon />
        </Button>
        <chakra.span>
          Page{' '}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount()}
          </strong>
        </chakra.span>
      </HStack>
    </TableContainer>
  );
};

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<Array<Submission>>([]);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await getSubmissions();
      setSubmissions(result);
      setLoading(false);
    };
    loadData();
  }, []);

  return (
    <>
      <main>
        <Flex
          position="fixed"
          w="100%"
          h="100%"
          bg="gray.50"
          direction="column"
          overflow="scroll"
        >
          <Header text="Covid-19 Declaration Submissions" />
          <Flex w="100%" justify="center" grow="1">
            <Flex w={['100%', '100%', 960]} bg="white" p="8px">
              {loading ? <Spinner /> : <DataTable data={submissions} />}
            </Flex>
          </Flex>
        </Flex>
      </main>
    </>
  );
}
