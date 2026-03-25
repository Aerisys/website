<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom max-w-3xl">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 class="text-3xl font-display font-bold text-gray-900 mb-8">Mentions légales</h1>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Éditeur du site</h2>
          <p class="text-gray-600 leading-relaxed">
            Le site <strong>Aerisys</strong> est un projet réalisé dans le cadre d'un cursus à
            <strong>Ynov Campus</strong>.<br />
            Responsable de la publication : équipe projet Aerisys.<br />
            Contact : <a href="mailto:contact@aerisys.fr" class="text-primary-600 hover:underline">contact@aerisys.fr</a>
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Hébergement</h2>
          <p class="text-gray-600 leading-relaxed">
            Ce site est hébergé sur un CDN privé sous le domaine <strong>aerisys.fr</strong> (cdn.aerisys.fr).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Propriété intellectuelle</h2>
          <p class="text-gray-600 leading-relaxed">
            L'ensemble des contenus présents sur le site Aerisys (textes, images, logos, vidéos,
            éléments graphiques) sont protégés par le droit de la propriété intellectuelle.
            Toute reproduction, représentation ou diffusion, en tout ou partie, du contenu de ce
            site sans autorisation préalable est interdite.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Données personnelles</h2>
          <p class="text-gray-600 leading-relaxed">
            Pour toute information relative à la collecte et au traitement de vos données
            personnelles, veuillez consulter notre
            <RouterLink to="/politique-confidentialite" class="text-primary-600 hover:underline">
              politique de confidentialité</RouterLink>.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
