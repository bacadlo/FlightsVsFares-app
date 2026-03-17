'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../styles/search.css';

const FIELDS = [
  { key: 'from',       label: 'From',       placeholder: 'City or airport', type: 'text'   },
  { key: 'to',         label: 'To',         placeholder: 'City or airport', type: 'text'   },
  { key: 'dates',      label: 'Dates',      placeholder: 'e.g. Apr 14 – Apr 28', type: 'text' },
  { key: 'passengers', label: 'Passengers', placeholder: '1', type: 'number' },
];

export function SearchForm({ initialValues = {} }) {
  const router = useRouter();
  const [values, setValues] = useState({
    from:       initialValues.from       ?? '',
    to:         initialValues.to         ?? '',
    dates:      initialValues.dates      ?? '',
    passengers: initialValues.passengers ?? '1',
  });

  function handleChange(key, value) {
    setValues(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams(
      Object.fromEntries(Object.entries(values).filter(([, v]) => v !== ''))
    );
    router.push(`/search?${params}`);
  }

  return (
    <form className="search-form" onSubmit={handleSubmit} noValidate>
      {FIELDS.map(({ key, label, placeholder, type }) => (
        <div
          key={key}
          className={`search-field search-field--${key}`}
        >
          <label className="search-field-label" htmlFor={`field-${key}`}>
            {label}
          </label>
          <input
            id={`field-${key}`}
            className="search-field-input"
            type={type}
            placeholder={placeholder}
            value={values[key]}
            min={type === 'number' ? 1 : undefined}
            max={type === 'number' ? 9 : undefined}
            onChange={e => handleChange(key, e.target.value)}
          />
        </div>
      ))}

      <button type="submit" className="search-submit">
        SEARCH
      </button>
    </form>
  );
}
