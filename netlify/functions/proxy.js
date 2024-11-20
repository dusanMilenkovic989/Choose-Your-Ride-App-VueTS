const handler = async (event) => 
{
    const { path: PATH, rawQuery: RAW_QUERY, httpMethod: HTTP_METHOD, headers: HEADERS, body: BODY } = event
    const TARGET_PATH = PATH.replace('/.netlify/functions/proxy', '').replace('/api', '')
    const TARGET_URL = `https://rateengine.ship.cars/v2/vehicles${TARGET_PATH}?${RAW_QUERY || ''}`
    const ERROR = {
        fetchMessages: {
            fetchUnsuccessful: 'Unexpected fetch response',
            fetchNotExecuted: 'Fetch could not be executed at this time',
        },
        data: 'No data',
        emptyMessage: 'No message',
        proxyStatus: 500
    }
    
    try 
    {
        const FETCH_OPTIONS = {
            method: HTTP_METHOD,
            headers: { ...HEADERS },
            body: HTTP_METHOD !== 'GET' ? BODY : null
        }
        const RESPONSE = await fetch(TARGET_URL, FETCH_OPTIONS)
        let data = ERROR.data
        
        if (RESPONSE.ok)
        {
            data = await RESPONSE.json()
        }
        else
        {
            console.error(ERROR.fetchMessages.fetchUnsuccessful)
        }

        return {
            statusCode: RESPONSE.status,
            body: JSON.stringify(data)
        }
    } 
    catch (error) 
    {
        console.error(`${ERROR.fetchMessages.fetchNotExecuted}: `, error)

        return {
            statusCode: ERROR.proxyStatus,
            body: JSON.stringify({ error: ERROR.fetchMessages.fetchNotExecuted, message: error?.message || ERROR.emptyMessage }),
        }
    }
}

export { handler }