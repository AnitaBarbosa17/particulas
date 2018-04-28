/*
	PARTICULAS
*/

var canvas, context;
var time = new Date().getTime();
var maxWidth, maxHeight;

//objeto particle esta es la definición de un objeto, de forma estatica
// var particle = {
// 	//que sea random en toda la pantalla
// 	x: Math.random() * window.innerWidth,
// 	y: Math.random() * window.innerHeight,
// 	radius: Math.random() * 10
// };

var particles = [];
var particleCounter = 300;

var PI2 = Math.PI*2;


function init() {
	canvas = document.createElement("canvas");
	context = canvas.getContext("2d");
	document.body.appendChild(canvas);

	setParticles();

	//set el tamaño
	setSize();
	window.addEventListener("resize", setSize);
}

// Generar todas las particulas que viviran dentro de el arreglo particles
function setParticles(){
	for (var i = 0; i < particleCounter; i++){
		var particle = new Particle();
		//inyectar pushar la particula
		particles.push(particle);
	}
}

function setSize() {
	maxWidth = window.innerWidth;
	maxHeight = window.innerHeight;

	canvas.width = maxWidth;
	canvas.height = maxHeight;
}


function animate() {
	requestAnimationFrame(animate);
	time = new Date().getTime();
	render();
}

//Clase Particula es como el objeto pero de forma dinamica 
//Particle es la Clase y de ahí se pueden crear sus hijos que se llaman "INSTANCIAS"
var Particle = function(args){
	//por si no pasan los argumentos pasar
	if(args === undefined) args = {};
	this.position = {
		x: args.x || (Math.random() * window.innerWidth),
		y: args.y || (Math.random() * window.innerHeight),
	}
	this.velocity = {x: Math.random() * 0.5};
	this.radius = args.radius || (Math.random() * 2);
	/*
	ctx esta sustituyendo a contexto como tal, 
	la teoría dice que no deberíamos de usar un objeto global dentro de una clase,
	por eso sustitumos contexto por ctx 
	*/
	this.draw = function(ctx) {
		this.update();
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, this.radius, PI2, false);
		ctx.fill();
		ctx.fillStyle = "white";
		ctx.closePath();
	}
	//Actualizar la posición de X
	this.update = function() {
		this.position.x += this.velocity.x;
		//funciona para que cuando llegue al final de la pantalla regrese a position 0
		if(this.position.x > window.innerWidth) {
			this.position.x = 0
		}
	}
	return this;
}


//DIBUJO
function render() {
	//Draw methods
	context.clearRect(0, 0, maxWidth, maxHeight);


	//meter todas las particulas
	for(var i = 0; i < particles.length; i++){
		//recorre el arreglo sobre el index
		var particle = particles[i];
		particle.draw(context);
	}
	
	
	// context.fillStyle = "blue";


}

init();
animate();