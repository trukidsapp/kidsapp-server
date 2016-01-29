var test = require("../routes/test.js");

describe("test files can find app code", function () {
	it("should say hello", function () {
		expect(test.get).toBe(undefined);
	});
});    