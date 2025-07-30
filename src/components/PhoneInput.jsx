import { useState, useMemo, useRef, useEffect } from 'react';
import CountryList from 'country-list-with-dial-code-and-flag';
import { phoneDescriptions } from '../utils/PhoneDescriptions';

function PhoneInput({ formData, setFormData, errors, contactoActual }) {
    const [countryCode, setCountryCode] = useState('+51'); // Perú por defecto
    const [isOpen, setIsOpen] = useState(false); // Dropdown abierto/cerrado
    const [searchTerm, setSearchTerm] = useState(''); // Término de búsqueda del país
    const dropdownRef = useRef(null); // Referencia para manejar clics fuera del dropdown


    // Países principales por código de teléfono para resolver duplicados
    const paisesprincipales = {
        '+1': 'US',    // Estados Unidos (no Canadá)
        '+33': 'FR',   // Francia (no territorios ultramar)
        '+34': 'ES',   // España (no Islas Canarias como territorio separado)
        '+44': 'GB',   // Reino Unido (no territorios)
        '+47': 'NO',   // Noruega (no Svalbard)
        '+49': 'DE',   // Alemania
        '+61': 'AU',   // Australia (no territorios)
        '+262': 'RE',  // Reunión (no Mayotte)
        '+590': 'GP',  // Guadalupe (no otros territorios franceses)
        '+596': 'MQ',  // Martinica
        '+594': 'GF',  // Guayana Francesa
        '+508': 'PM',  // San Pedro y Miquelón
    };

    const countries = useMemo(() => {
        const allCountries = CountryList.getAll({ withSecondary: false });

        // Crear un mapa para agrupar países por dial_code
        const countriesByDialCode = {};

        allCountries.forEach(country => {
            const dialCode = country.dial_code;
            if (!countriesByDialCode[dialCode]) {
                countriesByDialCode[dialCode] = [];
            }
            countriesByDialCode[dialCode].push(country);
        });

        // Para cada dial_code, elegir el país principal
        const uniqueCountries = [];

        Object.keys(countriesByDialCode).forEach(dialCode => {
            const countriesWithSameCode = countriesByDialCode[dialCode];

            if (countriesWithSameCode.length === 1) {
                // Solo hay un país con este código
                uniqueCountries.push(countriesWithSameCode[0]);
            } else {
                // Hay múltiples países, elegir el principal
                const paisPrincipal = paisesprincipales[dialCode];

                if (paisPrincipal) {
                    // Buscar el país principal en la lista
                    const countryPrincipal = countriesWithSameCode.find(c => c.code === paisPrincipal);
                    if (countryPrincipal) {
                        uniqueCountries.push(countryPrincipal);
                    } else {
                        // Si no se encuentra el principal, tomar el primero alfabéticamente
                        uniqueCountries.push(
                            countriesWithSameCode.sort((a, b) => a.name.localeCompare(b.name))[0]
                        );
                    }
                } else {
                    // No hay país principal definido, tomar el primero alfabéticamente
                    uniqueCountries.push(
                        countriesWithSameCode.sort((a, b) => a.name.localeCompare(b.name))[0]
                    );
                }
            }
        });

        // Ordenar alfabéticamente por nombre
        return uniqueCountries.sort((a, b) => a.name.localeCompare(b.name));
    }, []);


    // Filtrar países basado en el término de búsqueda - BÚSQUEDA PRECISA
    const filteredCountries = useMemo(() => {
        if (!searchTerm.trim()) return countries;

        const search = searchTerm.toLowerCase().trim();
        return countries.filter(country => {
            const countryName = country.name.toLowerCase();
            const countryCode = country.code.toLowerCase();
            const dialCode = country.dial_code;

            // Búsqueda más precisa: debe empezar con el término o ser una coincidencia exacta
            return countryName.startsWith(search) ||
                countryName.includes(` ${search}`) || // Para nombres compuestos
                countryCode === search ||
                dialCode === search ||
                dialCode.includes(search);
        });
    }, [countries, searchTerm]);

    const currentCountry = countries.find(c => c.dial_code === countryCode);
    const countryISO = currentCountry?.code || 'PE';

    // Cerrar dropdown al hacer click fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);


    useEffect(() => {
        const telefonoYaViene = contactoActual?.telefono;
        if (telefonoYaViene) return; // Ya hay número válido

        const prefijoInicial = countryCode;
        const telefonoActual = formData.telefono || "";

        if (!telefonoActual.startsWith(prefijoInicial)) {
            setFormData({
                target: {
                    name: 'telefono',
                    value: `${prefijoInicial} `
                }
            });
        }
    }, [contactoActual, countryCode]);

    useEffect(() => {
        if (!contactoActual?.telefonoInfo?.dialCode) return;
        setCountryCode(contactoActual.telefonoInfo.dialCode); // 
    }, [contactoActual]);

    //Manejar seleccion de pais
    function handleCountryChange(c) {
        const prefijo = c.dial_code;       // "+34"
        setCountryCode(prefijo);           // para uso interno

        // Establecer el valor inicial del teléfono solo con el prefijo
        const syntheticEvent = {
            target: {
                name: 'telefono',
                value: `${prefijo} `           // prefijo listo para que el usuario agregue número
            }
        };

        setFormData(syntheticEvent);
        setSearchTerm('');
        setIsOpen(false);
    }

    // Manejar búsqueda
    function handleSearchChange(e) {
        setSearchTerm(e.target.value);
    }

    // Limpiar búsqueda cuando se abre/cierra el dropdown
    function toggleDropdown() {
        console.log('Toggle dropdown, estado actual:', isOpen); // Debug
        setIsOpen(prev => {
            const newState = !prev;
            if (newState) {
                setSearchTerm(''); // Limpiar búsqueda al abrir
            }
            console.log('Nuevo estado:', newState); // Debug
            return newState;
        });
    }

    //Manejar cambio de numeros
    function handleCambios(e) {
        const valor = e.target.value;

        // Si borra accidentalmente el prefijo, lo restauramos
        const tienePrefijo = valor.startsWith(countryCode);
        const numeroLocal = tienePrefijo ? valor.replace(countryCode, '').trim() : valor.trim();

        const telefonoCompleto = `${countryCode} ${numeroLocal}`;
        setFormData({
            target: {
                name: 'telefono',
                value: telefonoCompleto
            }
        });
    }
    //Busca el codigo del pais
    const phoneHint = phoneDescriptions.find(p => p.iso === countryISO);

    return (
        <div className="flex flex-col gap-2 relative w-full" ref={dropdownRef}>
            <label className="font-semibold text-text-label">
                Teléfono<span className="text-secondary-red">*</span>
            </label>

            <div className="flex items-stretch gap-0 w-full">
                {/* Selector personalizado - Responsive */}
                <div className="relative flex-shrink-0">
                    <button
                        type="button"
                        onClick={toggleDropdown}
                        className="flex items-center gap-1 sm:gap-2 px-2 py-1.5 border border-secondary-neutral border-r-1 rounded-l-md shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-hover-input focus:border-hover-input transition-colors duration-150 h-full min-w-0"
                    >
                        <img
                            src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${countryISO}.svg`}
                            alt={currentCountry?.name}
                            className="w-4 h-3 sm:w-5 sm:h-4 rounded-sm flex-shrink-0"
                        />
                        {/* Mostrar código de país en móvil, nombre completo en desktop */}
                        <span className="text-xs sm:text-sm block sm:hidden font-medium">
                            {countryISO}
                        </span>
                        <span className="text-sm hidden sm:block truncate max-w-[120px]">
                            {currentCountry?.name}
                        </span>
                        <span className="text-xs sm:text-sm text-gray-500 flex-shrink-0">
                            {currentCountry?.dial_code}
                        </span>
                        {/* Icono de flecha */}
                        <svg
                            className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute z-50 mt-1 w-72 sm:w-80 max-h-64 overflow-hidden bg-white border rounded-md shadow-lg">
                            {/* Barra de búsqueda funcional */}
                            <div className="p-2 border-b bg-gray-50">
                                <input
                                    type="text"
                                    placeholder="Buscar país..."
                                    value={searchTerm}
                                    onChange={handleSearchChange}
                                    className="w-full px-2 py-1 text-sm border rounded focus:outline-none focus:ring-1 focus:ring-hover-input"
                                    autoFocus
                                />
                            </div>

                            <ul className="max-h-48 overflow-y-auto">
                                {filteredCountries.length > 0 ? (
                                    filteredCountries.map((c) => (
                                        <li
                                            key={c.code}
                                            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm transition-colors duration-150"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                console.log('Click en país:', c.name); // Debug
                                                handleCountryChange(c);
                                            }}
                                        >
                                            <img
                                                src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${c.code}.svg`}
                                                alt={c.name}
                                                className="w-5 h-4 rounded-sm flex-shrink-0"
                                            />
                                            <span className="flex-1 truncate">{c.name}</span>
                                            <span className="text-gray-500 flex-shrink-0 font-mono">
                                                {c.dial_code}
                                            </span>
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-4 text-center text-gray-500 text-sm">
                                        No se encontraron países
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Campo telefónico - Responsive */}
                <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono || ''} // Acceder correctamente al valor
                    onChange={handleCambios}
                    placeholder="Número de teléfono"
                    className={`flex-1 min-w-0 py-1.5 px-3 shadow-sm border border-l-0 rounded-r-md transition duration-150 ease-in-out focus:ring-1 focus:outline-none
            ${errors.telefono
                            ? 'border-secondary-red ring-secondary-red focus:ring-secondary-red focus:border-secondary-red'
                            : 'border-border-form focus:ring-hover-input focus:border-hover-input'}
          `}
                />
            </div>

            {phoneHint && !errors.telefono && (
                <p className="text-xs text-gray-600 mt-1 items-start gap-1 flex flex-col">
                    <span>{phoneHint.description}</span>
                    <span>{phoneHint.formato}</span>
                </p>
            )}

            {/* Error visual */}
            {errors.telefono && (
                <div className="text-secondary-red flex items-center mt-0.5 gap-2">
                    <svg viewBox="0 0 24 24" className="size-4 flex-shrink-0" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <span className="text-sm">{errors.telefono}</span>
                </div>
            )}
        </div>
    );
}

export default PhoneInput;