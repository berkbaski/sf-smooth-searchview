export type ContentOffsetType = {
    x: number,
    y: number
};

export type TranslationType = {
    x: number,
    y: number
}

export type OnScrollType = {
    contentOffset: ContentOffsetType,
    translation: TranslationType
}