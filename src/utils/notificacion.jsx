import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Carga los estilos visuales

export const notyf = new Notyf({
        duration:3000,
        position: {
            x: 'center',
            y: 'top',
        }
    });

