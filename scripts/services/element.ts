import { ElementType } from './types/elements'

const dummyData: ElementType[] = [];

export function generateDummyData(): void {
    for (let i = 1; i <= 100; i++) {
        dummyData.push({ id: i, key: `Element${i}`, value: `Element${i} Value` });
    }
}

export function getAll(): ElementType[] {
    return dummyData;
}