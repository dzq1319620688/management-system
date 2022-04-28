//时间处理工具
export const NORM_MONTH_PATTERN = 'yyyy-MM'
export const SIMPLE_MONTH_PATTERN = 'yyyyMM'
export const NORM_DATE_PATTERN = 'yyyy-MM-dd'
export const NORM_TIME_PATTERN = 'HH:mm:ss'
export const NORM_DATETIME_MINUTE_PATTERN = 'yyyy-MM-dd HH:mm'
export const NORM_DATETIME_PATTERN = 'yyyy-MM-dd HH:mm:ss'
export const NORM_DATETIME_MS_PATTERN = 'yyyy-MM-dd HH:mm:ss.SSS'
export const ISO8601_PATTERN = 'yyyy-MM-dd HH:mm:ss,SSS'
export const CHINESE_DATE_PATTERN = 'yyyy年MM月dd日'
export const CHINESE_DATE_TIME_PATTERN = 'yyyy年MM月dd日HH时mm分ss秒'
export const PURE_DATE_PATTERN = 'yyyyMMdd'
export const PURE_TIME_PATTERN = 'HHmmss'
export const PURE_DATETIME_PATTERN = 'yyyyMMddHHmmss'
export const PURE_DATETIME_H_PATTERN = 'yyyyMMddHH'
export const PURE_DATETIME_MS_PATTERN = 'yyyyMMddHHmmssSSS'
export const UTC_SIMPLE_PATTERN = "yyyy-MM-dd'T'HH:mm:ss"

export function formatDate (value, format) {
  const o = {
    'M+': value.getMonth() + 1,
    'd+': value.getDate(),
    'H+': value.getHours(),
    'm+': value.getMinutes(),
    's+': value.getSeconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (value.getFullYear() + '').substr(4 - RegExp.$1.length))
    for (const k in o) {
      if (new RegExp(`(${k})`).test(format)) {
        format = format.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return format
  }
}
