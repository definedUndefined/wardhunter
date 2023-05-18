import { useState, FC } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { searchSummonerValidator } from '@/validation/search-summoner'
import Button from './ui/Button'
import { regions, regionSchema } from '@/lib/constants/platforms'

interface SummonerSearchbarProps {}
type FormData = z.infer<typeof searchSummonerValidator>

const SearchSummoner: FC<SummonerSearchbarProps> = ({}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { push } = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(searchSummonerValidator),
  })

  const processSummonner = async (summonerName: string, region: string) => {
    try {
      setIsLoading(true)
      const validData = searchSummonerValidator.parse({ summonerName, region })
      console.log(`/${validData.region}/${validData.summonerName}`)
      push(`/${validData.region}/${validData.summonerName}`)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setError('summonerName', { message: error.message })
      }
      setError('summonerName', { message: 'Something went wrong.' })
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (data: FormData) => {
    processSummonner(data.summonerName, data.region)
  }

  return (
    <div className="rounded-lg bg-teal-600/40 shadow-lg lg:col-span-3 lg:p-12">
      <h3 className="text-3xl font-extrabold text-white sm:text-5xl mb-7">
        Trouvez un invocateur !
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="p-3">
        <div className="mb-2">
          <select
            {...register('region')}
            className="px-8 py-2 rounded-md bg-[#131313] text-white"
            id="region"
            name="region"
          >
            {regions.map((region) => (
              <option key={region} value={region}>
                {region.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-hidden flex flex-col  gap-1">
          <input
            type="text"
            {...register('summonerName')}
            required
            className="h-full px-8 py-4 outline-none rounded-md bg-[#131313] text-white"
            placeholder="Touver un invocateur..."
          />

          <Button
            isLoading={isLoading}
            type="submit"
            variant={'special'}
            size={'special'}
          >
            {isLoading ? null : (
              <span className="text-2xl block rounded-md bg-[#131313] text-white px-8 py-2 font-medium hover:bg-transparent">
                Hunt
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SearchSummoner
