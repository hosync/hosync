'use client'

import React, { ChangeEvent, FC, useEffect, useState } from 'react'

import { UserFields } from '@hosync/api'
import { cookies, core, cx, files as fileUtils, security } from '@hosync/utils'

import * as UserActions from '@/actions/auth/user'
import { setupProfile } from '@/actions/profile/profile'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Button } from '@/components/ui/button'
import { Notification } from '@/components/ui/notification'
import useCustomState from '@/hooks/useCustomState'
import { Floor, floors, generateRooms, Room } from '@/lib/utils/hotel'

import { StepIndicator } from './step-indicator'
import { Step1 } from './step1'
import { Step2 } from './step2'
import { Step3 } from './step3'
import { Step4 } from './step4'
import { Step5 } from './step5'
import { Step6 } from './step6'
import { Step7 } from './step7'
import { Step8 } from './step8'

type Props = {
  user: UserFields & {
    businessSlug: string
  }
}

const Form: FC<Props> = ({ user }) => {
  const [currentStep, setCurrentStep] = useCustomState(0)

  const [values, setValues] = useCustomState({
    amenities: {
      ac: false,
      bedSheets: false,
      coffeeMachine: false,
      extraBed: false,
      freeParking: false,
      garden: false,
      glassesPlates: false,
      hotWater: false,
      kitchen: false,
      laundry: false,
      oven: false,
      petFriendly: false,
      pool: false,
      refrigerator: false,
      smoking: false,
      towels: false,
      tv: false,
      wifi: false
    },
    address1: '',
    address2: '',
    bathrooms: 1,
    bedrooms: 1,
    beds: 1,
    // @ts-ignore
    businessId: user?.businessId || '',
    checkInHour: '03',
    checkInMinute: '00',
    checkInPeriod: 'PM',
    checkOutHour: '12',
    checkOutMinute: '00',
    checkOutPeriod: 'PM',
    city: '',
    // @ts-ignore
    country: user?.country || '',
    currency: 'USD',
    email: user?.email || '',
    googleMaps: '',
    guests: 1,
    images: [],
    password: '',
    price: 150,
    propertyName: '',
    propertyType: '',
    state: '',
    tmpImages: [],
    userId: user?.id || '',
    zipCode: ''
  })

  const [parentFloors, setParentFloors] = useState<Floor[]>([
    { floor: 1, rooms: [{ count: 1, type: 'Single' }] }
  ])
  const [parentRooms, setParentRooms] = useState<Room[]>(generateRooms(floors))
  const [parentSkipFloor13, setParentSkipFloor13] = useState<boolean>(true)

  const [uploadedFiles, setUploadedFiles] = useState<any>([])
  const [showNotification, setShowNotification] = useCustomState(false)
  const [enableNext, setEnableNext] = useCustomState(true)

  const [errors, setErrors] = useCustomState({
    address1: '',
    propertyName: '',
    city: '',
    googleMaps: '',
    password: '',
    state: '',
    zipCode: ''
  })

  const goBack = () => {
    setEnableNext(true)
    setCurrentStep((prev: number) => (prev > 0 ? prev - 1 : 0))
  }

  const validateBeforeGoNext = async () => {
    const validationErrors = validate()

    if (currentStep === 0 && validationErrors.length === 0) {
      return goNext()
    }

    if (currentStep > 0) {
      return goNext()
    }
  }

  const goNext = async () => {
    setShowNotification(false)

    // Store temporary images (5 = 6)
    if (currentStep === 5) {
      setValues('tmpImages', uploadedFiles)
    }

    // Upload photos (6 = 7)
    if (currentStep === 6) {
      if (uploadedFiles.length === 0) {
        setShowNotification(true)
        return
      }
    }

    const isValidStep = await handleSubmit()

    // Go to next step
    if (isValidStep) {
      setCurrentStep((prev: number) =>
        prev < steps.length - 1 ? prev + 1 : prev
      )
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const validations = {
    propertyState: (value: string) => {
      return !value ? 'profile.setup.error.pleaseEnterYourPropertyState' : ''
    },
    propertyName: (value: string) => {
      return !value ? 'profile.setup.error.pleaseEnterYourPropertyName' : ''
    },
    propertyCity: (value: string) => {
      if (value.length < 3) {
        return 'profile.setup.error.pleaseEnterAValidPropertyCity'
      }

      return !value ? 'profile.setup.error.pleaseEnterYourPropertyCity' : ''
    },
    propertyAddress1: (value: string) => {
      if (value.length < 3) {
        return 'profile.setup.error.pleaseEnterAValidPropertyAddress'
      }

      return !value ? 'profile.setup.error.pleaseEnterYourPropertyAddress' : ''
    },
    propertyZipCode: (value: string) => {
      const zipCodePattern = /^\d{5}$/

      if (!zipCodePattern.test(value)) {
        return 'profile.setup.error.pleaseEnterAValidPropertyPostalCode'
      }

      return !value
        ? 'profile.setup.error.pleaseEnterYourPropertyPostalCode'
        : ''
    },
    googleMaps: (value: string) => {
      if (
        value.startsWith('https://www.google.com/maps') ||
        value.startsWith('https://www.google.com.mx/maps') ||
        value.startsWith('https://google.com/maps') ||
        value.startsWith('https://google.com.mx/maps') ||
        value.startsWith('https://maps.app.goo.gl')
      ) {
        return ''
      }

      return !value
        ? 'profile.setup.error.pleaseEnterYourGoogleMaps'
        : 'profile.setup.error.pleaseEnterAValidGoogleMaps'
    },
    propertyPrice: (value: number) => {
      return !value ? 'profile.setup.error.pleaseEnterYourNightPrice' : ''
    }
  }

  const validate = () => {
    const tmpErrors: any = []

    if (currentStep === 0) {
      const passwordValidation = security.password.validation(values.password)

      if (passwordValidation.reasons?.includes('length')) {
        setErrors('password', 'profile.setup.validation.passwordLength')
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('lowercase')) {
        setErrors('password', 'profile.setup.validation.passwordLowercase')
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('uppercase')) {
        setErrors('password', 'profile.setup.validation.passwordUppercase')
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('digit')) {
        setErrors('password', 'profile.setup.validation.passwordDigit')
        tmpErrors.push('password')
        return tmpErrors
      } else if (passwordValidation.reasons?.includes('special')) {
        setErrors('password', 'profile.setup.validation.passwordSpecial')
        tmpErrors.push('password')
        return tmpErrors
      }

      setErrors('password', '')

      if (validations.propertyName(values.propertyName)) {
        setErrors('propertyName', validations.propertyName(values.propertyName))
        tmpErrors.push('propertyName')

        return tmpErrors
      } else if (errors.propertyName) {
        setErrors('propertyName', '')
      }

      if (validations.googleMaps(values.googleMaps)) {
        setErrors('googleMaps', validations.googleMaps(values.googleMaps))
        tmpErrors.push('googleMaps')
        return tmpErrors
      } else if (errors.googleMaps) {
        setErrors('googleMaps', '')
      }

      if (validations.propertyState(values.state)) {
        setErrors('state', validations.propertyState(values.state))
        tmpErrors.push('propertyState')
        return tmpErrors
      } else if (errors.state) {
        setErrors('state', '')
      }

      if (validations.propertyCity(values.city)) {
        setErrors('city', validations.propertyCity(values.city))
        tmpErrors.push('propertyCity')
        return tmpErrors
      } else if (errors.city) {
        setErrors('city', '')
      }

      if (validations.propertyAddress1(values.address1)) {
        setErrors('address1', validations.propertyAddress1(values.address1))
        tmpErrors.push('propertyAddress1')
        return tmpErrors
      } else if (errors.address1) {
        setErrors('address1', '')
      }

      if (validations.propertyZipCode(values.zipCode)) {
        setErrors('zipCode', validations.propertyZipCode(values.zipCode))
        tmpErrors.push('propertyZipCode')
        return tmpErrors
      } else if (errors.zipCode) {
        setErrors('zipCode', '')
      }

      return tmpErrors
    }

    if (currentStep === 3) {
      const currentValues = Array.from(Object.values(values.amenities))
      return currentValues.includes(true)
    }

    if (currentStep === 6) {
      const newErrors = {
        ...errors,
        address1: validations.propertyAddress1(values.address1),
        propertyName: validations.propertyName(values.propertyName),
        city: validations.propertyCity(values.city),
        state: validations.propertyState(values.state),
        zipCode: validations.propertyZipCode(values.zipCode),
        price: validations.propertyPrice(values.price)
      }

      setErrors('address1', newErrors.address1)
      setErrors('propertyName', newErrors.propertyName)
      setErrors('city', newErrors.city)
      setErrors('state', newErrors.state)
      setErrors('zipCode', newErrors.zipCode)

      return (
        !newErrors.address1 &&
        !newErrors.city &&
        !newErrors.state &&
        !newErrors.zipCode &&
        !newErrors.propertyName
      )
    }

    return true
  }

  const handleSubmit = async () => {
    const isValidStep = validate()

    if (isValidStep && currentStep === 6) {
      const uploadFilesResponse = await fileUtils.uploadFiles(
        uploadedFiles,
        `/api/v1/uploader?setType=image&businessSlug=${user.businessSlug}`
      )

      let images = []

      if (uploadFilesResponse.ok) {
        images = uploadFilesResponse.data.map((data: any) => data.path)
      }

      const cleanValues = JSON.parse(JSON.stringify(values))
      const formData = core.formData.set(new FormData(), cleanValues)
      const password = security.password.encrypt(values.password)

      formData.set('amenities', JSON.stringify(values.amenities))
      formData.set('images', JSON.stringify(images))
      formData.set('password', password)

      if (parentRooms.length > 0) {
        formData.set('rooms', JSON.stringify(parentRooms))
      }

      const response = await setupProfile(formData)

      if (response.status === 200) {
        setCurrentStep((prevState) => prevState + 1)

        const formDataForLogin = new FormData()
        const email = values.email
        const encryptedPassword = password

        formDataForLogin.append(
          security.base64.encode('email', true),
          security.base64.encode(email, true)
        )
        formDataForLogin.append(
          security.base64.encode('password', true),
          security.base64.encode(encryptedPassword, true)
        )

        cookies.set({
          name: 'loggedFromProfileSetup',
          value: 'true'
        })

        await UserActions.login(formDataForLogin)
      }
    }

    if (isValidStep && currentStep < 6) {
      return true
    }

    return false
  }

  const steps = [
    <Step1
      key="step1"
      values={values}
      setValues={setValues}
      errors={errors}
      handleChange={handleChange}
      validate={validate}
    />,
    <Step2 key="step2" setValues={setValues} setStep={setCurrentStep} />,
    <Step3
      key="step3"
      values={values}
      setValues={setValues}
      setParentFloors={setParentFloors}
      setParentRooms={setParentRooms}
      setParentSkipFloor13={setParentSkipFloor13}
      setEnableNext={setEnableNext}
      parentFloors={parentFloors}
      parentRooms={parentRooms}
      parentSkipFloor13={parentSkipFloor13}
    />,
    <Step4
      key="step4"
      values={values}
      setValues={setValues}
      setEnableNext={setEnableNext}
    />,
    <Step5
      key="step5"
      values={values}
      setValues={setValues}
      enableNext={enableNext}
      setEnableNext={setEnableNext}
    />,
    <Step6
      key="step6"
      setUploadedFiles={setUploadedFiles}
      uploadedFiles={uploadedFiles}
      setEnableNext={setEnableNext}
    />,
    <Step7
      key="step7"
      values={values}
      parentFloors={parentFloors}
      parentRooms={parentRooms}
    />,
    <Step8 key="step8" />
  ]

  useEffect(() => {
    document.body.scrollTop = 0

    return () => {}
  }, [currentStep])

  useEffect(() => {
    if (uploadedFiles.size > 1) {
      setValues('images', uploadedFiles)
    }
  }, [uploadedFiles, values])

  return (
    <>
      <RenderBlockIf isTrue={showNotification}>
        <Notification message="Error on saving profile data" type="error" />
      </RenderBlockIf>

      <div
        className={cx.join(
          'flex justify-center w-full min-h-screen overflow-hidden',
          'desktop-height-80vh desktop-overflow-visible'
        )}
      >
        <div className="p-0 rounded-lg h-full overflow-hidden ">
          <div
            className="inner-scroll-content px-1"
            style={{
              overflowY: 'auto',
              height: 'calc(100% - 80px)' // Reserve space for buttons on desktop
            }}
          >
            <h2 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
              {currentStep === 0 && 'profile.setup.step1.headline'}
              {currentStep === 1 && 'profile.setup.step2.headline'}
              {currentStep === 2 &&
                `${t('profile.setup.step3.headline')} ${values.propertyType === 'cabin' ? t('common.general.cabin') : t('common.general.hotel')}`}
              {currentStep === 3 && 'profile.setup.step4.headline'}
              {currentStep === 4 && 'profile.setup.step5.headline'}
              {currentStep === 5 && 'profile.setup.step6.headline'}
              {currentStep === 6 && 'profile.setup.step7.headline'}
            </h2>

            {steps[currentStep]}
          </div>
        </div>
      </div>

      <RenderBlockIf isTrue={currentStep < 7}>
        <div className="sticky h-20 mt-3 bg-white dark:bg-gray-900 z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center h-full">
            <div className="flex w-full justify-between items-center">
              <Button color="dark" onClick={goBack} className="mr-4 h-12">
                common.general.back
              </Button>

              <StepIndicator steps={8} currentStep={currentStep + 1} />

              <RenderBlockIf isTrue={currentStep !== 1}>
                <Button
                  color="primary"
                  onClick={validateBeforeGoNext}
                  disabled={!enableNext}
                  className="h-12"
                >
                  {currentStep < 6
                    ? 'common.general.next'
                    : 'common.general.finish'}
                </Button>
              </RenderBlockIf>
            </div>
          </div>
        </div>
      </RenderBlockIf>
    </>
  )
}

export default Form
