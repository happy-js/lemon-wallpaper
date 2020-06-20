import React, { useState, useEffect } from 'react'
import request from 'electron-happy-ipc/request'
import ImageList from './image'

export default function LocalList () {
  const [list, setList] = useState<Array<any>>([])
  const [showList, setShowList] = useState<Array<any>>([])
  const [rowsPerPage, setRowsPerPage] = useState(12)

  useEffect(() => {
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // 每页分页数量
  const rowsPerPageChange = (num: number) => {
    setRowsPerPage(num)
  }

  // 当前分页发生了变化
  const pageChange = (num: number) => {
    console.log('当前查询: ', num)
    const startNumber = num * rowsPerPage
    setShowList(list.slice(startNumber, startNumber + rowsPerPage))
  }

  const init = async () => {
    const result = await request('get-local-img')
    if (result.success) {
      setList(result.content)
      setShowList(result.content.slice(0, rowsPerPage))
    } else {
      // 提示
    }
  }

  return (
    <div>
      <ImageList
        list={showList}
        isLocal
        rowsPerPage={rowsPerPage}
        onPerPageChange={rowsPerPageChange}
        onPageChange={pageChange}
      />
    </div>
  )
}