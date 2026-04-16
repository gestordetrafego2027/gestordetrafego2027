
import fs from 'fs';

const content = fs.readFileSync('c:/Users/almeida/Documents/house-mazzutti-v2/src/app/comunidade/page.js', 'utf8');

const regex = /<(\/?)(div|section|main|h2|h1|p|a|Link|footer|Header|span)(?:\s|>)/g;
let match;
const stack = [];

while ((match = regex.exec(content)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2];
    const line = content.substring(0, match.index).split('\n').length;

    if (isClosing) {
        if (stack.length === 0) {
            console.log(`ERROR: Unexpected closing tag </${tagName}> at line ${line}`);
        } else {
            const last = stack.pop();
            if (last.tag !== tagName) {
                console.log(`ERROR: Mismatched tag. Expected </${last.tag}> (from line ${last.line}) but found </${tagName}> at line ${line}`);
            }
        }
    } else {
        // Simple heuristic for self-closing or component tags that might not have children in this file
        // But in JSX, we need to be careful. Header is <Header ... />.
        // Let's check for the /> at the end of the opening tag.
        const fullTag = match[0];
        const tail = content.substring(match.index, content.indexOf('>', match.index) + 1);
        if (tail.endsWith('/>')) {
            // Self-closing, don't push to stack
        } else {
            stack.push({ tag: tagName, line });
        }
    }
}

if (stack.length > 0) {
    console.log("Unclosed tags remaining:");
    stack.forEach(s => console.log(`- <${s.tag}> opened at line ${s.line}`));
} else {
    console.log("All tags balanced.");
}
