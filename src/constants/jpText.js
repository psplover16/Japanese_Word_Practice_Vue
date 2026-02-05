export const letters = [
  {
    rowLabel: { jp: "あ段", romanization: "a" },
    cells: [
      { romanization: "a", hiragana: "あ", katakana: "ア" },
      { romanization: "i", hiragana: "い", katakana: "イ" },
      { romanization: "u", hiragana: "う", katakana: "ウ" },
      { romanization: "e", hiragana: "え", katakana: "エ" },
      { romanization: "o", hiragana: "お", katakana: "オ" },
    ],
  },
  {
    rowLabel: { jp: "か行", romanization: "k" },
    cells: [
      { romanization: "ka", hiragana: "か", katakana: "カ" },
      { romanization: "ki", hiragana: "き", katakana: "キ" },
      { romanization: "ku", hiragana: "く", katakana: "ク" },
      { romanization: "ke", hiragana: "け", katakana: "ケ" },
      { romanization: "ko", hiragana: "こ", katakana: "コ" },
    ],
  },
  {
    rowLabel: { jp: "さ行", romanization: "s" },
    cells: [
      { romanization: "sa", hiragana: "さ", katakana: "サ" },
      { romanization: "shi", hiragana: "し", katakana: "シ" },
      { romanization: "su", hiragana: "す", katakana: "ス" },
      { romanization: "se", hiragana: "せ", katakana: "セ" },
      { romanization: "so", hiragana: "そ", katakana: "ソ" },
    ],
  },
  {
    rowLabel: { jp: "た行", romanization: "t" },
    cells: [
      { romanization: "ta", hiragana: "た", katakana: "タ" },
      { romanization: "chi", hiragana: "ち", katakana: "チ" },
      { romanization: "tsu", hiragana: "つ", katakana: "ツ" },
      { romanization: "te", hiragana: "て", katakana: "テ" },
      { romanization: "to", hiragana: "と", katakana: "ト" },
    ],
  },
  {
    rowLabel: { jp: "な行", romanization: "n" },
    cells: [
      { romanization: "na", hiragana: "な", katakana: "ナ" },
      { romanization: "ni", hiragana: "に", katakana: "ニ" },
      { romanization: "nu", hiragana: "ぬ", katakana: "ヌ" },
      { romanization: "ne", hiragana: "ね", katakana: "ネ" },
      { romanization: "no", hiragana: "の", katakana: "ノ" },
    ],
  },
  {
    rowLabel: { jp: "は行", romanization: "h" },
    cells: [
      { romanization: "ha", hiragana: "は", katakana: "ハ" },
      { romanization: "hi", hiragana: "ひ", katakana: "ヒ" },
      { romanization: "fu", hiragana: "ふ", katakana: "フ" },
      { romanization: "he", hiragana: "へ", katakana: "ヘ" },
      { romanization: "ho", hiragana: "ほ", katakana: "ホ" },
    ],
  },
  {
    rowLabel: { jp: "ま行", romanization: "m" },
    cells: [
      { romanization: "ma", hiragana: "ま", katakana: "マ" },
      { romanization: "mi", hiragana: "み", katakana: "ミ" },
      { romanization: "mu", hiragana: "む", katakana: "ム" },
      { romanization: "me", hiragana: "め", katakana: "メ" },
      { romanization: "mo", hiragana: "も", katakana: "モ" },
    ],
  },
  {
    rowLabel: { jp: "や行", romanization: "y" },
    cells: [
      { romanization: "ya", hiragana: "や", katakana: "ヤ" },
      null,
      { romanization: "yu", hiragana: "ゆ", katakana: "ユ" },
      null,
      { romanization: "yo", hiragana: "よ", katakana: "ヨ" },
    ],
  },
  {
    rowLabel: { jp: "ら行", romanization: "r" },
    cells: [
      { romanization: "ra", hiragana: "ら", katakana: "ラ" },
      { romanization: "ri", hiragana: "り", katakana: "リ" },
      { romanization: "ru", hiragana: "る", katakana: "ル" },
      { romanization: "re", hiragana: "れ", katakana: "レ" },
      { romanization: "ro", hiragana: "ろ", katakana: "ロ" },
    ],
  },
  {
    rowLabel: { jp: "わ行", romanization: "w" },
    cells: [
      { romanization: "wa", hiragana: "わ", katakana: "ワ" },
      { romanization: "wi", hiragana: "ゐ", katakana: "ヰ" },
      null,
      { romanization: "we", hiragana: "ゑ", katakana: "ヱ" },
      { romanization: "wo", hiragana: "を", katakana: "ヲ" },
    ],
  },
  {
    rowLabel: { jp: "ん", romanization: "n" },
    cells: [
      { romanization: "n", hiragana: "ん", katakana: "ン" },
      null,
      null,
      null,
      null,
    ],
  },
];

export const dakutenMap = [
  // 濁音
  [
    { base: "ka", hiragana: "が", katakana: "ガ", romanization: "ga" },
    { base: "ki", hiragana: "ぎ", katakana: "ギ", romanization: "gi" },
    { base: "ku", hiragana: "ぐ", katakana: "グ", romanization: "gu" },
    { base: "ke", hiragana: "げ", katakana: "ゲ", romanization: "ge" },
    { base: "ko", hiragana: "ご", katakana: "ゴ", romanization: "go" },
  ],
  [
    { base: "sa", hiragana: "ざ", katakana: "ザ", romanization: "za" },
    { base: "shi", hiragana: "じ", katakana: "ジ", romanization: "ji" },
    { base: "su", hiragana: "ず", katakana: "ズ", romanization: "zu" },
    { base: "se", hiragana: "ぜ", katakana: "ゼ", romanization: "ze" },
    { base: "so", hiragana: "ぞ", katakana: "ゾ", romanization: "zo" },
  ],
  [
    { base: "ta", hiragana: "だ", katakana: "ダ", romanization: "da" },
    { base: "chi", hiragana: "ぢ", katakana: "ヂ", romanization: "ji" },
    { base: "tsu", hiragana: "づ", katakana: "ヅ", romanization: "zu" },
    { base: "te", hiragana: "で", katakana: "デ", romanization: "de" },
    { base: "to", hiragana: "ど", katakana: "ド", romanization: "do" },
  ],
  [
    { base: "ha", hiragana: "ば", katakana: "バ", romanization: "ba" },
    { base: "hi", hiragana: "び", katakana: "ビ", romanization: "bi" },
    { base: "fu", hiragana: "ぶ", katakana: "ブ", romanization: "bu" },
    { base: "he", hiragana: "べ", katakana: "ベ", romanization: "be" },
    { base: "ho", hiragana: "ぼ", katakana: "ボ", romanization: "bo" },
  ],

  [
    // 半濁音
    { base: "ha", hiragana: "ぱ", katakana: "パ", romanization: "pa" },
    { base: "hi", hiragana: "ぴ", katakana: "ピ", romanization: "pi" },
    { base: "fu", hiragana: "ぷ", katakana: "プ", romanization: "pu" },
    { base: "he", hiragana: "ぺ", katakana: "ペ", romanization: "pe" },
    { base: "ho", hiragana: "ぽ", katakana: "ポ", romanization: "po" },
  ],
];

export const sokuon = {
  hiragana: "っ",
  katakana: "ッ",
  romanization: "促音",
  rule: "後接 k/s/t/p 行，發音停頓/加強",
};

export const youon = [
  {
    base: "清音拗音",
    note: "い段假名 ＋ 小ゃ／小ゅ／小ょ\n發音縮合成一拍",
    basicSoundCombinations: {
      hiragana: ["き", "し", "ち", "に", "ひ", "み", "り"],
      katakana: ["キ", "シ", "チ", "ニ", "ヒ", "ミ", "リ"],
      romanization: ["ki", "shi", "chi", "ni", "hi", "mi", "ri"],
    },
    data: [
      { hiragana: "ゃ", katakana: "ャ", romanization: "ya" },
      { hiragana: "ゅ", katakana: "ュ", romanization: "yu" },
      { hiragana: "ょ", katakana: "ョ", romanization: "yo" },
    ],
  },
  {
    base: "合拗音",
    note: "拗音的濁音／半濁音版本\n現代日文裡很少「ぢゃ / ぢゅ / ぢょ」",
    basicSoundCombinations: {
      hiragana: ["ぎ", "じ", "ぢ", "び", "ぴ"],
      katakana: ["ギ", "ジ", "ヂ", "ビ", "ピ"],
      romanization: ["gi", "ji", "ji", "bi", "pi"],
    },
    data: [
      { hiragana: "ゃ", katakana: "ャ", romanization: "ya" },
      { hiragana: "ゅ", katakana: "ュ", romanization: "yu" },
      { hiragana: "ょ", katakana: "ョ", romanization: "yo" },
    ],
  },
  //
  {
    base: "長音符",
    note: "把「前一個母音」拉長一拍來念\n通常用於外來語",
    basicSoundCombinations: {
      hiragana: [],
      katakana: [],
      romanization: [],
    },
    data: [
      {
        hiragana: "ー",
        katakana: "",
        romanization: "",
      },
    ],
  },
];
