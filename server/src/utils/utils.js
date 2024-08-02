import { D } from '@mobily/ts-belt'

function deepAssign(target, source) {
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
            if (typeof source[key] === 'object' && source[key] !== null) {
                if (!target[key] || typeof target[key] !== 'object' || target[key] === null) {
                    target[key] = source[key]
                }
                deepAssign(target[key], source[key])
            } else if (!target[key] || typeof target[key] !== 'object' || target[key] === null) {
                target[key] = source[key]
            }
        }
    }
    return target
}

export function validatePopulateIgnore(param) {
    if (!param) {
        return []
    }
    return param.split(',').map((item) => item.trim())
}

export function getFullPopulateObject(
    modelUid,
    maxDepth,
    skipCreatorFields,
    ignore = new Set(),
    debug = false
) {
    if (maxDepth <= 1) {
        return true
    }
    if (modelUid === 'admin::user' && skipCreatorFields) {
        return undefined
    }

    const populate = {}
    const model = strapi.getModel(modelUid)

    const attributes = Object.entries(getModelPopulationAttributes(model)).filter(([, value]) =>
        ['relation', 'component', 'dynamiczone', 'media'].includes(value.type)
    )

    for (const [attrName, attrObject] of attributes) {
        if (ignore.has(attrName) || ignore.has(model.collectionName + '.' + attrName)) {
            continue
        }

        debug && console.log('attrObject', attrName, attrObject)

        // Skip if the attribute is empty
        if (D.isEmpty(attrObject)) continue

        if (attrObject.type === 'component') {
            populate[attrName] = getFullPopulateObject(
                attrObject.component,
                maxDepth - 1,
                skipCreatorFields,
                ignore,
                debug
            )
        } else if (attrObject.type === 'dynamiczone') {
            const dynamicPopulate = attrObject.components.reduce((prev, cur) => {
                const curPopulate = getFullPopulateObject(
                    cur,
                    maxDepth - 1,
                    skipCreatorFields,
                    ignore,
                    debug
                )
                return curPopulate === true ? prev : deepAssign(prev, curPopulate)
            }, {})

            populate[attrName] = D.isEmpty(dynamicPopulate) ? true : dynamicPopulate
        } else if (attrObject.type === 'relation') {
            if (attrObject.target === 'admin::user' && skipCreatorFields) {
                continue
            }
            const relationPopulate = getFullPopulateObject(
                attrObject.target,
                maxDepth - 1,
                skipCreatorFields,
                ignore,
                debug
            )
            if (!D.isEmpty(relationPopulate)) {
                populate[attrName] = relationPopulate
            }
        } else if (attrObject.type === 'media') {
            populate[attrName] = true
        }
    }

    return D.isEmpty(populate) ? true : { populate }
}

export function getModelPopulationAttributes(model) {
    if (model.uid === 'plugin::upload.file') {
        const { related, ...attributes } = model.attributes
        return attributes
    }

    return model.attributes
}
