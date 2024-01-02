const app = require('../index'); 

var chai = require('chai');
var expect = chai.expect;
let chaiHttp = require('chai-http')

chai.use(chaiHttp)

describe('Notes API', () => {

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const res = await
        chai.request(app)
        .post('/api/notes')
        .send({ title: 'Test Note', description: 'This is a test note' });

      expect(res).to.have.status(201);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id');
      noteId = res.body._id;
    });

    it('should return an error for incomplete data', async () => {
      const res = await chai.request(app).post('/api/notes').send({ title: 'Incomplete Note' });

      expect(res).to.have.status(500);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
    });
  });


  describe('GET /api/notes', () => {
    it('should retrieve all notes', async () => {
      const res = await chai.request(app).get('/api/notes');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array');
    });
  });

  // Test GET /api/notes/:id
  describe('GET /api/notes/:id', () => {
    it('should retrieve a specific note by ID', async () => {
      const res = await chai.request(app).get(`/api/notes/${noteId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').equal(noteId);
    });

    it('should return an error for non-existent ID', async () => {
      const nonExistentId = '60f3c8b8a2ff07303475bd53';
      const res = await chai.request(app).get(`/api/notes/${nonExistentId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
    });
  });

  // Test PUT /api/notes/:id
  describe('PUT /api/notes/:id', () => {
    it('should update a specific note by ID', async () => {
      const res = await chai.request(app)
        .put(`/api/notes/${noteId}`)
        .send({ title: 'Updated Test Note', description: 'Updated content' });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('_id').equal(noteId);
      expect(res.body).to.have.property('title').equal('Updated Test Note');
      expect(res.body).to.have.property('description').equal('Updated content');
    });

    it('should return an error for non-existent ID', async () => {
      const nonExistentId = '60f3c8b8a2ff07303475bd53';
      const res = await chai.request(app).put(`/api/notes/${nonExistentId}`).send({ title: 'Updated Note' });

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
    });
  });

  // Test DELETE /api/notes/:id
  describe('DELETE /api/notes/:id', () => {
    it('should delete a specific note by ID', async () => {
      const res = await chai.request(app).delete(`/api/notes/${noteId}`);

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('message').equal('Note deleted successfully');
    });

    it('should return an error for deleting non-existent ID', async () => {
      const nonExistentId = '60f3c8b8a2ff07303475bd53'; 
      const res = await chai.request(app).delete(`/api/notes/${nonExistentId}`);

      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
    });
  });
});
