# Guide rapide des classes Materialize (avec équivalents CSS simplifiés)

Ce document présente des classes Materialize fréquemment utilisées et propose des équivalents CSS simplifiés pour comprendre rapidement l'effet visuel sans inclure tout le framework.

> Remarque : les snippets CSS sont pédagogiques et volontairement simplifiés — Materialize contient des réglages supplémentaires (breakpoints, variables, transitions, ombres, etc.).

---

## `container`

- Description : centre le contenu et limite la largeur via des paliers responsive.

Exemple CSS (simplifié) :

```css
.container {
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  width: 100%;
}
```

## `row`

- Description : conteneur de la grille, gère l'alignement et le wrapping des colonnes.

```css
.row {
  display: flex;
  flex-wrap: wrap;
  margin-left: -12px; /* compense le padding des colonnes */
  margin-right: -12px;
}
```

## `col s12 m6 l4` (grille)

- Description : colonnes responsive — `s` (small), `m` (medium), `l` (large). Les nombres sont des parts sur 12.

```css
.col {
  box-sizing: border-box;
  padding-left: 12px;
  padding-right: 12px;
}
.s12 {
  width: 100%;
}
@media (min-width: 601px) {
  .m6 {
    width: 50%;
  }
}
@media (min-width: 993px) {
  .l4 {
    width: 33.3333%;
  }
}
```

## `nav`, `nav-wrapper`, `brand-logo`

- Description : structure d'une barre de navigation Materialize (logo à gauche, liens à droite).

```css
nav {
  height: 56px;
  line-height: 56px;
  background-color: #2196f3;
}
.nav-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}
.brand-logo {
  font-size: 1.25rem;
  margin-left: 16px;
  color: #fff;
  text-decoration: none;
}
.nav-wrapper .right {
  margin-left: auto;
  display: flex;
  gap: 12px;
}
.nav-wrapper a {
  color: #fff;
  text-decoration: none;
  padding: 0 8px;
}
```

## `btn`, `waves-effect`, `waves-light`

- Description : boutons stylés. `waves-*` ajoute l'effet d'onde via JS/CSS supplémentaires.

```css
.btn {
  display: inline-block;
  background-color: #42a5f5;
  color: #fff;
  padding: 0.6rem 1rem;
  border-radius: 2px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}
```

## `input-field` (formulaires)

- Description : wrapper pour inputs Materialize. Gère labels flottants et icônes `prefix`.

```css
.input-field {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.input-field input {
  display: block;
  width: 100%;
  border: none;
  border-bottom: 1px solid #9e9e9e;
  padding: 8px 0;
  background: transparent;
}
.input-field label {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 0.9rem;
  color: #9e9e9e;
  pointer-events: none;
  transition: transform 0.2s, font-size 0.2s;
}
/* label qui remonte quand l'input est focus ou contient une valeur */
.input-field input:focus + label,
.input-field input:not(:placeholder-shown) + label {
  transform: translateY(-18px) scale(0.85);
  color: #26a69a;
}
```

## `prefix` (icônes dans les inputs)

- Description : place une icône à gauche de l'input.

```css
.prefix {
  position: absolute;
  left: 0;
  top: 0.9rem;
  color: #9e9e9e;
}
.input-field .prefix + input {
  padding-left: 36px;
}
```

## `validate`

- Description : styles pour indiquer validité ou invalidité d'un champ.

```css
input.validate:valid {
  border-bottom-color: #4caf50;
  box-shadow: 0 1px 0 0 #4caf50;
}
input.validate:invalid {
  border-bottom-color: #f44336;
  box-shadow: 0 1px 0 0 #f44336;
}
```

## `card`, `card-content`, `card-action`

- Description : bloc "card" avec ombre et sections de contenu.

```css
.card {
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}
.card .card-content {
  padding: 16px;
}
.card .card-action {
  border-top: 1px solid #eee;
  padding: 8px 16px;
  background: #fafafa;
}
```

## `page-footer`

- Description : pied de page avec couleur d'arrière-plan et structure contenue.

```css
.page-footer {
  background-color: #00796b;
  color: #fff;
  padding-top: 20px;
  padding-bottom: 20px;
}
.page-footer .container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
}
```

## `collection`, `collection-item`

- Description : listes stylées (menus, listes d'éléments).

```css
.collection {
  margin: 0;
  padding: 0;
  list-style: none;
}
.collection .collection-item {
  display: block;
  padding: 12px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}
```

## Helpers responsives (`hide-on-med-and-down`, `hide-on-small-only`)

- Description : utilitaires pour masquer/afficher selon la largeur d'écran.

```css
@media (max-width: 992px) {
  .hide-on-med-and-down {
    display: none !important;
  }
}
@media (max-width: 600px) {
  .hide-on-small-only {
    display: none !important;
  }
}
```

## `material-icons`

- Description : police d'icônes Google Material Icons — s'utilise avec `<i class="material-icons">email</i>`.

```css
.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
```

---

## Conseils rapides

- Structure type : `container` → `row` → `col` pour la mise en page responsive.
- Formulaires modernes : envelopper chaque champ avec `div.input-field`, utiliser `i.material-icons.prefix` pour une icône à gauche et `input.validate` pour appuyer la validation visuelle.
- Utilisez les helpers (`hide-*`, `truncate`, etc.) pour ajuster sans CSS personnalisé.

---

Souhaitez-vous que je :

- crée ce fichier directement dans le dépôt (déjà fait),
- ajoute d'autres classes (modals, dropdowns, sidenav, chips, tooltip),
- ou fabrique un petit exemple HTML démonstratif utilisant ces snippets CSS ?
