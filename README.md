## Time Tracking System Backend Quick start guide

# Version info

node : 20.12.2
npm : 10.5.0

# Install Pakages using npm

npm install

## Create, migrate and seed database using below commands

npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

## Start development server

npm start

## Database Schema

Database Schema : https://dbdiagram.io/d/6687d4709939893dae2397bf



import { useEffect, useState } from "react";
import { InputField } from "../Forms/FormFields";

const DynamicTable = ({ columns, data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const search = (searchValue) => {
    setSearchTerm(searchValue);
    if (!searchTerm) {
      setFilteredData(data);
      setCurrentPage(1);
      return;
    }

    const searchFilter = data.filter((row) =>
      columns.some((col) =>
        String(row[col.accessor]).toLowerCase().includes(searchValue?.toLowerCase())
      )
    );
    setFilteredData(searchFilter);
    setCurrentPage(1);
  };

  const handleInputChange = (e) => {
    search(e.target.value);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleClick = (event, number) => {
    event.preventDefault();
    setCurrentPage(number);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
          <a onClick={(event) => handleClick(event, i)} className="page-link" href="!#">
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <>
      <InputField type="text" placeholder={"search......."} value={searchTerm} error={""} onChange={handleInputChange} />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((col) => (
                <th key={col.accessor} scope="col" className="px-6 py-3">{col.Header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentRows.length <= 0 ? (
              <tr className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'>
                <td colSpan={columns.length} className='px-6 py-4 text-center'>No data Found</td>
              </tr>
            ) : (
              currentRows.map((row) => (
                <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  {columns.map((col) => (
                    <td key={col.accessor} className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {col.Cell ? col.Cell(row[col.accessor], row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <nav className="mt-4">
        <ul className="pagination">
          {renderPageNumbers()}
        </ul>
      </nav>
    </>
  );
};

export default DynamicTable;
