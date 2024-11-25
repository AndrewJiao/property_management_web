export interface FlattenData {
    [key: string]: any
}

export function flattenJson(json: any, parentKey: string = ''): any {
    let resultData = {}
    console.log(`json = ${JSON.stringify(json)}`)
    for (let key in json) {
        console.log(`key = ${key}`)
        if (!json.hasOwnProperty(key)) {
            continue
        }
        let newKey = parentKey ? `${parentKey}.${key}` : key;
        if (json[key] === 'object' && json[key] != null && !Array.isArray(json)) {
            resultData = {...flattenJson(json[newKey], key)};
        } else {
            let newKeyName = parentKey ? `${parentKey}_${key}` : key;
            resultData[newKeyName] = json[key]
        }
    }
    return resultData;
}