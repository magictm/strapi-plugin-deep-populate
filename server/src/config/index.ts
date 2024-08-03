export default {
    default: {
        minDepth: 5,
        maxDepth: 5,
        // Skip admin::user object
        skipCreatorFields: false,
        // Array of fields to always ignore.
        // Must be type of ['relation', 'component', 'dynamiczone', 'media']
        ignore: [],
        // Debug mode
        debug: false,
        // Array of models to allow populate on i.e. ['api::page.page', 'api::post.post']
        // If empty all models are allowed.
        allowedModels: [],
    },
    validator() {
        return {
            minDepth: (value: any) => {
                if (typeof value !== 'number') {
                    throw new Error('minDepth must be a number')
                }
                if (value < 0) {
                    throw new Error('minDepth must be a positive number')
                }
            },
            maxDepth: (value: any) => {
                if (typeof value !== 'number') {
                    throw new Error('maxDepth must be a number')
                }
                if (value < 0) {
                    throw new Error('maxDepth must be a positive number')
                }
            },
            skipCreatorFields: (value: any) => {
                if (typeof value !== 'boolean') {
                    throw new Error('skipCreatorFields must be a boolean')
                }
            },
            ignore: (value: any) => {
                if (!Array.isArray(value)) {
                    throw new Error('ignore must be an array')
                }
            },
            debug: (value: any) => {
                if (typeof value !== 'boolean') {
                    throw new Error('debug must be a boolean')
                }
            },
            allowedModels: (value: any) => {
                if (!Array.isArray(value)) {
                    throw new Error('allowedModels must be an array')
                }
            },
        }
    },
}
