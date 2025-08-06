import React, { useEffect, useState } from 'react';
import {
  useTable,
  useFilters,
  useSortBy,
  usePagination,
  //type Column,
  type TableInstance,
  //type HeaderGroup,
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
  { id: 8, name: 'Alice', age: 38 },
  { id: 9, name: 'Bob', age: 29 },
  { id: 10, name: 'Charlie', age: 41 },
  { id: 11, name: 'David', age: 21 },
  { id: 12, name: 'Emma', age: 32 },
  { id: 13, name: 'Frank', age: 51 },
  { id: 14, name: 'Grace', age: 24 },
  { id: 15, name: 'Alice', age: 30 },
  { id: 16, name: 'Bob', age: 25 },
  { id: 17, name: 'Charlie', age: 45 },
  { id: 18, name: 'David', age: 20 },
  { id: 19, name: 'Emma', age: 33 },
  { id: 20, name: 'Frank', age: 50 },
  { id: 21, name: 'Grace', age: 29 },
  { id: 22, name: 'Alice', age: 38 },
  { id: 23, name: 'Bob', age: 29 },
  { id: 24, name: 'Charlie', age: 41 },
  { id: 25, name: 'David', age: 21 },
  { id: 26, name: 'Emma', age: 32 },
  { id: 27, name: 'Frank', age: 51 },
  { id: 28, name: 'Grace', age: 24 },
];

// 👇 Tạo lại type Column thủ công (workaround)
type MyColumn<T extends object> = {
  Header: string;
  accessor: keyof T;
  Filter?: any;
};

type MyHeaderGroup = {
  id: string;
  headers: any[]; // hoặc cụ thể hơn nếu bạn muốn
  getHeaderGroupProps: () => any;
};

// 📊 Cột
const columns: MyColumn<User>[] = [
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
  const options = [
    { value: "5", label: "5" }, { value: "10", label: "10" },
    { value: "15", label: "15" }, { value: "50", label: "50" },
  ]; //combobox

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
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    setPageSize,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageIndex: 0, pageSize: 5 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  React.useEffect(() => {
    console.log('Page size changed:', pageSize);
    // Gọi API hoặc xử lý khác nếu cần
    gotoPage(0); // Reset về trang đầu tiên khi đổi số dòng hiển thị
  }, [pageSize]);

  type RowType = (typeof TableInstance)['rows'][number];
  type CellType = RowType['cells'][number];

  return (
    <>
      <div className="space-y-6">
        <label>
          Hiển thị:
          <select className="h-10 appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            style={{ marginLeft: '8px' }}          >
            {[5, 10, 15, 20].map((size) => (
              <option key={size} value={size}>
                {size} dòng/trang
              </option>
            ))}
          </select>
        </label>
      </div>
      <table {...getTableProps()} style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          {headerGroups.map((headerGroup: MyHeaderGroup) => (
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
          {page.map((row: RowType) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell: CellType) => (
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