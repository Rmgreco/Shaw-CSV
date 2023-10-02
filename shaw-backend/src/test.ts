import chai from 'chai';
import chaiHttp from 'chai-http';
import { app } from './index';

chai.use(chaiHttp);
const expect = chai.expect;

describe('CSV File Upload API', () => {
    it('should return a success message and data when a CSV file is uploaded', (done) => {
        chai
            .request(app)
            .post('/api/files')
            .attach('file', '/home/rafael/shawTest/Shaw-CSV/shaw-backend/src/mock/test.csv')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('message').equal('File uploaded successfully');
                expect(res.body).to.have.property('data').to.be.an('array');
                done();
            });
    });

    it('should return an error message when an invalid file is uploaded', (done) => {
        chai
            .request(app)
            .post('/api/files')
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Invalid file upload');
                done();
            });
    });

    it('should return user data based on a search query', (done) => {
        chai
            .request(app)
            .get('/api/users?q=John')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');

                done();
            });
    });

    it('should return an error when a missing search query parameter is provided', (done) => {
        chai
            .request(app)
            .get('/api/users')
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.have.property('error').to.equal('Missing search query parameter');
                done();
            });
    });
});
