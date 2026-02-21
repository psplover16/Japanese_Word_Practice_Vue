import { verbsType } from "@/constants/changeRules.js";
import { letters } from "@/constants/jpText.js";
export function useVerbsData() {

    const changeGrammarParts = (baseStr) => {
        return verbsType[baseStr] || baseStr;
    }

    const dataTotalLength = ((compareData, targetKey) => {
        let totalLength = 0;
        compareData.forEach((godanVerb) => {
            const length = godanVerb?.[targetKey]?.length || 0;
            totalLength += length;
        });
        return totalLength;
    });

    const targetLettersMotherVoiceGroup = (targerChar) => {
        return letters.find((letter) => {
            return letter.cells?.some((cell) => cell?.hiragana === targerChar);
        })?.cells || [];
    }

    const paisenRules = (originalChar, type) => {
        const motherGroup = targetLettersMotherVoiceGroup(originalChar);
        if (type === "KANOU") {
            return motherGroup[3].hiragana;
        }
        if (type === "UKEMI") {
            return motherGroup[0].hiragana;
        }
        if (type === "SHIEKI") {
            return motherGroup[0].hiragana;
        }
        if (type === "KATEI") {
            return motherGroup[3].hiragana;
        }
    }

    return {
        changeGrammarParts,
        dataTotalLength,
        paisenRules,
        targetLettersMotherVoiceGroup
    }
}