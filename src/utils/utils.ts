import { Participant } from "@prisma/client";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function formatTimeDifference(date: Date): string {
    const differenceMs = Date.now() - date.getTime();
    const difference = new Date(differenceMs);
  
    const years = difference.getUTCFullYear() - 1970;
    const months = difference.getUTCMonth();
    const days = difference.getUTCDate() - 1;
  
    let result = "";
    if (years > 0) {
      result += years + (years === 1 ? " an " : " ans ");
    }
    if (months > 0) {
      result += months + (months === 1 ? " mois " : " mois ");
    }
    if (days > 0) {
      result += days + (days === 1 ? " jour " : " jours ");
    }
  
    return result;
  }
  

  export function findParticipantByName(participants: Participant[], name: string): Participant | undefined {
    return participants.find(
      (participant: Participant) =>
        participant.summoner && participant.summoner.name === name,
    )
  }

  export const registerUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password should be minimum 6 characters'),
    username: z.string().min(3, 'Name should be at least 3 characters')
  })

  export const userSchemaLogin = z.object({
    email: z.string().email(),
    password: z.string().min(6, 'Password should be minimum 6 characters'),
  })
  
  