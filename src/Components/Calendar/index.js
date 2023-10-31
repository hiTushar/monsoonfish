import { useEffect, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Holidays from 'date-holidays';
import moment from 'moment';
import './index.css';
import { Link } from 'react-router-dom';


export default function CalendarComponent(props) {
    const [date, setDate] = useState(new Date());
    const [holidays, setHolidays] = useState([]);
    const [details, setDetails] = useState('');
    const [addHolidayModal, setAddHolidayModal] = useState(false);
    const newHoliday = useRef({ title: '', desc: '' });
    const [error, setError] = useState(false);

    useEffect(() => {
        if(date) {
            let hd = new Holidays('US');
            let allHolidays = hd.getHolidays(date.getFullYear());
            let todayDate = moment(date).startOf('day').valueOf();
            let holidaysToday = allHolidays.filter(holiday => moment(holiday.date).startOf('day').valueOf() === todayDate);

            let customHolidayList = JSON.parse(localStorage.getItem(todayDate));
            if(customHolidayList) {
                holidaysToday = holidaysToday.concat(customHolidayList);
            }
            setHolidays(holidaysToday);
            setDetails('');
        }
    }, [date])

    function showDetails(holiday) {
        setDetails(holiday);
    }

    function addHoliday(e) {
        e.preventDefault();
        if(!newHoliday.current.title.length || !newHoliday.current.desc.length) {
            setError(true);
            return;
        }
        let currentDate = moment(date).startOf('day').valueOf();
        let customHolidayList = JSON.parse(localStorage.getItem(currentDate));
        if(!customHolidayList) {
            customHolidayList = [];
        }
        customHolidayList.push({name: newHoliday.current.title, desc: newHoliday.current.desc, date: currentDate});
        localStorage.setItem(currentDate, JSON.stringify(customHolidayList));

        let holidaysToday = holidays.concat(customHolidayList);
        setHolidays(holidaysToday);
        setAddHolidayModal(false);
        setError(false);
    }

    // ref: https://blog.logrocket.com/react-calendar-tutorial-build-customize-calendar/
    return (
        <div className='calendar-container'>
            <div className='navbar'>
                <Link to='/'>Home</Link>
            </div>
            <Calendar onChange={setDate} value={date} /> 
                <div className='holiday-names'>
                    <div className='header'>
                        <h2>{moment(date).format('ddd, Do MMM \'YY')}</h2>
                        <div className='add-holiday' onClick={() => setAddHolidayModal(true)}>+</div>
                    </div>
                    {
                        holidays.length ? (
                            <div className='list'>
                                <ul>
                                    {
                                        holidays.map(holiday => <li key={holiday.name} onClick={() => showDetails(holiday)}>{holiday.name}</li>)
                                    }
                                </ul>
                            </div>
                        ) : (
                            <div>No Holidays</div>
                        )
                    }
                </div>
            { /*  this modal is for adding custom holiday */ }
            {
                addHolidayModal ? (
                    <div className='modal'>
                        <div className='box'>
                            <div onClick={() => setAddHolidayModal(false)} className='close'>&times;</div>
                            <form>
                                <p className='title'>Add New Holiday</p>
                                <div>
                                    <input required type='text' onChange={e => newHoliday.current.title = e.target.value} />
                                </div>
                                <div>
                                    <textarea required row={10} column={20} onChange={e => newHoliday.current.desc = e.target.value} />
                                </div>
                                <div className='submit-div'>
                                    <button type='submit' onClick={addHoliday}>
                                        Add
                                    </button>
                                    {
                                        error ? (
                                            <p className='error'>Fill all the details!!</p>
                                        ) : null
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                ) : null
            }
            { /* this modal shows the details */}
            {
                details ? (
                    <div className='modal'>
                        <div className='box'>
                            <div onClick={() => setDetails('')} className='close'>&times;</div>
                            <p className='title'>{details.name}</p>
                            <p>{details.desc}</p>
                        </div>
                    </div>
                ) : null
            }
        </div>
    )
}
