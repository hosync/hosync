import { FC, ReactNode, useEffect, useState } from 'react'

import Button from '~/design-system/Button'
import Modal from '~/design-system/Modal'
import Table from '~/design-system/Table'

type Props = {
  label: string
  createModalTitle: string
  editModalTitle: string
  headers: string[]
  data: { checksum: string; data: any[] }
  setParentData: any
  refetch: any
  renderRow: (item: any) => ReactNode[]
  CreateFormComponent: ReactNode
  EditFormComponent: ReactNode
  isEditModalOpen: boolean
  onCloseModal: any
}

const ResultsTable: FC<Props> = ({
  label,
  createModalTitle,
  editModalTitle,
  headers,
  data: { checksum, data },
  setParentData,
  refetch,
  renderRow,
  CreateFormComponent,
  EditFormComponent,
  isEditModalOpen,
  onCloseModal
}) => {
  const [key, setKey] = useState<string>(checksum)
  const [rows, setRows] = useState<ReactNode[][]>(data.map(renderRow))
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  useEffect(() => {
    setRows(data.map(renderRow))
    setKey(checksum)
  }, [data, renderRow, checksum])

  return (
    <>
      <Modal
        isModalOpen={isCreateModalOpen}
        isFullScreen
        wrapContent
        onClose={async () => {
          onCloseModal()
          setIsCreateModalOpen(false)

          const { checksum, items: newData } = await refetch()

          setParentData(newData)
          setKey(checksum)
        }}
        title={createModalTitle}
      >
        {CreateFormComponent}
      </Modal>

      <Modal
        isModalOpen={isEditModalOpen}
        isFullScreen
        wrapContent
        onClose={async () => {
          onCloseModal()

          const { checksum, items: newData } = await refetch()

          setParentData(newData)
          setKey(checksum)
        }}
        title={editModalTitle}
      >
        {EditFormComponent}
      </Modal>

      <Table
        key={key}
        label={label}
        createButton={
          <Button shape="circle" onClick={() => setIsCreateModalOpen(true)}>
            + Create
          </Button>
        }
        striped
        headers={headers}
        rows={rows}
        hoverHighlight
        rowsPerPage={10}
      />
    </>
  )
}

export default ResultsTable
