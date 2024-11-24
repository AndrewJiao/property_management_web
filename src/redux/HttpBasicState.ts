export interface HttpBasicState {
    errorMsg: string | null | undefined,
    isLoading: boolean,
    result: any
}

export function default_pending(): HttpBasicState {
    return {
        errorMsg: null,
        isLoading: true,
        result: null
    }
}


export function default_reject(msg: string | null | undefined): HttpBasicState {
    return {
        errorMsg: msg,
        isLoading: false,
        result: null
    }
}

export function default_success<T>(result: T): HttpBasicState {
    return {
        errorMsg: null,
        isLoading: false,
        result: result
    }
}


