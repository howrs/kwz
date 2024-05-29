import { nanoid } from "lib/nanoid"
import type { Team } from "model/Team/Team"

type Params = {
  name: string
  creator: string
}

export const newTeam = ({ name, creator }: Params): Team => {
  const team: Team = {
    id: nanoid(),
    name,
    creator,
    members: [],
  }

  return team
}
