var test = require("../routes/test");

describe("test files can find app code", function () {
	it("should say hello", function () {
		var string = test.testString;
		expect(string).toBe("Hello World");
	});
});    