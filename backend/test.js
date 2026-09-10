const request = require("supertest");
const app = require("./server");

test("Health check", async () => {
    const res = await request(app).get("/health");
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("healthy");
});

test("Valid request", async () => {
    const res = await request(app)
        .post("/process")
        .send({
            action: "simplify",
            page_text: "Government website content",
            language: "English"
        });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
});

test("Empty webpage", async () => {
    const res = await request(app)
        .post("/process")
        .send({
            action: "simplify",
            page_text: "",
            language: "English"
        });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
});

test("Invalid action", async () => {
    const res = await request(app)
        .post("/process")
        .send({
            action: "wrong",
            page_text: "Some content",
            language: "English"
        });

    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
});