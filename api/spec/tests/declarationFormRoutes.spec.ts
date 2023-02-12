import app from "@src/server";
import supertest, { SuperTest, Test, Response, agent } from "supertest";
import FullPaths from "@src/routes/constants/FullPaths";
import HttpStatusCodes from "@src/constants/HttpStatusCodes";
import type { TSubmission } from "@src/models/DeclarationSubmission";
const { Get, Create } = FullPaths.DeclarationForm;

describe("DeclarationFormRouter", () => {
  let agent: SuperTest<Test>;

  beforeAll((done) => {
    agent = supertest.agent(app);
    done();
  });

  describe(`POST: ${Create}`, () => {
    it("should save valid input", (done) => {
      agent
        .post(Create)
        .send({
          name: "test",
          temperature: 36.5,
          hasSymptoms: false,
          hasContact: false,
        })
        .set("Accept", "application/json")
        .end((_: Error, res: Response) => {
          expect(res.status).toBe(HttpStatusCodes.CREATED);
          done();
        });
    });

    it("should reject invalid input", (done) => {
      agent
        .post(Create)
        .send({
          name: "test",
          temperature: 0,
          hasContact: false,
        })
        .set("Accept", "application/json")
        .end((_: Error, res: Response) => {
          expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
          done();
        });
    });
  });

  describe(`GET: ${Get}`, () => {
    it("should return saved entries", (done) => {
      agent
        .get(Get)
        .set("Accept", "application/json")
        .end((_: Error, res: Response) => {
          expect(res.status).toBe(HttpStatusCodes.OK);
          expect((res.body as Array<TSubmission>).length).toBeGreaterThan(0);
          done();
        });
    });
  });
});
