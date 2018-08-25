from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def inicial():

	if request.method == 'POST':
		espacio = request.form['espacio']		

		
		if espacio == 'desierto':
			color = '#DDDDAA'
			personaje = 'fox.png'
		elif espacio == 'mar':
			color = '#4433dd'
			personaje = 'pulpo.png'		
		elif espacio == 'selva':
			color = '#aabbff'
			personaje = 'mono.png'
		else: 
			color = '#ddeeff'
			personaje = 'jabali.png'
		
		
		
		
		return render_template('game/index.html', color=color, personaje=personaje)
	
	return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
