function SearchContactInput({valorSearch,onSearch}) {
    
    return ( 
    <div class="max-w-lg">   
        <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg class="size-5 text-text-label" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </div>
            <input value={valorSearch}  onChange={onSearch} type="search" id="default-search" class="block w-full py-2 px-2 ps-10 text-sm text-text-primary border focus:ring-1 focus:outline-none border-border-form rounded-md focus:ring-hover-input focus:border-hover-input" placeholder="Buscar por nombre,telefono o favorito"/>
        </div>
    </div>
    );
}

export default SearchContactInput;