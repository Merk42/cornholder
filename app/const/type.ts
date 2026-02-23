export type THEME = 'base'|'red'|'orange'|'amber'|'yellow'|'lime'|'green'|'emerald'|'teal'|'cyan'|'sky'|'blue'|'indigo'|'violet'|'purple'|'fuchsia'|'pink'|'rose'|'slate'|'gray'|'zinc'|'neutral'|'stone';
export type THEME_GROUP = {
  [T in THEME]:string
}

export type GAMES_API = {
    id: string,
    day: string;
    time: string;
    board: string;
    visitor_id:string;
    home_id:string;
    home_score:string;
    visitor_score:string;
    game_2_home_score:string;
    game_2_visitor_score:string;
    game_3_home_score:string;
    game_3_visitor_score:string;
}

export type TEAMS_API = {
    id:number;
    name:string;
    theme:THEME
}

export type CHAMPIONSHIP_API = {
    id: string;
    round:number;
    home_id:string;
    visitor_id:string;
    board:number;
    time:string;
    winner_game_id:string;
    winner_game_position:string;
}

export type FULL_GAME = {
    id: string,
    day: string;
    time: string;
    board: string|number;
    visitor_id:string;
    home_id:string;
    game_1_home_score:number;
    game_1_visitor_score:number;
    game_2_home_score:number;
    game_2_visitor_score:number;
    game_3_home_score:number;
    game_3_visitor_score:number;
}