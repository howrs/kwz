import { useSuspenseQuery } from "@tanstack/react-query"
import { assert } from "lib/assert"
import { supa } from "lib/supabase/supa"
import type { Team } from "model/Team/Team"
import { useParams } from "next/navigation"

type Params = {
  teamId: string
}

export function useTeam(params?: Params) {
  const teamId = params?.teamId ?? useParams<Params>().teamId

  assert(teamId, "teamId is required")

  const { data, ...rest } = useSuspenseQuery({
    queryKey: ["team", teamId],
    queryFn: async () => {
      const team = await supa.getItem<Team>(`team:${teamId}`)

      assert(team, "Team not found")

      return team
    },
  })

  return {
    team: data,
    ...rest,
  }
}
