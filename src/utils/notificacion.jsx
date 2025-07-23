import { Notyf } from 'notyf';
import 'notyf/notyf.min.css'; // Carga los estilos visuales

export const notyf = new Notyf({
    duration: 3000,
    position: {
        x: 'center',
        y: 'top',
    },
    dismissible: true,
    types: [
        {
            type: 'warning',
            background: 'orange',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'warning'
            }
        },
        {
            type: 'info',
            background: '#3b82f6',
            icon: {
                className: 'material-icons',
                tagName: 'i',
                text: 'info' // O puedes probar con 'info_outline' si quieres un estilo más sutil
            }

        }
    ]
});

