import { isValidPhoneNumber, parsePhoneNumberWithError } from 'libphonenumber-js/max';
import CountryList from 'country-list-with-dial-code-and-flag';
import { phoneDescriptions } from './PhoneDescriptions';

/**
 * Normaliza y enriquece un número de teléfono desde la API
 * @param {string} numeroTelefono - Número de teléfono en cualquier formato
 * @param {string} paisPorDefecto - Código ISO del país por defecto (default: 'PE')
 * @returns {Object} Objeto con información enriquecida del teléfono
 */
export function normalizarTelefono(numeroTelefono, paisPorDefecto = 'PE') {
  const resultadoPorDefecto = {
    telefonoOriginal: numeroTelefono,
    telefonoNormalizado: numeroTelefono,
    telefonoFormateado: numeroTelefono,
    telefonoNacional: numeroTelefono,
    iso: paisPorDefecto,
    dialCode: '+51',
    pais: 'Peru',
    bandera: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${paisPorDefecto}.svg`,
    formato: 'Formato no reconocido',
    descripcion: 'Sin descripción disponible',
    telefonoValido: false,
    tipo: null,
    esMovil: false,
    esFijo: false,
    error: null
  };

  try {
    const numeroLimpio = limpiarNumeroTelefono(numeroTelefono);
    if (!numeroLimpio) {
      return {
        ...resultadoPorDefecto,
        error: 'Número vacío o contiene caracteres inválidos'
      };
    }

    let numeroParseado;

    try {
      numeroParseado = parsePhoneNumberWithError(numeroLimpio);
    } catch (error1) {
      console.log(error1);
      try {
        numeroParseado = parsePhoneNumberWithError(numeroLimpio, paisPorDefecto);
      } catch (error2) {
        return {
          ...resultadoPorDefecto,
          error: `No se pudo interpretar el número: ${error2.message}`
        };
      }
    }

    if (!numeroParseado) {
      return {
        ...resultadoPorDefecto,
        error: 'No se pudo parsear el número'
      };
    }

    const esValido = numeroParseado.isValid();
    const tipo = numeroParseado.getType?.();

    const iso = numeroParseado.country || paisPorDefecto;
    const codigoLlamada = `+${numeroParseado.countryCallingCode}`;
    const paisInfo = CountryList.getAll().find(c => c.code === iso);
    const nombrePais = paisInfo?.name || 'País desconocido';

    const descripcionTelefono = phoneDescriptions.find(p => p.iso === iso);

    return {
      telefonoOriginal: numeroTelefono,
      telefonoNormalizado: numeroParseado.format('E.164'),
      telefonoFormateado: numeroParseado.format('INTERNATIONAL'),
      telefonoNacional: numeroParseado.format('NATIONAL'),
      iso,
      dialCode: codigoLlamada,
      pais: nombrePais,
      bandera: `https://purecatamphetamine.github.io/country-flag-icons/3x2/${iso}.svg`,
      formato: descripcionTelefono?.formato || 'Formato no disponible',
      descripcion: descripcionTelefono?.description || 'Descripción no disponible',
      telefonoValido: esValido,
      tipo: tipo || null,
      esMovil: tipo === 'MOBILE',
      esFijo: tipo === 'FIXED_LINE',
      error: null
    };
  } catch (error) {
    return {
      ...resultadoPorDefecto,
      error: `Error inesperado: ${error.message}`
    };
  }
}

/**
 * Limpia un número de teléfono removiendo letras, símbolos, emojis y espacios
 * @param {string} numero
 * @returns {string} Número limpio
 */
function limpiarNumeroTelefono(numero) {
  if (!numero || typeof numero !== 'string') return '';

  let numeroLimpio = numero.trim();

  // Eliminar todo lo que no sea dígito o +
  numeroLimpio = numeroLimpio.replace(/[^\d+]/g, '');

  // Si no comienza con + pero tiene más de 10 dígitos → probablemente internacional
  if (!numeroLimpio.startsWith('+') && /^\d{10,}$/.test(numeroLimpio)) {
    numeroLimpio = '+' + numeroLimpio;
  }

  return numeroLimpio;
}

/**
 * Procesa una lista de contactos normalizando sus teléfonos
 * @param {Array} contactos - Array de contactos desde la API
 * @returns {Array} Contactos enriquecidos
 */
export function procesarContactosAPI(contactos) {
  return contactos.map(contacto => {
    const telefonoEnriquecido = normalizarTelefono(contacto.telefono);

    return {
      ...contacto,
      telefonoOriginal: contacto.telefono,
      telefono: telefonoEnriquecido.telefonoNormalizado,
      telefonoInfo: {
        formateado: telefonoEnriquecido.telefonoFormateado,
        nacional: telefonoEnriquecido.telefonoNacional,
        iso: telefonoEnriquecido.iso,
        dialCode: telefonoEnriquecido.dialCode,
        pais: telefonoEnriquecido.pais,
        bandera: telefonoEnriquecido.bandera,
        formato: telefonoEnriquecido.formato,
        descripcion: telefonoEnriquecido.descripcion,
        valido: telefonoEnriquecido.telefonoValido,
        tipo: telefonoEnriquecido.tipo,
        esMovil: telefonoEnriquecido.esMovil,
        esFijo: telefonoEnriquecido.esFijo,
        error: telefonoEnriquecido.error
      }
    };
  });
}

/**
 * Valida si un número es válido (formato aceptado)
 * @param {string} numeroTelefono
 * @param {string} paisPorDefecto
 * @returns {boolean}
 */
export function esNumeroValido(numeroTelefono, paisPorDefecto = 'PE') {
  try {
    return isValidPhoneNumber(numeroTelefono, paisPorDefecto);
  } catch (error) {
    console.log(error);
    return false;
  }
}

/**
 * Obtiene el ISO del país desde un número
 * @param {string} numeroTelefono
 * @returns {string|null}
 */
export function obtenerISODesdeTelefono(numeroTelefono) {
  try {
    const numeroParseado = parsePhoneNumberWithError(numeroTelefono);
    return numeroParseado?.country || null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
