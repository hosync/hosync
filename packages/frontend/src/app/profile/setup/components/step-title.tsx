const StepTitle = ({
  currentStep,
  propertyType
}: {
  currentStep: number
  propertyType: string
}) => {
  return (
    <h2 className="p-0 text-2xl font-bold mb-2 text-gray-800 text-center dark:text-gray-300">
      {currentStep === 0 && "Let's start!"}
      {currentStep === 1 && 'What property type are you listing?'}
      {currentStep === 2 &&
        `Information about your ${propertyType === 'cabin' ? 'cabin' : 'hotel'}`}
      {currentStep === 3 && 'Tell guests what are the amenities!'}
      {currentStep === 4 && 'Set your night price and times!'}
      {currentStep === 5 && 'Add some photos of your place'}
      {currentStep === 6 &&
        'Almost there, please validate the information first!'}
    </h2>
  )
}

export { StepTitle }
