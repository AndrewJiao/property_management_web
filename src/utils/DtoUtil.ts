import {AppResult} from "../axios";


const apiAppendIdToKey = (e: AppResult<any>) => {
    let item = e.data;
    if (Array.isArray(item)) {
        e.data = item.map(e => ({...e, key: e.id.toString()}))
    } else {
        e.data = {...item, key: item.id.toString()}
    }
    return e
}
export default {apiAppendIdToKey}
