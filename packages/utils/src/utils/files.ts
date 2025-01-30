import path from 'path'

import api from './api'
import security from './security'
import slug from './slug'

const files = {
  bytesToSize: (bytes: number, maxFileSize: number, round?: boolean) => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const allowed = bytes <= maxFileSize

    if (bytes === 0) {
      return { size: `0 ${sizes[0]}`, allowed }
    }

    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    let size = bytes / 1024 ** i

    if (round) {
      size = Math.ceil(size)
    }

    return {
      size: `${size.toFixed(1)} ${sizes[i]}`,
      allowed
    }
  },
  deleteFile: async (file: string): Promise<boolean> => {
    if (!file) {
      return false
    }

    const response = await fetch(`/api/v1/uploader/${file}`, {
      method: 'DELETE'
    })

    const responseData = await response.json()

    if (responseData) {
      return true
    }

    return false
  },
  getFileNameAndExtension: (file: any): { fileName: string; extension: string } => {
    if (!file) {
      return {
        fileName: '',
        extension: ''
      }
    }

    const parts = file.split('.')
    const extension = parts.pop()
    const fileName = parts.pop()

    return {
      fileName,
      extension: extension.toLowerCase()
    }
  },
  getImageData: (file: any): Promise<any> => {
    return new Promise((resolve, reject) => {
      const img = new Image()

      img.src = window.URL.createObjectURL(file)
      img.onload = (): any => resolve({ width: img.width, height: img.height })
      img.onerror = reject
    })
  },
  getSelectedFile: async (e: any): Promise<any> => {
    if (e.target.files[0]) {
      const fileData = e.target.files[0]
      const fileSize = files.bytesToSize(fileData.size, 52000000)
      const { fileName, extension } = files.getFileNameAndExtension(fileData.name)
      const identifier = slug(fileName)
      const code = security.string.code(4)
      const isImage = ['png', 'jpg', 'jpeg'].includes(extension)

      let information = ''
      let url = '/files'

      if (isImage) {
        const img: any = await files.getImageData(fileData)
        information = `${img.width}x${img.height}px`
        url += '/images'
      }

      return {
        file: fileData,
        fileName: `${identifier}_${code}.${extension}`,
        fileUrl: `${url}/${identifier}_${code}.${extension}`,
        size: fileSize.size,
        information
      }
    }
  },
  findFileByAction: (fileStatus: any, action: 'show' | 'delete' | 'upload') => {
    return fileStatus.find((image: any) => image.action == action)
  },
  getFileNameFromUrl(url: string) {
    const fileName = url.split('/').pop()
    return fileName ? fileName : ''
  },
  fileStatusActions: async (fileStack: any, deleteCallback: any) => {
    let fileName

    while (fileStack.length > 1) {
      const currentFileStatus = fileStack.pop()

      if (currentFileStatus) {
        fileName = files.getFileNameFromUrl(currentFileStatus.url)

        if (currentFileStatus.action === 'delete' || currentFileStatus.action == 'pending') {
          // Delete photo from server
          await deleteCallback(fileName)
        }
        if (currentFileStatus.action === 'upload') {
          // Upload photo to server
          currentFileStatus.action = 'show'
          fileStack.unshift(currentFileStatus)
        }
      }
    }
    return { fileStack: [...fileStack], fileName }
  },
  deleteFilesFromServer: async (array: any[], deleteCallback: any) => {
    for (let i = 0; i < array.length; i++) {
      const file = array[i]
      const action = file.action
      const fileName = files.getFileNameFromUrl(file.url)

      if (action === 'delete' || action === 'upload') {
        await deleteCallback(fileName)
      }
    }
  },
  uploadFiles: async (files: any, fileUploadEndPoint: string) => {
    if (!files) {
      return
    }

    const formData = new FormData()

    files.forEach((file: any) => {
      formData.append(`files`, file.file)
    })

    const response = await api.fetch(fileUploadEndPoint, {
      method: 'POST',
      body: formData,
      bodyType: 'form-data',
      addLocalHost: true
    })
    return response
  },
  generateUniqueFileName: (originalFileName: string) => {
    const { fileName, extension } = files.getFileNameAndExtension(originalFileName)
    const identifier = slug(fileName)
    const code = security.string.code(4)

    return {
      fileName: `${identifier}_${code}.${extension}`,
      nameParts: {
        identifier,
        code,
        extension
      }
    }
  },
  formatFileData: async (file: File) => {
    const {
      nameParts: { identifier, code, extension }
    } = files.generateUniqueFileName(file.name)

    const fileSize = files.bytesToSize(file.size, 52000000)
    const isImage = ['png', 'jpg', 'jpeg'].includes(extension)
    let url = '/files'
    let information = ''

    if (isImage) {
      const img = await files.getImageData(file)
      information = `${img.width}x${img.height}px`
      url += '/images'
    }

    return {
      file,
      storagePath: `${url}/${identifier}_${code}.${extension}`,
      size: fileSize.size,
      information
    }
  },
  formatFileList: async (fileList: FileList) => {
    const fileListArray = Array.from(fileList)
    const formattedFileList = fileListArray.map((file) => files.formatFileData(file))
    return Promise.all(formattedFileList)
  },
  getFileInfo: (file: string) => {
    if (!file) {
      return {
        fileName: '',
        extension: ''
      }
    }

    const parts = file.split('.')
    const extension = parts.pop() || ''
    const fileName = parts.pop() || ''

    return {
      fileName,
      extension: extension.toLowerCase()
    }
  },
  getFileDir: (fileName: string) => {
    const { extension } = files.getFileInfo(fileName)
    let dir = path.join(__dirname, '../../../../public/files')

    const isImage = ['png', 'jpg', 'jpeg'].includes(extension)

    if (isImage) {
      dir += dir.includes('\\') ? '\\images' : '/images'
    }
    return dir
  }
}

export default files
