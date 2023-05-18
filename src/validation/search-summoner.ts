import { regionSchema } from '@/lib/constants/platforms'
import { z } from 'zod'

export const searchSummonerValidator = z.object({ summonerName: z.string(), region: regionSchema })
