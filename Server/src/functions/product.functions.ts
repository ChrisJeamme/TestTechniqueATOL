import InvalidParameterError from '../errors/invalidparameter.error'

export const productParamVerification = (parameters: any) => {
    if (parameters.name === undefined) {
        throw new InvalidParameterError('name')
    }
    if (parameters.type === undefined) {
        throw new InvalidParameterError('type')
    }
    if (parameters.price === undefined) {
        throw new InvalidParameterError('price')
    }
    if (parameters.rating === undefined) {
        throw new InvalidParameterError('rating')
    }
    if (parameters.warranty_years === undefined) {
        throw new InvalidParameterError('warranty_years')
    }
    if (parameters.available === undefined) {
        throw new InvalidParameterError('available')
    }
}
