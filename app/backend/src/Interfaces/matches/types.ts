type payloadUpdateGoals = {
  id:number,
  awayTeamGoals: number,
  homeTeamGoals: number
};

type createMatch = {
  homeTeamId: number,
  awayTeamId: number,
  homeTeamGoals: number,
  awayTeamGoals: number
};

export { payloadUpdateGoals, createMatch };
