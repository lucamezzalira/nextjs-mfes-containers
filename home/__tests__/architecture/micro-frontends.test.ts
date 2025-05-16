import "tsarch/dist/jest";
import { filesOfProject } from "tsarch";

describe("Home Zone Architecture", () => {
    jest.setTimeout(60000);

    it("home should not depend on account or catalog", async () => {
        const homeToAccountRule = filesOfProject()
            .inFolder("home")
            .shouldNot()
            .dependOnFiles()
            .inFolder("account");

        const homeToCatalogRule = filesOfProject()
            .inFolder("home")
            .shouldNot()
            .dependOnFiles()
            .inFolder("catalog");

        await expect(homeToAccountRule).toPassAsync();
        await expect(homeToCatalogRule).toPassAsync();
    });

    it("shared components should not depend on home", async () => {
        const sharedToHomeRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("home");
        await expect(sharedToHomeRule).toPassAsync();
    });

    it("home should be free of cycles", async () => {
        const rule = filesOfProject().inFolder("home/src").should().beFreeOfCycles();
        await expect(rule).toPassAsync();
    });
}); 