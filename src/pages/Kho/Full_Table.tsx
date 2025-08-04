import React from 'react';
import {
  useTable,
  useSortBy,
  useFilters,
  usePagination,
  Column,
  TableInstance,
} from 'react-table';

interface User {
  id: number;
  name: string;
  age: number;
}

// 🔍 Filter mặc định: ô input
function DefaultColumnFilter({
  column: { filterValue, setFilter },
}: any) {
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)}
      placeholder="Search..."
      style={{ width: '100%', padding: '4px' }}
    />
  );
}

// 🧾 Dữ liệu mẫu
const data: User[] = [
  { id: 1, name: 'Alice', age: 30 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Charlie', age: 45 },
  { id: 4, name: 'David', age: 20 },
  { id: 5, name: 'Emma', age: 33 },
  { id: 6, name: 'Frank', age: 50 },
  { id: 7, name: 'Grace', age: 29 },
];

// 📊 Cột
const columns: Column<User>[] = [
  {
    Header: 'ID',
    accessor: 'id',
    Filter: DefaultColumnFilter,
  },
  {
    Header: 'Name',
    accessor: 'name',
    Filter: DefaultColumnFilter,
  },
  {
    Header: 'Age',
    accessor: 'age',
    Filter: DefaultColumnFilter,
  },
];

const FullTable: React.FC = () => {
  const defaultColumn = React.useMemo(
    () => ({
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page, // dùng thay cho rows
    prepareRow,
    state: { pageIndex },
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  }: TableInstance<User> = useTable<User>(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 3 }, // 3 dòng/trang
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <React.Fragment key={headerGroup.id}>
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    style={{
                      border: '1px solid black',
                      padding: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    {column.render('Header')}
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </th>
                ))}
              </tr>
              <tr>
                {headerGroup.headers.map((column) => (
                  <th key={column.id}>
                    {column.canFilter ? column.render('Filter') : null}
                  </th>
                ))}
              </tr>
            </React.Fragment>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    style={{ border: '1px solid gray', padding: '8px' }}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 📍 Phân trang */}
      <div style={{ marginTop: 10 }}>
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          ⏮ First
        </button>
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          ◀ Prev
        </button>
        <span style={{ margin: '0 10px' }}>
          Page <strong>{pageIndex + 1}</strong> of {pageOptions.length}
        </span>
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next ▶
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          Last ⏭
        </button>
      </div>
    </>
  );
};

export default FullTable;