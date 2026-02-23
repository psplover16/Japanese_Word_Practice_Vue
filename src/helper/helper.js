// 僅支援 0~9999
export function numToZh(num) {
  if (num === 0) return "零";

  const digits = ["零","一","二","三","四","五","六","七","八","九"];
  const units = ["","十","百","千"];

  let str = "";
  let numStr = num.toString();
  let len = numStr.length;

  for (let i = 0; i < len; i++) {
    let n = Number(numStr[i]);
    let unitIndex = len - i - 1;

    if (n === 0) {
      if (!str.endsWith("零") && i !== len - 1) {
        str += "零";
      }
    } else {
      str += digits[n] + units[unitIndex];
    }
  }

  // 修正 一十 → 十
  str = str.replace(/^一十/, "十");

  // 移除結尾零
  str = str.replace(/零$/, "");

  return str;
}