import { ElementType } from './types/elements'

const dummyData: ElementType[] = [
    { id: 1, key: 'Element1', value: 'Element1 Value' },
    { id: 2, key: 'Element2', value: 'Element2 Value' },
    { id: 3, key: 'Element3', value: 'Element3 Value' },
    { id: 4, key: 'Element4', value: 'Element4 Value' },
    { id: 5, key: 'Element5', value: 'Element5 Value' }
];

export function getAll(): ElementType[] {
    return dummyData;
}