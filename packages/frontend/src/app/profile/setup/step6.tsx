'use client'

import React, { FC, useEffect, useState } from 'react'

import i18n from '~/app/core/contexts/server/I18nContext'
import config from '~/config'
import File from '~/design-system/File'
import FilesPreviewer from '~/design-system/FilesPreviewer'
import Modal from '~/design-system/Modal'

type Props = {
  locale: string
  uploadedFiles: any
  setUploadedFiles: any
  setEnableNext: (enableNext: boolean) => void
}

const Step: FC<Props> = ({ locale, uploadedFiles, setUploadedFiles, setEnableNext }) => {
  const [isUploadPhotosOpen, setIsUploadPhotosOpen] = useState(true)
  const t = i18n(locale)

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setIsUploadPhotosOpen(false)
    }

    setEnableNext(uploadedFiles.length > 0)
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
            title={t('profile.setup.step6.uploadPhotos')}
            removeBackground={true}
          >
            <File
              name="fileName"
              locale={locale}
              label={
                uploadedFiles.length === 0
                  ? t('profile.setup.step6.dragYourPhoto')
                  : t('profile.setup.step6.addMorePhotos')
              }
              maxFileSize={52000000}
              multiple
              allowedFiles={config.files.extensions.images}
              setUploadedFiles={setUploadedFiles}
            />
          </Modal>
        </div>

        <FilesPreviewer
          locale={locale}
          files={uploadedFiles}
          setFiles={setUploadedFiles}
          isUploadPhotosOpen={isUploadPhotosOpen}
          setIsUploadPhotosOpen={setIsUploadPhotosOpen}
        />
      </div>
    </div>
  )
}

export default Step
