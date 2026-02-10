import type { THEME } from "./style"
type TEAMSS = {
    id:number;
    name:string;
    theme:THEME
}[]

export const TEAMS:TEAMSS = [
    {
        id:1,
        name: "B Team",
        theme: 'slate'
    },
    {
        id:2,
        name: "Bombs Away",
        theme: 'rose'
    },
    {
        id:3,
        name: "Bumble&Fumble",
        theme: 'purple'
    },
    {
        id:4,
        name: "Business Casual",
        theme: 'stone'
    },
    {
        id:5,
        name: "Came Out Slingin'",
        theme:'teal'
    },
    {
        id:6,
        name: "Exciting Whites",
        theme: 'indigo'
    },
    {
        id:7,
        name: "Floppy Bags",
        theme: 'pink'
    },
    {
        id:8,
        name: "Just The Tip",
        theme: 'neutral'
    },
    {
        id:9,
        name: "Noga",
        theme: 'blue'
    },
    {
        id:10,
        name: "ROOT of all Problems*",
        theme: 'amber'
    },
    {
        id:11,
        name: "Shitz and Giggles (DRI-FIT)",
        theme: 'emerald'
    },
    {
        id:12,
        name: "Shuck It",
        theme: 'zinc'
    },
    {
        id:13,
        name: "Team 390",
        theme: 'green'
    },
    {
        id:14,
        name: "Team Mahoney (RE-USE)",
        theme: 'orange'
    },
    {
        id:15,
        name: "The Riff Raff",
        theme: 'gray'
    },
    {
        id:16,
        name: "Tooth Girls 1 Bag",
        theme: 'sky'
    },
    {
        id:17,
        name: "UniCORNs*",
        theme: 'lime'
    },
]

export const KEYEDTEAMS = Object.fromEntries(TEAMS.map(team => [team.id, team.name]))

export const GAMES = [
    {
        "date":"2026-02-12",
        "times":[
            {
                "time":"1830",
                "games":[
                    {
                        "board":1,
                        "team1":6,
                        "team2":7
                    },
                    {
                        "board":2,
                        "team1":13,
                        "team2":3
                    },
                    {
                        "board":3,
                        "team1":1,
                        "team2":14
                    }
                ]
            },
            {
                "time":"1915",
                "games":[
                    {
                        "board":1,
                        "team1":4,
                        "team2":15
                    },
                    {
                        "board":2,
                        "team1":9,
                        "team2":16
                    },
                    {
                        "board":3,
                        "team1":13,
                        "team2":2
                    }
                ]
            },
            {
                "time":"2000",
                "games":[
                    {
                        "board":1,
                        "team1":8,
                        "team2":5
                    },
                    {
                        "board":2,
                        "team1":11,
                        "team2":12
                    },
                    {
                        "board":3,
                        "team1":17,
                        "team2":4
                    }
                ]
            }

        ]
    },
    {
        "date":"2026-02-19",
        "times":[
            {
                "time":"1830",
                "games":[
                    {
                        "board":1,
                        "team1":5,
                        "team2":1
                    },
                    {
                        "board":2,
                        "team1":12,
                        "team2":6
                    },
                    {
                        "board":3,
                        "team1":16,
                        "team2":17
                    }
                ]
            },
            {
                "time":"1915",
                "games":[
                    {
                        "board":1,
                        "team1":15,
                        "team2":9
                    },
                    {
                        "board":2,
                        "team1":3,
                        "team2":4
                    },
                    {
                        "board":3,
                        "team1":2,
                        "team2":6
                    }
                ]
            },
            {
                "time":"2000",
                "games":[
                    {
                        "board":1,
                        "team1":10,
                        "team2":7
                    },
                    {
                        "board":2,
                        "team1":11,
                        "team2":13
                    },
                    {
                        "board":3,
                        "team1":14,
                        "team2":8
                    }
                ]
            }

        ]
    }
]