from auto_everything.base import Terminal
t = Terminal()

from pprint import pprint
import os
import sys
import random


# 0. we need current forder path
CURRENT_PATH = os.path.dirname(__file__)


# 1. take care of paramater you're giving
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
        # exit()

if os.path.isdir(LOCAL_PATH) == False:
    print("Local path doen't exists!")
    exit()

LOCAL_PATH = os.path.abspath(LOCAL_PATH)
pprint(LOCAL_PATH)


# 2. run golang for static serving
go_serve_path = os.path.abspath(os.path.join(CURRENT_PATH, 'go_serve'))
if t.is_running("go_serve"):
    t.run_command("pkill go_serve")
t.run_program('{go_serve_path} -p "8100" -d "{target_folder}"'.format(
    go_serve_path=go_serve_path, target_folder=LOCAL_PATH))


# 3. import sanic and start develop 
from sanic import Sanic, response
from jinja2 import Template

app = Sanic()
app.static('/static', os.path.join(os.path.dirname(__file__), 'static'))
# app.static('/files', LOCAL_PATH)


@app.route("/files/<name:path>")
async def files(request, name):
    return response.redirect("http://" + request.host.split(':')[0] + ":8100/" + name)


def prepare():
    all_files = []
    global supposed_files, LOCAL_PATH
    supposed_files = {'video': {'suffix': [
        'mkv', 'mp4', 'flv', 'avi']}, 'music': {'suffix': ['mp3']}}
    for root, dirs, files in os.walk(LOCAL_PATH):
        for name in files:
            all_files.append(os.path.join(root, name).replace('\\', '/'))
    all_files = [url.replace(LOCAL_PATH, '').strip('/')
                 for url in all_files]  # get rid of base_url
    for category in supposed_files:
        supposed_files[category].update({'urls': sorted(
            [name for name in all_files if name[-4:-3] == '.' and name[-3:] in supposed_files[category]['suffix']])})

    supposed_files.update({'file': {'urls': all_files}})
    # for category in supposed_files:
    #    pprint(supposed_files[category]['urls'])


def render_template(html_name, **args):
    with open(os.path.join(os.path.dirname(__file__), 'templates', html_name), 'r', encoding="utf-8", errors='surrogateescape') as f:
        html_text = f.read()
    template = Template(html_text)
    template_text = template.render(args)
    return response.html(template_text)


global supposed_files
prepare()


@app.route("/")
async def index(request):
    global prepare
    prepare()

    supposed_files.update({'upload': ''})
    return render_template('index.html', items=supposed_files.keys())


@app.route("/video")
async def video(request):
    items = supposed_files['video']['urls']
    if len(items) == 0:
        url = app.url_for('index')
        return response.redirect(url)
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    # print('common_path: ', common_path)
    return render_template('video.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])


@app.route("/music")
async def music(request):
    items = supposed_files['music']['urls']
    if len(items) == 0:
        url = app.url_for('index')
        return response.redirect(url)
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    # print('common_path: ', common_path)
    return render_template('music.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])


@app.route("/file")
async def file(request):
    items = supposed_files['file']['urls']
    if len(items) == 0:
        url = app.url_for('index')
        return response.redirect(url)
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    # print('common_path: ', common_path)
    return render_template('file.html', items=items, common_path=common_path, colors=['normal', 'success', 'info', 'warning', 'danger'])


@app.route("/upload", methods=['OPTIONS', 'GET', 'POST'])
async def upload(request):
    if request.method == "GET":
        return render_template('upload.html')

    elif request.method == "POST":
        path = os.path.join(LOCAL_PATH, 'upload')
        if not os.path.exists(path):
            os.makedirs(path)

        for file_ in request.files['file']:
            file_path = os.path.join(path, file_.name)
            f = open(file_path, "wb")
            f.write(file_.body)
            f.close()

        return response.json(True)


@app.route('/music/demo.mp3')
async def random_music(request):
    items = supposed_files['music']['urls']
    length = len(items)
    if length == 0:
        return response.text("")
    common_path = os.path.commonpath(items) + '/'
    if common_path == '/':
        common_path = ''
    return await response.file(os.path.join(LOCAL_PATH, items[random.randrange(0, length)]))


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=2018, workers=4)
