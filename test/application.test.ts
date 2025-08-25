import { Application } from "../src/application.ts"
import { describe, it } from "mocha"
import { expect } from "chai"

describe("Application", () => {
    it("should run and return a message", () => {
        const app = new Application({ propertyNumberOne: "one", propertyNumberTwo: 2 });
        const result = app.run();
        expect(result).to.equal('I am the program and I am running');
    });

    it("should return the correct property based on the number", () => {
        const app = new Application({ propertyNumberOne: "one", propertyNumberTwo: 2 });
        expect(app.getProperty(1)).to.equal("one");
        expect(app.getProperty(2)).to.equal(2);
    });
});