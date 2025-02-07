import { RenderBlockIf } from '@/components/helpers/render-block-if'
import { Floor, Room } from '@/lib/utils/hotel'

type Props = {
  locale: string
  values: any
  parentRooms: Room[]
  parentFloors: Floor[]
}

const Step7: React.FC<Props> = ({ values, parentRooms, parentFloors }) => {
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
          <div className="w-full md:w-1/2 lg:w-1/3 p-2 lg:ml-64">
            <img
              src={values.tmpImages[0].base64}
              alt={values.propertyName}
              className="w-full h-auto rounded-lg"
            />
          </div>
          {/* Property Details */}
          <div className="w-full md:w-1/2 lg:w-1/3 p-4 lg:mr-2">
            <p>
              <h3 className="font-semibold text-xl">
                profile.setup.step7.price
              </h3>
              ${values.price} {values.currency} profile.setup.step7.pernight
            </p>
            <p className="mt-2">
              <h3 className="font-semibold text-xl">
                profile.setup.step7.location
              </h3>
              {values.address1} {values.address2} <br />
              {values.city}, {values.state}, {values.zipCode} <br />
              {values.country}
            </p>
            <div className="mt-2">
              <h3 className="font-semibold text-xl">
                profile.setup.step7.information:
              </h3>

              <RenderBlockIf isTrue={values.propertyType === 'cabin'}>
                <div>
                  common.profile.setup.guests: {values.guests} <br />
                  common.profile.setup.bedrooms: {values.bedrooms} <br />
                  common.profile.setup.bathrooms: {values.bathrooms} <br />
                  common.profile.setup.beds: {values.beds}
                </div>
              </RenderBlockIf>

              <RenderBlockIf isTrue={values.propertyType === 'hotel'}>
                <div>
                  profile.setup.step7.rooms: {parentRooms.length} <br />
                  profile.setup.step7.floors: {parentFloors.length} <br />
                </div>
              </RenderBlockIf>
            </div>
            <div className="mt-4">
              <h3 className="font-semibold text-xl">
                profile.setup.step7.amenities
              </h3>
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
