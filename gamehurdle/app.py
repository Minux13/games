from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def inicial():

	if request.method == 'POST':
		espacio = request.form['espacio']		

		
		if espacio == 'desierto':
			color = '#d5edf7'
			personaje = 'fox.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'pointy_mountains.png'
			background2 = 'piramides.png'
			background3 = 'hills2.png'
			pie = 'pieF.png'
		elif espacio == 'mar':
			color = '#4433dd'
			personaje = 'pulpo.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'pointy_mountains.png'
			background2 = 'piramides.png'
			background3 = 'hills2.png'
			pie = 'pieF.png'
		elif espacio == 'selva':
			color = '#aabbff'
			personaje = 'mono.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'pointy_mountains.png'
			background2 = 'piramides.png'
			background3 = 'hills2.png'
			pie = 'pieF.png'
		else: 
			color = '#ddeeff'
			personaje = 'jabali.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'pointy_mountains.png'
			background2 = 'piramides.png'
			background3 = 'hills2.png'
			pie = 'pieF.png'
		
		
		
		
		return render_template('game/index.html', color=color, personaje=personaje, clouds=clouds, sun=sun, background1=background1, background2=background2, background3=background3, pie=pie)
	
	return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
