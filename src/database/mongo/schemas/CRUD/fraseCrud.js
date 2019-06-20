const Frase = require('../fraseSchema');

module.exports = {
    // Traz x dados do schema informado     
    create(item) {
       return Frase.create(item);    
    },    
    read(query, skip= 0, limit= 10) {     
       return Frase.find(query).skip(skip).limit(limit); 
    },
    update(id, item) {
       return Frase.updateOne({_id: id}, {$set: item})//updateOne é o novo update
    },
    
    delete(id) {
       return Frase.deleteOne({_id: id});
    },
}