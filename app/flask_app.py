from flask import Flask, render_template, redirect, send_from_directory, session
from pprint import pprint
import os
import sys
import random


LOCAL_PATH = "/home" 

if sys.argv[1:] == []:
    print('usage:', 'python3 app.py your_folder_path')
else:
    giving_path = sys.argv[-1:][0]
    if giving_path == "&":
        giving_path = sys.argv[-2:][0]

    if os.path.isdir(giving_path):
        LOCAL_PATH = giving_path
    else:
        print(giving_path)
        print('The path you were giving does not exist!')
        #exit()
    
if os.path.isdir(LOCAL_PATH) == False:
    print("Local path doen't exists!")
    exit()

pprint(LOCAL_PATH)


def prepare():
    all_files = []
    global supposed_files, LOCAL_PATH
    supposed_files = {'video': {'suffix':['mkv', 'mp4', 'flv', 'avi']}, 'music': {'suffix': ['mp3']}}
    for root, dirs, files in os.walk(LOCAL_PATH):
        for name in files:
            all_files.append(os.path.join(root, name).replace('\\', '/'))
    all_files = [url.replace(LOCAL_PATH, '').strip('/') for url in all_files] # get rid of base_url
    for category in supposed_files:
        supposed_files[category].update({'urls': sorted([name for name in all_files if name[-4:-3] == '.' and name[-3:] in supposed_files[category]['suffix']])})

    supposed_files.update({'file':{'urls':all_files}})
    #for category in supposed_files:
    #    pprint(supposed_files[category]['urls'])


global supposed_files, app
prepare()


app = Flask(__name__)
@app.route("/")
def index():
    global prepare
    prepare()
    return render_template('index.html', items=supposed_files.keys())

@app.route("/video")
def video():
    items = supposed_files['video']['urls']
    if len(items) == 0:
        return redirect('/')
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    #print('common_path: ', common_path)
    return render_template('video.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])

@app.route("/music")
def music():
    items = supposed_files['music']['urls']
    if len(items) == 0:
        return redirect('/')
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    #print('common_path: ', common_path)
    return render_template('music.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])

@app.route("/file")
def file():
    items = supposed_files['file']['urls']
    if len(items) == 0:
        return redirect('/')
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    #print('common_path: ', common_path)
    return render_template('file.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])

@app.route('/music/demo.mp3')
def random_music():
    items = supposed_files['music']['urls']
    length = len(items)
    if length == 0:
        return ''
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    return send_from_directory(LOCAL_PATH, items[random.randrange(0, length)])

@app.route('/files/<path:filename>')
def static_files(filename):
    return send_from_directory(LOCAL_PATH, filename)

if __name__ == '__main__':
    app.secret_key = 'some random string'
    app.run(host='0.0.0.0', port=2018)