// src/stores/counter-store.ts
import { createStore } from 'zustand/vanilla'

export type Team = 'red'|'blue';
export type Position = 'onboard'|'inhole'

type InningBags = {
  [T in Team]:{
    [P in Position]:number;
  }
}

type Score = {
  [T in Team]:number
}


export type CounterState = {
  count: number;
  score: Score;
  redteam: string;
  blueteam: string;
}

export type CounterActions = {
  decrementCount: () => void
  incrementCount: () => void
  updateRed: (points:number) => void
  updateBlue: (points:number) => void
  setRedTeam: (name:string) => void
  setBlueTeam: (name:string) => void
  resetScore: () => void
}

export type CounterStore = CounterState & CounterActions

export const defaultInitState: CounterState = {
  count: 0,
  score: {
    'red':0,
    'blue':0
  },
  redteam:'',
  blueteam:''
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
    decrementCount: () => set((state) => ({ count: state.count - 1 })),
    incrementCount: () => set((state) => ({ count: state.count + 1 })),
    updateRed: (points:number) => set((state) => ({ score: updateScore('red', points, state.score) })),
    updateBlue: (points:number) => set((state) => ({ score: updateScore('blue', points, state.score) })),
    setRedTeam: (name:string) => set({ redteam: name }),
    setBlueTeam: (name:string) => set({ blueteam: name }),
    resetScore: () => set(() => ({ score: defaultInitState.score }))
  }))
}

