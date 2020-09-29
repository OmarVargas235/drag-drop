import { UI } from './ui';

const _private = new WeakMap(); 

export class Modal extends UI {
	constructor() {
		super();

		const properties = {
			_isModal: false
		}

		_private.set(this, { properties });
	}

	get isModal() {
		return _private.get(this).properties['_isModal'];
	}

	set setIsModal(newValue) {
		_private.get(this).properties['_isModal'] = newValue;
	}

	insertModal() {
		let cont = 0, i = 0;
		
		/* Verifica que todos los elementos (groups) tengan el data-value="drop" y cuando 
		los 6 lo tengan aparece el modal */ 
		for (let x of this.groups) {
			i++;
			
			x.getAttribute('data-value') === null && cont++;
			
			if (cont === 1 && i === 7 && !this.isModal) {
				//Este metodo metodo "createModal" esta en la clase padre UI.
				this.createModal();
				this.setIsModal = true;
			}
		}
	}
	
	//Este metodo se llama en el metodo "createModal" de la clase padre UI.
	events() {
		const modal = document.querySelector('.modal');
		const btn = document.querySelector('#button-reload');
		
		modal.classList.add('show');

		modal.querySelector('.modal-button-close').addEventListener('click', () => {
			modal.classList.remove('show');
		});

		modal.addEventListener('click', e => {
			if(e.target.classList.contains('modal')) modal.classList.remove('show');
		})

		btn.addEventListener('click', () => location.reload());
	}
}