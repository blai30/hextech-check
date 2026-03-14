import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import { SearchForm } from '@/components/client'
import SummonerDetails from '@/components/client/SummonerDetails'
import PaginatedMasteries from '@/components/client/PaginatedMasteries'
import {
  getAccount,
  getChampionMasteries,
  getChampions,
  getLatestVersion,
  getSummoner,
  getLeagues,
  getProfileIconUrl,
} from '@/lib/endpoints'
import type {
  AccountDto,
  ChampionDto,
  ChampionMasteryDto,
  LeagueEntryDto,
  SummonerDto,
} from '@/models/riotapi'

type SummonerData = {
  accountData: AccountDto
  masteriesData: ChampionMasteryDto[]
  playerData: SummonerDto
  leaguesData: LeagueEntryDto[]
  imageUrl: string
  championsData: { [key: number]: ChampionDto }
  version: string
}

const fetchSummonerData = createServerFn()
  .inputValidator((input: { region: string; player: string }) => input)
  .handler(async ({ data }): Promise<SummonerData> => {
    const { region, player } = data
    const accountData = await getAccount(player)
    const [masteriesData, playerData, version] = await Promise.all([
      getChampionMasteries(region, accountData.puuid),
      getSummoner(region, accountData.puuid),
      getLatestVersion(),
    ])
    const [leaguesData, imageUrl, championsData] = await Promise.all([
      getLeagues(region, playerData.puuid),
      getProfileIconUrl(playerData.profileIconId, version),
      getChampions(version),
    ])

    return {
      accountData,
      masteriesData,
      playerData,
      leaguesData,
      imageUrl,
      championsData,
      version,
    }
  })

export const Route = createFileRoute('/$region/$player')({
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { accountData, masteriesData, championsData, playerData, version } =
      loaderData as SummonerData

    const totalMastery = masteriesData.reduce(
      (acc, cur) => acc + cur.championPoints,
      0,
    )

    const topFive = masteriesData.slice(0, 5).map((mastery, index) => {
      const champion = championsData[mastery.championId]
      const points = mastery.championPoints.toLocaleString()
      return `${index + 1}. ${champion?.name ?? mastery.championId} - ${points}`
    })

    return {
      meta: [
        {
          title: `${accountData.gameName}#${accountData.tagLine} | Hextech Check`,
        },
        {
          name: 'description',
          content: `Total mastery: ${totalMastery.toLocaleString()}\n${topFive.join('\n')}`,
        },
        {
          name: 'og:image',
          content: `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${playerData.profileIconId}.png`,
        },
      ],
    }
  },
  loader: async ({ params }): Promise<SummonerData> => {
    return fetchSummonerData({ data: params })
  },
  errorComponent: PlayerError,
  component: PlayerPage,
})

function PlayerError({ error }: { error: Error }) {
  const router = useRouter()

  return (
    <div className="flex min-h-full w-full grow flex-col items-center justify-center gap-8">
      <h2 className="text-4xl font-light">Something went wrong!</h2>
      <p className="text-gray-600 dark:text-gray-300">{error.message}</p>
      <button
        onClick={() => router.navigate({ to: '/' })}
        className="rounded bg-yellow-600 px-4 py-2 font-bold text-white hover:bg-yellow-700"
      >
        Back to home page
      </button>
    </div>
  )
}

function PlayerPage() {
  const { region, player } = Route.useParams()
  const {
    accountData,
    masteriesData,
    playerData,
    leaguesData,
    imageUrl,
    championsData,
    version,
  } = Route.useLoaderData() as SummonerData

  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-6">
        <SearchForm defaultRegion={region} defaultPlayer={player} />
        <SummonerDetails
          accountData={accountData}
          playerData={playerData}
          imageUrl={imageUrl}
          masteriesData={masteriesData}
          leaguesData={leaguesData}
        />
        <PaginatedMasteries
          masteriesData={masteriesData}
          championsData={championsData}
          version={version}
        />
      </div>
    </div>
  )
}
