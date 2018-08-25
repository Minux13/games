var distanciaRamdom = [50,100,200,150,80,220,400,250];

var character = {
    refresh: function(){
        character.x            = 30;
	character.y            = game.canvas.height - 25 - character.height;	//25 margen inferior
        character.right        = character.x + character.width;
        character.left         = character.x;
	character.middleX      = 30 + (character.width/2);
	character.aceleracionY = -24;
	character.sides();
    },
    img          : document.getElementById("nota1"),
    pie          : 0, 
    x            : 0, 
    y            : 0,
    width        : 55,
    height       : 65,
    //middleWidth  : this.width / 2,
    //middleHeight : this.height / 2,
    isJumping    : true,
    aceleracionY : -24,
    incremento   : 3,
    jump         : function(){
	if(this.isJumping){
	    this.y = this.y + this.aceleracionY;
	    this.aceleracionY = this.aceleracionY + 3;
	    if( this.aceleracionY > 24 ){
		this.isJumping = false;
		this.aceleracionY = -24;
	    }
	}	    
    },
    right        : this.x + this.width,
    left         : this.x,
    down         : this.y + this.height - 10,
    middleX      : 0,
    middleY      : 0,
    sides        : function(){
        character.down    = character.y + character.height - 10;
	character.middleY = character.y + (character.height/2);
    }
};

function handle(){
    this.img  = document.getElementById("obs");
    this.x = 1500;
    this.y = 140;
    this.width = 45;
    this.height = 65;
}

var game = {
    canvas : document.createElement("canvas"),
    context : undefined,
    interval : undefined,
    secondsInterval : 40,// Milisegundos en los que se ejecuta un frame
    pixelAvanceHandle : -10,//Desplazamiento del obstaculo, cuando los frames avanzan cien este se aumenta una unidad, es negativo por que va a la izquierda
    frames : 0,
    handles : [new handle],
    initValues : function(){
	character.refresh();
        game.frames = 0;
	game.pixelAvanceHandle = -10;
	game.handles = [new handle];
	document.getElementById("cuerpo").addEventListener("keydown", function(){
	    this.removeEventListener('keydown',arguments.callee,false);
	    this.removeEventListener('touchstart',arguments.callee,false);
            game.start();	
	} );

        document.getElementById("cuerpo").addEventListener("touchstart", function(){
	    this.removeEventListener('keydown',arguments.callee,false);
	    this.removeEventListener('touchstart',arguments.callee,false);
            game.start();	
	} );
	game.draw();
    },
    frame: function(){
	game.frames = game.frames + 1;
		
	//Avanza en x los obstaculos
	for(h=0; h<game.handles.length; h++){
		game.handles[h].x = game.handles[h].x + game.pixelAvanceHandle;
	}
	
	//Pie
	/*this.personaje.pie= this.personaje.pie-1;
	if(this.personaje.pie <= -3){
	    this.personaje.pie = 3;
	}*/
	
	//Si se elimina un obstaculo
	if(game.handles[0].x <= -100){
	    game.handles[0].x = game.canvas.width + distanciaRamdom[Math.floor((Math.random() * 8))] ;
	}

	character.jump();
	
	//Aceleracion de los obstaculos
	if( game.frames % 100 == 0){
	    game.pixelAvanceHandle = game.pixelAvanceHandle - 1;
	}
	
	character.sides();
	izquierdaObstaculo = game.handles[0].x + 5;	//Menos 10 por que abarca mucho la imagen
	derechaObstaculo = game.handles[0].x + game.handles[0].width - 15;
	arribaObstaculo = game.handles[0].y;
	
	//Verifica si topa con el obstaculo
	if( izquierdaObstaculo <= character.right ){//Si el lado Izquierdo del obstaculo esta del lado izquierdo a partir del lado derecho del personaje
	    if( izquierdaObstaculo <= character.middleX ) {//Si el lado Izquierdo del obstaculo esta del lado izquierdo a partir de la mitad del personaje
	        if( derechaObstaculo >= character.left && character.down >= arribaObstaculo ){//Si el lado derecho del obstaculo esta del lado derecho del personaje a partir del lado izquierdo del personaje && la parte de abajo del personaje esta abajo del obstaculo a partir del techo del obstaculo
		    document.getElementById("cuerpo").removeEventListener("keydown", precionaLetra);
     	    	    document.getElementById("cuerpo").removeEventListener("touchstart", clicky);
     	    	    game.stop();
     	    	    setTimeout(function(){
		        game.initValues();
     	    	    }, 3000);
		}
	    }else{
		if( derechaObstaculo >= character.middleX && character.middleY >= arribaObstaculo ){
		    document.getElementById("cuerpo").removeEventListener("keydown", precionaLetra);
     	    	    document.getElementById("cuerpo").removeEventListener("touchstart", clicky);
     	    	    game.stop();
     	    	    setTimeout(function(){
		        game.initValues();
     	    	    }, 3000);
		}
	    }
	}

	//Si pierde
	/*
	if( izquierdaObstaculo <= character.right && derechaObstaculo >= character.middleX ){
		console.log("aaaaaaaaaaa")
     	    if( character.middleY >= arribaObstaculo ){
     
     	    }
	}else if( izquierdaObstaculo <= character.middleX && derechaObstaculo >= character.left ){
		console.log("bbbbbbbb")
     	    if( character.down >= arribaObstaculo ){

     	    }
	}
	*/

	game.draw();
    },
    draw : function(){	

        var ctx = this.context;
        //piecito = lienzo.personaje.pie / Math.abs(lienzo.personaje.pie);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        //Draw handle
        for(h=0; h<game.handles.length; h++){
            ctx.drawImage( game.handles[h].img, game.handles[h].x, game.handles[h].y, game.handles[h].width, game.handles[h].height);
	}
        //Draw character
	ctx.drawImage( character.img, character.x, character.y, character.width, character.height);
    },
    createDOMCanvas : function() {
    
    	widthScreen = screen.width;
		
	if( widthScreen > 650 ){
	    widthCanvas = 600;
	    //this.widht = widthCanvas;
	}else {
	    widthCanvas = widthScreen - 30;
	    //this.widht = widthCanvas;
	}
    	//Freatures DOM
    	var canvasContainer = document.getElementById("contenedorcanvas");    
        this.canvas.width = widthCanvas;
        this.canvas.height = 230;
        this.context = this.canvas.getContext("2d");
        canvasContainer.appendChild(this.canvas);        
       
    },
    start : function() {
	document.getElementById("cuerpo").addEventListener("keydown", precionaLetra);
	document.getElementById("cuerpo").addEventListener("touchstart", clicky);
        this.interval = setInterval( this.frame, this.secondsInterval);
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    /*reanudar: function(){
    	this.interval = setInterval(paisajeFrame, numFrames);
    }*/
}



	

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }    
}


function precionaLetra(event) {
    var x = event.which || event.keyCode;
        
    if( x== 32 || x== '38' || x== 13 ){
	character.isJumping = true;
    }
}

function clicky(event) {        
    character.isJumping = true;	
}

