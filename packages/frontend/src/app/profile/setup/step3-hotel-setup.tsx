import React, { FC, useEffect, useState } from 'react'

import {
  Floor,
  generateRooms,
  groupRoomsByFloor,
  Room
} from '@/lib/utils/hotel'

const roomTypes = ['Single', 'Double', 'Penthouse', 'Studio', 'Deluxe']

type Props = {
  locale: string
  setParentRooms: any
  setParentFloors: any
  setParentSkipFloor13: any
  parentRooms: any
  parentFloors: any
  parentSkipFloor13: any
}

const HotelSetup: FC<Props> = ({
  setParentRooms,
  setParentFloors,
  parentRooms,
  parentFloors
}) => {
  const [floors, setFloors] = useState<Floor[]>(parentFloors)
  const [rooms, setRooms] = useState<Room[]>(parentRooms)
  const [skipFloor13, setSkipFloor13] = useState<boolean>(true)

  const updateFloorNumbers = (newFloors: Floor[]) => {
    let floorNumber = 1

    const updatedFloors = newFloors.map((floor) => {
      if (skipFloor13 && floorNumber === 13) {
        floorNumber++
      }
      return { ...floor, floor: floorNumber++ }
    })
    setFloors(updatedFloors)
    setRooms(generateRooms(updatedFloors))

    setParentFloors(updatedFloors)
    setParentRooms(generateRooms(updatedFloors))
  }

  const handleAddFloor = () => {
    const newFloors = [
      ...floors,
      { floor: floors.length + 1, rooms: [{ count: 1, type: 'Single' }] }
    ]

    updateFloorNumbers(newFloors)
  }

  const handleRemoveFloor = (floorIndex: number) => {
    const newFloors = floors.filter((_, index) => index !== floorIndex)
    updateFloorNumbers(newFloors)
  }

  const handleRoomChange = (
    floorIndex: number,
    roomIndex: number,
    field: string,
    value: string | number
  ) => {
    const newFloors = [...floors]
    ;(newFloors[floorIndex].rooms[roomIndex] as any)[field] = value
    setFloors(newFloors)
    setRooms(generateRooms(newFloors))

    setParentFloors(newFloors)
    setParentRooms(generateRooms(newFloors))
  }

  const handleAddRoomType = (floorIndex: number) => {
    const newFloors = [...floors]
    const floorRooms = newFloors[floorIndex].rooms

    if (floorRooms.length < roomTypes.length) {
      const nextType = roomTypes.find(
        (type) => !floorRooms.some((room) => room.type === type)
      )
      if (nextType) {
        floorRooms.push({ count: 1, type: nextType })
        setFloors(newFloors)

        setParentFloors(newFloors)
      }
    }
  }

  const handleRemoveRoomType = (floorIndex: number, roomIndex: number) => {
    const newFloors = [...floors]
    newFloors[floorIndex].rooms = newFloors[floorIndex].rooms.filter(
      (_, index) => index !== roomIndex
    )
    setFloors(newFloors)

    setRooms(generateRooms(newFloors))

    setParentFloors(newFloors)
    setParentRooms(generateRooms(newFloors))
  }

  useEffect(() => {
    const newRoms = generateRooms(floors)
    setRooms(newRoms)

    setParentRooms(newRoms)
  }, [floors])

  useEffect(() => {
    updateFloorNumbers(floors)
  }, [skipFloor13])

  const getFloorRooms = (floor: number) => {
    return rooms.filter((room) => room.floor === floor)
  }

  const floorNumbers = Array.from(new Set(rooms.map((room) => room.floor)))

  return (
    <div className="container mx-auto p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">
        profile.setup.hotelsetup.roomsetup
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
        {floors.map((floor, floorIndex) => (
          <div
            key={floor.floor}
            className="relative p-4 border rounded bg-gray-100 dark:bg-gray-800"
          >
            <button
              onClick={() => handleRemoveFloor(floorIndex)}
              className="absolute top-0 right-0 text-gray-600 p-2"
            >
              X
            </button>

            <h3 className="text-xl font-semibold mb-4">Floor {floor.floor}</h3>

            {floor.rooms.map((room, roomIndex) => (
              <div key={roomIndex} className="mb-4 flex relative">
                <div className="mr-4">
                  <label className="block mb-1">
                    profile.setup.hotelsetup.roomcount
                  </label>
                  <input
                    type="number"
                    value={room.count}
                    onChange={(e) =>
                      handleRoomChange(
                        floorIndex,
                        roomIndex,
                        'count',
                        Number(e.target.value)
                      )
                    }
                    className="p-2 border rounded w-20 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block mb-1">
                    profile.setup.hotelsetup.roomtype
                  </label>

                  <select
                    value={room.type}
                    onChange={(e) =>
                      handleRoomChange(
                        floorIndex,
                        roomIndex,
                        'type',
                        e.target.value
                      )
                    }
                    className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                  >
                    {roomTypes
                      .filter(
                        (type) =>
                          !floor.rooms.some((room) => room.type === type) ||
                          room.type === type
                      )
                      .map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                  </select>
                </div>
                <button
                  onClick={() => handleRemoveRoomType(floorIndex, roomIndex)}
                  className="absolute top-0 right-0 text-gray-600"
                >
                  X
                </button>
              </div>
            ))}
            {floor.rooms.length < roomTypes.length && (
              <button
                onClick={() => handleAddRoomType(floorIndex)}
                className="bg-blue-500 text-white py-2 px-4 rounded w-full"
              >
                profile.setup.hotelsetup.addroomtype
              </button>
            )}
          </div>
        ))}
      </div>
      <button
        onClick={handleAddFloor}
        className="bg-green-500 text-white py-2 px-4 rounded w-full"
      >
        profile.setup.hotelsetup.addfloor
      </button>
      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={!skipFloor13}
          onChange={() => setSkipFloor13(!skipFloor13)}
          className="mr-2"
        />
        <label>profile.setup.hotelsetup.dontskip13</label>
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold mb-4">
          profile.setup.hotelsetup.generatedrooms
        </h3>

        {floorNumbers
          .slice()
          .sort((a, b) => b - a)
          .map((floor) => (
            <div
              key={floor}
              className="mb-4 p-4 border rounded bg-gray-100 dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold mb-4">Floor {floor}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {getFloorRooms(floor).map((room, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded flex flex-col items-center dark:bg-gray-700 dark:border-gray-600"
                  >
                    <h4 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-300">
                      profile.setup.hotelsetup.room {room.roomNumber}
                    </h4>

                    <div className="mb-2 w-full">
                      <label className="block mb-1 text-center text-gray-800 dark:text-gray-300">
                        profile.setup.hotelsetup.roomtype
                      </label>

                      <select
                        value={room.type}
                        onChange={(e) => {
                          const newRooms = [...rooms]
                          newRooms[rooms.indexOf(room)].type = e.target.value
                          const roomsByFloor = groupRoomsByFloor(newRooms)
                          setRooms(newRooms)
                          setParentRooms(newRooms)
                          setParentFloors(roomsByFloor)
                        }}
                        className="p-2 border rounded w-full text-center dark:bg-gray-700 dark:border-gray-600"
                      >
                        {roomTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default HotelSetup
