import os
import sys

LOCAL_PATH = "/home"

if sys.argv[1:] == []:
    print('usage:', 'python3 ftp.py your_folder_path')
else:
    giving_path = sys.argv[-1:][0]
    if giving_path == "&":
        giving_path = sys.argv[-2:][0]

    if os.path.isdir(giving_path):
        LOCAL_PATH = giving_path
    else:
        print(giving_path)
        print('The path you were giving does not exist!')

if os.path.isdir(LOCAL_PATH) == False:
    print("Local path doen't exists!")
    exit()

LOCAL_PATH = os.path.abspath(LOCAL_PATH)
print(LOCAL_PATH)


from pyftpdlib.authorizers import DummyAuthorizer
from pyftpdlib.handlers import FTPHandler
from pyftpdlib.servers import FTPServer

authorizer = DummyAuthorizer()
authorizer.add_anonymous(LOCAL_PATH, perm="elradfmw")

handler = FTPHandler
handler.authorizer = authorizer

server = FTPServer(("0.0.0.0", 21), handler)
server.serve_forever()
