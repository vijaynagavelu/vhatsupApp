import { useContext } from "react";
import ChatContext from "../ChatContext";
import moment from "moment/moment";

export default function Contact({ name, lastSeen, lastMessageTime, message, pinned, imgLink, messages, email }) {

    const { contact } = useContext(ChatContext);
    const { showContact } = useContext(ChatContext);

    function messageTime(time) {
        var lastSeen = moment.unix(time);
        var currentDate = moment.unix(Math.floor(Date.now() / 1000));
        const deliveredTimeHour = lastSeen.format('HH');
        const deliveredTimeMinute = lastSeen.format('mm');

        // console.log(currentDate.format('dddd MMMM Do YYYY, HH:mm:ss '));

        if (currentDate.format('dddd MMMM Do YYYY') === lastSeen.format('dddd MMMM Do YYYY')) {
            return (
                <span>
                    {deliveredTimeHour}:{deliveredTimeMinute} {' '}
                </span>
            )
        }
        else if (currentDate.format('MMMM YYYY') === lastSeen.format('MMMM YYYY')
            &&
            ((currentDate.format('D') - lastSeen.format('D')) === 1)) {
            return (
                <span>
                    yesterday
                </span>
            )
        }
        else if
            (currentDate.format('MMMM YYYY') === lastSeen.format('MMMM YYYY')
            &&
            (currentDate.format('D') - lastSeen.format('D') <= 4)) {
            return (
                <span>
                    {lastSeen.format('dddd').toLowerCase()}
                </span>
            )
        }
        return (
            <span>
                {currentDate.format(' D/MM/YYYY')}
            </span>
        )
    }

    return (
        // className={`contact ${contact && contact.name && "highLight"}`}
        <div className={contact && contact.name === name ? "highLight contact" : "contact"} // this one
            onClick={() => {
                showContact({ name, lastSeen, lastMessageTime, imgLink, messages, email })
            }}>
            <div className='displayPicture'>
                <img src={imgLink}></img>
            </div>
            <div className='contactsDetails '>
                <div className='nameTime'>
                    <span className='font17'>{name}</span>
                    <span className='font12'>{messageTime(lastMessageTime)}</span>
                </div>
                <div className='messageOptions'>
                    <span className='font14 overFlowEllipsis'> {message}</span>
                    <span >{pinned}</span>
                </div>
            </div>
        </div >
    );
}


