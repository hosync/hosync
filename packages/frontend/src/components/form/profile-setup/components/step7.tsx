import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { useProfileSetupForm } from '@/hooks/forms/useProfileSetupForm'

const Step7: React.FC = () => {
  const { state } = useProfileSetupForm()
  const { values } = state

  const amenitiesMap: any = {
    ac: 'Air Conditioning',
    bedSheets: 'Bed Sheets',
    coffeeMachine: 'Coffee Machine',
    extraBed: 'Extra Bed',
    freeParking: 'Free Parking',
    garden: 'Garden',
    hotWater: 'Hot Water',
    kitchen: 'Kitchen',
    laundry: 'Laundry',
    oven: 'Oven',
    petFriendly: 'Pet Friendly',
    pool: 'Pool',
    refrigerator: 'Refrigerator',
    smoking: 'Smoking',
    towels: 'Towels',
    tv: 'TV',
    wifi: 'WiFi'
  }

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-900 w-full flex flex-col">
      <div className="w-full m-auto">
        <h1 className="text-2xl font-semibold mb-2 text-center">
          {values.propertyName}
        </h1>
        <div className="flex flex-wrap md:flex-nowrap">
          {/* Property Image */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-2 lg:ml-64"></div>
          {/* Property Details */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 lg:mr-2">
            <p>
              <h3 className="font-semibold text-xl">Price</h3>$
              {values.pricing.pricePerNight} {values.pricing.currency} Per night
            </p>

            <p className="mt-2">
              <h3 className="font-semibold text-xl">Location</h3>
              {values.location.address1} {values.location.address2} <br />
              {values.location.city}, {values.location.state},{' '}
              {values.location.zipCode} <br />
              {values.location.country}
            </p>

            <div className="mt-2">
              <h3 className="font-semibold text-xl">Information:</h3>
              <RenderBlockIf isTrue={values.propertyType === 'cabin'}>
                <div>
                  Guests: {values.capacity.guests} <br />
                  Bedrooms: {values.capacity.bedrooms} <br />
                  Bathrooms: {values.capacity.bathrooms} <br />
                  Beds: {values.capacity.beds}
                </div>
              </RenderBlockIf>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-xl">Amenities</h3>

              <div className="grid grid-cols-2 gap-2 mt-2">
                {Array.from(Object.entries(values.amenities)).map(
                  ([amenity, available]: any) =>
                    available && (
                      <div key={amenity} className="flex items-center">
                        {amenitiesMap[amenity]}
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export { Step7 }
