'use client'

import { cx } from '@hosync/utils'

import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'
import { ProfileSetupFormProvider } from '@/providers/profile-setup'
import { profileSetupValidator } from '@/validators/profile-setup'

import { StepNavigation } from './components/step-navigation'
import { StepRenderer } from './components/step-renderer'
import { StepTitle } from './components/step-title'

const initialValues = {
  propertyName: '',
  email: '',
  password: '',
  googleMapsUrl: '',
  location: {
    country: '',
    state: '',
    city: '',
    address1: '',
    address2: '',
    zipCode: ''
  },
  propertyType: '' as '' | 'cabin' | 'hotel',
  capacity: {
    guests: 1,
    bathrooms: 1,
    bedrooms: 1,
    beds: 1
  },
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
  pricing: {
    pricePerNight: 0,
    currency: 'USD' as const,
    checkInTime: '',
    checkOutTime: ''
  },
  images: []
}

const ProfileSetupFormContent: React.FC = () => {
  const { state, previousStep, nextStep } = useProfileSetupForm()
  const { currentStep = 1, values } = state
  console.log('CURRENT STEP===>', currentStep)
  console.log('VALUES===>', values)
  const handleNext = () => {
    nextStep()
  }

  return (
    <div className="min-h-screen flex justify-center bg-white dark:bg-black w-full">
      <div className="p-6 dark:text-white w-full">
        <div
          className={cx.join(
            'flex justify-center w-full min-h-screen overflow-hidden',
            'desktop-height-80vh desktop-overflow-visible'
          )}
        >
          <div className="p-0 rounded-lg h-full overflow-hidden">
            <div
              className="inner-scroll-content px-1"
              style={{
                overflowY: 'auto',
                height: 'calc(100% - 20px)'
              }}
            >
              <StepTitle
                currentStep={state.currentStep}
                propertyType={values.propertyType}
              />

              <StepRenderer currentStep={state.currentStep} />
            </div>
          </div>
        </div>

        <RenderBlockIf isTrue={currentStep < 7}>
          <StepNavigation
            previousStep={previousStep}
            nextStep={handleNext}
            currentStep={currentStep}
          />
        </RenderBlockIf>
      </div>
    </div>
  )
}

type Props = {
  user: any
}

const ProfileSetupFormWrapper: React.FC<Props> = ({ user }) => {
  initialValues.email = user.email
  initialValues.location.country = 'Mexico'

  return (
    <ProfileSetupFormProvider
      initialValues={initialValues}
      validator={profileSetupValidator}
      totalSteps={8}
    >
      <ProfileSetupFormContent />
    </ProfileSetupFormProvider>
  )
}

export { ProfileSetupFormWrapper }
