import {format} from "date-fns";
import dayjs from "dayjs";

export interface DateRangeType {
    createDateRange?: string[] | null;
    createTimeStar?: string | null;
    createTimeEnd?: string | null;
    updateDateRange?: string[] | null;
    updateTimeEnd?: string | null;
    updateTimeStar?: string | null;

}

function toLocalDate(date: Date) {
    return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
}

export function buildDateSearchParam<T extends DateRangeType>(param: T) {
    let searchParam: any = {...param};
    if (param.createDateRange) {
        let {star, end} = format_range_param_search(param.createDateRange);
        searchParam.createTimeStar = (star);
        searchParam.createTimeEnd = (end);
    }
    if (param.updateDateRange) {
        let {star, end} = format_range_param_search(param.updateDateRange);
        searchParam.updateTimeStar = (star);
        searchParam.updateTimeEnd = (end);
    }
    return searchParam;
}

export const tableTimeRender = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm:ss")
}

const format_range_param_search = (date: string[] | null) => {
    if (date?.length !== 2) {
        return {star: null, end: null}
    }
    return {star: format_param_search(date[0], "star"), end: format_param_search(date[1], "end")}
}

const format_param_search = (dateStr: string, type: 'star' | 'end') => {
    let date = new Date(dateStr);
    type.match('star') ?
        date.setHours(0, 0, 0, 0) :
        date.setHours(23, 59, 59, 999);
    return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

export function defaultCurrentMonthRange() {
    let date = new Date();
    let start = new Date(date.getFullYear(), date.getMonth(), 1);
    let end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return [start, end]
}

export function defaultCurrentMonthRangeDayJs() {
    return defaultCurrentMonthRange().map(e => dayjs(e));
}