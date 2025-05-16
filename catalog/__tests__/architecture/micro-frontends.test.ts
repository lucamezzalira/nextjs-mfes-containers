import "tsarch/dist/jest";
import { filesOfProject } from "tsarch";

describe("Catalog Zone Architecture", () => {
    jest.setTimeout(60000);

    it("catalog should not depend on home or account", async () => {
        const catalogToHomeRule = filesOfProject()
            .inFolder("catalog")
            .shouldNot()
            .dependOnFiles()
            .inFolder("home");

        const catalogToAccountRule = filesOfProject()
            .inFolder("catalog")
            .shouldNot()
            .dependOnFiles()
            .inFolder("account");

        await expect(catalogToHomeRule).toPassAsync();
        await expect(catalogToAccountRule).toPassAsync();
    });

    it("shared components should not depend on catalog", async () => {
        const sharedToCatalogRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("catalog");
        await expect(sharedToCatalogRule).toPassAsync();
    });

    it("catalog should be free of cycles", async () => {
        const rule = filesOfProject().inFolder("catalog/src").should().beFreeOfCycles();
        await expect(rule).toPassAsync();
    });
}); 