import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

import CabinSetup from './cabin-setup'

const Step3: React.FC = () => {
  const { state } = useProfileSetupForm()
  const { values } = state

  if (values.propertyType === 'cabin') {
    return <CabinSetup />
  }
}

export { Step3 }
