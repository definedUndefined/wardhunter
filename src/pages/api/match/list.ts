import { client } from '@/server/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Request:', req.body.puuid);

  const listMatch = await client.match.getMatchlistByPuuid({region: 'europe', puuid: req.body.puuid})
  console.log(listMatch)
  res.status(200).json(listMatch);
}