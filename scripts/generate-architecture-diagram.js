const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function parseTestFile(filePath) {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, 'utf8'),
    ts.ScriptTarget.Latest,
    true
  );

  const rules = {
    zones: new Set(),
    sharedComponents: new Set(),
    dependencies: [],
    cycles: []
  };

  function visit(node) {
    if (ts.isCallExpression(node)) {
      // Parse zone dependencies
      if (node.expression.getText() === 'filesOfProject') {
        const folderMatch = node.arguments[0]?.getText().match(/['"]([^'"]+)['"]/);
        if (folderMatch) {
          const folder = folderMatch[1];
          if (folder.startsWith('src/')) {
            rules.zones.add(folder.split('/')[1]);
          } else if (folder.startsWith('shared/src/components/')) {
            rules.sharedComponents.add(folder.split('/')[3]);
          }
        }
      }

      // Parse dependency rules
      if (node.expression.getText() === 'shouldNot') {
        const parent = node.parent;
        if (parent && ts.isCallExpression(parent)) {
          const folderMatch = parent.arguments[0]?.getText().match(/['"]([^'"]+)['"]/);
          if (folderMatch) {
            const folder = folderMatch[1];
            if (folder.startsWith('src/')) {
              const zone = folder.split('/')[1];
              rules.dependencies.push({
                from: zone,
                to: 'shared',
                allowed: false
              });
            }
          }
        }
      }

      // Parse cycle rules
      if (node.expression.getText() === 'shouldNotHaveCycles') {
        const parent = node.parent;
        if (parent && ts.isCallExpression(parent)) {
          const folderMatch = parent.arguments[0]?.getText().match(/['"]([^'"]+)['"]/);
          if (folderMatch) {
            const folder = folderMatch[1];
            if (folder.startsWith('src/')) {
              const zone = folder.split('/')[1];
              rules.cycles.push(zone);
            }
          }
        }
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return rules;
}

function generateDiagram(rules) {
  let diagram = `## Architecture Diagram\n\n\`\`\`mermaid\ngraph TD\n`;
  
  // Add shared components subgraph
  diagram += `    subgraph "Shared Components"\n`;
  diagram += `        SC[Shared Components]\n`;
  rules.sharedComponents.forEach(comp => {
    const compName = comp.charAt(0).toUpperCase() + comp.slice(1);
    diagram += `        ${compName}\n`;
    diagram += `        SC --> ${compName}\n`;
  });
  diagram += `    end\n\n`;

  // Add zones subgraph
  diagram += `    subgraph "Zones"\n`;
  rules.zones.forEach(zone => {
    const zoneName = zone.charAt(0).toUpperCase() + zone.slice(1);
    diagram += `        ${zoneName}[${zoneName} Zone]\n`;
  });
  diagram += `    end\n\n`;

  // Add dependencies between zones (should not exist)
  const zoneArray = Array.from(rules.zones);
  zoneArray.forEach((zone1, i) => {
    zoneArray.slice(i + 1).forEach(zone2 => {
      const zone1Name = zone1.charAt(0).toUpperCase() + zone1.slice(1);
      const zone2Name = zone2.charAt(0).toUpperCase() + zone2.slice(1);
      diagram += `    ${zone1Name} -.-> ${zone2Name}\n`;
      diagram += `    ${zone2Name} -.-> ${zone1Name}\n`;
    });
  });
  diagram += '\n';

  // Add dependencies from zones to shared (allowed)
  rules.zones.forEach(zone => {
    const zoneName = zone.charAt(0).toUpperCase() + zone.slice(1);
    diagram += `    ${zoneName} --> SC\n`;
  });
  diagram += '\n';

  // Add dependencies from shared to zones (not allowed)
  rules.zones.forEach(zone => {
    const zoneName = zone.charAt(0).toUpperCase() + zone.slice(1);
    diagram += `    SC -.-> ${zoneName}\n`;
  });
  diagram += '\n';

  // Add cycles check
  rules.cycles.forEach(zone => {
    const zoneName = zone.charAt(0).toUpperCase() + zone.slice(1);
    diagram += `    ${zoneName} -.-> ${zoneName}\n`;
  });
  diagram += '\n';

  // Add styles and legend
  diagram += `    style SC fill:#f9f,stroke:#333,stroke-width:2px\n`;
  rules.zones.forEach(zone => {
    const zoneName = zone.charAt(0).toUpperCase() + zone.slice(1);
    diagram += `    style ${zoneName} fill:#bbf,stroke:#333,stroke-width:2px\n`;
  });

  // Add legend
  diagram += `\n    subgraph Legend\n`;
  diagram += `        L1[Allowed] --> L2[Forbidden]\n`;
  diagram += `        style L1 fill:#9f9,stroke:#333,stroke-width:2px\n`;
  diagram += `        style L2 fill:#f99,stroke:#333,stroke-width:2px\n`;
  diagram += `    end\n`;

  diagram += '```\n';
  return diagram;
}

async function main() {
  try {
    const testFilePath = path.join(__dirname, '..', '__tests__', 'architecture', 'micro-frontends.test.ts');
    const rules = parseTestFile(testFilePath);
    const diagram = generateDiagram(rules);
    fs.writeFileSync('temp-diagram.md', diagram);
  } catch (error) {
    console.error('Error generating diagram:', error);
    process.exit(1);
  }
}

main(); 