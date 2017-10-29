module.exports = exports = (schema, options)  => {
    
    schema.add({ 
        updatedBy: { 
            type: String, 
            required: true, 
        },
        createdBy:  { 
            type: String, 
            required: true
        }
    });


    schema.pre('findOneAndUpdate', function (next) {

        this._update =  this._update || {};
        
        delete this._update['createdBy'];

        next();
    })

    schema.pre('update', function (next) {

        this._update =  this._update || {};

        if(this._update['$set']){
            delete this._update['$set']['createdBy'];
        }

        next();
    })

}