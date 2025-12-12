# Cinetech - Guide de Déploiement

Bienvenue dans le guide de déploiement de **Cinetech**, une application web pour explorer des films et séries TV en utilisant l'API TMDB (The Movie Database).

## Table des matières

1. [Prérequis](#prérequis)
2. [Installation locale](#installation-locale)
3. [Configuration de l'API](#configuration-de-lapi)
4. [Démarrage du projet](#démarrage-du-projet)
5. [Structure du projet](#structure-du-projet)
6. [Publication sur GitHub](#publication-sur-github)
7. [Dépannage](#dépannage)

---

## Prérequis

Avant de commencer, assurez-vous d'avoir les éléments suivants installés :

- **Git** (v2.0 ou supérieur) - [Télécharger Git](https://git-scm.com/download/win)
- **Node.js** (v14 ou supérieur) - [Télécharger Node.js](https://nodejs.org/) (optionnel, si nécessaire)
- **Serveur web local** :
  - **WAMP** (Windows) - [Télécharger WAMP](https://www.wampserver.com/)
  - **LAMP** (Linux)
  - **MAMP** (macOS)
  - Ou utilisez le serveur intégré de votre IDE
- **Un navigateur web moderne** (Chrome, Firefox, Safari, Edge)
- **Un compte GitHub** pour la publication (optionnel)
- **Une clé API TMDB** - [Créer un compte TMDB](https://www.themoviedb.org/)

---

## Installation locale

### Étape 1 : Cloner le projet

Ouvrez votre terminal et exécutez la commande suivante :

```bash
git clone https://github.com/votre-nom-utilisateur/cinetech.git
cd cinetech
```

> **Note** : Remplacez `votre-nom-utilisateur` par votre vrai nom d'utilisateur GitHub une fois que vous avez publié le projet.

### Étape 2 : Placer le projet dans le répertoire du serveur web

#### Pour WAMP :

1. Accédez au dossier d'installation de WAMP (par défaut : `C:\wamp64`)
2. Copiez le dossier `cinetech` dans le répertoire `www` :
   ```
   C:\wamp64\www\cinetech
   ```

3. Démarrez WAMP et attendez que tous les services soient au vert

#### Pour d'autres serveurs web :

- **LAMP** : Placez le dossier dans `/var/www/html/`
- **MAMP** : Placez le dossier dans `~/Applications/MAMP/htdocs/`
- **Serveur intégré** : Placez simplement le dossier où vous voulez et lancez le serveur

---

## Configuration de l'API

### Étape 1 : Créer un compte TMDB

1. Allez sur [themoviedb.org](https://www.themoviedb.org/)
2. Cliquez sur **Sign Up** (en haut à droite)
3. Remplissez le formulaire d'inscription
4. Vérifiez votre adresse email

### Étape 2 : Obtenir votre clé API

1. Connectez-vous à votre compte TMDB
2. Allez dans **Settings** → **API**
3. Acceptez les conditions d'utilisation
4. Copiez votre **API Read Access Token (v4 Bearer Token)** ou votre clé API v3

### Étape 3 : Configurer la clé API dans le projet

1. Ouvrez le fichier `assets/js/config.js`

2. Remplacez la clé API existante par la vôtre :

```javascript
// ❌ AVANT
export const TMDB_API_KEY = "votre_ancienne_cle";

// ✅ APRÈS
export const TMDB_API_KEY = "votre_nouvelle_cle_api";
export const TMDB_BASE_URL = "https://api.themoviedb.org/3";
export const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
```

> **⚠️ IMPORTANT** : Ne commitez jamais votre clé API sur GitHub ! Utilisez un fichier `.env` et un `.gitignore` pour les données sensibles en production.

### Étape 4 : Configurer le fichier .gitignore (RECOMMANDÉ)

Créez ou modifiez le fichier `.gitignore` à la racine du projet :

```
# Fichiers de configuration sensibles
assets/js/config.js

# Fichiers système
.DS_Store
Thumbs.db

# Dépendances
node_modules/
package-lock.json

# Fichiers d'IDE
.vscode/
.idea/
*.swp

# Fichiers environnement
.env
.env.local
```

---

## Démarrage du projet

### Avec WAMP

1. **Démarrez WAMP** :
   - Cliquez sur l'icône WAMP dans la barre système
   - Attendez que tous les services soient verts

2. **Accédez au projet** :
   - Ouvrez votre navigateur
   - Allez à : `http://localhost/cinetech` ou `http://localhost/cinetech/index.html`

3. **Testez l'application** :
   - La page d'accueil devrait charger les films populaires
   - Naviguez entre les pages (Films, Séries TV, Favoris)
   - Testez la recherche et la pagination

### Avec un autre serveur web

```bash
# Option 1 : Serveur Python intégré (Python 3)
cd c:\wamp64\www\cinetech
python -m http.server 8000

# Option 2 : Serveur Node.js (http-server)
npm install -g http-server
cd c:\wamp64\www\cinetech
http-server

# Puis ouvrez : http://localhost:8000 (Python) ou http://localhost:8080 (Node.js)
```

---

## Structure du projet

```
cinetech/
├── README.md                 # Ce fichier
├── .gitignore              # Fichiers à ignorer dans Git
├── index.html              # Page d'accueil
├── movies.html             # Page films
├── tv.html                 # Page séries TV
├── details.html            # Page détails film/série
├── favorites.html          # Page favoris
└── assets/
    ├── css/
    │   └── style.css       # Styles CSS
    └── js/
        ├── config.js       # Configuration API (clé API)
        ├── api.js          # Fonctions appels API
        ├── main.js         # Logique principale
        ├── movie.js        # Gestion des films
        ├── pagination.js   # Gestion pagination
        ├── search.js       # Gestion recherche
        └── favorites.js    # Gestion des favoris
```

### Description des fichiers clés

| Fichier | Description |
|---------|-------------|
| `config.js` | Contient la clé API TMDB et les URLs de base |
| `api.js` | Fonctions pour appeler l'API TMDB (films, séries, recherche) |
| `main.js` | Point d'entrée principal, initialise l'application |
| `movie.js` | Gestion de l'affichage et des détails des films |
| `pagination.js` | Gestion de la pagination des résultats |
| `favorites.js` | Gestion du stockage local des favoris |

---

## Publication sur GitHub

### Étape 1 : Initialiser un dépôt Git local

```bash
cd c:\wamp64\www\cinetech
git init
git add .
git commit -m "Initial commit: Cinetech application"
```

### Étape 2 : Créer un dépôt sur GitHub

1. Allez sur [github.com](https://github.com) et connectez-vous
2. Cliquez sur le **+** en haut à droite → **New repository**
3. Remplissez les informations :
   - **Repository name** : `cinetech`
   - **Description** : `Application web pour explorer les films et séries TV avec l'API TMDB`
   - **Visibility** : `Public` (si vous voulez qu'il soit visible à tous)
   - **Initialize this repository with** : Laissez vide (déjà initialisé localement)

4. Cliquez sur **Create repository**

### Étape 3 : Connecter votre dépôt local à GitHub

Après la création, GitHub affiche des commandes. Exécutez-les :

```bash
cd c:\wamp64\www\cinetech

# Ajouter l'URL du dépôt distant
git remote add origin https://github.com/votre-nom-utilisateur/cinetech.git

# Renommer la branche principale si nécessaire
git branch -M main

# Envoyer le code vers GitHub
git push -u origin main
```

> **Note** : Remplacez `votre-nom-utilisateur` par votre vrai nom d'utilisateur GitHub.

### Étape 4 : Vérifier la publication

1. Allez sur votre page GitHub : `https://github.com/votre-nom-utilisateur/cinetech`
2. Vérifiez que tous vos fichiers sont présents
3. Consultez votre `README.md` affiché sur la page principale

### Étape 5 : Ajouter des détails à votre dépôt (optionnel)

Dans les paramètres GitHub :

1. Allez dans **Settings** (⚙️)
2. Sous **About**, remplissez :
   - **Description** : Description courte du projet
   - **Tags** : Ajoutez des tags comme `movies`, `api`, `tmdb`, `web-app`
3. Activez **Discussions** ou **Wiki** si souhaité
4. Sauvegardez

---

## Dépannage

### Problème : "Clé API invalide" ou "Erreur 401"

**Solution** :
- Vérifiez que votre clé API est correcte dans `assets/js/config.js`
- Assurez-vous que votre compte TMDB est actif
- Vérifiez que vous avez accepté les conditions d'utilisation de l'API TMDB

### Problème : Le projet ne s'affiche pas

**Solution** :
- Vérifiez que le serveur web est démarré (WAMP doit être vert)
- Accédez à `http://localhost/cinetech/index.html` (pas juste `/cinetech`)
- Vérifiez les erreurs dans la console du navigateur (F12 → Console)
- Assurez-vous que JavaScript est activé dans votre navigateur

### Problème : Les films ne chargent pas

**Solution** :
- Ouvrez la console du navigateur (F12 → Console)
- Vérifiez les messages d'erreur
- Assurez-vous que la clé API est valide
- Testez votre connexion Internet

### Problème : Erreur "Access-Control-Allow-Origin" (CORS)

**Solution** :
- Cela se produit généralement en accédant le fichier avec `file://`
- Utilisez toujours un serveur web (`http://` ou `https://`)
- WAMP, LAMP ou un autre serveur web règle ce problème

### Problème : Git demande mes identifiants à chaque fois

**Solution** :

```bash
# Configurez Git avec vos infos
git config --global user.name "Votre Nom"
git config --global user.email "votre@email.com"

# Utilisez le cache de credentials
git config --global credential.helper store

# Ou utilisez SSH à la place de HTTPS
# (Consultez la documentation GitHub pour configurer SSH)
```

---

## Conseils de développement

### Mettre à jour le code après modification

```bash
cd c:\wamp64\www\cinetech

# Voir les changements
git status

# Ajouter les fichiers modifiés
git add .

# Créer un commit
git commit -m "Description de vos changements"

# Envoyer vers GitHub
git push origin main
```

### Mettre à jour votre code local depuis GitHub

```bash
cd c:\wamp64\www\cinetech
git pull origin main
```

### Bonnes pratiques Git

- Faites des commits réguliers et avec des messages clairs
- Un commit = une fonctionnalité ou une correction
- Utilisez des branches pour les nouvelles fonctionnalités :
  ```bash
  git checkout -b feature/nom-fonctionnalite
  git push origin feature/nom-fonctionnalite
  ```
- Créez des **Pull Requests** pour demander des revues

---

## Ressources utiles

- **TMDB API Documentation** : [https://developers.themoviedb.org/3](https://developers.themoviedb.org/3)
- **Git Documentation** : [https://git-scm.com/doc](https://git-scm.com/doc)
- **GitHub Help** : [https://docs.github.com](https://docs.github.com)
- **MDN Web Docs** : [https://developer.mozilla.org](https://developer.mozilla.org)

---

## Licence

Ce projet est fourni à titre d'exemple. Les données de films proviennent de **TMDB** qui dispose de sa propre licence.

---

## Support

Pour toute question ou problème :

1. Vérifiez le [Dépannage](#dépannage) ci-dessus
2. Consultez la documentation TMDB
3. Ouvrez une **Issue** sur GitHub si vous avez trouvé un bug
4. Créez une **Discussion** pour les questions

---

**Dernière mise à jour** : Décembre 2025

