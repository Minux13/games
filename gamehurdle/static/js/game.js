var distanciaRamdom = [50,100,200,150,80,220,400,250];

var character = {
    refresh: function(){
        character.x            = 30;
	character.y            = game.canvas.height - 25 - character.height;	//25 margen inferior
        character.right        = character.x + character.width;
        character.left         = character.x;
	character.middleX      = 30 + (character.width/2);
	character.aceleracionY = -24;
	character.pie.x        = character.x + 16;
	character.pie.y        = character.y + character.height -13;
	character.sides();
    },
    img          : document.getElementById("nota1"),
    pie          : {
		     img: document.getElementById("pie"),
		     x : undefined,
		     y : undefined,
		     height: 16,
		     width: 8,
		     pie : 1
    }, 
    x            : 0, 
    y            : 0,
    width        : 55,
    height       : 65,
    //middleWidth  : this.width / 2,
    //middleHeight : this.height / 2,
    isJumping    : true,
    aceleracionY : -24,
    incremento   : 3,
    movement         : function(){
	if(this.isJumping){
	    this.y = this.y + this.aceleracionY;
	    this.aceleracionY = this.aceleracionY + 3;
	    if( this.aceleracionY > 24 ){
		this.isJumping = false;
		this.aceleracionY = -24;
	    }
	}	    

	//Character
	if(game.frames % 3 == 0){
	    character.pie.pie = character.pie.pie * -1;	
	}
	character.pie.y = character.y + character.height -13;

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

var background = {
    sun: {
	img: document.getElementById("sun"),
	x: 10,
	y: 10
    },
    clouds: {
        img: document.getElementById("clouds"),
	x1: 0,
	x2: undefined,
	y : 4,
	speed : 1
    },
    background1 : {
        img: document.getElementById("background1"),
        x1: 0,
	x2: undefined,
	y : 70,
	speed : 1
    },
    background2 : {
        img: document.getElementById("background2"),
	x1: 0,
	x2: undefined,
	y : 90,
	speed : 2
    },
    background3 : {
        img: document.getElementById("background3"),
        x1: 0,
	x2: undefined,
	y : 100,
	speed : 4
    },
    init: function(){
	background.clouds.img.height = 250;
	background.clouds.img.width = 1200;
	background.clouds.x1 = 0;
	background.clouds.x2 = background.clouds.img.width - 14;

	background.background1.img.height = 120;
	background.background1.img.width = 1200;
	background.background1.x1 = 0;
	background.background1.x2 = background.background1.img.width - 14;
	
	background.background2.img.height = 120;
	background.background2.img.width = 2000;
	background.background2.x1 = 0;
	background.background2.x2 = background.background2.img.width - 14;

	background.background3.x1 = 0;
	background.background3.x2 = background.background3.img.width - 14;
    },
    update: function(){
        background.clouds.x1 = background.clouds.x1 - background.clouds.speed;
        background.clouds.x2 = background.clouds.x2 - background.clouds.speed;
	if( background.clouds.x2 <= 0){
	    background.clouds.x1 =  background.clouds.x2 ;
	    background.clouds.x2 =  background.clouds.img.width - 14 ;
	}

	background.background1.x1 = background.background1.x1 - background.background1.speed;
        background.background1.x2 = background.background1.x2 - background.background1.speed;
	if( background.background1.x2 <= 0){
	    background.background1.x1 =  background.background1.x2 ;
	    background.background1.x2 =  background.background1.img.width - 14 ;
	}

        background.background2.x1 = background.background2.x1 - background.background2.speed;
        background.background2.x2 = background.background2.x2 - background.background2.speed;
	if( background.background2.x2 <= 0){
	    background.background2.x1 =  background.background2.x2 ;
	    background.background2.x2 =  background.background2.img.width - 14 ;
	}

        background.background3.x1 = background.background3.x1 - background.background3.speed;
        background.background3.x2 = background.background3.x2 - background.background3.speed;
	if( background.background3.x2 <= 0){
	    background.background3.x1 =  background.background3.x2 ;
	    background.background3.x2 =  background.background3.img.width - 14 ;
	}
    }
};

var game = {
    canvas : document.createElement("canvas"),
    context : undefined,
    interval : undefined,
    secondsInterval : 40,// Milisegundos en los que se ejecuta un frame
    pixelAvanceHandle : -10,//Desplazamiento del obstaculo, cuando los frames avanzan cien este se aumenta una unidad, es negativo por que va a la izquierda
    frames : 0,
    handles : [new handle],
    score : {
        element : document.getElementById('score')    
    },
    initValues : function(){
	character.refresh();
	background.init();
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
	game.score.element.innerHTML = Math.round(game.frames/10) ;
		
	//Avanza en x los obstaculos
	for(h=0; h<game.handles.length; h++){
		game.handles[h].x = game.handles[h].x + game.pixelAvanceHandle;
	}
	
	//Si se elimina un obstaculo
	if(game.handles[0].x <= -100){
	    game.handles[0].x = game.canvas.width + distanciaRamdom[Math.floor((Math.random() * 8))] ;
	}

	character.movement();
	
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
		    game.gameOver();
     	    	    /*game.stop();
     	    	    setTimeout(function(){
		        game.initValues();
     	    	    }, 3000);*/
		}
	    }else{
		if( derechaObstaculo >= character.middleX && character.middleY >= arribaObstaculo ){
		    game.gameOver();
		}
	    }
	}

	game.draw();
    },
    draw : function(){	

        var ctx = this.context;
        //piecito = lienzo.personaje.pie / Math.abs(lienzo.personaje.pie);
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	
	var c = background.clouds;	//clouds
	ctx.drawImage( c.img, c.x1, c.y, c.img.width, c.img.height);
	ctx.drawImage( c.img, c.x2, c.y, c.img.width, c.img.height);

        //Sun	
	ctx.drawImage( background.sun.img, background.sun.x, background.sun.y, background.sun.img.width -30, background.sun.img.height-30);

	var c = background.background1;	//background1
	ctx.drawImage( c.img, c.x1, c.y, c.img.width, c.img.height + 20);
	ctx.drawImage( c.img, c.x2, c.y, c.img.width, c.img.height + 20);

	var c = background.background2;	//background2
	ctx.drawImage( c.img, c.x1, c.y, c.img.width, c.img.height);
	ctx.drawImage( c.img, c.x2, c.y, c.img.width, c.img.height);

	var c = background.background3;	//background3
	ctx.drawImage( c.img, c.x1, c.y, c.img.width, c.img.height);
	ctx.drawImage( c.img, c.x2, c.y, c.img.width, c.img.height);


        //Draw handle
        for(h=0; h<game.handles.length; h++){
            ctx.drawImage( game.handles[h].img, game.handles[h].x, game.handles[h].y, game.handles[h].width, game.handles[h].height);
	}

	if( character.pie.pie == 1 ){
            var derecho = -6;	
	    var izquierdo = 0;
	}else {
            var derecho = 0;	
	    var izquierdo = -6;
	}

        //Draw character
	ctx.drawImage( character.pie.img, character.pie.x+8, character.pie.y + izquierdo, character.pie.width, character.pie.height );
	ctx.drawImage( character.img, character.x, character.y, character.width, character.height);
	ctx.drawImage( character.pie.img, character.pie.x, character.pie.y + derecho, character.pie.width, character.pie.height );

        background.update();
    },
    createDOMCanvas : function() {
    
    	widthScreen = screen.width;
		
	if( widthScreen > 650 ){
	    widthCanvas = 600;
	    //this.widht = widthCanvas;
	}else {
	    widthCanvas = widthScreen - 20;
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
    gameOver: function(){
	document.getElementById("cuerpo").removeEventListener("keydown", precionaLetra);
     	document.getElementById("cuerpo").removeEventListener("touchstart", clicky);
	game.stop();
     	//setTimeout(function(){
	//    game.initValues();
     	//}, 3000);

        var gameOverElement = document.getElementById('gameover').style.display = 'block';
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

