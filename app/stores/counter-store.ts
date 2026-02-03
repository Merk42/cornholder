// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'
import type { THEME } from '../const/style';

export type Team = 'team1'|'team2';
export type Position = 'onboard'|'inhole'

type Score = {
  [T in Team]:number
}

export type FinalScore = {
  team1: {
    name:string;
    score:number;
  },
  team2: {
    name:string;
    score:number;
  }
}

export type CounterState = {
  firsttoss: Team;
  count: number;
  score: Score;
  team1name: string;
  team2name: string;
  team1color: THEME;
  team2color: THEME;
  history: FinalScore[]
}

export type CounterActions = {
  increaseTeam1Score: (points:number) => void
  increaseTeam2Score: (points:number) => void
  setTeam1Name: (name:string) => void
  setTeam2Name: (name:string) => void
  setTeam1Color: (name:THEME) => void
  setTeam2Color: (name:THEME) => void
  setFirst: (team:Team) => void
  addHistory: (final:FinalScore) => void
  resetScore: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  firsttoss: 'team1',
  count: 0,
  score: {
    'team1':0,
    'team2':0
  },
  team1name:'',
  team2name:'',
  team1color:'red',
  team2color: 'blue',
  history: []
}

function updateScore(team:Team, score:number, initial:Score):Score {
    const OLDSCORE = initial[team];
    const NEWSCORE = OLDSCORE + score;
    initial[team] = NEWSCORE;
    return initial;
}

export const createCounterStore = (
  initState: CounterState = defaultInitState,
) => {
  return createStore<CounterStore>()((set) => ({
    ...initState,
    increaseTeam1Score: (points:number) => set((state) => ({ score: updateScore('team1', points, state.score) })),
    increaseTeam2Score: (points:number) => set((state) => ({ score: updateScore('team2', points, state.score) })),
    setTeam1Name: (name:string) => set({ team1name: name }),
    setTeam2Name: (name:string) => set({ team2name: name }),
    setTeam1Color: (color:THEME) => set({ team1color: color }),
    setTeam2Color: (color:THEME) => set({ team2color: color }),
    setFirst: (team:Team) => set({ firsttoss: team }),
    addHistory: (final:FinalScore) => set((state) => ({ history: [...state.history, final], })),
    resetScore: () => set({ score: {'team1':0,'team2':0} })
  }))
}

