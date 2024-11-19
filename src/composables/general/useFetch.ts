import { type Ref, ref } from 'vue'
import { HTTP_HEADERS, HTTP_METHODS, WARNING_MESSAGES } from '@/utilities/constants'

/**
 * An object containing reactive information about data fetched or error encountered.
 * @template T Data expected to be fetched.
 */
interface UseFetchData<T>
{
    data: Ref<null | T>
    loading: boolean
    error: Ref<null | unknown>
}

/**
 * Simple Request Memoization hash table
 */
let cache : { [key: string]: any } = {}

/**
 * Simple cache revalidation - time triggered
 */
setTimeout((): void => void (cache = {}), 2.628e+9)

/**
 * Composable tasked with fetching a resource.
 * @param {string} url URL on which the resource resides.
 * @param {RequestInit} requestSetup Additional request configuration.
 * @template T Data expected to be fetched.
 * @returns {UseFetchData} Returns an object containing reactive information, which will be updated on completion or failure of asynchronous operations.
 */
const useFetch = <T>(
    url: string, 
    requestSetup: RequestInit = { 
        method: HTTP_METHODS.get, 
        headers: HTTP_HEADERS.contentApplicationJson,
        mode: 'cors'
    }
): UseFetchData<T> =>
{
    const DATA: Ref<null | T> = ref(null)
    const ERROR: Ref<null | unknown> = ref(null)
    // No need for reactivity overhead; loading will be tracked just in one case; if it becomes necessary to track it asynchronously, wrap it inside a reactivity function
    let loading = false     
    const CACHE_KEY = url + JSON.stringify(requestSetup)

    if (cache[CACHE_KEY])
    {   
        DATA.value = cache[CACHE_KEY] as T
    }
    else
    {
        loading = true

        ;(async (): Promise<void> =>
        {
            try
            {
                const RESPONSE = await fetch(url, requestSetup)
    
                if (RESPONSE.ok)
                {
                    const FETCHED_DATA = await RESPONSE.json()
                    DATA.value = FETCHED_DATA
                    cache[CACHE_KEY] = FETCHED_DATA
                }
                else
                {
                    console.warn(WARNING_MESSAGES.buildFetchUnsuccessful(RESPONSE.status))
                }

                loading = false
            }
            catch (e: unknown)
            {
                if (e instanceof Error)
                {
                    console.warn(e.message)
                }
    
                loading = false
                ERROR.value = e
            }
        })()
    }

    return { data: DATA, loading, error: ERROR }
}

export { useFetch }