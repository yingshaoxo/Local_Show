FROM python:3.6

COPY . /usr/src/app/
ADD ./Music/ /usr/src/music/

RUN pip install --no-cache-dir flask

RUN chmod +x /usr/src/app/app.py

EXPOSE 5277 

CMD ["python", "/usr/src/app/app.py", "/usr/src/music"]
