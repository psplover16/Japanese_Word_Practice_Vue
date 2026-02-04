// 洗牌陣列（Fisher-Yates 演算法）
export function shuffleInPlace(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
export function shuffled(arr) {
    return shuffleInPlace([...arr]);
}