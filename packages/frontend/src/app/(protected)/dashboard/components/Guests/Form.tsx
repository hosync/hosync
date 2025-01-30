'use client'

import React, { FC, useState } from 'react'

import { RenderIf } from '@hosgu/components'
import { core, files as fileUtils, is } from '@hosgu/utils'

import * as GuestActions from '~/app/core/actions/guest'
import config from '~/config'
import Button from '~/design-system/Button'
import File from '~/design-system/File'
import FilesPreviewer from '~/design-system/FilesPreviewer'
import Input from '~/design-system/Input'
import Notification from '~/design-system/Notification'

type Props = {
  action: 'save' | 'edit'
  data?: any
}

const Form: FC<Props> = ({
  data: {
    id = '',
    businessId = '',
    businessSlug = '',
    fullName = '',
    email = '',
    phone = '',
    website = '',
    facebook = '',
    instagram = '',
    gender = '',
    birthday = '',
    organization = '',
    taxIdentifier = '',
    notes = '',
    photo = ''
  },
  action = 'save'
}) => {
  const initialFiles = photo
    ? [
        {
          file: {
            type: 'image'
          },
          url: photo
        }
      ]
    : []

  const [uploadedFiles, setUploadedFiles] = useState<any>(initialFiles)

  const [initialValues, setInitialValues] = useState<any>({
    id,
    businessId,
    fullName,
    email,
    phone,
    website,
    facebook,
    instagram,
    gender,
    birthday,
    organization,
    taxIdentifier,
    notes,
    photo
  })
  const [showNotification, setShowNotification] = useState(false)

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: ''
  })

  const validations = {
    fullName: (value: string) => {
      if (!value) {
        return 'Please enter a fullname'
      }

      if (value.length < 2) {
        return 'Please enter a valid fullname'
      }

      return ''
    },
    email: (value: string) => {
      if (!value) {
        return 'Please enter an email'
      }

      if (!is(value).email()) {
        return 'Please enter a valid email'
      }

      return ''
    },
    phone: (value: string) => {
      if (!value) {
        return 'Please enter a phone number'
      }

      if (!is(value).phone()) {
        return 'Please enter a valid phone number'
      }

      return ''
    }
  }

  const validate = (values: any) => {
    const newErrors = {
      ...errors,
      fullName: validations.fullName(values.fullName),
      email: validations.email(values.email),
      phone: validations.phone(values.phone)
    }

    setErrors(newErrors)

    return !newErrors.fullName && !newErrors.email && !newErrors.phone
  }

  const handleSubmit = async (e: any) => {
    setShowNotification(false)

    e.preventDefault()
    const formData = new FormData(e.target)
    const values = core.formData.get(formData)
    const isValidForm = validate(values)

    if (isValidForm) {
      const fileList = uploadedFiles.filter((file: any) => !file.url)

      if (fileList.length > 0) {
        const uploadEndpoint = `/api/v1/uploader?setType=image&businessSlug=${businessSlug}`
        const uploadFilesResponse = await fileUtils.uploadFiles(fileList, uploadEndpoint)

        if (uploadFilesResponse.ok) {
          const fileName = uploadFilesResponse.data[0].path
          const url = `/files${fileName}`

          formData.append('photo', url)

          setInitialValues({
            ...initialValues,
            photo: url
          })
        }
      } else if (uploadedFiles.length > 0) {
        formData.append('photo', uploadedFiles[0].url)

        setInitialValues({
          ...initialValues,
          photo: uploadedFiles[0].url
        })
      } else {
        formData.append('photo', '')

        if (initialValues.photo) {
          const imageToDelete = fileUtils.getFileNameFromUrl(initialValues.photo)
          await fileUtils.deleteFile(imageToDelete)

          setInitialValues({
            ...initialValues,
            photo: ''
          })
        }
      }

      const response =
        action === 'save'
          ? await GuestActions.create(formData)
          : await GuestActions.update(formData)

      if (response.ok) {
        setShowNotification(true)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <RenderIf isTrue={showNotification}>
        <Notification
          message={action == 'save' ? 'Guest saved successfully' : 'Guest edited successfully'}
          type="success"
        />
      </RenderIf>

      <RenderIf isTrue={action === 'edit'}>
        <input type="hidden" name="id" value={initialValues.id} />
      </RenderIf>

      <input type="hidden" name="businessId" value={initialValues.businessId} />

      {/* Responsive grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Input
            value={fullName}
            label="Full name"
            name="fullName"
            className={errors.fullName ? 'border-red-500 dark:border-red-500' : ''}
            required
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.fullName}</p>
        </div>

        <div>
          <Input
            value={email}
            label="Email"
            name="email"
            placeholder="example@gmail.com"
            required
            className={errors.email ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.email}</p>
        </div>

        <div>
          <Input
            value={phone}
            label="Phone"
            name="phone"
            placeholder="+1 999 999 9999"
            required
            className={errors.phone ? 'border-red-500 dark:border-red-500' : ''}
          />
          <p className="text-red-500 mb-4 text-xs ml-4 break-words">{errors.phone}</p>
        </div>

        <Input value={website} label="Website" name="website" />

        <Input value={facebook} label="Facebook" name="facebook" />

        <Input value={instagram} label="Instagram" name="instagram" />

        <Input value={gender} label="Gender" name="gender" />
        <Input
          value={birthday}
          label="Birthday"
          name="birthday"
          placeholder="MM/DD/YYYY"
          required
        />
        <Input value={organization} label="Organization" name="organization" />
        <Input value={taxIdentifier} label="Tax Identifier" name="taxIdentifier" />

        <div className="p-4">
          <div>
            <File
              name="fileName"
              label="Drag your photo here"
              maxFileSize={52000000}
              allowedFiles={config.files.extensions.images}
              setUploadedFiles={setUploadedFiles}
              displayDragArea={uploadedFiles.length === 0}
            />

            <FilesPreviewer files={uploadedFiles} setFiles={setUploadedFiles} />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button type="submit" shape="square" size="large" fullWidth>
          Save
        </Button>
      </div>
    </form>
  )
}

export default Form
