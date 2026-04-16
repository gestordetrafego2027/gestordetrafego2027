
import fs from 'fs';
const content = fs.readFileSync('c:/Users/almeida/Documents/house-mazzutti-v2/src/app/comunidade/page.js', 'utf8');

let pos = 0;
let stack = [];
const tagRegex = /<(\/?)([a-zA-Z0-9]+)(?:\s+[^>]*?)?(\/?)>/g;
let match;

while ((match = tagRegex.exec(content)) !== null) {
    const isClosing = match[1] === '/';
    const tagName = match[2];
    const isSelfClosing = match[3] === '/';
    const line = content.substring(0, match.index).split('\n').length;

    if (isClosing) {
        if (stack.length === 0) {
            console.log(`ERROR: Unexpected closing tag </${tagName}> at line ${line}`);
        } else {
            const last = stack.pop();
            if (last.tag !== tagName) {
                console.log(`ERROR: Mismatched tag. Expected </${last.tag}> (opened at line ${last.line}) but found </${tagName}> at line ${line}`);
                // Try to recover
                stack.push(last);
            }
        }
    } else if (!isSelfClosing) {
        // Need to check if it's a known self-closing tag like <img> or <br> or <hr>
        const selfClosingTags = ['img', 'br', 'hr', 'input', 'meta', 'link'];
        if (!selfClosingTags.includes(tagName.toLowerCase())) {
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
