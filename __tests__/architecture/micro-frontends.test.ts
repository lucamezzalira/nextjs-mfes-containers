import "tsarch/dist/jest";
import { filesOfProject } from "tsarch";
import * as fs from 'fs';
import * as path from 'path';

describe("Micro-frontends Architecture", () => {
    // Architecture tests can take a while to finish
    jest.setTimeout(60000);

    it("zones should not depend on each other", async () => {
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

    it("components folder should only contain header and footer", async () => {
        const componentsDir = path.join(process.cwd(), 'shared', 'src', 'components');
        const dirs = fs.readdirSync(componentsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);

        expect(dirs).toHaveLength(2);
        expect(dirs).toContain('header');
        expect(dirs).toContain('footer');
    });

    it("shared components should not depend on zones", async () => {
        const sharedToHomeRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("home");

        const sharedToAccountRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("account");

        const sharedToCatalogRule = filesOfProject()
            .inFolder("shared")
            .shouldNot()
            .dependOnFiles()
            .inFolder("catalog");

        await expect(sharedToHomeRule).toPassAsync();
        await expect(sharedToAccountRule).toPassAsync();
        await expect(sharedToCatalogRule).toPassAsync();
    });

    it("zones should be free of cycles", async () => {
        const rule = filesOfProject()
            .inFolder("home")
            .should()
            .beFreeOfCycles();

        await expect(rule).toPassAsync();
    });
}); 