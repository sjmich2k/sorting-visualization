
interface Array {
    size: number,
    get: (i: number) => Promise<number>,
    set: (i: number, v: number) => Promise<void>,
    swap: (i: number, j: number) => Promise<void>
}

export default async function insertionSort(array: Array) {
    const n = array.size
    const get = array.get
    const swap = array.swap

    for (let i = 1; i < n; i++) {
        let j = i

        let v1 = await get(j)
        let v2 = await get(j - 1)

        while (j > 0 && v1 < v2) {
            await swap(j, j - 1)
            j--
            v1 = await get(j)
            v2 = await get(j - 1)
        }
    }
}