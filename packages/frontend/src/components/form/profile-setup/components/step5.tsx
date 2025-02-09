import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step5: React.FC = () => {
  const { state, onChange } = useProfileSetupForm()

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6">Pricing & Schedule</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price per Night *
            </label>
            <div className="relative">
              <input
                type="number"
                name="pricePerNight"
                value={state.values.pricing.pricePerNight}
                onChange={onChange}
                min="0"
                step="0.01"
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency *
            </label>
            <select
              name="currency"
              value={state.values.pricing.currency}
              onChange={onChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="USD">USD</option>
              <option value="MXN">MXN</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-in Time *
            </label>
            <div className="relative">
              <input
                type="time"
                name="checkInTime"
                value={state.values.pricing.checkInTime}
                onChange={onChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Check-out Time *
            </label>
            <div className="relative">
              <input
                type="time"
                name="checkOutTime"
                value={state.values.pricing.checkOutTime}
                onChange={onChange}
                required
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Step5 }
