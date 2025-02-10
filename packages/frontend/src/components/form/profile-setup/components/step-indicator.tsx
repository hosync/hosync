interface StepIndicatorProps {
  steps: number
  currentStep: number
}

const StepIndicator: React.FC<StepIndicatorProps> = ({
  steps,
  currentStep
}) => {
  const step = currentStep === 0 ? 1 : currentStep + 1

  return (
    <div className="flex justify-center items-center w-full flex-col mt-3">
      <div className="flex space-x-1">
        {Array.from({ length: steps }, (_, index) => (
          <div
            key={index}
            className={`${
              index < step
                ? 'bg-gradient-to-r from-blue-500 to-green-500'
                : 'bg-gray-500'
            } rounded-sm w-3 h-3`}
          ></div>
        ))}
      </div>

      <p
        id="step-text"
        className="mt-2 text-gray-600 dark:text-gray-300 text-sm"
      >
        Step {step} of {steps}
      </p>
    </div>
  )
}

export { StepIndicator }
