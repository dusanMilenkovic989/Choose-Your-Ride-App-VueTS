<script setup lang="ts">
    import type { PropType } from 'vue'
    import { DROPDOWN_EMIT_EVENTS } from '@/utilities/constants'
    import type { DropdownUpdates } from '@/composables/dropdowns/useUpdateVehicleDropdowns'
    import type { DropdownValuesCollection } from '@/composables/general/useAddDropdown'

    const PROPS = defineProps({
        id: {
            type: Number,
            required: true
        },
        selectSubject: {
            type: String,
            required: true
        },
        collection: {
            type: Array as PropType<DropdownValuesCollection>,
            required: true
        }
    })

    const emit = defineEmits<{
        (e: typeof DROPDOWN_EMIT_EVENTS.valueChanged, { id, value }: DropdownUpdates): void
    }>()

    const handleSelectChange = (e: Event): void =>
    {
        const VALUE = (e.target as HTMLSelectElement).value

        if (VALUE)
        {
            emit(DROPDOWN_EMIT_EVENTS.valueChanged, { value: VALUE, id: PROPS.id })
        }
    }
</script>

<template>
    <select @change="handleSelectChange" class="form-select form-select-sm mb-3">
        <option value='default'>{{PROPS.selectSubject}}</option>
        <option 
            v-for="LABEL, INDEX of PROPS.collection" 
            :key="INDEX"
            :value="LABEL"
        >{{ LABEL }}</option>
    </select>
</template>

<style scoped></style>
