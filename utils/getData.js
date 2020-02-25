function getData(dataName,callback){
    var noteData = window[dataName];
    callback(noteData)
}