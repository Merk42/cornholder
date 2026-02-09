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
                        "team1":12,
                        "team2":3
                    },
                    {
                        "board":3,
                        "team1":1,
                        "team2":13
                    }
                ]
            },
            {
                "time":"1915",
                "games":[
                    {
                        "board":1,
                        "team1":4,
                        "team2":14
                    },
                    {
                        "board":2,
                        "team1":8,
                        "team2":15
                    },
                    {
                        "board":3,
                        "team1":12,
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
    }
]