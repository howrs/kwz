"use client"

import { useTeam } from "hooks/useTeam"

export function TeamName() {
  const { team } = useTeam()

  return <>Team: {team.name}</>
}
