import { cx } from '@hosync/utils'

type Props = {
  user: any
}

const StepsForm: React.FC<Props> = ({ user }) => {
  const { state, previousStep, nextStep } = useProfileSetupForm()
  const { currentStep = 1, values } = state

  initialFormValues.email = user.email
  initialFormValues.location.country = 'Mexico'

  const handleNext = () => {
    nextStep()
  }

  return (
    <ProfileSetupFormProvider
      initialValues={initialFormValues}
      totalSteps={8}
      validator={profileSetupValidator}
    >
      <div className="min-h-screen flex justify-center bg-white dark:bg-gray-900 w-full">
        <div className="p-6 dark:text-white w-full">
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
                  height: 'calc(100% - 80px)'
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
    </ProfileSetupFormProvider>
  )
}

export { StepsForm }
