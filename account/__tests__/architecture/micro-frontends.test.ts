import "tsarch/dist/jest";
import { filesOfProject } from "tsarch";

describe("Account Zone Architecture", () => {
    jest.setTimeout(60000);

    it("account should not depend on home or catalog", async () => {
        const accountToHomeRule = filesOfProject()
            .inFolder("account")
            .shouldNot()
            .dependOnFiles()
            .inFolder("home");

        const accountToCatalogRule = filesOfProject()
            .inFolder("account")
            .shouldNot()
            .dependOnFiles()
            .inFolder("catalog");

        await expect(accountToHomeRule).toPassAsync();
        await expect(accountToCatalogRule).toPassAsync();
    });

    it("shared components should not depend on account", async () => {
        const sharedToAccountRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("account");
        await expect(sharedToAccountRule).toPassAsync();
    });

    it("account should be free of cycles", async () => {
        const rule = filesOfProject().inFolder("account/src").should().beFreeOfCycles();
        await expect(rule).toPassAsync();
    });
}); 