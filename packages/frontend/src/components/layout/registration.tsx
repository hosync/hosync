'use client'

import React, { FC, useState } from 'react'

import { constants, core, is } from '@hosync/utils'

import * as UserActions from '@/actions/auth/user'
import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { SVG } from '@/components/svg'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type RegistrationData = {
  fullName: string
  businessName: string
  businessEmail: string
  businessPhone: string
  businessWebsite: string
  country: string
}
type Props = {
  action?: 'save' | 'edit'
  data?: RegistrationData
  fromRegisterPage?: boolean
}

const Registration: FC<Props> = ({ fromRegisterPage = false }) => {
  const [isRegistered, setIsRegistered] = useState(false)

  const [errors, setErrors] = useState({
    fullName: '',
    businessName: '',
    businessEmail: '',
    businessPhone: '',
    businessWebsite: '',
    country: ''
  })

  const validations = {
    fullName: (value: string) => {
      if (!value) {
        return 'Required'
      }

      if (value.length < 2) {
        return 'Required'
      }

      return ''
    },
    businessName: (value: string) => {
      if (!value) {
        return 'Required'
      }

      if (value.length < 2) {
        return 'Required'
      }

      return ''
    },
    businessEmail: (value: string) => {
      if (!value) {
        return 'Required'
      }

      if (!is(value).email()) {
        return 'Invalid email'
      }

      return ''
    },
    businessPhone: (value: string) => {
      if (!value) {
        return 'Required'
      }

      if (!is(value).phone()) {
        return 'Invalid phone'
      }

      return ''
    },
    businessWebsite: (value: string) => {
      if (!value) {
        return 'Required'
      }

      if (!is(value).url) {
        return 'common.input.invalidUrl'
      }

      return ''
    },
    country: (value: string) => {
      if (!value) {
        return 'Required'
      }

      return ''
    }
  }

  const validate = (values: any) => {
    const newErrors = {
      ...errors,
      fullName: validations.fullName(values.fullName),
      businessName: validations.businessName(values.businessName),
      businessEmail: validations.businessEmail(values.businessEmail),
      businessPhone: validations.businessPhone(values.businessPhone),
      businessWebsite: validations.businessWebsite(values.businessWebsite),
      country: validations.country(values.country)
    }
    console.log('newErrors', newErrors)
    setErrors(newErrors)

    return (
      !newErrors.fullName &&
      !newErrors.businessEmail &&
      !newErrors.businessName &&
      !newErrors.businessPhone &&
      !newErrors.businessWebsite &&
      !newErrors.country
    )
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    const values = core.formData.get(formData)
    console.log('values', values)
    const isValidForm = validate(values)
    console.log('isValidForm', isValidForm)
    if (isValidForm) {
      const response = await UserActions.initialSignup(formData)

      if (!response.ok && response.error?.code === 'EMAIL_ALREADY_EXISTS') {
        setErrors({
          ...errors,
          businessEmail: 'Error'
        })
      } else if (response.ok) {
        setIsRegistered(true)
      }
    }
  }

  const SuccessMessage = () => (
    <div className="flex min-h-[519px] flex-col text-black dark:text-white justify-center m-auto p-1 text-center">
      <h2 className="text-black dark:text-white">
        Just One More Step to Get Started!
      </h2>
      <p className="w-11/12" style={{ margin: '0 auto' }}>
        Thank you for registering! Please check your email to complete your
        profile setup and activate your account.
      </p>
    </div>
  )

  let mainClassName =
    'w-[90%] md:w-1/2 bg-white dark:bg-black p-8 rounded-md shadow-md mb-20'

  if (fromRegisterPage) {
    mainClassName = 'md:w-1/2 h-screen bg-white dark:bg-black p-8 mb-20 mx-auto'
  }

  return (
    <div className={mainClassName}>
      <RenderBlockIf isTrue={isRegistered}>
        <SuccessMessage />
      </RenderBlockIf>

      <RenderBlockIf isFalse={isRegistered}>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  id="fullName"
                  leftIcon={<SVG.User />}
                  label="Full Name: *"
                  name="fullName"
                  placeholder="e.g. John Smith"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  id="businessName"
                  leftIcon={<SVG.Cabin />}
                  label="Business name: *"
                  name="businessName"
                  placeholder="e.g. Cabañas San Pancho"
                  required
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  leftIcon={<SVG.Email />}
                  label="Email: *"
                  name="businessEmail"
                  className={
                    errors.businessEmail
                      ? 'border-red-500 dark:border-red-500'
                      : ''
                  }
                  placeholder="e.g. mail@example.com"
                  required
                  errorText={errors.businessEmail}
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  leftIcon={<SVG.Phone />}
                  label="Phone: *"
                  name="businessPhone"
                  placeholder="e.g. +1 234 5677"
                  required
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  leftIcon={<SVG.Link />}
                  label="Website *"
                  name="businessWebsite"
                  placeholder="e.g. yourdomain.com"
                  required
                />
              </div>
            </div>
            <div className="mb-4 relative">
              <div className="relative mt-1">
                <Input
                  leftIcon={<SVG.World />}
                  label="Country: *"
                  name="country"
                  placeholder="e.g. Mexico"
                  required
                  dropdownItems={constants.countries}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center mb-6 mt-6">
            <Button color="primary" type="submit" fullWidth>
              Get Started
            </Button>
          </div>
        </form>
        <div
          className="flex justify-center mb-6 text-center dark:text-white p-2"
          style={{ fontSize: '10px' }}
        >
          We are committed to your privacy. hosgu.com uses the information you
          provide to us to contact you about our relevant content, products, and
          services. You may unsubscribe at any time.
        </div>
      </RenderBlockIf>
    </div>
  )
}

export default Registration
