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

  const rules = [];

  function visit(node) {
    if (ts.isCallExpression(node)) {
      // Detect rules by test descriptions and method calls
      if (ts.isIdentifier(node.expression) && node.expression.escapedText === 'it') {
        const description = node.arguments[0]?.text;
        if (description) {
          rules.push(`- ${description}`);
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return rules;
}

function generateMarkdown(rules) {
  let md = '## Architecture Constraints\n\n';
  if (rules.length === 0) {
    md += '_No architecture rules found in tests._\n';
  } else {
    md += rules.join('\n') + '\n';
  }
  return md;
}

async function main() {
  try {
    const testFilePath = path.join(__dirname, '..', '__tests__', 'architecture', 'micro-frontends.test.ts');
    const rules = parseTestFile(testFilePath);
    const md = generateMarkdown(rules);
    fs.writeFileSync('temp-architecture-rules.md', md);
  } catch (error) {
    console.error('Error generating architecture rules:', error);
    process.exit(1);
  }
}

main(); 