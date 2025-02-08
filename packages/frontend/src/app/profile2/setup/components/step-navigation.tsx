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
    <div className="sticky h-20 mt-3 bg-white dark:bg-gray-900 z-50 pt-4 border-t border-gray-100 dark:border-gray-800">
      <div className="flex items-center h-full">
        <div className="flex w-full justify-between items-center">
          <Button color="dark" onClick={previousStep} className="mr-4 h-12">
            Back
          </Button>

          <StepIndicator steps={8} currentStep={currentStep + 1} />

          <RenderBlockIf isTrue={currentStep !== 1}>
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
