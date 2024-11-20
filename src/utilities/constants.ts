/**
 * Dropdowns information API token
 */
const API_TOKEN: string = import.meta.env.VITE_API_TOKEN

/**
 * Read-only collection of paths used by the Vue router and possibly accross the app
 */
const CLIENT_PATHS = {
    index: '/',
    dashboard: '/dashboard',
    about: '/about'
} as const

/**
 * Read-only collection of router path names, used by templates for dynamical path access
 */
const ROUTE_NAMES = {
    index: 'index',
    dashboard: 'dashboard',
    about: 'about'
} as const

/**
 * Read-only collection of HTTP protocol methods, used for fetching resources
*/
const HTTP_METHODS = {
    post: 'POST',
    get: 'GET',
    patch: 'PATCH',
    delete: 'DELETE'
} as const

/**
 * Read-only collection of HTTP protocol headers, used for additional request configuration
*/
const HTTP_HEADERS = {
    contentApplicationJson: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json' 
    }
} as const

/**
 * Read-only collection of API endpoints used for getting the information for the dropdowns accross the app
 */
const API_ENDPOINTS = {
    buildYearsEndpoint: (): string => `api/years/?token=${API_TOKEN}`,
    buildMakesEndpoint: (year: string): string => `api/makes/?year=${year}&token=${API_TOKEN}`,
    buildModelsEndpoint: (year: string, make: string): string => `api/models/?year=${year}&make=${make}&token=${API_TOKEN}`,
} as const

/**
 * Read-only collection of dropdown parent event emits
 */
const DROPDOWN_EMIT_EVENTS = {
    valueChanged: 'value-changed'
} as const

/**
 * Read-only collection of available Vehicle dropdowns subjects
 */
const VEHICLE_DROPDOWNS_SUBJECTS = {
    year: 'year',
    make: 'make',
    model: 'model'
} as const

/**
 * Read-only collection of desired Vehicle dropdowns titles
 */
 const VEHICLE_DROPDOWNS_DESCRIPTIONS = {
    year: 'It was made in',
    make: 'It was made by',
    model: 'Which one'
 } as const

/**
 * Read-only collection of warning and error messages to signal the developers what is going on (hence why details are included), used accross the app
 */
const WARNING_MESSAGES = {
    buildFetchUnsuccessful: (statusCode: number): string => `Recource could not be fetched at this time. Server responded with the code: ${statusCode}.`,
    buildUseUpdateVehiclesDropdownsIncorrectUsage: (): string => 'If there is more than one dropdown present, the updates object is required in order to parse the information.'
} as const
 
export { CLIENT_PATHS, ROUTE_NAMES, HTTP_METHODS, HTTP_HEADERS, API_ENDPOINTS, DROPDOWN_EMIT_EVENTS, VEHICLE_DROPDOWNS_SUBJECTS, VEHICLE_DROPDOWNS_DESCRIPTIONS, WARNING_MESSAGES }