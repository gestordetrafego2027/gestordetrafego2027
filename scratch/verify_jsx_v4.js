
import fs from 'fs';
const content = fs.readFileSync('c:/Users/almeida/Documents/house-mazzutti-v2/src/app/comunidade/page.js', 'utf8');

let pos = 0;
let stack = [];
// Better regex to handle newlines inside tags
const tagRegex = /<(\/?)([a-zA-Z0-9]+)([\s\S]*?)(\/?)>/g;
let match;

while ((match = tagRegex.exec(content)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2];
    const attributes = match[3];
    const isSelfClosing = match[4] === '/' || attributes.trim().endsWith('/');
    const line = content.substring(0, match.index).split('\n').length;

    if (tagName === 'div' || tagName === 'section' || tagName === 'main' || tagName === 'footer' || tagName === 'Header' || tagName === 'Link' || tagName === 'span') {
        if (isClosing) {
            if (stack.length === 0) {
                console.log(`ERROR: Unexpected closing tag </${tagName}> at line ${line}`);
            } else {
                const last = stack.pop();
                if (last.tag !== tagName) {
                    console.log(`ERROR: Mismatched tag at line ${line}. Expected </${last.tag}> (opened at line ${last.line}) but found </${tagName}>`);
                    // recover
                    stack.push(last);
                }
            }
        } else if (!isSelfClosing) {
            stack.push({ tag: tagName, line });
        }
    }
}

if (stack.length > 0) {
    console.log("Unclosed tags:");
    stack.forEach(s => console.log(`- <${s.tag}> at line ${s.line}`));
} else {
    console.log("All tags balanced.");
}
