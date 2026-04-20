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
                            # Extract the JSON part if possible
                            try:
                                start_idx = line.find('{')
                                if start_idx != -1:
                                    data = json.loads(line[start_idx:])
                                    content = data.get('content', '')
                                    if search_str in content:
                                        print(f'--- CONTENT START ({path}) ---')
                                        print(content)
                                        print('--- CONTENT END ---')
                            except:
                                # If it's not JSON, just print the line
                                print(f'--- LINE START ({path}) ---')
                                print(line)
                                print('--- LINE END ---')
            except:
                pass
