<script setup lang="ts">
import { ref } from 'vue';
import MemberCard from "../components/MemberCard.vue";
import {CDN_URL} from "../config.ts";

interface SocialMedia {
  platform: string;
  url: string;
  icon: string;
}

interface TeamMember {
  id: number;
  name: string;
  firstName: string;
  age: number;
  specialty: string;
  contributions: string[];
  presentation: string;
  photo: string;
  socials: SocialMedia[];
}

const projectManager = ref<TeamMember[]>([
  {
    id: 1,
    name: "Barbet",
    firstName: "Sacha",
    age: 21,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Lead développeur",
      "Développeur",
    ],
    presentation: "Je suis passioné d'informatique, d'électronique et d'escalade.",
    photo: CDN_URL + "images/members/sacha.jpeg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/sacha-barbet/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      }
    ]
  },
  {
    id: 2,
    name: "François",
    firstName: "Loan",
    age: 21,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Chef de projet",
      "Développeur mobile & IoT",
    ],
    presentation: "Développeur polyvalent, j’aime créer, optimiser et donner vie à des projets sur tous les fronts.",
    photo: CDN_URL + "images/members/loan.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/loanfrancois/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      },
      {
        platform: "GitHub",
        url: "https://github.com/LoanF",
        icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      },
    ]
  },
  {
    id: 3,
    name: "Pidoux",
    firstName: "Gaël",
    age: 23,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Chef de projet",
      "Développeur",
    ],
    presentation: "Je suis passioné d'informatique, d'electronique et de sport.",
    photo: CDN_URL + "images/members/gael.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/gaël-pidoux/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      }
    ]
  }
]);

const iotTeam = ref<TeamMember[]>([

  {
    id: 2,
    name: "Coeur",
    firstName: "Maxence",
    age: 21,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Développeur sur le drone",
      "Développeur sur la manette",
    ],
    presentation: "Je suis passionné de sport, d'informatique et de bière 🍻.",
    photo: CDN_URL + "images/members/maxence.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/maxence-coeur/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      },
      {
        platform: "GitHub",
        url: "https://github.com/MAXCOEUR",
        icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      },
    ]
  },
  {
    id: 3,
    name: "Abo-Alrub",
    firstName: "Jamil",
    age: 26,
    specialty: "Data scientist",
    contributions: [
      "Computer Vision",
      "Traitement d'image",
      "Machine learning"
    ],
    presentation: "Je suis passionné de mathématiques, de machine learning et de computer vision.",
    photo: CDN_URL + "images/members/jamil.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/jamil-aboalrub/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      }
    ]
  },
  {
    id: 4,
    name: "Richard de Vesvrotte",
    firstName: "Amaury",
    age: 25,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Développeur sur la manette",
      "Développeur des communications"
    ],
    presentation: "Je suis passionné d'informatique et de sport.",
    photo: CDN_URL + "images/members/amaury.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/amaury-richard-de-vesvrotte-1903801b7/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      }
    ]
  },
  {
    id: 5,
    name: "Fathipoursasansara",
    firstName: "Adelia",
    age: 24,
    specialty: "Développeur logiciel, mobile & IOT",
    contributions: [
      "Développeuse mobile",
      "Création de la direction artistique",
    ],
    presentation: "Je suis passionnée d'informatique, manga et digital art.",
    photo: CDN_URL + "images/members/adelia.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/adelia-fathipour-040872231",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      }
    ]
  },
  {
    id: 6,
    name: "Chollet",
    firstName: "Gaëtan",
    age: 22,
    specialty: "Développeur web",
    contributions: [
      "Développeur web",
      "Création de la direction artistique",
      "Création des maquettes du site web"
    ],
    presentation: "Je suis passionné par le développement web et depuis peu par le pilotage de drone FPV dans le cadre de production vidéo.",
    photo: CDN_URL + "images/members/gaetan.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/gaëtan-chollet-developpeur/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      },
      {
        platform: "GitHub",
        url: "https://github.com/GaetanccgYnov",
        icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      },
    ]
  },
  {
    id: 7,
    name: "Ribes",
    firstName: "Thibault",
    age: 24,
    specialty: "Développeur web",
    contributions: [
      "Développeur web",
      "Création de la direction artistique",
      "Création des maquettes du site web"
    ],
    presentation: "Je suis passionné par l'informatique, le jeux vidéo, le jeu de rôle et les mangas.",
    photo: CDN_URL + "images/members/thibault.jpg",
    socials: [
      {
        platform: "LinkedIn",
        url: "https://www.linkedin.com/in/thibault-ribes/",
        icon: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"
      },
      {
        platform: "GitHub",
        url: "https://github.com/Zombizz97",
        icon: "M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.115 2.504.337 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
      },
    ]
  },
]);
</script>

<template>
  <div class="pt-20 min-h-screen bg-primary-600">
    <div class="max-w-7xl mx-auto px-4 py-12">
      <h1 class="text-4xl font-bold text-primary-100 mb-12 text-center">Notre Équipe</h1>

      <h1 class="text-2xl font-bold text-primary-100 mb-12 text-center">Les chefs de projets</h1>
      <div class="flex flex-wrap justify-center gap-8 mb-12">
        <MemberCard v-for="member in projectManager"
                    :key="member.id"
                    :member="member"
                    class="max-w-sm" />
      </div>

      <h1 class="text-2xl font-bold text-primary-100 mb-12 text-center">L'équipe de développement</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <MemberCard v-for="member in iotTeam"
                    :key="member.id"
                    :member="member"
                    class="max-w-sm" />
      </div>
    </div>
  </div>
</template>