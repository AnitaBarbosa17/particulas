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
	this.x = args.x || (Math.random() * window.innerWidth);
	this.y = args.y || (Math.random() * window.innerHeight);
	this.radius = args.radius || (Math.random() * 10);
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
		context.beginPath();
		context.arc(particle.x, particle.y, particle.radius, PI2, false);
		context.fill();
		context.closePath();
	}
	
	
	// context.fillStyle = "blue";


}

init();
animate();