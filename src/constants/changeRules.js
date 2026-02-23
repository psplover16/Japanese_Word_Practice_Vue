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
  IRREGULAR: "不規則動詞",
  RENTAI: "連体形",
  SHUUSHI: "終止形",
  NORMAL: "普通型",
};

export const verbTypeMeaning = {
  // ===== 基本活用形 =====
  MIZEN: "「還沒發生」的形態，常用於否定、被動、使役等表達",
  RENYOU:
    "「連接用」的形態，常用於接續助動詞、形容詞等，表達禮貌、完成、進行等",
  JISHO:
    "字典查得到的原形態，常用於表示習慣、未來等、接普通文章、子句結尾(也是終止型的現代名稱)",
  MEIREI: "命令語氣的形態，常用於給予指示、命令等",
  IKOU: "表示「打算」「讓我們～吧」的形態，常用於表達意圖、建議等",
  // ===== 條件形 =====
  KATEI: "表示「如果」",
  RENTAI: "用於修飾名詞，表示動作或狀態的特徵或屬性。現代日文：連體形 = 辞書形",
  SHUUSHI: "用於句子結尾，表示陳述或斷定。現代日文：終止形 = 辞書形",
  NORMAL: "辭書形 ＋ 否定 ＋ 過去 ＋ 過去否定",
};

export const grammarParts = {
  PREFIX: "前置詞",
  STEM: "詞幹",
  ENDING: "詞尾",
  SUFFIX: "接尾",
  MEANING: "含意",
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
        meaning: "做",
      },
      {
        verb: "来(く)る",
        meaning: "來",
      },
    ],
  },
  {
    rules:
      "る結尾的看 る 前一個音，如果前一個音是母音1/3/5 (あ/う/お) 屬於五段動詞",
  },
  {
    rules: "不在上述規則的五段動詞",
    examples: [
      {
        verb: "帰る（かえる）",
        meaning: "回去／回家",
      },
      {
        verb: "入る（はいる）",
        meaning: "進入",
      },
      {
        verb: "走る（はしる）",
        meaning: "跑",
      },
      {
        verb: "切る（きる）",
        meaning: "切",
      },
      {
        verb: "知る（しる）",
        meaning: "知道",
      },
    ],
  },
  {
    rules: "其他則是一段動詞",
  },
];

// 五段動詞的活用規則
export const godanVerbConjugationRules = [
  {
    base: "MIZEN",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
      {
        suffix: "れる",
        meaning: "被動",
      },
      {
        suffix: "せる",
        meaning: "使役",
      },
    ],
  },
  {
    base: "RENYOU",
    suffixAndMeaning: [
      {
        suffix: "ます",
        meaning: "禮貌",
      },
      {
        suffix: "て",
        meaning: "句子並列與接續",
      },
      {
        suffix: "た",
        meaning: "表達動作行為完結",
      },
    ],
  },
  {
    base: "JISHO",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "習慣/未來",
      },
    ],
  },
  {
    base: "MEIREI",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "命令",
      },
    ],
  },
  {
    base: "IKOU",
    suffixAndMeaning: [
      {
        suffix: "う",
        meaning: "勸誘",
      },
    ],
  },
];

export const godanVerbPaiSenRules = [
  {
    base: "KANOU",
    suffixAndMeaning: [
      {
        suffix: "る",
        meaning: "",
      },
    ],
  },
  {
    base: "UKEMI",
    suffixAndMeaning: [
      {
        suffix: "れる",
        meaning: "",
      },
    ],
  },
  {
    base: "SHIEKI",
    suffixAndMeaning: [
      {
        suffix: "せる",
        meaning: "",
      },
    ],
  },
  {
    base: "KATEI",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "",
      },
    ],
  },
];

// 音便規則
export const soundChangeRules = [
  {
    base: "い音便",
    JISHO: [["く"], ["ぐ"]],
    RENYOUTE: ["いて", "いで"],
    RENYOUTA: ["いた", "いだ"],
  },
  {
    base: "促音便",
    JISHO: [["行く"], ["つ", "る", "う"]],
    RENYOUTE: ["行って", "って"],
    RENYOUTA: ["行った", "った"],
  },
  {
    base: "撥音便",
    JISHO: [["む", "ぶ", "ぬ"]],
    RENYOUTE: ["んで"],
    RENYOUTA: ["んだ"],
  },
];

//
export const ichidabVerbConjugationRules = [
  {
    base: "MIZEN",
    baseEnding: "",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
      {
        suffix: "られる",
        meaning: "被動",
      },
      {
        suffix: "させる",
        meaning: "使役",
      },
    ],
  },
  {
    base: "RENYOU",
    baseEnding: "",
    suffixAndMeaning: [
      {
        suffix: "ます",
        meaning: "禮貌",
      },
      {
        suffix: "て",
        meaning: "句子並列與接續",
      },
      {
        suffix: "た",
        meaning: "表達動作行為完結",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "る",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "習慣/未來",
      },
    ],
  },
  {
    base: "MEIREI",
    baseEnding: "ろ",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "命令",
      },
    ],
  },
  {
    base: "IKOU",
    baseEnding: "よ",
    suffixAndMeaning: [
      {
        suffix: "う",
        meaning: "勸誘",
      },
    ],
  },
];

export const ichidabVerbPaiSenRules = [
  {
    base: "KANOU",
    baseEnding: "ら",
    suffixAndMeaning: [
      {
        suffix: "れる",
        meaning: "",
      },
    ],
  },
  {
    base: "UKEMI",
    baseEnding: "ら",
    suffixAndMeaning: [
      {
        suffix: "れる",
        meaning: "與未然形同",
      },
    ],
  },
  {
    base: "SHIEKI",
    baseEnding: "さ",
    suffixAndMeaning: [
      {
        suffix: "せる",
        meaning: "與未然形同",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "れ",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "",
      },
    ],
  },
];
//
export const saVerbConjugationRules = [
  {
    base: "MIZEN",
    baseEnding: "し",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
    ],
  },
  {
    base: "RENYOU",
    baseEnding: "し",
    suffixAndMeaning: [
      {
        suffix: "ます",
        meaning: "禮貌",
      },
      {
        suffix: "て",
        meaning: "句子並列與接續",
      },
      {
        suffix: "た",
        meaning: "表達動作行為完結",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "する",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "習慣/未來",
      },
    ],
  },
  {
    base: "MEIREI",
    baseEnding: "しろ",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "命令",
      },
    ],
  },
  {
    base: "IKOU",
    baseEnding: "しよ",
    suffixAndMeaning: [
      {
        suffix: "う",
        meaning: "勸誘",
      },
    ],
  },
  {
    base: "KANOU",
    baseEnding: "",
    suffixAndMeaning: [
      {
        suffix: "できる",
        meaning: "",
      },
    ],
  },
  {
    base: "UKEMI",
    baseEnding: "さ",
    suffixAndMeaning: [
      {
        suffix: "れる",
        meaning: "",
      },
    ],
  },
  {
    base: "SHIEKI",
    baseEnding: "さ",
    suffixAndMeaning: [
      {
        suffix: "せる",
        meaning: "",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "すれ",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "",
      },
    ],
  },
];

export const kaVerbConjugationRules = [
  {
    base: "MIZEN",
    baseEnding: "こ",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
    ],
  },
  {
    base: "RENYOU",
    baseEnding: "き",
    suffixAndMeaning: [
      {
        suffix: "ます",
        meaning: "禮貌",
      },
      {
        suffix: "て",
        meaning: "句子並列與接續",
      },
      {
        suffix: "た",
        meaning: "表達動作行為完結",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "くる",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "習慣/未來",
      },
    ],
  },
  {
    base: "MEIREI",
    baseEnding: "こい",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "命令",
      },
    ],
  },
  {
    base: "IKOU",
    baseEnding: "こよ",
    suffixAndMeaning: [
      {
        suffix: "う",
        meaning: "勸誘",
      },
    ],
  },
  {
    base: "KANOU",
    baseEnding: "こ",
    suffixAndMeaning: [
      {
        suffix: "られる",
        meaning: "",
      },
    ],
  },
  {
    base: "UKEMI",
    baseEnding: "こ",
    suffixAndMeaning: [
      {
        suffix: "られる",
        meaning: "",
      },
    ],
  },
  {
    base: "SHIEKI",
    baseEnding: "こ",
    suffixAndMeaning: [
      {
        suffix: "させる",
        meaning: "",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "くれ",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "",
      },
    ],
  },
];

export const iAdjuctiveConjugationRules = [
  {
    base: "MIZEN",
    baseEnding: "く",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
    ],
  },
  {
    base: "RENYOUOUTSIDE",
    baseEnding: "く",
    suffixAndMeaning: [
      {
        suffix: "て",
        meaning: "句子並列與接續",
      },
    ],
  },
  {
    base: "RENYOUINSIDE",
    baseEnding: "かっ",
    suffixAndMeaning: [
      {
        suffix: "た",
        meaning: "描述過去的人事物",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "い",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "描述現在的人事物",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "けれ",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "",
      },
    ],
  },
];

export const naiAdjuctiveConjugationRules = [
  {
    base: "MIZEN",
    baseEnding: "く",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "雙重否定",
      },
    ],
  },
  {
    base: "RENYOUOUTSIDE",
    baseEnding: "く",
    suffixAndMeaning: [
      {
        suffix: "て",
        meaning: "否定前置詞後接續",
      },
    ],
  },
  {
    base: "RENYOUINSIDE",
    baseEnding: "かっ",
    suffixAndMeaning: [
      {
        suffix: "た",
        meaning: "過去否定",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "い",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "否定前置詞",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "けれ",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "否定條件",
      },
    ],
  },
];

export const baAuxiliaryVerbsRules = [
  {
    base: "MIZEN",
    baseEnding: "では",
    suffixAndMeaning: [
      {
        suffix: "ない",
        meaning: "否定",
      },
    ],
  },
  {
    base: "RENYOUOUTSIDE",
    baseEnding: "で",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "用於接續",
      },
    ],
  },
  {
    base: "RENYOUINSIDE",
    baseEnding: "だっ",
    suffixAndMeaning: [
      {
        suffix: "た",
        meaning: "描述過去的人事物",
      },
    ],
  },
  {
    base: "JISHO",
    baseEnding: "だ",
    suffixAndMeaning: [
      {
        suffix: "",
        meaning: "描述現在時態的人事物",
      },
    ],
  },
  {
    base: "RENTAI",
    baseEnding: "な",
    suffixAndMeaning: [
      {
        suffix: "被修飾\n的名詞",
        meaning: "修飾名詞\nex.好きな人",
      },
    ],
  },
  {
    base: "KATEI",
    baseEnding: "なら",
    suffixAndMeaning: [
      {
        suffix: "ば",
        meaning: "用於條件句",
      },
    ],
  },
];

export const convertedPos = [
  {
    title: "互轉有兩個層級",
    contents: [
      {
        subTitle: "語法性的轉換(規則固定、幾乎都能套)",
        subContents: [
          "屬於文法結構：只要符合句型就成立",
          "例如：動詞名詞化(～こと／～の)、形容詞副詞化(～く／～に)等",
        ],
        examples: ["行くこと", "行くの", "早く行く", "静かに話す"],
      },
      {
        subTitle: "詞彙性的派生(有規律但不保證每個詞都常用)",
        subContents: [
          "屬於詞彙慣用：形式上可推測，但『是否自然／是否常用』要看字典與慣用法",
        ],
        examples: ["働く→働き(常用)", "食べる→食べ(通常不作一般名詞用)"],
      },
    ],
  },

  {
    title: "動詞 → 名詞(規則固定)",
    contents: [
      {
        subTitle: "V(普通形)＋こと：把『動作／事情』名詞化",
        subContents: [
          "幾乎所有動詞都可用(規則非常穩)",
          "語感：偏抽象概念、習慣、事情、規則、能力等",
        ],
        examples: ["日本へ行くこと", "毎日運動すること", "働くことは大切だ"],
      },
      {
        subTitle: "V(普通形)＋の：名詞化(口語更常見)",
        subContents: [
          "規則穩定，常用於口語或較直接的表達",
          "語感：更像『那件事／那個行為』",
        ],
        examples: ["早く寝るのが好き", "料理するのは楽しい", "見るのをやめた"],
      },
      {
        subTitle:
          "V連用形(＝ます形去ます)→ 名詞(⚠️詞彙派生：常見但非必然)",
        subContents: [
          "形式：把動詞的連用形當作名詞使用(常見於五段動詞)",
          "是否能『單獨當名詞』與『常用程度』屬詞彙慣用(不是所有動詞都自然)",
          "最穩的名詞化仍是「V＋こと／の」；連用形名詞化屬語言習慣",
        ],
        examples: [
          "働く→働き(工作／作用)",
          "休む→休み(休假)",
          "動く→動き(動作／動向)",
          "話す→話し(多見於複合：話し合い)",
        ],
      },
      {
        subTitle: "V連用形＋方(かた)：做法／方式",
        subContents: [
          "規則固定、非常常用",
          "語意：『怎麼做』、『使用方法』、『走法』等",
        ],
        examples: ["読み方", "使い方", "行き方", "作り方"],
      },
      {
        subTitle:
          "V＋ところ：表示『正要／正在／剛做完』的時間點(形式名詞)",
        subContents: [
          "規則固定(但屬句型用法)",
          "三種常見：V辞書形＋ところだ(正要)、Vている＋ところだ(正在)、Vた＋ところだ(剛做完)",
          "Vたところだ帶有『就在剛剛』的感覺",
        ],
        examples: [
          "今から出かけるところだ",
          "いま食べているところだ",
          "帰ったところだ",
        ],
      },
    ],
  },

  {
    title: "名詞 → 動詞(規則固定 / 部分詞彙)",
    contents: [
      {
        subTitle: "名詞＋する：サ変動詞(規則固定、最重要)",
        subContents: [
          "名詞＋する → 動詞(規則穩、常見)",
          "學習上：看到『〜する』幾乎可直接判定為動詞(サ変)",
        ],
        examples: ["勉強する", "電話する", "運動する", "確認する", "説明する"],
      },
      {
        subTitle: "名詞/外來語＋る：口語造語 → 五段動詞(⚠️詞彙派生)",
        subContents: [
          "現象正確，但不是文法規則：不能看見名詞就亂加『る』",
          "多見於口語、新語、網路用語，是否自然要看慣用",
        ],
        examples: ["サボる", "ググる", "メモる", "パクる"],
      },
    ],
  },

  {
    title: "い形容詞 ↔ 副詞 / 名詞 / 動詞化",
    contents: [
      {
        subTitle: "い形容詞 → 副詞：〜く(規則固定)",
        subContents: [
          "語法規則：去い＋く",
          "用途：修飾動詞／表變化(〜くなる／〜くする)等",
        ],
        examples: ["早い→早く行く", "高い→高くなる", "おいしい→おいしく食べる"],
      },
      {
        subTitle: "い形容詞 → 名詞：〜さ(高生產力，幾乎可用)",
        subContents: [
          "語意：程度、性質的『程度量』",
          "非常常用(但仍屬派生後綴)",
        ],
        examples: ["高い→高さ", "強い→強さ", "うれしい→うれしさ"],
      },
      {
        subTitle:
          "い形容詞 → 名詞：〜み(⚠️有限定：常見於感受/味道/深度等)",
        subContents: [
          "不是每個い形容詞都能自然用〜み",
          "常見語意：味道、手感、深度、體感的『那種感覺』",
          "熟讀常見詞即可，不建議亂套用",
        ],
        examples: ["苦い→苦み", "甘い→甘み", "深い→深み"],
      },
      {
        subTitle: "い形容詞 → 動詞：〜がる(⚠️限定：情感/感覺/欲求)",
        subContents: [
          "主要用在『第三者看起來…／表現出…』的樣子",
          "限定類型：欲求(ほしい)、情緒(うれしい)、恐懼(こわい)等",
          "不是所有い形容詞都能＋がる",
        ],
        examples: ["ほしい→ほしがる", "うれしい→うれしがる", "こわい→こわがる"],
      },
    ],
  },

  {
    title: "な形容詞 ↔ 副詞 / 名詞化",
    contents: [
      {
        subTitle: "な形容詞 → 副詞：〜に(規則固定)",
        subContents: ["語法規則：な形容詞＋に", "用途：修飾動詞(怎麼做)"],
        examples: [
          "静かだ→静かに話す",
          "便利だ→便利に使う",
          "上手だ→上手にできる",
        ],
      },
      {
        subTitle: "な形容詞 → 名詞：〜さ(常見)",
        subContents: [
          "語意：性質/程度的名詞化",
          "常用但仍屬派生",
        ],
        examples: ["便利だ→便利さ", "大切だ→大切さ", "静かだ→静かさ"],
      },
      {
        subTitle: "名詞類語幹 → な形容詞用法(⚠️詞彙成立才行)",
        subContents: [
          "很多な形容詞本質上是名詞/漢語詞，能用『〜な』修飾名詞",
          "不是所有名詞都能變成『〜な』：是否成立看詞彙慣用",
          "像『安全・健康・可能』這類偏抽象/狀態的漢語詞很常可用『〜な』",
        ],
        examples: ["安全→安全な場所", "健康→健康な生活", "可能→可能な範囲"],
      },
    ],
  },

  {
    title: "名詞 ↔ 形容詞(常見後綴與結構)",
    contents: [
      {
        subTitle: "名詞＋的(てき)→ な形容詞(常用)",
        subContents: [
          "生產力高，常用於漢語詞",
          "形式：〜的だ／〜的な＋名詞／〜的に＋動詞",
        ],
        examples: ["科学→科学的", "一般→一般的", "具体→具体的"],
      },
      {
        subTitle:
          "5-2) 名詞＋らしい／っぽい：像…／有…感(⚠️語感差異、接法不只名詞)",
        subContents: [
          "らしい：更偏『符合其本質、很像那個身份』，常接名詞(子供らしい)",
          "っぽい：更偏『有那種感覺/傾向』(口語感更強，也可帶貶義)",
          "っぽい不只接名詞，也常接形容詞語幹(白っぽい)等，屬派生接尾語",
        ],
        examples: ["子供らしい", "大人っぽい", "安っぽい", "白っぽい"],
      },
      {
        subTitle: "5-3) 名詞＋の：名詞修飾名詞(規則固定，但不是把名詞變形容詞)",
        subContents: [
          "助詞『の』讓前面名詞成為後面名詞的修飾語",
          "屬於『連體修飾』而不是『名詞變形容詞』",
        ],
        examples: ["日本の文化", "私の本", "会社のルール"],
      },
    ],
  },

  {
    title: "名詞 / 語幹 → 副詞 (部分規則固定 / 多為慣用搭配)",
    contents: [
      {
        subTitle: "時間名詞直接當副詞用(規則非常穩)",
        subContents: [
          "今日／明日／毎日／先週 等時間名詞常直接修飾動詞",
          "學習上可當作『副詞功能的名詞』來理解",
        ],
        examples: ["今日行きます", "明日働きます", "毎日勉強します"],
      },
      {
        subTitle:
          "6-2) 名詞/な形容詞語幹＋に → 副詞用法(⚠️常見但不等於可任意套用)",
        subContents: [
          "語意常見：時間點、順序、方式、狀態",
          "『最後に』『一緒に』：名詞＋に(常見且穩)",
          "『急に』：多作『急だ(な形容詞)→ 急に』的副詞用法",
          "『直ちに』：屬慣用副詞搭配，不能當成『所有名詞都能＋に』的規則",
        ],
        examples: ["最後に", "一緒に", "急に", "直ちに"],
      },
    ],
  },

  {
    title: "總結：固定規則 vs 要查慣用』",
    contents: [
      {
        subTitle: "固定規則(幾乎所有詞都能套用)",
        subContents: [
          "V普通形＋こと／の(動詞名詞化)",
          "い形容詞→副詞：〜く",
          "な形容詞→副詞：〜に",
          "名詞＋する(サ変動詞)",
          "V連用形＋方(かた)",
          "V＋ところ(句型：正要/正在/剛)",
        ],
        examples: [
          "行くこと",
          "行くの",
          "早く行く",
          "静かに話す",
          "勉強する",
          "読み方",
        ],
      },
      {
        subTitle: "要查慣用(形式可推，但不保證常用/可逆)",
        subContents: [
          "V連用形→名詞(働き、休み等)",
          "〜み 名詞化(苦み、深み等)",
          "名詞＋る(口語造語：ググる等)",
          "〜がる(情感/感覺限定)",
          "名詞→な形容詞(安全な 等，非所有名詞都可)",
          "名詞/語幹＋に的副詞(尤其是慣用搭配)",
        ],
        examples: [
          "働き(常用)",
          "苦み(常用)",
          "ググる(口語)",
          "ほしがる(限定)",
          "直ちに(慣用)",
        ],
      },
    ],
  },
];
