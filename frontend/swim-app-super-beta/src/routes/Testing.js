import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export default function Testing() {
    const [value, setValue] = useState(new Date());
    const testValue = "Just a test value!";

    function onChange(nextValue) {
        setValue(nextValue);
    }

    return (
    <Calendar
        onChange={onChange}
        value={value}
        tileContent={testValue}
    />
    );
}