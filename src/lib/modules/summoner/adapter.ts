import moment from "moment";
import { Prisma } from "@prisma/client";
import type { SummonerDTO } from "@/lib/models/summoner";
import type { Region } from "@/lib/constants/platforms";

export function summonerToPrismaSummoner(summonerDTO: SummonerDTO, region: Region){
    return Prisma.validator<Prisma.SummonerCreateInput>()({
        ...summonerDTO,
        revisionDate: moment(summonerDTO.revisionDate).toDate(),
        region
    })
}