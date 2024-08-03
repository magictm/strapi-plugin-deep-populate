import type { Strapi } from '@strapi/strapi'
import pluginId from './pluginId'

import { getFullPopulateObject, validatePopulateIgnore } from './utils/utils'

export interface PluginConfig {
    minDepth: number
    maxDepth: number
    skipCreatorFields: boolean
    debug: boolean
    allowedModels: string[]
    ignore: string[]
}

const bootstrap = ({ strapi }: { strapi: Strapi }) => {
    // Get the plugin config
    const { minDepth, maxDepth, skipCreatorFields, debug, allowedModels, ignore }: PluginConfig =
        strapi.config.get('plugin.' + pluginId)

    strapi.db.lifecycles.subscribe((event) => {
        if (event.action === 'beforeFindMany' || event.action === 'beforeFindOne') {
            const ctx = strapi.requestContext.get()

            debug && console.log(ctx?.request?.query) // Debug

            const { populate } = event.params

            const queryParams = ctx?.request?.query || {}
            const populateIgnore = validatePopulateIgnore(queryParams.populateIgnore)

            debug && console.log('populateIgnore', populateIgnore) // Debug

            if (populate && populate[0] === 'deep') {
                let depth = parseInt(populate[1], 10) || minDepth

                // Limit the depth to the default depth if it's greater than the default depth
                const limitedDepth = Math.min(depth, maxDepth)

                const model = event.model

                // Check if the model is allowed
                if (allowedModels.length && !allowedModels.includes(model.uid)) {
                    return
                }

                const ignored = new Set()

                // Add the ignored fields from the config
                if (ignore.length) {
                    ignore.forEach((field) => ignored.add(field))
                }

                // Add the ignored fields from the query params
                if (populateIgnore.length) {
                    populateIgnore.forEach((field) => ignored.add(field))
                }

                // Debug
                debug &&
                    console.log(
                        'request settings model',
                        model.uid,
                        limitedDepth,
                        skipCreatorFields,
                        ignored
                    )

                let populateObject = getFullPopulateObject(
                    model.uid,
                    limitedDepth,
                    skipCreatorFields,
                    ignored,
                    debug
                )

                debug && console.log('POPULATE OBJECT:', populateObject) // Debug

                // Override the populate object with the one returned from the function
                if (typeof populateObject === 'object') {
                    event.params.populate = populateObject.populate
                } else {
                    event.params.populate = true
                }
            }
        }
    })
}

export default bootstrap
