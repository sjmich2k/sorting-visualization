import React from 'react'
import Array from './components/Array'
import useArray from './hooks/useArray'
import './App.css'

import selectionSort from './sorts/selection'
import insertionSort from './sorts/insertion'
import bubbleSort from './sorts/bubble'
import quickSort from './sorts/quick'
import heapSort from './sorts/heap'
import mergeSort from './sorts/merge'
import bogoSort from './sorts/bogo'
import yourSort from './sorts/your-sort'


export default function App() {
    const [n, setN] = React.useState(64)
    const [sort, setSort] = React.useState('quick')
    const [delay, setDelay] = React.useState(10)

    const array = useArray(n, delay)
    const sortArray = { size: array.size, get: array.get, set: array.set, swap: array.swap }

    const onStart = () => {
        array.resetStats()

        switch (sort) {
            case 'selection':
                selectionSort(sortArray); break
            case 'insertion':
                insertionSort(sortArray); break
            case 'bubble':
                bubbleSort(sortArray); break
            case 'quick':
                quickSort(sortArray); break
            case 'heap':
                heapSort(sortArray); break
            case 'merge':
                mergeSort(sortArray); break
            case 'bogo':
                bogoSort(sortArray); break
            case 'your-sort':
                yourSort(sortArray); break
        }
    }

    const StatsMemo = React.useMemo(() => (
        <div className='horizontal'>
            <p className='stats'>Array Access: { array.accessCount }</p>
            <p>&nbsp; | &nbsp;</p>
            <p className='stats'>Array Swaps: { array.swapCount }</p>
        </div>
    ), [array.accessCount, array.swapCount])

    const SizeMemo = React.useMemo(() => (
        <div id='size-select' className='horizontal'>
            <p id='n'>N = {n}</p>
            <input
                type='range' min={5} max={200} value={n}   // TODO - make max proportional to window width
                onChange={(e) => setN(parseInt(e.target.value))}
            />
        </div>
    ), [n])

    const SortMemo = React.useMemo(() => (
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value='selection'>Selection Sort</option>
            <option value='insertion'>Insertion Sort</option>
            <option value='bubble'>Bubble Sort</option>
            <option value='quick'>Quick Sort</option>
            <option value='heap'>Heap Sort</option>
            <option value='merge'>Merge Sort</option>
            <option value='bogo'>Bogo Sort</option>
            <option value='your-sort'>Your Sort</option>
        </select>
    ), [sort])

    const DelayMemo = React.useMemo(() => (
        <div id='set-delay' className='horizontal'>
            <p id='delay'>d = {delay}ms</p>
            <input
                type='range' min={1} max={50} value={delay}
                onChange={(e) => setDelay(parseInt(e.target.value))}
            />
        </div>
    ), [delay])

    return (
        <div className='App'>
            { StatsMemo }

            <Array array={array} />

            <div id='config' className='horizontal'>
                { SizeMemo }
                <button onClick={() => array.shuffle()}>Shuffle</button>
                <button onClick={onStart}>Start</button>
                { SortMemo }
                { DelayMemo }
            </div>
        </div>
    )
}
