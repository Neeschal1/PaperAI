FROM python:3.12-slim
WORKDIR /paperai
COPY . /paperai
RUN pip install -r requirements.txt
EXPOSE 5000
CMD ["python","./manage.py","runserver","0.0.0.0:8000"]