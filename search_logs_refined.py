import os
import json

search_str = 'Últimos Artigos'
root_dir = r'C:\Users\almeida\.gemini\antigravity\brain'

for root, dirs, files in os.walk(root_dir):
    for file in files:
        if file.endswith('.txt') or file.endswith('.json'):
            path = os.path.join(root, file)
            try:
                with open(path, 'r', encoding='utf-8') as f:
                    for line in f:
                        if search_str in line and 'USER_INPUT' in line:
                            print(f'Found in: {path}')
                            data = json.loads(line)
                            print(data['content'])
            except:
                pass
