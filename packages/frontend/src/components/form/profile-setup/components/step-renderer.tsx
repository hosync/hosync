import { Step1 } from './step1'
import { Step2 } from './step2'
import { Step3 } from './step3'

// import Step4 from './step4'
// import Step5 from './step5'
// import Step6 from './step6'
// import Step7 from './step7'
// import Step8 from './step8'

const StepRenderer = ({ currentStep }: { currentStep?: number }) => {
  switch (currentStep) {
    case 1:
      return <Step1 />
    case 2:
      return <Step2 />
    case 3:
      return <Step3 />
    // case 4:
    //   return <Step4 />
    // case 5:
    //   return <Step5 />
    // case 6:
    //   return <Step6 />
    // case 7:
    //   return <Step7 />
    // case 8:
    //   return <Step8 />
    default:
      return <Step1 />
  }
}

export { StepRenderer }
