<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom max-w-3xl">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 class="text-3xl font-display font-bold text-gray-900 mb-8">Politique de confidentialité</h1>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Responsable du traitement</h2>
          <p class="text-gray-600 leading-relaxed">
            Le responsable du traitement des données personnelles est l'équipe projet
            <strong>Aerisys</strong> (projet Ynov Campus).<br />
            Contact : <a href="mailto:contact@aerisys.fr" class="text-primary-600 hover:underline">contact@aerisys.fr</a>
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Données collectées</h2>
          <p class="text-gray-600 leading-relaxed">
            Dans le cadre du traitement des commandes, les données suivantes sont collectées
            via notre prestataire de paiement <strong>Stripe</strong> :
          </p>
          <ul class="list-disc list-inside text-gray-600 mt-2 space-y-1">
            <li>Nom et prénom</li>
            <li>Adresse e-mail</li>
            <li>Adresse postale (adresse, code postal, ville)</li>
            <li>Informations de carte bancaire (traitées exclusivement par Stripe)</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Finalités du traitement</h2>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li>Traitement et suivi des commandes</li>
            <li>Livraison des produits commandés</li>
            <li>Gestion des paiements via Stripe</li>
            <li>Communication relative aux commandes (confirmation, suivi)</li>
          </ul>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Base légale</h2>
          <p class="text-gray-600 leading-relaxed">
            Le traitement de vos données repose sur l'exécution du contrat de vente
            (article 6.1.b du RGPD) ainsi que sur votre consentement explicite recueilli
            lors de la validation de commande (article 6.1.a du RGPD).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Durée de conservation</h2>
          <p class="text-gray-600 leading-relaxed">
            Les données relatives aux commandes sont conservées pendant la durée nécessaire
            à l'exécution du contrat, puis archivées conformément aux obligations légales
            en matière comptable et fiscale (10 ans maximum).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Sous-traitant : Stripe</h2>
          <p class="text-gray-600 leading-relaxed">
            Le traitement des paiements est assuré par <strong>Stripe Payments Europe, Ltd.</strong>,
            agissant en qualité de sous-traitant au sens du RGPD. Stripe est certifié PCI DSS
            Niveau 1 et traite les données de carte bancaire de manière sécurisée. Consultez la
            <a href="https://stripe.com/fr/privacy" target="_blank" rel="noopener noreferrer" class="text-primary-600 hover:underline">politique de confidentialité de Stripe</a>.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Vos droits</h2>
          <p class="text-gray-600 leading-relaxed mb-2">
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>Droit d'accès</strong> : obtenir la confirmation du traitement de vos données et en recevoir une copie</li>
            <li><strong>Droit de rectification</strong> : faire corriger vos données inexactes ou incomplètes</li>
            <li><strong>Droit de suppression</strong> : demander l'effacement de vos données personnelles</li>
            <li><strong>Droit à la portabilité</strong> : recevoir vos données dans un format structuré et lisible</li>
            <li><strong>Droit d'opposition</strong> : vous opposer au traitement de vos données</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-2">
            Pour exercer ces droits, contactez-nous à
            <a href="mailto:contact@aerisys.fr" class="text-primary-600 hover:underline">contact@aerisys.fr</a>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Cookies et stockage local</h2>
          <p class="text-gray-600 leading-relaxed mb-2">
            Ce site utilise les mécanismes de stockage suivants :
          </p>
          <ul class="list-disc list-inside text-gray-600 space-y-1">
            <li><strong>aerisys-consent</strong> (localStorage) : mémorise votre choix concernant le bandeau cookies</li>
            <li><strong>aerisys-cart</strong> (sessionStorage) : stocke le contenu de votre panier durant votre session</li>
            <li><strong>Cookies Stripe</strong> : cookies essentiels au fonctionnement du module de paiement sécurisé (aucun cookie publicitaire)</li>
          </ul>
          <p class="text-gray-600 leading-relaxed mt-2">
            Aucun cookie publicitaire ou de suivi n'est utilisé sur ce site.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>
