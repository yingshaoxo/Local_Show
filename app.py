from flask import Flask, render_template, send_from_directory, session
from pprint import pprint
import os


LOCAL_PATH = "/home/yingshaoxo/Downloads" 
if os.path.isdir(LOCAL_PATH) == False:
    print("Local path doen't exists!")
    exit()
pprint(LOCAL_PATH)


all_files = []
global supposed_files
supposed_files = {'video': {'suffix':['mkv', 'mp4', 'flv', 'avi']}, 'music': {'suffix': ['mp3']}}
for root, dirs, files in os.walk(LOCAL_PATH):
    for name in files:
        all_files.append(os.path.join(root, name).replace('\\', '/'))
all_files = [url.replace(LOCAL_PATH, '').strip('/') for url in all_files] # get rid of base_url
for category in supposed_files:
    supposed_files[category].update({'urls': sorted([name for name in all_files if name[-4:-3] == '.' and name[-3:] in supposed_files[category]['suffix']])})
#for category in supposed_files:
#    pprint(supposed_files[category]['urls'])


app = Flask(__name__)
@app.route("/")
def index():
    return render_template('index.html', items=supposed_files.keys())

@app.route("/video")
def video():
    items = supposed_files['video']['urls']
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    #print('common_path: ', common_path)
    return render_template('video.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])

@app.route("/music")
def music():
    items = supposed_files['music']['urls']
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    #print('common_path: ', common_path)
    return render_template('music.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])

@app.route('/files/<path:filename>')
def static_files(filename):
    return send_from_directory(LOCAL_PATH, filename)

if __name__ == '__main__':
    app.secret_key = 'some random string'
    app.run(host='0.0.0.0', port=5000, debug=True)

