<script setup lang="ts">
    import { reactive } from 'vue'
    import Dropdown from './general/Dropdown.vue'
    import { useUpdateVehicleDropdowns, type DropdownUpdates } from '@/composables/dropdowns/useUpdateVehicleDropdowns'
    import type { Dropdown as DropdownInterface } from '@/composables/general/useAddDropdown'

    const DROPDOWNS = reactive<DropdownInterface[]>([])
    useUpdateVehicleDropdowns(DROPDOWNS)

    const updateDropdowns = (updates: DropdownUpdates): void =>
    {
        useUpdateVehicleDropdowns(DROPDOWNS, updates)
    }
</script>

<template>
    <div class="container">
        <h2 class="fs-3 text fw-lighter mt-5">Welcome</h2>
        <div class="d-flex justify-content-center vh-100">
            <div class="dropdown-container">
                <h3 class="fs-1 text fw-light mt-4 mb-3">What's your favourite ride</h3>
                <div>
                    <Dropdown 
                        v-for="DROPDOWN, INDEX of DROPDOWNS"
                        :id="INDEX + 1"
                        :select-subject="DROPDOWN.selectSubject" 
                        :collection="DROPDOWN.collection" 
                        :key="INDEX"
                        @value-changed="updateDropdowns"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .dropdown-container {
        min-width: 35%;
    }
</style>
