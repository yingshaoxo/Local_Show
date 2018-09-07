#!/usr/bin/env /usr/bin/python3
from auto_everything.base import Python, Terminal
py = Python()
t = Terminal()

class Tools():
    def run_in_docker(self):
        t.run('python3 /usr/src/Local_Show/app/app.py /usr/src/Local_Show/files')

    def push(self, comment):
        self.__clear()

        t.run('git add .')
        t.run('git commit -m "{}"'.format(comment))
        t.run('git push origin')

    def pull(self):
        t.run("""
git fetch --all
git reset --hard origin/master
""")

    def __clear(self):
        commands = """
sudo rm -fr app/nohup.out
        """
        t.run(commands)

py.fire(Tools)
