export type THEME = 'base'|'red'|'blue';
export type THEME_GROUP = {
  [T in THEME]:string
}

export const DEFAULT_BUTTON = "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded disabled:bg-slate-400 disabled:border-slate-500"

export const TEAM_SELECT:THEME_GROUP = {
    'base':'h-10 w-full rounded border-r-8 border-transparent px-4 text-sm outline ',
    'red':'outline-red-700',
    'blue':'outline-blue-700'
}
export const BAG_BORDER:THEME_GROUP = {
    'base':'flex flex-wrap border-2  p-2 my-4 shadow-xl/30',
    'red':'border-red-800 bg-red-100 dark:bg-red-700',
    'blue':'border-blue-800 bg-blue-100 dark:bg-blue-700'
}
export const BAG_BUTTON:THEME_GROUP = {
    'base': 'cursor-pointer grow text-center border-2 p-2 rounded-md text-black dark:text-white peer-checked:text-white ',
    'red': 'border-red-800 dark:bg-red-600 bg-red-300 dark:bg-red-800 peer-checked:bg-red-700',
    'blue': 'border-blue-800 dark:bg-blue-600 bg-blue-300 dark:bg-blue-800 peer-checked:bg-blue-700'
}

export const BAG_TOTAL:THEME_GROUP = {
    'base': 'flex-none w-[3ch] text-center self-center text-3xl ',
    'red': 'text-red-800 dark:text-red-100',
    'blue': 'text-blue-800 dark:text-blue-100'
}

export const SCORE:THEME_GROUP = {
    'base': 'place-content-center aspect-[1] text-center text-white text-[10vw] ',
    'red': 'bg-red-600 ',
    'blue': 'bg-blue-600 '
}

export const SUBMIT:THEME_GROUP = {
    'base':'',
    'red':'bg-red-800',
    'blue':'bg-blue-800'
}

export const FINAL = {
    'name': {
        'base':'text-left text-2xl p-2 border-2 ',
        'red': 'border-red-800',
        'blue':'border-blue-800'
    },
    'score': {
        'base':'text-2xl p-2 border-2 ',
        'red': 'border-red-800',
        'blue':'border-blue-800'
    }
}