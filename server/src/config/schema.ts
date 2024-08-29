import * as yup from 'yup'

export const pluginConfigSchema = yup.object().shape({
    debug: yup.boolean().default(false),
    minDepth: yup.number().default(5),
    maxDepth: yup.number().default(5),
    skipCreatorFields: yup.boolean().default(false),
    ignoreFields: yup.array().of(yup.string()).default([]),
    ignorePaths: yup.array().of(yup.string()).default([]),
    allowedModels: yup.array().of(yup.string()).default([]),
})

export type PluginConfig = yup.InferType<typeof pluginConfigSchema>
