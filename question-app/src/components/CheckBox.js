import React from 'react';

export const CheckBox = React.forwardRef(({indeterminate,...rest},ref)=>{
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;
    React.useEffect(()=>{
        resolvedRef.current.indeterminate = indeterminate
    },[resolvedRef,indeterminate])

    return(
        <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                ref={resolvedRef} {...rest}
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
        </div>
    )
})