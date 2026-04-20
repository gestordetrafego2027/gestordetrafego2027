import os

search_str = 'Book para Modelos'
root_dir = r'C:\Users\almeida\.gemini\antigravity\brain'

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.txt') or file.endswith('.json'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    # Read line by line to handle large files
                    for line_no, line in enumerate(f, 1):
                        if search_str in line:
                            print(f'Found in: {path} at line {line_no}')
                            # Print the line if it's not too long, or at least a portion
                            if len(line) < 500:
                                print(f'  Content: {line.strip()}')
                            else:
                                print(f'  Content (truncated): {line[:500].strip()}...')
            except:
                pass
