import {format} from "date-fns";

export const tableTimeRender = (date: Date) => {
    return format(date, "yyyy-MM-dd HH:mm:ss")
}