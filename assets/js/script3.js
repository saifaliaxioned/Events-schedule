const form = document.querySelector('.event-form'),
  inputGroup = document.querySelectorAll('.input-group'),
  eventDate = document.querySelector('.event-date'),
  startTime = document.querySelector('.start-time'),
  endTime = document.querySelector('.end-time'),
  eLocation = document.querySelector('.location'),
  eName = document.querySelector('.name'),
  stringPattern = /^[a-zA-Z0-9][a-zA-Z0-9\s]+[a-zA-Z0-9]$/,
  eventSection = document.querySelector('.events-section'),
  eventItems = document.querySelector('.event-items'),
  eventMessage = document.querySelector('.event-message'),
  localData = JSON.parse(localStorage.getItem('itemName'));
let data = localData ? localData : [], arr;

// function to store data in local storage
const storeData = (eventDate, startTime, endTime, eLocation, eName) => {
  const dataObj = {
    eventDate: eventDate,
    startTime: startTime,
    endTime: endTime,
    eLocation: eLocation,
    eName: eName
  }
  data.push(dataObj)
  localStorage.setItem('itemName', JSON.stringify(data));
}

if (form) {
  // input validation
  const validateInput = (input, pattern, err) => {
    if (input.value) {
      input.nextElementSibling.classList.remove("show-error");
      if (pattern.test(input.value)) {
        input.nextElementSibling.classList.remove("show-error");
        return true;
      } else if (input.value >= new Date()) {
        input.nextElementSibling.classList.remove("show-error");
        return true;
      }
       else {
        input.nextElementSibling.classList.add("show-error");
        input.nextElementSibling.innerText = err;
        return false;
      }
    } else {
      input.nextElementSibling.classList.add("show-error");
      input.nextElementSibling.innerText = '*Field is required';
      return false;
    }
  }
  // submit function
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (eventDate.value && startTime.value && endTime.value && eLocation.value && eName.value) {
      storeData(eventDate.value, startTime.value, endTime.value, eLocation.value, eName.value);
      location.href = 'events.html';
      form.reset();
    } else {
      validateInput(eventDate,'','*Please select event date');
      validateInput(startTime,'', '*Please select event start time');
      validateInput(endTime,'','*Please select event end time');
      validateInput(eLocation,'','*Please select event location');
      validateInput(eName, stringPattern, '*Please enter minimum three characters');
    }
  });
}
// to sort data by date and time
const sortData = (a, b) => { return new Date(`${(a.eventDate)} ${(a.startTime)}`) - new Date(`${(b.eventDate)} ${(b.startTime)}`); }

const uiData = (data) => {
  let year = month = null, ul, li;
  data.map((objList) => {
    [yearTemp, monthTemp] = objList.eventDate.split('-');
    let eMonth = new Date(objList.eventDate).toLocaleString('default', { month: 'long' }),
      eYear = new Date(objList.eventDate).getFullYear();

    if (year == yearTemp && month == monthTemp) {
      addLi(objList, ul);

    } else {
      year = yearTemp;
      month = monthTemp;
      ul = document.createElement('ul');
      ul.classList.add('event-data');
      li = document.createElement('li');
      li.classList.add('event-list');
      
      li.innerHTML = `<h3><span class="event-month">${eMonth}</span> <span class="event-year">${eYear}</span></h3>`;
      addLi(objList, ul);
        li.appendChild(ul);
        eventItems.appendChild(li);
    }
  })
}

const addLi = (objList, ul) => {
  let eDay = new Date(objList.eventDate).toLocaleString("en", { weekday: "long" }),
    [sH, sM] = objList.startTime.split(':'),
    [eH, eM] = objList.endTime.split(':');

  ul.innerHTML += `<li class="data-list">
              <div class="date-data">
                <span class="schedule-date">${new Date(objList.eventDate).getDate()}</span>
                <span class="schedule-month">${new Date(objList.eventDate).toLocaleString('default', { month: 'short' })}</span>
              </div>
              <div class="event-details">
                <h4><span class="event-day">${eDay}</span> <span class="start-event">${sH == 12 ? 12 : sH >= 12 ? sH - 12 : sH}:${sM}${sH >= 12 ? 'PM' : 'AM'}</span>-<span class="end-event">${eH == 12 ? 12 : eH >= 12 ? eH - 12 : eH}:${eM}${eH >= 12 ? 'PM' : 'AM'}</span></h4>
                <p class="event-location">${objList.eLocation}</p>
                <h5 class="event-name">${objList.eName}</h5>
              </div>
            </li>
        </li>`;
}

if (eventSection) {
  const onload = (data) => {
    arr = data.sort(sortData);
    uiData(arr);
  }
  onload(data);
}






















