export const positionDrop = (x1, x2, y1, y2, coord, offset, transform, xf, yf, selectedElement) => {
	if ( ((coord.x - offset.x) >= x1 && (coord.x - offset.x) <= x2) && 
		 ((coord.y - offset.y) >= y1 && (coord.y - offset.y) <= y2) ) {
		transform.setTranslate(xf, yf); 

		if (selectedElement) selectedElement.setAttribute('data-value', 'drop');

		return true;
	} 
} 