"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "1. Basics": [
        {
            "input": ["S...", "....", "B.WB", "..WE"],
            "answer": (["S...", "....", "B.WB", "..WE"], 12),
            "explanation": "LLLDDD"
        },
        {
            "input": ["S...", "....", "B..B", "..WE"],
            "answer": (["S...", "....", "B..B", "..WE"], 11),
            "explanation": "DDBLLLBD"
        }
    ],
    "2. Extra": [
        {
            "input": ["S.W...", "..WB..", "..WW..", "....B.", "....W.", "..B.BE"],
            "answer": (["S.W...", "..WB..", "..WW..", "....B.", "....W.", "..B.BE"], 20),
            "explanation": ""
        },
        {
            "input": ["SBW...", ".WWB..", "..WW..", "......", "...WW.", "..BWBE"],
            "answer": (["SBW...", ".WWB..", "..WW..", "......", "...WW.", "..BWBE"], 18),
        },
        {
            "input": ["S..BW.", ".WWWWW", ".W....", ".W.W.B", ".W.W..", "...W.E"],
            "answer": (["S..BW.", ".WWWWW", ".W....", ".W.W.B", ".W.W..", "...W.E"], 29),
        },
    ],
    "3. Weird": [
        {
            "input": ["SB....BE"],
            "answer": (["SB....BE"], 11),
        },
        {
            "input": ["S...BB..E"],
            "answer": (["S...BB..E"], 16),
        },

        {
            "input": ["SBBBBB",
                      "BBBBBB",
                      "BBBBBB",
                      "BBBBBB",
                      "BBBBBE"],
            "answer": (["SBBBBB",
                        "BBBBBB",
                        "BBBBBB",
                        "BBBBBB",
                        "BBBBBE"], 13),
        },
        {
            "input": ["S.......",
                      "........",
                      "..B.....",
                      ".....B..",
                      "........",
                      ".......E"],
            "answer": (["S.......",
                        "........",
                        "..B.....",
                        ".....B..",
                        "........",
                        ".......E"], 22),
        },
        {
            "input": ["SW.B.W.",
                      ".W.W.W.",
                      ".W.W.W.",
                      ".W.W.WB",
                      ".W.W.W.",
                      ".B.W..E"],
            "answer": (["SW.B.W.",
                        ".W.W.W.",
                        ".W.W.W.",
                        ".W.W.WB",
                        ".W.W.W.",
                        ".B.W..E"], 35),
        },

    ],
    "4. Big": [
        {
            "input": ["S..BW....",
                      "...W.....",
                      "..W......",
                      ".........",
                      ".WWWWWWW.",
                      "..WB.....",
                      "..W....B.",
                      "..WWW.WWW",
                      "....W...E"],
            "answer": (["S..BW....",
                        "...W.....",
                        "..W......",
                        ".........",
                        ".WWWWWWW.",
                        "..WB.....",
                        "..W....B.",
                        "..WWW.WWW",
                        "....W...E"], 38),
        },
        {
            "input": ["S........",
                      ".WWW.WWW.",
                      ".W.B...W.",
                      ".WWWWWWW.",
                      ".W..B..W.",
                      ".W.WWW.WW",
                      ".W...W.WB",
                      ".WWW.W.W.",
                      ".....W..E"],
            "answer": (["S........",
                        ".WWW.WWW.",
                        ".W.B...W.",
                        ".WWWWWWW.",
                        ".W..B..W.",
                        ".W.WWW.WW",
                        ".W...W.WB",
                        ".WWW.W.W.",
                        ".....W..E"], 56),
        },

    ]
}
