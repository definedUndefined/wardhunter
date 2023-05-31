import moment from "moment";
import { Prisma } from "@prisma/client";
import type { SummonerDTO } from "@/lib/models/summoner";
import type { Region } from "@/lib/constants/platforms";

export function summonerToPrismaSummoner(summonerDTO: SummonerDTO, region: Region){

    const today = moment();
    // Add 1 week to the current date
    const nextWeek = today.add(1, 'week');
    // Get the timestamp for next week
    const timestamp = nextWeek.unix();
    
    summonerDTO.revisionDate = timestamp;
    console.log('summonerDTO revision date ' + summonerDTO.revisionDate)
    return Prisma.validator<Prisma.SummonerCreateInput>()({
        ...summonerDTO,
        revisionDate: moment.unix(summonerDTO.revisionDate).toDate(),
        region
    })
}

// moment.unix((data as SummonerDTO).revisionDate).format('ddd MMM DD YYYY HH:mm:ss'))