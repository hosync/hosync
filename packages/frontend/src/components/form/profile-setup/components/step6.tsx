'use client'

import React, { FC, useEffect, useState } from 'react'

import { File } from '@/components/ui/file'
import { FilesPreviewer } from '@/components/ui/files-previewer'
import { Modal } from '@/components/ui/modal'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'
import config from '@/lib/config'

type Props = {
  uploadedFiles: any
  setUploadedFiles: any
}

const Step6: FC<Props> = ({ uploadedFiles, setUploadedFiles }) => {
  const { setFormValues } = useProfileSetupForm()
  const [isUploadPhotosOpen, setIsUploadPhotosOpen] = useState(true)

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setFormValues({
        images: uploadedFiles
      })
      setIsUploadPhotosOpen(false)
    }
  }, [uploadedFiles])

  return (
    <div
      style={{ scrollbarWidth: 'none' }}
      className="flex flex-col  space items-center text-center w-full  h-full overflow-y-auto "
    >
      <div className="w-[50vw] flex justify-center flex-col items-center h-auto ">
        <div className="w-full mt-3 h-auto">
          <Modal
            isModalOpen={isUploadPhotosOpen}
            onClose={() => {
              setIsUploadPhotosOpen(false)
            }}
            title="Upload photos"
            removeBackground={true}
          >
            <File
              name="fileName"
              label={
                uploadedFiles.length === 0
                  ? 'Drag your photo'
                  : 'Add more photos'
              }
              maxFileSize={52000000}
              multiple
              allowedFiles={config.files.extensions.images}
              setUploadedFiles={setUploadedFiles}
            />
          </Modal>
        </div>

        <FilesPreviewer
          files={uploadedFiles}
          setFiles={setUploadedFiles}
          isUploadPhotosOpen={isUploadPhotosOpen}
          setIsUploadPhotosOpen={setIsUploadPhotosOpen}
        />
      </div>
    </div>
  )
}

export { Step6 }
