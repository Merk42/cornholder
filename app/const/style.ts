export type THEME = 'base'|'red'|'orange'|'amber'|'yellow'|'lime'|'green'|'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose';
export type THEME_GROUP = {
  [T in THEME]?:string
}

export const DEFAULT_BUTTON = "bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded disabled:bg-slate-400 disabled:border-slate-500"

export const TEAM_SELECT:THEME_GROUP = {
    'base':'h-10 w-full rounded border-r-8 border-transparent px-4 text-sm outline ',
    'red':'outline-red-700',
    'orange':'outline-orange-700',
    'amber':'outline-amber-700',
    'yellow':'outline-yellow-700',
    'lime':'outline-lime-700',
    'green':'outline-green-700',
    'emerald':'outline-emerald-700',
    'teal':'outline-teal-700',
    'cyan':'outline-cyan-700',
    'sky':'outline-sky-700',
    'blue':'outline-blue-700',
    'indigo':'outline-indigo-700',
    'violet':'outline-violet-700',
    'purple':'outline-purple-700',
    'fuchsia':'outline-fuchsia-700',
    'pink':'outline-pink-700',
    'rose':'outline-rose-700'
}
export const BAG_BORDER:THEME_GROUP = {
    'base':'flex flex-wrap border-2  p-2 my-4 shadow-xl/30',
    'red':'border-red-800 bg-red-100 dark:bg-red-700',
    'orange':'border-orange-800 bg-orange-100 dark:bg-orange-700',
    'amber':'border-amber-800 bg-amber-100 dark:bg-amber-700',
    'yellow':'border-yellow-800 bg-yellow-100 dark:bg-yellow-700',
    'lime':'border-lime-800 bg-lime-100 dark:bg-lime-700',
    'green':'border-green-800 bg-green-100 dark:bg-green-700',
    'emerald':'border-emerald-800 bg-emerald-100 dark:bg-emerald-700',
    'teal':'border-teal-800 bg-teal-100 dark:bg-teal-700',
    'cyan':'border-cyan-800 bg-cyan-100 dark:bg-cyan-700',
    'sky':'border-sky-800 bg-sky-100 dark:bg-sky-700',
    'blue':'border-blue-800 bg-blue-100 dark:bg-blue-700',
    'indigo':'border-indigo-800 bg-indigo-100 dark:bg-indigo-700',
    'violet':'border-violet-800 bg-violet-100 dark:bg-violet-700',
    'purple':'border-purple-800 bg-purple-100 dark:bg-purple-700',
    'fuchsia':'border-fuchsia-800 bg-fuchsia-100 dark:bg-fuchsia-700',
    'pink':'border-pink-800 bg-pink-100 dark:bg-pink-700',
    'rose':'border-rose-800 bg-rose-100 dark:bg-rose-700'
}
export const BAG_BUTTON:THEME_GROUP = {
    'base': 'cursor-pointer grow text-center border-2 p-2 rounded-md text-black dark:text-white peer-checked:text-white ',
    'red':'border-red-800 dark:bg-red-600 bg-red-300 dark:bg-red-800 peer-checked:bg-red-700',
    'orange':'border-orange-800 dark:bg-orange-600 bg-orange-300 dark:bg-orange-800 peer-checked:bg-orange-700',
    'amber':'border-amber-800 dark:bg-amber-600 bg-amber-300 dark:bg-amber-800 peer-checked:bg-amber-700',
    'yellow':'border-yellow-800 dark:bg-yellow-600 bg-yellow-300 dark:bg-yellow-800 peer-checked:bg-yellow-700',
    'lime':'border-lime-800 dark:bg-lime-600 bg-lime-300 dark:bg-lime-800 peer-checked:bg-lime-700',
    'green':'border-green-800 dark:bg-green-600 bg-green-300 dark:bg-green-800 peer-checked:bg-green-700',
    'emerald':'border-emerald-800 dark:bg-emerald-600 bg-emerald-300 dark:bg-emerald-800 peer-checked:bg-emerald-700',
    'teal':'border-teal-800 dark:bg-teal-600 bg-teal-300 dark:bg-teal-800 peer-checked:bg-teal-700',
    'cyan':'border-cyan-800 dark:bg-cyan-600 bg-cyan-300 dark:bg-cyan-800 peer-checked:bg-cyan-700',
    'sky':'border-sky-800 dark:bg-sky-600 bg-sky-300 dark:bg-sky-800 peer-checked:bg-sky-700',
    'blue':'border-blue-800 dark:bg-blue-600 bg-blue-300 dark:bg-blue-800 peer-checked:bg-blue-700',
    'indigo':'border-indigo-800 dark:bg-indigo-600 bg-indigo-300 dark:bg-indigo-800 peer-checked:bg-indigo-700',
    'violet':'border-violet-800 dark:bg-violet-600 bg-violet-300 dark:bg-violet-800 peer-checked:bg-violet-700',
    'purple':'border-purple-800 dark:bg-purple-600 bg-purple-300 dark:bg-purple-800 peer-checked:bg-purple-700',
    'fuchsia':'border-fuchsia-800 dark:bg-fuchsia-600 bg-fuchsia-300 dark:bg-fuchsia-800 peer-checked:bg-fuchsia-700',
    'pink':'border-pink-800 dark:bg-pink-600 bg-pink-300 dark:bg-pink-800 peer-checked:bg-pink-700',
    'rose':'border-rose-800 dark:bg-rose-600 bg-rose-300 dark:bg-rose-800 peer-checked:bg-rose-700'
}

export const BAG_TOTAL:THEME_GROUP = {
    'base': 'flex-none w-[3ch] text-center self-center text-3xl ',
    'red':'text-red-800 dark:text-red-100',
    'orange':'text-orange-800 dark:text-orange-100',
    'amber':'text-amber-800 dark:text-amber-100',
    'yellow':'text-yellow-800 dark:text-yellow-100',
    'lime':'text-lime-800 dark:text-lime-100',
    'green':'text-green-800 dark:text-green-100',
    'emerald':'text-emerald-800 dark:text-emerald-100',
    'teal':'text-teal-800 dark:text-teal-100',
    'cyan':'text-cyan-800 dark:text-cyan-100',
    'sky':'text-sky-800 dark:text-sky-100',
    'blue':'text-blue-800 dark:text-blue-100',
    'indigo':'text-indigo-800 dark:text-indigo-100',
    'violet':'text-violet-800 dark:text-violet-100',
    'purple':'text-purple-800 dark:text-purple-100',
    'fuchsia':'text-fuchsia-800 dark:text-fuchsia-100',
    'pink':'text-pink-800 dark:text-pink-100',
    'rose':'text-rose-800 dark:text-rose-100'
}

export const SCORE:THEME_GROUP = {
    'base': 'place-content-center aspect-[1] text-center text-white text-[10vw] ',
    'red':'bg-red-600',
    'orange':'bg-orange-600',
    'amber':'bg-amber-600',
    'yellow':'bg-yellow-600',
    'lime':'bg-lime-600',
    'green':'bg-green-600',
    'emerald':'bg-emerald-600',
    'teal':'bg-teal-600',
    'cyan':'bg-cyan-600',
    'sky':'bg-sky-600',
    'blue':'bg-blue-600',
    'indigo':'bg-indigo-600',
    'violet':'bg-violet-600',
    'purple':'bg-purple-600',
    'fuchsia':'bg-fuchsia-600',
    'pink':'bg-pink-600',
    'rose':'bg-rose-600'
}

export const SUBMIT:THEME_GROUP = {
    'red':'bg-red-800',
    'orange':'bg-orange-800',
    'amber':'bg-amber-800',
    'yellow':'bg-yellow-800',
    'lime':'bg-lime-800',
    'green':'bg-green-800',
    'emerald':'bg-emerald-800',
    'teal':'bg-teal-800',
    'cyan':'bg-cyan-800',
    'sky':'bg-sky-800',
    'blue':'bg-blue-800',
    'indigo':'bg-indigo-800',
    'violet':'bg-violet-800',
    'purple':'bg-purple-800',
    'fuchsia':'bg-fuchsia-800',
    'pink':'bg-pink-800',
    'rose':'bg-rose-800'
}

export const FINAL = {
    'name': {
        'base':'text-left text-2xl p-2 border-2 ',
        'red':'border-red-800',
        'orange':'border-orange-800',
        'amber':'border-amber-800',
        'yellow':'border-yellow-800',
        'lime':'border-lime-800',
        'green':'border-green-800',
        'emerald':'border-emerald-800',
        'teal':'border-teal-800',
        'cyan':'border-cyan-800',
        'sky':'border-sky-800',
        'blue':'border-blue-800',
        'indigo':'border-indigo-800',
        'violet':'border-violet-800',
        'purple':'border-purple-800',
        'fuchsia':'border-fuchsia-800',
        'pink':'border-pink-800',
        'rose':'border-rose-800'
    },
    'score': {
        'base':'text-2xl p-2 border-2 ',
        'red':'border-red-800',
        'orange':'border-orange-800',
        'amber':'border-amber-800',
        'yellow':'border-yellow-800',
        'lime':'border-lime-800',
        'green':'border-green-800',
        'emerald':'border-emerald-800',
        'teal':'border-teal-800',
        'cyan':'border-cyan-800',
        'sky':'border-sky-800',
        'blue':'border-blue-800',
        'indigo':'border-indigo-800',
        'violet':'border-violet-800',
        'purple':'border-purple-800',
        'fuchsia':'border-fuchsia-800',
        'pink':'border-pink-800',
        'rose':'border-rose-800'
    }
}