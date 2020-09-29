const _private = new WeakMap(); 

export class UI {
	constructor() {
		const properties = {
			_root: document.querySelector('#root'),
			_svg: document.querySelector('svg'),
			_groups: Array.from(document.querySelectorAll('g')),
		}

		_private.set(this, {properties});
	}

	get root() {
		return _private.get(this).properties['_root'];
	}

	get svg() {
		return _private.get(this).properties['_svg'];
	}

	get groups() {
		return _private.get(this).properties['_groups'];
	}

	createSVG(templete) {
		const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		svg.setAttribute('viewBox', '0 0 1920 1080');
		svg.setAttribute('width', '1000');
		svg.innerHTML = templete;

		return svg;
	}

	createModal() {
		const div = document.createElement('div');
		div.classList.add('modal');

		const templete = `<div class="modal-content">
        	<button class="modal-button-close">&times;</button>

	        <div class="card card-body">
	          <h2 class="card-title">LAUNCH SUCCESS!</h2>
	          <p class="card-text">GREAT JOB, DEVELOPERS!</p>
	          <p class="card-text">SIMPLEMECH X IS FULLY OPERATIONAL</p>
	          <p class="card-text">AND GOOD TO GO!</p>
	          <div class="container">
	            <button class="btn btn-primary" id="button-reload">RELOAD</button>
	          </div>
	        </div>
      	</div>`;

      	div.innerHTML = templete;
		
		this.root.appendChild(div);
		setTimeout(() => this.events(), 100);
	}
}