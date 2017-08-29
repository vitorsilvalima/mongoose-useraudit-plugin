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

describe('updating model instance', function() {

    it('should have the same createdBy field as when it was first saved', function(done){

        const testInstance = new TestModel({ createdBy: 'Vitor', updatedBy: 'Vitor'});
        const updatedObj = { createdBy: 'Wilson' };

        testInstance.save()
        .then( savedInstance => TestModel.findByIdAndUpdate(savedInstance._id, updatedObj))
        .then( updatedInstance => {

            updatedInstance.should.have.property('createdBy');
            updatedInstance.createdBy.should.be.a.String;
            updatedInstance.createdBy.should.be.eql('Vitor');
            done();

        })


    });


    it('should have the updatedBy field updated', function(done){

        const testInstance = new TestModel({ createdBy: 'Vitor', updatedBy: 'Vitor'});
        const updatedObj = { updatedBy: 'Wilson' };

        testInstance.save()
        .then( savedInstance => TestModel.findByIdAndUpdate(savedInstance._id, updatedObj))
        .then( updatedInstance => {

            updatedInstance.should.have.property('updatedBy');
            updatedInstance.updatedBy.should.be.a.String;
            updatedInstance.updatedBy.should.be.eql('Vitor');
            done();

        })


    });



})
