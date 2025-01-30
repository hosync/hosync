import { SVG } from '@/components/svg'

import { Cabin, Guest, Reservation } from './types'

interface ReservationModalProps {
  selectedReservation: Reservation
  editedReservation: Reservation
  cabins: Cabin[]
  onClose: () => void
  onSave: () => void
  onInputChange: (
    field: keyof Reservation | keyof Guest,
    value: string | number,
    isGuestField?: boolean
  ) => void
}

const ReservationModal: React.FC<ReservationModalProps> = ({
  selectedReservation,
  editedReservation,
  cabins,
  onClose,
  onSave,
  onInputChange
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
      <div
        className="bg-white w-full lg:w-auto max-w-md h-full overflow-y-auto"
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800">
              {editedReservation?.id === selectedReservation.id
                ? 'Edit Reservation'
                : 'New Reservation'}
            </h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <SVG.X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cabin
              </label>
              <input
                type="text"
                value={
                  cabins.find((c) => c.id === editedReservation?.cabinId)
                    ?.name || ''
                }
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-in
                </label>
                <input
                  type="date"
                  value={editedReservation?.startDate || ''}
                  onChange={(e) => onInputChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Check-out
                </label>
                <input
                  type="date"
                  value={editedReservation?.endDate || ''}
                  onChange={(e) => onInputChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Guest Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Guest Name
              </label>
              <input
                type="text"
                value={editedReservation?.guest.fullName || ''}
                onChange={(e) =>
                  onInputChange('fullName', e.target.value, true)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={editedReservation?.guest.email || ''}
                onChange={(e) => onInputChange('email', e.target.value, true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={editedReservation?.guest.phone || ''}
                onChange={(e) => onInputChange('phone', e.target.value, true)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <input
                type="number"
                value={editedReservation?.guest.numberOfGuests || 0}
                onChange={(e) =>
                  onInputChange(
                    'numberOfGuests',
                    parseInt(e.target.value),
                    true
                  )
                }
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Special Requests
              </label>
              <textarea
                value={editedReservation?.guest.specialRequests || ''}
                onChange={(e) =>
                  onInputChange('specialRequests', e.target.value, true)
                }
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Total Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500">$</span>
                <input
                  type="number"
                  value={editedReservation?.totalPrice || 0}
                  onChange={(e) =>
                    onInputChange('totalPrice', parseInt(e.target.value))
                  }
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                value={editedReservation?.status || 'pending'}
                onChange={(e) =>
                  onInputChange(
                    'status',
                    e.target.value as Reservation['status']
                  )
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <div className="flex justify-end gap-3 pt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { ReservationModal }
