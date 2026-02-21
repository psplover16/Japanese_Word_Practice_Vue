export const verbsType = {
    // ===== 基本活用形 =====
    MIZEN: "未然形",
    RENYOU: "連用形",
    JISHO: "辭書形",
    MEIREI: "命令形",
    IKOU: "意向形",
    // ===== 派生活用 =====
    KANOU: "派生可能",
    UKEMI: "派生被動",
    SHIEKI: "派生使役",
    // ===== 條件形 =====
    KATEI: "假定形",
    // 
    RENYOUOUTSIDE: "連用(表)",
    RENYOUINSIDE: "連用(裏)",
    RENYOUDESU: "連用(です)",
    RENYOUTE: "連用(て)",
    RENYOUTA: "連用(た)",
    // 五段動詞
    GODAN: "五段動詞",
    ICHIDAN: "一段動詞",
    IRREGULAR: "不規則動詞"
};

export const grammarParts = {
    PREFIX: "前置詞",
    STEM: "詞幹",
    ENDING: "詞尾",
    SUFFIX: "接尾",
    MEANING: "含意"
};

// {
//     base: 'MIZEN',
//     // 前置詞 / 詞幹 / 詞尾 / 接尾 / 含意
//     prefix: "前置語素",
//     stem: "詞幹",
//     baseEnding: "基本詞尾",
//     suffixAndMeaning: [
//         {
//             suffix: "接尾語素",
//             meaning: "含意"
//         }
//     ],
// }

export const verbDistinctionRules = [
    {
        rules: "非る結尾，一定是 五段動詞",
    },
    {
        rules: "固定的不規則動詞，只有兩個",
        examples: [
            {
                verb: "する",
                meaning: "做"
            },
            {
                verb: "来(く)る",
                meaning: "來"
            }
        ],
    },
    {
        rules: "る結尾的看 る 前一個音，如果前一個音是母音1/3/5 (あ/う/お) 屬於五段動詞",
    },
    {
        rules: "不在上述規則的五段動詞",
        examples: [
            {
                verb: "帰る（かえる）",
                meaning: "回去／回家"
            },
            {
                verb: "入る（はいる）",
                meaning: "進入"
            },
            {
                verb: "走る（はしる）",
                meaning: "跑"
            },
            {
                verb: "切る（きる）",
                meaning: "切"
            },
            {
                verb: "知る（しる）",
                meaning: "知道"
            },
        ]
    },
    {
        rules: "其他則是一段動詞"
    }
];

// 五段動詞的活用規則
export const godanVerbConjugationRules = [
    {
        base: 'MIZEN',
        suffixAndMeaning: [
            {
                suffix: "ない",
                meaning: "否定"
            },
            {
                suffix: "れる",
                meaning: "被動"
            },
            {
                suffix: "せる",
                meaning: "使役"
            },
        ],
    },
    {
        base: 'RENYOU',
        suffixAndMeaning: [
            {
                suffix: "ます",
                meaning: "禮貌"
            },
            {
                suffix: "て",
                meaning: "句子並列與接續"
            },
            {
                suffix: "た",
                meaning: "表達動作行為完結"
            },
        ]
    },
    {
        base: 'JISHO',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "習慣/未來"
            }
        ]
    },
    {
        base: 'MEIREI',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "命令"
            }
        ]
    },
    {
        base: 'IKOU',
        suffixAndMeaning: [
            {
                suffix: "う",
                meaning: "勸誘"
            }
        ]
    },
];

export const godanVerbPaiSenRules = [
    {
        base: 'KANOU',
        suffixAndMeaning: [
            {
                suffix: "る",
                meaning: ""
            },
        ],
    },
    {
        base: 'UKEMI',
        suffixAndMeaning: [
            {
                suffix: "れる",
                meaning: ""
            },
        ],
    },
    {
        base: 'SHIEKI',
        suffixAndMeaning: [
            {
                suffix: "せる",
                meaning: ""
            },
        ],
    },
    {
        base: 'KATEI',
        suffixAndMeaning: [
            {
                suffix: "ば",
                meaning: ""
            },
        ],
    },



]

// 音便規則
export const soundChangeRules = [
    {
        base: 'い音便',
        JISHO: [['く'], ['ぐ']],
        RENYOUTE: ['いて', 'いで'],
        RENYOUTA: ['いた', 'いだ'],
    },
    {
        base: '促音便',
        JISHO: [['行く'], ['つ', 'る', 'う']],
        RENYOUTE: ['行って', 'って'],
        RENYOUTA: ['行った', 'った'],
    },
    {
        base: '撥音便',
        JISHO: [['む', 'ぶ', 'ぬ']],
        RENYOUTE: ['んで'],
        RENYOUTA: ['んだ'],
    },
];

// 
export const ichidabVerbConjugationRules = [
    {
        base: 'MIZEN',
        baseEnding: '',
        suffixAndMeaning: [
            {
                suffix: "ない",
                meaning: "否定"
            },
            {
                suffix: "られる",
                meaning: "被動"
            },
            {
                suffix: "させる",
                meaning: "使役"
            },
        ],
    },
    {
        base: 'RENYOU',
        baseEnding: '',
        suffixAndMeaning: [
            {
                suffix: "ます",
                meaning: "禮貌"
            },
            {
                suffix: "て",
                meaning: "句子並列與接續"
            },
            {
                suffix: "た",
                meaning: "表達動作行為完結"
            },
        ]
    },
    {
        base: 'JISHO',
        baseEnding: 'る',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "習慣/未來"
            }
        ]
    },
    {
        base: 'MEIREI',
        baseEnding: 'ろ',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "命令"
            }
        ]
    },
    {
        base: 'IKOU',
        baseEnding: 'よ',
        suffixAndMeaning: [
            {
                suffix: "う",
                meaning: "勸誘"
            }
        ]
    },
]

export const ichidabVerbPaiSenRules = [
    {
        base: 'KANOU',
        baseEnding: 'ら',
        suffixAndMeaning: [
            {
                suffix: "れる",
                meaning: ""
            },
        ],
    },
    {
        base: 'UKEMI',
        baseEnding: 'ら',
        suffixAndMeaning: [
            {
                suffix: "れる",
                meaning: "與未然形同"
            },
        ],
    },
    {
        base: 'SHIEKI',
        baseEnding: 'さ',
        suffixAndMeaning: [
            {
                suffix: "せる",
                meaning: "與未然形同"
            },
        ],
    },
    {
        base: 'KATEI',
        baseEnding: 'れ',
        suffixAndMeaning: [
            {
                suffix: "ば",
                meaning: ""
            },
        ],
    },
]
// 
export const saVerbConjugationRules = [
    {
        base: 'MIZEN',
        baseEnding: 'し',
        suffixAndMeaning: [
            {
                suffix: "ない",
                meaning: "否定"
            },
        ],
    },
    {
        base: 'RENYOU',
        baseEnding: 'し',
        suffixAndMeaning: [
            {
                suffix: "ます",
                meaning: "禮貌"
            },
            {
                suffix: "て",
                meaning: "句子並列與接續"
            },
            {
                suffix: "た",
                meaning: "表達動作行為完結"
            },
        ]
    },
    {
        base: 'JISHO',
        baseEnding: 'する',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "習慣/未來"
            }
        ]
    },
    {
        base: 'MEIREI',
        baseEnding: 'しろ',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "命令"
            }
        ]
    },
    {
        base: 'IKOU',
        baseEnding: 'しよ',
        suffixAndMeaning: [
            {
                suffix: "う",
                meaning: "勸誘"
            }
        ]
    },
    {
        base: 'KANOU',
        baseEnding: '',
        suffixAndMeaning: [
            {
                suffix: "できる",
                meaning: ""
            },
        ],
    },
    {
        base: 'UKEMI',
        baseEnding: 'さ',
        suffixAndMeaning: [
            {
                suffix: "れる",
                meaning: ""
            },
        ],
    },
    {
        base: 'SHIEKI',
        baseEnding: 'さ',
        suffixAndMeaning: [
            {
                suffix: "せる",
                meaning: ""
            },
        ],
    },
    {
        base: 'KATEI',
        baseEnding: 'すれ',
        suffixAndMeaning: [
            {
                suffix: "ば",
                meaning: ""
            },
        ],
    },
]

export const kaVerbConjugationRules = [
    {
        base: 'MIZEN',
        baseEnding: 'こ',
        suffixAndMeaning: [
            {
                suffix: "ない",
                meaning: "否定"
            },
        ],
    },
    {
        base: 'RENYOU',
        baseEnding: 'き',
        suffixAndMeaning: [
            {
                suffix: "ます",
                meaning: "禮貌"
            },
            {
                suffix: "て",
                meaning: "句子並列與接續"
            },
            {
                suffix: "た",
                meaning: "表達動作行為完結"
            },
        ]
    },
    {
        base: 'JISHO',
        baseEnding: 'くる',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "習慣/未來"
            }
        ]
    },
    {
        base: 'MEIREI',
        baseEnding: 'こい',
        suffixAndMeaning: [
            {
                suffix: "",
                meaning: "命令"
            }
        ]
    },
    {
        base: 'IKOU',
        baseEnding: 'こよ',
        suffixAndMeaning: [
            {
                suffix: "う",
                meaning: "勸誘"
            }
        ]
    },
    {
        base: 'KANOU',
        baseEnding: 'こ',
        suffixAndMeaning: [
            {
                suffix: "られる",
                meaning: ""
            },
        ],
    },
    {
        base: 'UKEMI',
        baseEnding: 'こ',
        suffixAndMeaning: [
            {
                suffix: "られる",
                meaning: ""
            },
        ],
    },
    {
        base: 'SHIEKI',
        baseEnding: 'こ',
        suffixAndMeaning: [
            {
                suffix: "させる",
                meaning: ""
            },
        ],
    },
    {
        base: 'KATEI',
        baseEnding: 'くれ',
        suffixAndMeaning: [
            {
                suffix: "ば",
                meaning: ""
            },
        ],
    },
]