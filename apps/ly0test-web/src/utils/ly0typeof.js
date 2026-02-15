function ly0typeof(val){
    let key = Object.prototype.toString.call(val);
    if(key === "[object Undefined]"){
        return "Undefined"
    }
    if(key === "[object Null]"){
        return "Null"
    }
    if(key === "[object Boolean]"){
        return "Boolean"
    }
    if(key === "[object String]"){
        return "String"
    }
    if(key === "[object Number]"){
        return "Number"
    }
    if(key === "[object Object]"){
        return "Object"
    }
    if(key === "[object Array]"){
        return "Array"
    }
}

export default {
    ly0typeof
}