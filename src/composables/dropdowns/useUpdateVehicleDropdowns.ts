import type { Reactive } from 'vue'
import { useAddDropdown, type Dropdown } from '../general/useAddDropdown'
import { API_ENDPOINTS, VEHICLE_DROPDOWNS_SUBJECTS, VEHICLE_DROPDOWNS_DESCRIPTIONS, WARNING_MESSAGES } from '@/utilities/constants'

/**
 * An object containing information about a dropdown on its value change event emit.
 */
interface DropdownUpdates
{
    id: number,
    value: string
}

/**
 * Composable tasked with updating the DOM vehicle dropdowns.
 * 
 * When called immediatelly sets up a first dropdown.
 * 
 * Depending on the numbers of the existing dropdowns of the same type and their values, adds or removes extra dropdowns.
 * 
 * @param {Reactive<Dropdown[]>} dropdowns Collection of the existing dropdowns.
 * @param {DropdownUpdates} updates Updated dropdown information.
 * @returns {void} No return value.
 */
const useUpdateVehicleDropdowns = (dropdowns: Reactive<Dropdown[]>, updates?: DropdownUpdates): void =>
{
    if (dropdowns.length && !updates)
    {
        console.warn(WARNING_MESSAGES.buildUseUpdateVehiclesDropdownsIncorrectUsage())

        return 
    }

    switch(dropdowns.length)
    {
        case 0:
            useAddDropdown<{ year: number }, typeof VEHICLE_DROPDOWNS_SUBJECTS.year>(
                dropdowns, 
                { id: 1, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.year },
                API_ENDPOINTS.buildYearsEndpoint(),
                ({ year }) => year
            )
    
            return
        case 1:
            dropdowns[0].value = updates!.value
            useAddDropdown<{ make: string }, typeof VEHICLE_DROPDOWNS_SUBJECTS.make>(
                dropdowns, 
                { id: 2, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.make },
                API_ENDPOINTS.buildMakesEndpoint(dropdowns[0].value),
                ({ make }) => make
            )

            return
        case 2:
            if (updates!.id === 2)
            {
                dropdowns[1].value = updates!.value
                useAddDropdown<{ model: string }, typeof VEHICLE_DROPDOWNS_SUBJECTS.model>(
                    dropdowns, 
                    { id: 3, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.model },
                    API_ENDPOINTS.buildModelsEndpoint(dropdowns[0].value, dropdowns[1].value),
                    ({ model }) => model
                )   
            }
            else if (updates!.id === 1)
            {
                dropdowns.pop()
    
                if (updates!.value === 'default')
                {
                    return
                }
    
                dropdowns[0].value = updates!.value
                useAddDropdown<{ make: string }, typeof VEHICLE_DROPDOWNS_SUBJECTS.make>(
                    dropdowns, 
                    { id: 2, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.make },
                    API_ENDPOINTS.buildMakesEndpoint(dropdowns[0].value),
                    ({ make }) => make
                )
            }

            return
        case 3:
            if (updates!.id === 2)
            {
                dropdowns.pop()
    
                if (updates!.value === 'default')
                {
                    return
                }
    
                dropdowns[1].value = updates!.value
                useAddDropdown<{ model: string }, typeof VEHICLE_DROPDOWNS_SUBJECTS.model>(
                    dropdowns, 
                    { id: 3, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.model },
                    API_ENDPOINTS.buildModelsEndpoint(dropdowns[0].value, dropdowns[1].value),
                    ({ model }) => model
                )
            }
            else if (updates!.id === 1)
            {
                dropdowns.splice(1, 2)
    
                if (updates!.value === 'default')
                {
                    return
                }
    
                dropdowns[0].value = updates!.value
                useAddDropdown<{ make: string }, typeof VEHICLE_DROPDOWNS_SUBJECTS.make>(
                    dropdowns, 
                    { id: 2, selectSubject: VEHICLE_DROPDOWNS_DESCRIPTIONS.make },
                    API_ENDPOINTS.buildMakesEndpoint(dropdowns[0].value),
                    ({ make }) => make
                )
            }

            return
        default:
            return
    }
}

export { useUpdateVehicleDropdowns, type DropdownUpdates }