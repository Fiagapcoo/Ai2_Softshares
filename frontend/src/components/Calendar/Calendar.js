import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const currentYear = new Date().getFullYear();

  return (
    <div className="calendar-container">
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        inline
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled
        }) => (
          <div className="custom-header">
            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
              {"<"}
            </button>
            <select
              value={date.getFullYear()}
              onChange={({ target: { value } }) => changeYear(value)}
            >
              {Array(100).fill(0).map((_, i) => (
                <option key={i} value={currentYear - 50 + i}>
                  {currentYear - 50 + i}
                </option>
              ))}
            </select>

            <select
              value={date.getMonth()}
              onChange={({ target: { value } }) => changeMonth(value)}
            >
              {Array(12).fill(0).map((_, i) => (
                <option key={i} value={i}>
                  {new Date(0, i).toLocaleString('default', { month: 'short' })}
                </option>
              ))}
            </select>
            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
              {">"}
            </button>
          </div>
        )}
      />
    </div>
  );
};

export default Calendar;
