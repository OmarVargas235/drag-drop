import { UI } from './ui';
import { torso } from './aseets/iconos/torso';
import { leg1, leg2 } from './aseets/iconos/legs';
import { head, chest } from './aseets/iconos/head_chest';
import { arm1, arm2 } from './aseets/iconos/arms';

export class Robot extends UI {
	createRobot() {
		let templete = '';

		templete = torso();
		templete += leg1();
		templete += leg2();
		templete += head();
		templete += chest();
		templete += arm1();
		templete += arm2();

		return templete;
	}

	insertDom() {
		const templete = this.createRobot();
		this.root.appendChild(this.createSVG(templete));
	}
}