import React from 'react'
import PaginatedTable from "../../common/pagination"
import { useEffect, useState } from 'react'

export default function Items(props) {
  const [rows, setrows] = useState(props.data)

  const columns = [
    {
      title: "Date Created",
      render: rowData => {
        return <span>{new Date(rowData.created).toLocaleDateString('en-uk')}</span>
      }
    },
    {
      title: "Item",
      render: rowData => {
        return <span>{rowData.service_name}</span>
      }
    },
    {
      title: "Quantity",
      render: rowData => {
        return <span>{rowData.quantity}</span>
      }
    },
    {
      title: "Price",
      render: rowData => {
        return <span>{rowData.price}</span>
      }
    },
    {
      title: "Total",
      render: rowData => {
        return <span>{rowData.cost}</span>
      }
    }
  ]

  useEffect(() => {
    setrows(props.data)
  }, [props.data, rows])

  return <PaginatedTable cols={columns} rows={rows} />
}