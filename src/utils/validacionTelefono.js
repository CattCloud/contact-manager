import CountryList from 'country-list-with-dial-code-and-flag';
import { parsePhoneNumberFromString } from 'libphonenumber-js/max'; // 👈 usa versión con metadata completa

export function obtenerISODesdeTelefono(telefono) {
  const prefijo = telefono.trim().split(' ')[0]; // e.g. "+51"
  const pais = CountryList.getAll().find(c => c.dial_code === prefijo);
  return pais ? pais.code : 'PE';
}

export function validarTelefonoPorTexto(telefono) {
  //console.log("cambio "+telefono)
  
  if (!telefono || typeof telefono !== 'string') return false;

  const cleaned = telefono.trim().replace(/[^+\d]/g, '');
  if (!cleaned.startsWith('+')) return false;

  try {
    const phoneNumber = parsePhoneNumberFromString(cleaned);
    if (!phoneNumber || !phoneNumber.isValid()) return false;

    const type = phoneNumber.getType(); // ✅ ahora sí funcionará
    //console.log('🔍 Tipo detectado:', type); // deberías ver "MOBILE"
    
    return type === 'MOBILE' || type === 'FIXED_LINE_OR_MOBILE';
  } catch (error) {
    console.log('❌ Error al validar teléfono:', telefono, error.message);
    return false;
  }
}