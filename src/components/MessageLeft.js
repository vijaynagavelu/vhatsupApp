import moment from "moment";
export default function MessageLeft({ message, time, tailCheck }) {

    var day = moment.unix(time);
    // console.log(day.format('dddd MMMM Do YYYY, HH:mm:ss '));
    const deliveredTimeHour = day.format('HH');
    const deliveredTimeMinute = day.format('mm');

    return (

        < p className='leftCorner' >
            <span className={tailCheck ? "tailOutLeft" : "hide"}>
                <svg viewBox="0 0 8 13" height="13" width="8" preserveAspectRatio="xMidYMid meet" version="1.1" x="0px" y="0px" enableBackground="new 0 0 8 13"><path opacity="0.13" d="M1.533,3.568L8,12.193V1H2.812 C1.042,1,0.474,2.156,1.533,3.568z"></path><path d="M1.533,2.568L8,11.193V0L2.812,0C1.042,0,0.474,1.156,1.533,2.568z"></path></svg>
            </span>
            <span className={!tailCheck ? " leftMessage  borderTopLeftRadius8px" : "leftMessage"}>
                {message}
                <span className='timeStamp'>
                    <span className='font10 tick'>
                        {deliveredTimeHour}.{deliveredTimeMinute}
                    </span>
                </span>
            </span>
        </p >
    );
}


