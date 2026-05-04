# 🏎️ F1 Paddock - Dashboard Formule 1

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## Description
Cette application web a été développée dans le cadre du projet final du cours **420-211-H26 - Applications Web** au **Cégep Marie-Victorin**.

L'objectif est de permettre aux passionnés de Formule 1 de consulter la grille des pilotes en temps réel via l'API **OpenF1**. L'utilisateur peut explorer les données par saison et par Grand Prix, rechercher ses pilotes préférés et gérer sa propre écurie de favoris.

---

## Fonctionnalités principales
- **Grille Dynamique** : Affichage des pilotes sous forme de cartes visuelles interactives.
- **Filtrage Avancé** : Navigation par année (2023 à 2026) et par Grand Prix.
- **Recherche Instantanée** : Barre de recherche par nom avec mise à jour en temps réel.
- **Détails Complets** : Fiche détaillée incluant numéro, acronyme, écurie, titres mondiaux (WDC) et photo officielle.
- **Gestion des Favoris** : Ajout/suppression de pilotes avec persistance des données via `localStorage`.
- **Interface Moderne** : Support complet du **Mode Sombre / Clair**.

---

## Technologies utilisées
- **Framework** : React + Vite
- **Langage** : TypeScript
- **Stylisation** : Tailwind CSS & Flowbite React
- **Routage** : React Router DOM
- **API** : [OpenF1 API](https://openf1.org/) (Données historiques et temps réel)

---

## Planification & Développement

### Semaine 1 : Architecture & Fondations
- Initialisation du dépôt GitHub et configuration de l'environnement.
- Mise en place du Routing et de la structure des dossiers (`Components`, `Hooks`, `API`).
- Définition des interfaces TypeScript (`Driver`, `Meeting`, `Team`).
- Exploration technique de l'API OpenF1.

### Semaine 2 : Logique & Affichage
- Développement de la page de liste des pilotes.
- Intégration des services API (`fetchDrivers`, `fetchMeetings`).
- Implémentation des filtres par année et par Grand Prix.
- Création de la modale de détails et gestion du nettoyage des données (doublons, images).

### Semaine 3 : Expérience Utilisateur & Optimisation
- Système de favoris persistant avec le hook personnalisé `useLocalStorage`.
- Refactorisation du code en composants réutilisables et hooks personnalisés (`useDriverFilters`, `useFavorites`).
- Intégration du thème sombre/clair et finalisation du UI/UX.
- Tests finaux et correction de bugs d'affichage.

---

## Installation
1. `npm install`
2. `npm run dev`

---

## Auteur
**David Martinez**

*Étudiant en Informatique au Cégep Marie-Victorin*
