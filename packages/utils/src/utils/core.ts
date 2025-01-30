const core = {
  formData: {
    get(formData: FormData): Record<string, any> {
      const extractedData: Record<string, any> = {}

      for (const [key, value] of formData.entries()) {
        extractedData[key] = value
      }

      return extractedData
    },
    set(formData: FormData, data: Record<string, any>): FormData {
      for (const key in data) {
        formData.set(key, data[key])
      }

      return formData
    }
  }
}

export default core
