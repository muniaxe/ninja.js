import React, { Component, useEffect, useState } from 'react';

import Pagination from './Pagination';
import Row from './Row';
import Search from './Search';

// Ændret fra klasse komponenter til klasse komponenter
const DataTable = (props) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(props.rowsPerPage || 40)
    const [rows, setRows] = useState(props.rows)
    const [totalNumberOfPages, setTotalNumberOfPages] = useState()

    const calculateTotalNumberOfPages = (rows) => {
        if (rowsPerPage === 0) return 0
        return Math.ceil(rows.length / rowsPerPage)
    }

    const search = (event) => {
        const text = event.target.value
        let rowsFound = props.rows

        if (text) {
            rowsFound = rows.filter((row) => {
                return row.name1.toLowerCase().search(text.toLowerCase()) > -1 ||
                    (row.email && row.email.toLowerCase().search(text.toLowerCase()) > -1)
            })
        }

        setRows(rowsFound)
        setCurrentPageNumber(0)
        setTotalNumberOfPages(calculateTotalNumberOfPages(rowsFound))
    }

    const changeToPageNumber = (pageNumber) => {
        setCurrentPageNumber(pageNumber)
    }

    const rowsInPageNumber = (pageNumber) => {
        const startIndex = pageNumber * rowsPerPage
        return [startIndex, startIndex + rowsPerPage]
    }

    useEffect(() => {
        setTotalNumberOfPages(calculateTotalNumberOfPages(props.rows))
    }, [props.rows])

    const rowsToRender =
        rows.map(row => <Row key={row.per_id} row={row} />)
            .slice(...rowsInPageNumber(currentPageNumber))

    return (
        <div>
            <Search onSearch={search} />
            <table>
                <tbody>
                    {rowsToRender}
                </tbody>
            </table>
            <Pagination
                currentPageNumber={currentPageNumber}
                totalNumberOfPages={totalNumberOfPages}
                onChange={changeToPageNumber} />
        </div>
    )
}

export default DataTable