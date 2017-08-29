const mocha = require('mocha');
const should = require('should');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userPlugin = require('../index');

mongoose.Promise = global.Promise;
mongoose = mongoose.createConnection('mongodb://localhost/test')


const testSchema = new Schema({});

testSchema.plugin(userPlugin);

const TestModel = mongoose.model("testModel", testSchema);


describe('creating model instance', function() {

    it('should have the createdBy field with type String', function(done){

        const testInstance = new TestModel({ createdBy: 'Vitor', updatedBy: 'Vitor'});

        testInstance.save()
        .then( savedInstance => {
            savedInstance.should.have.property('createdBy');
            savedInstance.createdBy.should.be.a.String;
            done();
        })

    });

    it('should have the updatedBy field with type String', function(done){

        const testInstance = new TestModel({ createdBy: 'Vitor', updatedBy: 'Vitor'});

        testInstance.save()
        .then( savedInstance => {
            savedInstance.should.have.property('updatedBy');
            savedInstance.updatedBy.should.be.a.String;
            done();
        })

    });

});
