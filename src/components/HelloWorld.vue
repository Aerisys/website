<script setup>
import { ref } from 'vue'
import { motion } from "motion-v"

defineProps({
  msg: String,
})

const count = ref(0)
</script>

<template>
    <Motion tag="div" class="box" />
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
