<script setup lang="ts"></script>

<template>
    <nav class="navbar navbar-expand-sm navbar-toggleable-sm navbar-light bg-white border-bottom box-shadow mb-3">
        <div class="container-fluid">
            <div class="navbar-collapse collapse d-sm-inline-flex justify-content-between">
                <ul class="navbar-nav flex-grow-1">
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'dashboard' }">Dashboard</router-link>
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link text-dark" :to="{ name: 'about' }">About</router-link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <router-view></router-view>
</template>

<style scoped></style>
