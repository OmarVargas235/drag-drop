import './aseets/styles/main.scss';
import { Robot } from './robot';
import { UI } from './ui';
import { DragAndDrop } from './dragAndDrop';

const Pieces = new Robot();

//Creando piezas del robot e insertandolas en el DOM.
Pieces.insertDom();

const DragAnddrop = new DragAndDrop();
const svg = new UI().svg;

svg.addEventListener('load', evt => {
	svg.addEventListener('mousedown', evt => DragAnddrop.startDrag(evt));
	svg.addEventListener('mousemove', evt => DragAnddrop.drag(evt));
	svg.addEventListener('mouseup', evt => DragAnddrop.endDrag(evt));
});