interface APIDescription {
    name: string,
    args: {
        [key: string]: string[]
    },
    request: string,
    parse: string
}

interface APIOutput {
    title?: string,
    author?: string,
    image?: string,
    authorimage?: string,
    description?: string,
    start?: string,
    end?: string
}

interface APIRequest {
    url: RequestInfo,
    method: string | 'GET',
    header: any
}

export {APIDescription, APIOutput, APIRequest};