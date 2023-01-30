
from flask import Flask, render_template, request

app = Flask(__name__)

@app.rout("/")

def index():
    return render_template("index.html")