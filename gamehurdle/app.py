from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=['GET', 'POST'])
def inicial():

	if request.method == 'POST':
		espacio = request.form['espacio']		

		
		if espacio == 'desierto':
			color = '#d5edf7'
			personaje = 'zorro.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'pointy_mountains.png'
			background2 = 'piramides.png'
			background3 = 'hills2.png'
			pie = 'pieZ.png'
		elif espacio == 'himalaya':
			color = '#4433dd'
			personaje = 'reno.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'b1.png'
			background2 = 'b2.png'
			background3 = 'b3.png'
			pie = 'pieR.png'
		elif espacio == 'bosque':
			color = '#aabbff'
			personaje = 'lobo.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'e1.png'
			background2 = 'e2.png'
			background3 = 'e3.png'
			pie = 'pieL.png'
		else: #granja
			color = '#ddeeff'
			personaje = 'ardilla.png'
			clouds = 'clouds.png'
			sun = 'sun.png'
			background1 = 'd1.png'
			background2 = 'd2.png'
			background3 = 'd3.png'
			pie = 'pieA.png'
		
		
		
		
		return render_template('game/index.html', color=color, personaje=personaje, clouds=clouds, sun=sun, background1=background1, background2=background2, background3=background3, pie=pie)
	
	return render_template('index.html')


if __name__ == "__main__":
    app.run(host='0.0.0.0')
