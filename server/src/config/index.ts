import { pluginConfigSchema } from './schema'

export default {
    default: {
        minDepth: 5,
        maxDepth: 5,
        // Skip admin::user object
        skipCreatorFields: false,
        // Array of fields to always ignore.
        // Must be type of ['relation', 'component', 'dynamiczone', 'media']
        ignoreFields: [],
        ignorePaths: [],
        // Debug mode
        debug: false,
        // Array of models to allow populate on i.e. ['api::page.page', 'api::post.post']
        // If empty all models are allowed.
        allowedModels: [],
    },
    validator(config) {
        pluginConfigSchema.validateSync(config)
    },
}
