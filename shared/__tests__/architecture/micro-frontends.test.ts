import "tsarch/dist/jest";
import { filesOfProject } from "tsarch";
import * as fs from 'fs';
import * as path from 'path';

describe("Shared Library Architecture", () => {
    jest.setTimeout(60000);

    it("components folder should only contain header and footer", async () => {
        const componentsDir = path.join(process.cwd(), 'src', 'components');
        const dirs = fs.readdirSync(componentsDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        expect(dirs).toHaveLength(2);
        expect(dirs).toContain('header');
        expect(dirs).toContain('footer');
    });

    it("shared should be free of cycles", async () => {
        const rule = filesOfProject().inFolder("shared/src").should().beFreeOfCycles();
        await expect(rule).toPassAsync();
    });
}); 