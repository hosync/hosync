'use server'

import { files } from '@hosync/utils'

import { ASRDTO } from '@/dtos/asr-dto'
import { ASRModelDTO, ASRTypeDTO, getASRDTO } from '@/dtos/asr-model-dto'
import { BusinessDTO, getBusinessDTO } from '@/dtos/business-dto'
import { FeeDTO, getFeeDTO } from '@/dtos/fee-dto'
import { getPropertyDTO, PropertyDTO } from '@/dtos/property-dto'
import ASRService from '@/services/asr'
import BusinessService from '@/services/business'
import FeeService from '@/services/fee'
import PhotoService from '@/services/photo'
import PropertyService from '@/services/property'
import RoomService from '@/services/room'
import SettingsService from '@/services/setting'
import UnitService from '@/services/unit'
import UserService from '@/services/user'
import { APIResponse } from '@/types/api'

export const setupProfile = async (
  data: any,
  user: any
): Promise<APIResponse<any>> => {
  const businessId = user.businessId

  const businessItemData: BusinessDTO = getBusinessDTO(data, user.businessId)
  /* Updating business data by using business service class */
  const generalResponse: APIResponse<any> = await BusinessService.update(
    businessId,
    businessItemData
  )

  if (generalResponse.ok) {
    const asr: ASRTypeDTO = getASRDTO(data.amenities)

    const propertyObj = new ASRModelDTO(asr)

    // Change to createdASR
    const createdASR = await ASRService.create(propertyObj)

    if (createdASR.ok) {
      const amenityCreated: ASRDTO = createdASR.data

      const feeData = {
        weekdayFee: data.pricing.price
      }
      const feeDTO: FeeDTO = getFeeDTO(feeData)

      const createdFeeData = await FeeService.create(feeDTO)

      const propertyData = getPropertyDTO(
        businessId,
        amenityCreated.id,
        data.propertyType,
        data.propertyName,
        data.capacity,
        data.pricing
      )

      const createdProperty = await PropertyService.create(propertyData)

      if (createdProperty.ok && createdFeeData.ok) {
        const propertyCreated: any = createdProperty.data
        const uploadedFiles = data.images
        /* Upload images to server side */
        const uploadFilesResponse = await files.uploadFiles(
          uploadedFiles,
          `/api/v1/uploader?setType=image&businessSlug=${user.businessSlug}`
        )

        let images = []

        if (uploadFilesResponse.ok) {
          images = uploadFilesResponse.data.map((data: any) => data.path)
        }

        const imagesPayload = images.map((image: string) => {
          return {
            url: image,
            propertyId: propertyCreated.id
          }
        })

        await PhotoService.create(imagesPayload)

        const unitData = {
          propertyId: createdProperty.data.id,
          feeId: createdFeeData.data.id,
          asrId: amenityCreated.id,
          maxGuests: data.capacity.guests,
          bedrooms: data.capacity.bathrooms,
          bathrooms: data.capacity.bathrooms,
          queenSizeBeds: data.capacity.beds
        }

        await UnitService.create(unitData)

        const timezone =
          data.country === 'Mexico'
            ? 'GMT-6'
            : data.country === 'Canada'
              ? 'GTM-4'
              : 'GTM-4'

        const settingsData = {
          userId: data.userId,
          currency: data.currency,
          language: data.country,
          timezone
        }
        await SettingsService.create(settingsData)

        const userData = {
          id: user.id,
          password: data.password,
          active: true
        }

        await UserService.update(userData.id, userData)
      }
    }
  }

  return generalResponse
}
