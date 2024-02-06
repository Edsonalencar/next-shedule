"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from "react";
import {
  EventClickArg,
  EventContentArg,
  EventInput,
} from "@fullcalendar/core/index.js";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

export default function DemoApp() {
  const [events, setEvents] = useState<EventInput[]>([]);

  function renderEventContent(eventInfo: EventContentArg) {
    return (
      <div className="flex justify-between items-center px-3">
        <div>
          <strong>{eventInfo.event.title}</strong>

          <div className="flex items-center gap-2 text-xs">
            <p>{dayjs(eventInfo.event.start).format(`HH:mm`)}</p>
            <p>ás</p>
            <p>{dayjs(eventInfo.event.end).format(`HH:mm`)}</p>
          </div>
        </div>
        <button
          className=" font-bold hover:scale-105 p-1 rounded"
          onClick={() => handleRemoveEventClick(eventInfo)}
        >
          X
        </button>
      </div>
    );
  }

  const handleEventClick = (clickInfo: EventClickArg) => {
    alert(` Titulo do evento: ${clickInfo.event.title}
    \n Inicio: ${dayjs(clickInfo.event.start).format(
      `DD [de] MMM [de] YYYY [ás] HH:mm`
    )}
    \n Fim: ${dayjs(clickInfo.event.end).format(
      `DD [de] MMM [de] YYYY [ás] HH:mm`
    )}`);
  };

  const handleEvents = (event: EventInput) => {
    const eventsList = events;
    eventsList.push(event);
    setEvents(eventsList);
  };

  const handleRemoveEventClick = (clickInfo: EventContentArg) => {
    if (
      confirm(
        `Realmente deseja remover este evento: '${clickInfo.event.title}'`
      )
    ) {
      clickInfo.event.remove();
    }
  };

  const handleDateSelect = (selectInfo: any) => {
    let title = prompt("Please enter a new title for your event");
    let calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: events.length + 1,
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  };

  return (
    <div className="p-5">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={"pt"}
        editable={true}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventsSet={handleEvents}
        eventContent={renderEventContent}
        viewClassNames={"bg-white text-black"}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
      />
    </div>
  );
}
