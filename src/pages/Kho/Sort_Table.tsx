import React, { useState } from 'react';

type SortDirection = 'asc' | 'desc';

interface User {
  id: number;
  name: string;
  age: number;
}

const initialData: User[] = [
  { id: 1, name: 'Alice', age: 32 },
  { id: 2, name: 'Bob', age: 25 },
  { id: 3, name: 'Elena', age: 22 },
  { id: 4, name: 'David', age: 30 },
  { id: 5, name: 'Charlie', age: 20 },
];

interface SortConfig {
  key: keyof User;
  direction: SortDirection;
}

const SortableTable: React.FC = () => {
  const [data, setData] = useState<User[]>(initialData);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);

  const handleSort = (key: keyof User) => {
    let direction: SortDirection = 'asc';

    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const getSortIndicator = (key: keyof User) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <table border={1} cellPadding={5} style={{ borderCollapse: 'collapse' }} className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead  className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th onClick={() => handleSort('id')}>ID{getSortIndicator('id')}</th>
          <th onClick={() => handleSort('name')}>Name{getSortIndicator('name')}</th>
          <th onClick={() => handleSort('age')}>Age{getSortIndicator('age')}</th>
        </tr>
      </thead>
      <tbody>
        {data.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
