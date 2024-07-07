import request from 'supertest';
import expressApp from '../src/main';

describe('Question Controller', () => {
    let questionId: number;

    // Test GET endpoint
    describe('GET /api/question', () => {
        it('should return all questions', async () => {
            // Send a GET request to get all questions
            const res = await request(expressApp).get('/api/question');

            // Expect a successful response with status code 200
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    // Test POST endpoint
    describe('POST /api/question', () => {
        it('should create a new question', async () => {
            // Send a POST request to insert a new question
            const res = await request(expressApp).post('/api/question').send({
                title: 'Test Question',
                content: 'This is a test question',
            });

            // Expect a successful response with status code 201
            expect(res.status).toBe(201);
            expect(res.body.success).toBe(true);

            const { id } = res.body.data;
            expect(typeof id).toBe('number');

            questionId = id; // Store the ID for use in PATCH and DELETE requests
        });
    });

    // Test PATCH endpoint
    describe('PATCH /api/question', () => {
        it('should update an existing question', async () => {
            // Depends on the previous test to have stored the questionId
            if (!questionId) {
                throw new Error("No questionId provided, skipping...");
            }

            // Prepare updated question data
            const record = {
                id: questionId,
                title: 'Updated Test Question',
                content: 'This is an updated test question',
            };
        
            // Send a PATCH request to update the question with the stored questionId
            const res = await request(expressApp).patch("/api/question").send(record);
            
            // Expect a successful response with status code 200
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });

    // Test DELETE endpoint
    describe('DELETE /api/question', () => {
        it('should delete an existing question', async () => {
            // Depends on the previous test to have stored the questionId
            if (!questionId) {
                throw new Error("No questionId provided, skipping...");
            }

            // Send a DELETE request to delete the question with the stored ID
            const res = await request(expressApp).delete("/api/question?" + new URLSearchParams({ id: questionId+"" }).toString());
            
            // Expect a successful response with status code 200
            expect(res.status).toBe(200);
            expect(res.body.success).toBe(true);
        });
    });
});