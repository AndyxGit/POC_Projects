import React from 'react';
import Select from 'react-select';
import './SelectInput.css';



export const SelectInput = ({ title, tabIndex, id, name, label, role, options, defaultValue, placeholder, onChange, value, isMulti, className, disabled }) => {

    const selectStyle = {
        control: (base, state) => ({
            ...base,
            boxShadow: "none",
            border: state.isFocused ? '2px solid #0097a9 !important' : "1px solid #C4C4C4 !important",
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            backgroundColor: 'transparent',
            color: '#222222',
            ':hover': {
                backgroundColor: '#EBEBEB',
            },
        }),
    };

    return (
        <>
            {label && <div className='selectLabel'>{label}</div>}
            <Select
                tabIndex={tabIndex}
                id={id}
                defaultValue={defaultValue || options[0]}
                placeholder={placeholder}
                isClearable={false}
                options={options}
                name={name}
                onChange={(e) => onChange(e)}
                value={value}
                aria-label={title}
                isMulti={isMulti}
                styles={selectStyle}
                className={className}
                isDisabled={disabled}
                role={role}
            />
        </>
    )
}