<template>
  <main class="pt-24 pb-16 bg-aerisys-gray min-h-screen">
    <div class="container-custom max-w-3xl">
      <div class="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <h1 class="text-3xl font-display font-bold text-gray-900 mb-8">Conditions générales de vente</h1>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Objet</h2>
          <p class="text-gray-600 leading-relaxed">
            Les présentes conditions générales de vente (CGV) régissent les ventes de produits
            effectuées sur le site <strong>Aerisys</strong>. Toute commande implique l'acceptation
            sans réserve des présentes CGV.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Prix</h2>
          <p class="text-gray-600 leading-relaxed">
            Les prix sont indiqués en euros (EUR) toutes taxes comprises (TTC). Aerisys se réserve
            le droit de modifier ses prix à tout moment, les produits étant facturés sur la base
            du tarif en vigueur au moment de la validation de la commande.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Commande</h2>
          <p class="text-gray-600 leading-relaxed">
            La commande est validée après acceptation des présentes CGV et de la
            <RouterLink to="/politique-confidentialite" class="text-primary-600 hover:underline">politique de confidentialité</RouterLink>,
            puis confirmation du paiement. Un e-mail de confirmation est envoyé à l'adresse
            fournie lors du paiement.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Paiement</h2>
          <p class="text-gray-600 leading-relaxed">
            Le paiement est effectué en ligne par carte bancaire via la plateforme sécurisée
            <strong>Stripe</strong>. Les données de paiement sont traitées directement par Stripe
            et ne sont jamais stockées sur nos serveurs. Stripe est certifié PCI DSS Niveau 1.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Livraison</h2>
          <p class="text-gray-600 leading-relaxed">
            Les frais de livraison sont offerts. Les délais de livraison sont communiqués à titre
            indicatif et ne constituent pas un engagement contractuel. Aerisys ne saurait être
            tenu responsable des retards de livraison imputables au transporteur.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Droit de rétractation</h2>
          <p class="text-gray-600 leading-relaxed">
            Conformément à l'article L221-18 du Code de la consommation, vous disposez d'un
            délai de <strong>14 jours</strong> à compter de la réception de votre commande pour
            exercer votre droit de rétractation, sans avoir à justifier de motifs ni à payer de
            pénalités. Pour exercer ce droit, contactez-nous à
            <a href="mailto:contact@aerisys.fr" class="text-primary-600 hover:underline">contact@aerisys.fr</a>.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Garanties</h2>
          <p class="text-gray-600 leading-relaxed">
            Les produits bénéficient de la garantie légale de conformité (articles L217-4 et
            suivants du Code de la consommation) et de la garantie contre les vices cachés
            (articles 1641 et suivants du Code civil).
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Responsabilité</h2>
          <p class="text-gray-600 leading-relaxed">
            Aerisys ne saurait être tenu responsable des dommages indirects résultant de
            l'utilisation des produits. La responsabilité d'Aerisys est limitée au montant
            de la commande concernée.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Données personnelles</h2>
          <p class="text-gray-600 leading-relaxed">
            Les informations relatives au traitement de vos données personnelles sont détaillées
            dans notre
            <RouterLink to="/politique-confidentialite" class="text-primary-600 hover:underline">
              politique de confidentialité</RouterLink>.
          </p>
        </section>

        <section>
          <h2 class="text-xl font-semibold text-gray-900 mb-3">Droit applicable</h2>
          <p class="text-gray-600 leading-relaxed">
            Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux
            français seront seuls compétents, après tentative de résolution amiable.
          </p>
        </section>
      </div>
    </div>
  </main>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>
