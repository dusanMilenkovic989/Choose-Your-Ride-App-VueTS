import { watch, type Reactive } from 'vue'
import { useFetch } from './useFetch'

/**
 * An object containing raw information fetched from an API.
*/
interface SerializedData
{
    [key: string]: string | number
}

/**
 * Dropdown collection of values.
 */
type DropdownValuesCollection = (string | number)[]

/**
 * An object containing information about the dropdown.
 */
interface Dropdown
{
    id: number
    selectSubject: string
    collection: DropdownValuesCollection
    value: string
}

/**
 * Dropdown's id and subject to which collection of its values adhere to.
 */
type DropdownInfo = { id: number, selectSubject: string }

/**
 * Composable tasked with adding a new dropdown and populating it with information.
 * @param {Reactive<Dropdown[]>} dropdowns Collection of existing dropdowns.
 * @param {DropdownInfo} dropdownInfo Dropdown's id and subject.
 * @param {string} endpoint Dropdown's information API endpoint.
 * @param {function} deserialize Deserialize data fetched callback function.
 * @return {void} No return value.
 */
const useAddDropdown = <T extends SerializedData, K extends keyof T>(
    dropdowns: Reactive<Dropdown[]>, 
    { id, selectSubject }: DropdownInfo,
    endpoint: string,
    deserialize: (obj: T) => T[K]
): void =>
{
    dropdowns.push(
    { 
        id,
        selectSubject,
        collection: [],
        value: ''
    })

    const { data: DATA, loading: LOADING } = useFetch<T[]>(endpoint)

    if (!LOADING)
    {
        dropdowns[id - 1].collection = DATA.value!.map(deserialize)

        return
    }

    watch(DATA, (newValue: null | T[]): void =>
    {
        if (newValue)
        {
            dropdowns[id - 1].collection = newValue.map(deserialize)
        }
    })
}

export { useAddDropdown }
export type { DropdownValuesCollection, Dropdown }