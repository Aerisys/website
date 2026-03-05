<script setup>
import {teamMembers} from '@/data/team.js'
import SectionTitle from '@/components/ui/SectionTitle.vue'
import TeamCard from '@/components/ui/TeamCard.vue'
</script>

<template>
    <section id="equipe" class="section-padding bg-white">
        <div class="container-custom">
            <SectionTitle label="L'ÉQUIPE"
                          title="Les talents derrière"
                          highlight=" Aerisys"
                          :centered="true"/>
            <div class="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                <TeamCard v-for="member in teamMembers"
                          :key="member.id"
                          :member="member"/>
            </div>
        </div>
    </section>
</template>
