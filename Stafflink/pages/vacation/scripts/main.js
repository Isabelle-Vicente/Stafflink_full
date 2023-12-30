import {
  getAllVacations,
  saveVacation,
  deleteVacation,
} from "../../../patternScripts/api/stafflink.js";
import { allUtils } from "../../../patternScripts/main.js";

allUtils.access();
allUtils.sideMenu();
allUtils.notes();

document.addEventListener("DOMContentLoaded", async function () {
  var calendar = $("#calendar").fullCalendar({
    selectable: true,
    selectHelper: true,
    defaultView: "month",
    views: {
      list: { buttonText: "Lista" },
    },
    header: {
      left: "title , prev , next",
      center: "",
      right: "today , month , listMonth",
    },
    select: async function (start, end) {
      if (allUtils.getLocalData("user").access.sector != "Recursos Humanos") {
        return;
      }
      // var title = prompt("Evento para registrar:");
      var title = await allUtils.toastPrompt({message: 'Cadastro de um novo evento', description: 'Digite o evento que deseja cadastrar', promptInputPlaceholder: 'Ex: Férias do funcionário Carlos', })
      .then(data => data)
      .catch(error => error)
      // allUtils.toastConfirm({message: 'Confirme', description: 'Tem certeza que deseja excluir esse evento?'})

      if (title) {
        var eventData = {
          title: title,
          start: start.format(),
          end: end.format(),
        };
        calendar.fullCalendar("renderEvent", eventData, true);
        saveEventToAPI(eventData);
      }
      calendar.fullCalendar("unselect");
    },
    eventClick: async function (calEvent, jsEvent, view) {
      if (allUtils.getLocalData("user").access.sector != "Recursos Humanos") {
        return;
      }
      var deleteEvent = await allUtils.toastConfirm({message: 'Confirme', description: 'Tem certeza que deseja excluir esse evento?'})
        .then((result) => result)
        .catch((result) => result)

      if (deleteEvent) {
        calendar.fullCalendar("removeEvents", calEvent._id);

        getAllVacations().then(vacations => {
          const foundEvent = vacations.find((event) => {
              return (  
                event.title === calEvent.title && 
                event.start === calEvent.start._i &&
                event.end === calEvent.end._i
              )
          })

          deleteEventFromAPI(foundEvent.id);
        })
      }
    },
    events: await getAllVacations().then((json) => {
      const events = json.map(function (event) {
          return {
            title: event.title,
            start: event.start,
            end: event.end,
          };
        })
        return events;
      }),
    eventColor: "#029AA4",
    locale: "pt-br",
  });
});

async function saveEventToAPI(eventData) {
  try {
    await saveVacation({
      title: eventData.title,
      start: eventData.start,
      end: eventData.end,
    });
  } catch (error) {
    console.error("Erro ao salvar evento:", error);
  }
}

async function deleteEventFromAPI(eventId) {
  try {
    await deleteVacation(eventId);
  } catch (error) {
    console.error("Erro ao excluir evento:", error);
  }
}
