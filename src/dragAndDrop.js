import { Modal } from './modal';
import { positionDrop } from './helper';

const _private = new WeakMap(); 

export class DragAndDrop extends Modal {
	constructor() {
		super(); 

		const properties = {
			_selectedElement: null, 
			_offset: {}, 
			_transform: {},
		}

		_private.set(this, { properties });
	}

	get selectedElement() {
		return _private.get(this).properties['_selectedElement'];
	}

	get offset() {
		return _private.get(this).properties['_offset'];
	}

	get transform() {
		return _private.get(this).properties['_transform'];
	}

	set setSelectedElement(newValue) {
		_private.get(this).properties['_selectedElement'] = newValue;
	}

	set setOffset(newValue) {
		_private.get(this).properties['_offset'] = newValue;
	}

	set setTransform(newValue) {
		_private.get(this).properties['_transform'] = newValue;
	}

	startDrag(evt) {
		const element = evt.target.parentElement;
		
		//Selecciona solo los elementos con la clase 'draggable'
		if (element.classList.contains('draggable')) {
			this.setSelectedElement = element;
			this.setOffset = this.getMousePosition(evt);

			const transforms = this.selectedElement.transform.baseVal;

			this.setTransform = transforms['0'];

			this.offset.x -= this.transform.matrix.e;
			this.offset.y -= this.transform.matrix.f;

			this.selectedElement.style.cursor = 'grabbing';
		}
	}

	drag(evt) {
		if (this.selectedElement) {
			evt.preventDefault();

			const coord = this.getMousePosition(evt);
			
			/* Verifica si la pieza fue puesta en el lugar correcto y si es asi,
			evita que se vuelva a mover. */
			if (this.selectedElement.getAttribute('data-value') === 'drop') return;
			
			/* Verifica si la pieza esta dentro de la zona destino y de ser asi, 
			la posiciona en e lugar que debe ir */
			switch (this.selectedElement.id) {
				case 'leg-left': 
					if (positionDrop(-480, -380,0,200, coord, this.offset, this.transform, -425, 142)) 
						return;
				break;

				case 'leg-right': 
					if (positionDrop(-455,-365, 0,200, coord, this.offset, this.transform, -405, 142)) 
						return;
				break;

				case 'arm1': 
					if (positionDrop(-1075,-970,-130,40,coord,this.offset, this.transform,-1035,-45)) 
						return;
				break;

				case 'arm2': 
					if (positionDrop(-890,-750,-80,43, coord, this.offset, this.transform, -823, -43)) 
						return;
				break;

				case 'chest': 
					if (positionDrop(-710,-610,-120,-5,coord, this.offset, this.transform, -659, -73)) 
						return;
				break;

				case 'head': 
					if (positionDrop(-730,-560,-490,-400,coord,this.offset,this.transform,-639, -449)) 
						return;
				break;
			}

		    this.transform.setTranslate(coord.x - this.offset.x, coord.y - this.offset.y);
		}
	}

	endDrag(evt) {
		/* Evita que "selectedElement" sea igual que null o undefined, evitando errores al acceder a sus
		propiedades (id, styles) */
		if (this.selectedElement === null || this.selectedElement === undefined) return;

		const coord = this.getMousePosition(evt);
		const selectedElement = this.selectedElement;
		const transform = this.transform;
		const offset = this.offset;
		
		/* Verifica si la pieza esta dentro de la zona destino y de ser asi, le agrega 
		la data-value="drop" para evitar que se vuelva arrastrar la pieza */
		switch (selectedElement.id) {
			case 'leg-left': 
				if (positionDrop(-480, -380,0,200,coord,offset,transform,-425,142,selectedElement));
			break;

			case 'leg-right': 
				if (positionDrop(-455,-365,0,200,coord,offset,transform, -405, 142, selectedElement));
			break;

			case 'arm1': 
				if (positionDrop(-1075,-970,-130,40,coord,offset,transform,-1035,-45,selectedElement));
			break;

			case 'arm2': 
				if (positionDrop(-890,-750,-80,43,coord,offset,transform,-823,-43,selectedElement));
			break;

			case 'chest': 
				if (positionDrop(-710,-610,-120,-5,coord,offset,transform,-659,-73,selectedElement));
			break;

			case 'head': 
				if (positionDrop(-730,-560,-490,-400,coord,offset,transform,-639,-449,selectedElement));
			break;
		}

		selectedElement.style.cursor = 'grab';
		this.setSelectedElement = null;
		
		//Metodo que heredado de la clase Modal.
		this.insertModal();
	}

	getMousePosition(evt) {
		const CTM = this.svg.getScreenCTM();
		
		//Formula para convertir las coordenadas del mouse a coordenadas del svg.
		return {
			x: (evt.clientX - CTM.e) / CTM.a,
			y: (evt.clientY - CTM.f) / CTM.d
		};
	}
}