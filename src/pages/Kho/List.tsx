import React, { useState, useEffect } from "react";

import Pagination from "react-pagination-library";
import "react-pagination-library/build/css/index.css";
import { get_data_tables_query } from '../../api/kho/index'
import '../../index.css'; // nếu chưa có
import './components/pagination-custom.css';

interface Item {
    id: number;
    store_name: string;
    active: string;
    description: string;
}
type SortDirection = 'asc' | 'desc';
interface SortConfig {
    key: keyof Item;
    direction: SortDirection;
}

// interface PaginatedListProps {
//     items: Item[];
//     itemsPerPage?: number;
// }

const PaginatedList = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [countpage, setCountPage] = useState<number>(0);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const options = [
        { value: "5", label: "5" }, { value: "10", label: "10" },
        { value: "15", label: "15" }, { value: "50", label: "50" },
    ]; //combobox

    useEffect(() => {
        getList()
    }, [currentPage, itemsPerPage])

    const getList = async () => {
        const data = { page: currentPage, perPage: itemsPerPage }
        await get_data_tables_query(data).then(result => {
            if (result.success === true) {
                setItems(result.data)
                setItemsPerPage(result.per_page)
                setCountPage(result.countpages)
            }
        })
    }

    // const totalPages = Math.ceil(items.length / itemsPerPage);

    // const currentItems = items.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    // const goToPage = (page: number) => {
    //     if (page >= 1 && page <= totalPages) {
    //         setCurrentPage(page);
    //     }
    // };
    const changeCurrentPage = (numPage: number) => {
        setCurrentPage(numPage)
        //console.log(numPage) trang 1 2 3 4 ...
    };

    const chgItemsPerPage = (iPerPage: number) => {
        setItemsPerPage(iPerPage);
        changeCurrentPage(1);
    }

    const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
    const handleSort = (key: keyof Item) => {
        let direction: SortDirection = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        const sortedData = [...items].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
            return 0;
        });
        setSortConfig({ key, direction });
        setItems(sortedData);
    };

    const getSortIndicator = (key: keyof Item) => {
        if (!sortConfig || sortConfig.key !== key) return '';
        return sortConfig.direction === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <>
            <hr />
            {items.length > 0 &&
                <div className="relative">
                    <div className="space-y-6">
                        Xem &nbsp;
                        <select value={itemsPerPage} onChange={(e) => chgItemsPerPage((Number)(e.target.value))} className="h-11 appearance-none rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-none focus:ring focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800">
                            {options.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select> &nbsp; mục
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" onClick={() => handleSort('id')} className="px-6 py-3 text-center">ID {getSortIndicator('id')}</th>
                                <th scope="col" onClick={() => handleSort('store_name')}className="px-6 py-3 text-center">Store Name {getSortIndicator('store_name')}</th>
                                <th scope="col" onClick={() => handleSort('active')} className="px-6 py-3 text-center">Active {getSortIndicator('active')}</th>
                                <th scope="col" onClick={() => handleSort('description')} className="px-6 py-3 text-center">Description {getSortIndicator('description')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.length > 0 &&
                                items?.map((items, index) => {
                                    return (<tr>
                                        <td key={index} className="text-gray-900 whitespace-nowrap dark:text-white border text-center">
                                            {items.id} </td>
                                        <td className="text-gray-900 whitespace-nowrap dark:text-white border text-center">
                                            {items.store_name} </td>
                                        <td className="text-gray-900 whitespace-nowrap dark:text-white border text-center">
                                            {items.active} </td>
                                        <td className="text-gray-900 whitespace-nowrap dark:text-white border text-center">
                                            {items.description} </td> </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>}
            <hr />
            {items.length > 0 && countpage > 1 &&
                <div className="text-right">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={countpage}
                        changeCurrentPage={changeCurrentPage}
                        theme="Square fill justify-content-center"
                        pageRangeDisplayed={5}
                    />
                </div>
            }
        </>

        // <>
        //     <ul>
        //         {items.length > 0 &&
        //             items?.map((items, index) => {
        //                 return (
        //                     <li key={index}>
        //                         {items.store_name}
        //                     </li>
        //                 )
        //             })
        //         }
        //     </ul>
        //     <hr />
        //     {items && countpage > 1 &&
        //         <div className="text-center">
        //             <Pagination
        //                 currentPage={currentPage}
        //                 totalPages={countpage}
        //                 changeCurrentPage={changeCurrentPage}
        //                 theme="Square fill justify-content-center"
        //                 pageRangeDisplayed={5}
        //             />
        //         </div>
        //     }
        // </>
    );
};

export default PaginatedList;
