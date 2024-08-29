<p align="center">
  <a href="https://magictm.com" target="_blank" rel="noopener noreferrer">
    <img width="270" src="assets/logo.svg" alt="Project Logo"> 
  </a>
</p>

<br/>

<p align="center">
<a href='#'>
</a>
<a href="https://www.npmjs.com/package/@magictm/strapi-plugin-deep-populate" target="__blank"><img alt="NPM version" src="https://img.shields.io/npm/v/@magictm/strapi-plugin-deep-populate?flat&colorA=0e0a18&colorB=8c67ef"></a>
<a href="https://www.npmjs.com/package/@magictm/strapi-plugin-deep-populate" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@magictm/strapi-plugin-deep-populate?flat&colorA=0e0a18&colorB=8c67ef"></a>
<a href="https://github.com/magictm/strapi-plugin-deep-populate" target="__blank"><img alt="GitHub stars" src="https://img.shields.io/github/stars/magictm/strapi-plugin-deep-populate?flat&colorA=0e0a18&colorB=8c67ef"></a>
</p>

<br/>

<h1 align='left'>MagicTM · Deep Populate · Strapi Plugin</h1>

🚀 The MagicTM Deep Populate Strapi Plugin simplifies deep population of content structures within your Strapi v4 applications. This plugin streamlines fetching nested data, making your API responses more comprehensive and developer-friendly.

🌐 Follow me: https://stawowczyk.me

## ⛓ Versions

Strapi v4 - (current) - v1.x

Tested on Strapi v4.25.4.

## Motivation

This plugin is an extension of https://github.com/Barelydead/strapi-plugin-populate-deep created by @Barelydead. Due to the lack of development of the plugin, I decided to extend the plugin with some features I need and share it with the community.

## 💻 Install

### 1. Install the plugin

```bash
npm install @magictm/strapi-plugin-deep-populate
```

### 2. Enable the plugin

Navigate to your Strapi project's configuration file:
`<strapi app root>/config/plugins.js` or `.ts`

Add the following code snippet:

#### Minimal configuration:

```ts
'magictm-deep-populate': {
    enabled: true,
}
```

#### Advanced configuration

```ts
'magictm-deep-populate': {
    enabled: true,
    config: {
        minDepth: 5, // Minimum population depth
        maxDepth: 5, // Maximum population depth
        // Skip populating creator fields (e.g., created_by)
        skipCreatorFields: false,
        // Array of fields to always ignore.
        // Must be type of ['relation', 'component', 'dynamiczone', 'media']
        ignoreFields: ['localizations', 'strapi_stage'],
        // Array of paths to always ignore.
        ignorePaths: ['categories.relPosts'],
        // Enable debug mode for detailed logs
        debug: false,
        // Array of models where deep population is allowed e.g. ['api::page.page', 'api::post.post']
        // If empty all models are allowed.
        allowedModels: ['api::page.page', 'api::post.post'],
    },
}
```

#### Full example (typescript)

```ts
export default () => ({
    // other plugins

    'magictm-deep-populate': {
        enabled: true,
    },
})
```

### 3. (Re)Start Your Application

For the changes to take effect, restart your Strapi application:

```
npm run develop
```

## 🚀 Usage

The MagicTM Deep Populate plugin seamlessly integrates with your existing Strapi API. Here's how to use it:

### Default Deep Population

To fetch content with deep population up to the configured default depth, simply append `?populate=deep` to your API endpoint:

```
/api/articles?populate=deep
```

### Custom Population Depth

For finer control, specify the desired depth level numerically after the `deep` keyword:

```
/api/articles?populate=deep,10
```

This fetches articles with relations populated up to 10 levels deep, or the maximum depth set in the plugin configuration – whichever is lower. This ensures your API responses remain performant even with large datasets.

> Please note! Using `?populate=deep,1` with depth of 1 will always return all relations with depth 1. Works same as `?populate=*`. `populateIgnore` will as well not work.

### Excluding Specific Fields from Population

Use the `populateIgnore` parameter to prevent specific fields or relations from being populated. This helps tailor your API responses by omitting unnecessary data.

For example, to exclude the seo field from population:

```
/api/articles?populate=deep&populateIgnore=seo
```

You can also ignore model ID combined with relation name. For example, to exclude the `seo` field from population which is in `posts` model (model.relationName):

```
/api/articles?populate=deep&populateIgnore=posts.seo
/api/articles?populate=deep&populateIgnore=posts.seo,model.relationName
```

You can comma-separate multiple fields to ignore. For instance, to exclude both the `seo` field and a relation named `relPosts`:

```
/api/articles?populate=deep&populateIgnore=seo,relPosts
```

### Excluding Specific Paths from Population

Use the `populateIgnorePaths` parameter to prevent specific paths from being populated. This allows you to customize your API responses by omitting unnecessary data.

For example, to exclude the `categories.relPosts` path from population:

```
/api/articles?populate=deep&populateIgnorePaths=categories.relPosts
```

You can comma-separate multiple paths to ignore. For instance, to exclude both the `categories.relPosts` path and a `tags` path:

```
/api/articles?populate=deep&populateIgnorePaths=categories.relPosts,tags
```

## 🤝 Contributing

Contributions to the MagicTM Deep Populate Strapi Plugin are always welcome! To contribute:

-   **Fork** the repository.
-   **Create** a new branch for your feature/bug fix.
-   **Commit** your changes with descriptive messages.
-   **Push** your changes to your forked repository.
-   **Submit** a pull request to the `master` branch.

## ☕️ Help me keep working on this project 💚

If you find this plugin valuable, consider supporting its development. Your contribution helps me maintain and improve this project.

-   Buy me a coffee: https://www.buymeacoffee.com/m7rlin
-   Support via PayPal: https://paypal.me/merlinArtist

## 🎖️ Sponsors

We appreciate all sponsors! Please contact us if you're interested in sponsoring this project.

## 📜 License

MIT License © 2024-PRESENT Marcin Stawowczyk (m7rlin)

Thank you for using the MagicTM Deep Populate Strapi Plugin! Let me know if you have any other questions.
