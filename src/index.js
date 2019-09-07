class deepClone {
    constructor() {
        this.cache =[]; //缓存
    }
    clone(source) {
        //基本类型的拷贝
        if (!(source instanceof Object)) return source;

        let cacheResult = this.getCacheResult(source)
        if (cacheResult) {
            return cacheResult
        } else {
            //引用类型的拷贝
            let sourceType = this.getType(source);
            let result;
            if (sourceType === 'Function') {
                result = function() {
                    return source.apply(this,[...arguments])
                }
            } else if (sourceType === 'Array') {
                result = [];
            } else if (sourceType === 'RegExp') {
                let pattern = source.source;
                let flag = source.flags;
                result = new RegExp(pattern,flag)
            } else if (sourceType === 'Date') {
                result = new Date(source)
            } else {
                result = {};
            }
            let cacheItem = [source,result]
            this.cache.push(cacheItem)

            for (let key in source) {
                if (source.hasOwnProperty(key)) {
                    result[key] = this.clone(source[key]) 
                }
            }
            return result
        }   
    }
    getType(source) {
        let type = Object.prototype.toString.call(source).slice(8,-1)
        return type
    }
    getCacheResult(source) {
        for (let i = 0; i < this.cache.length; i++) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }
}
// let cache = []; //缓存
// function deepClone(source) {
//     //基本类型的拷贝
//     if (!(source instanceof Object)) return source;

//     let cacheResult = getCacheResult(source)
//     if (cacheResult) {
//         return cacheResult
//     } else {
//         //引用类型的拷贝
//         let sourceType = getType(source);
//         let result;
//         if (sourceType === 'Function') {
//             result = function() {
//                 return source.apply(this,[...arguments])
//             }
//         } else if (sourceType === 'Array') {
//             result = [];
//         } else if (sourceType === 'RegExp') {
//             let pattern = source.source;
//             let flag = source.flags;
//             result = new RegExp(pattern,flag)
//         } else if (sourceType === 'Date') {
//             result = new Date(source)
//         } else {
//             result = {};
//         }
//         let cacheItem = [source,result]
//         cache.push(cacheItem)

//         for (let key in source) {
//             if (source.hasOwnProperty(key)) {
//                 result[key] = deepClone(source[key]) 
//             }
//         }
//         return result
//     }   
// }
// function getType(source) {
//     let type = Object.prototype.toString.call(source).slice(8,-1)
//     return type
// }
// function getCacheResult(source) {
//     for (let i = 0; i < cache.length; i++) {
//         if (cache[i][0] === source) {
//             return cache[i][1]
//         }
//     }
//     return undefined
// }
module.exports = deepClone