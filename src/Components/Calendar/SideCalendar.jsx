import React, { useState } from "react";
import Calendar from 'moedim';

export default function SideCalendar() {
  const [value, setValue] = useState(new Date());
  return (
    <div>
      <Calendar value={value} onChange={(d) => setValue(d)} />
    </div>
  );
}
