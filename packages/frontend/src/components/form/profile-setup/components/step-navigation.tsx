import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Button } from '@/components/ui/button'

import { StepIndicator } from './step-indicator'

const StepNavigation = ({
  previousStep,
  nextStep,
  currentStep
}: {
  previousStep: () => void
  nextStep: () => void
  currentStep: number
}) => {
  return (
    <div className="sticky h-20 mt-3 bg-white dark:bg-black z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center h-full">
        <div className="flex w-full justify-between items-center">
          <RenderBlockIf isTrue={currentStep > 0}>
            <Button color="dark" onClick={previousStep} className="mr-4 h-12">
              Back
            </Button>
          </RenderBlockIf>

          <StepIndicator steps={8} currentStep={currentStep} />

          <RenderBlockIf isTrue={currentStep + 1 !== 2}>
            <Button color="primary" onClick={nextStep} className="h-12">
              {currentStep < 6 ? 'Next' : 'Finish'}
            </Button>
          </RenderBlockIf>
        </div>
      </div>
    </div>
  )
}

export { StepNavigation }
