const { filesOfProject } = require('tsarch');
const fs = require('fs');
const path = require('path');

async function generateDiagram() {
  // Get all files in the project
  const files = filesOfProject();

  // Get zones
  const zones = files.inFolder('src').should().matchPattern('**/*').getFiles();
  const zoneNames = [...new Set(zones.map(file => file.split('/')[1]))];

  // Get shared components
  const sharedComponents = files.inFolder('shared/src/components').should().matchPattern('**/*').getFiles();
  const componentNames = [...new Set(sharedComponents.map(file => file.split('/')[3]))];

  // Generate Mermaid diagram
  let diagram = `## Architecture Diagram\n\n\`\`\`mermaid\ngraph TD\n`;
  
  // Add shared components subgraph
  diagram += `    subgraph "Shared Components"\n`;
  diagram += `        SC[Shared Components]\n`;
  componentNames.forEach(comp => {
    diagram += `        ${comp.charAt(0).toUpperCase() + comp.slice(1)}\n`;
    diagram += `        SC --> ${comp.charAt(0).toUpperCase() + comp.slice(1)}\n`;
  });
  diagram += `    end\n\n`;

  // Add zones subgraph
  diagram += `    subgraph "Zones"\n`;
  zoneNames.forEach(zone => {
    diagram += `        ${zone.charAt(0).toUpperCase() + zone.slice(1)}[${zone.charAt(0).toUpperCase() + zone.slice(1)} Zone]\n`;
  });
  diagram += `    end\n\n`;

  // Add dependencies between zones (should not exist)
  zoneNames.forEach((zone1, i) => {
    zoneNames.slice(i + 1).forEach(zone2 => {
      diagram += `    ${zone1.charAt(0).toUpperCase() + zone1.slice(1)} -.x. ${zone2.charAt(0).toUpperCase() + zone2.slice(1)}\n`;
    });
  });
  diagram += '\n';

  // Add dependencies from zones to shared (allowed)
  zoneNames.forEach(zone => {
    diagram += `    ${zone.charAt(0).toUpperCase() + zone.slice(1)} --> SC\n`;
  });
  diagram += '\n';

  // Add dependencies from shared to zones (not allowed)
  zoneNames.forEach(zone => {
    diagram += `    SC -.x. ${zone.charAt(0).toUpperCase() + zone.slice(1)}\n`;
  });
  diagram += '\n';

  // Add cycles check
  zoneNames.forEach(zone => {
    diagram += `    ${zone.charAt(0).toUpperCase() + zone.slice(1)} -.x. ${zone.charAt(0).toUpperCase() + zone.slice(1)}\n`;
  });
  diagram += '\n';

  // Add styles
  diagram += `    style SC fill:#f9f,stroke:#333,stroke-width:2px\n`;
  zoneNames.forEach(zone => {
    diagram += `    style ${zone.charAt(0).toUpperCase() + zone.slice(1)} fill:#bbf,stroke:#333,stroke-width:2px\n`;
  });

  diagram += '```\n';

  // Write to temporary file
  fs.writeFileSync('temp-diagram.md', diagram);
}

generateDiagram().catch(console.error); 