import { useContext,useState,useCallback,useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import ChatContext from "../ChatContext";
import moment from "moment/moment";
import { auth,db } from '../firebase-config';
import {
    collection,
    getDocs,
    where,
    query,
    or,
    onSnapshot,
} from "firebase/firestore";

const CollectionRef = collection(db, "messages"); 

export default function Contact({ name, lastSeen, imgLink, messages, email }) {

    const { contact } = useContext(ChatContext);
    const { showContact } = useContext(ChatContext);
    
    const [user, setUser] = useState();
    const [messagesJson, setMessagesJson] = useState(null);
    const[messageJsonTime,setMessageJsonTime] = useState(null);

    const getMessagesArray = useCallback(async (contact) => {
        // console.log(contact)
        if ( !user) {
            return "noo";
        }
        const messagesArrayMatch = query(CollectionRef, or(
            where("arrayName", '==', contact + user.email),
            where("arrayName", '==', user.email + contact)
        ));

        //console.log(contact + user.email);

        const data = await getDocs(messagesArrayMatch);
        if (data.docs[0]) {
            console.log(data.docs[0].id);
            console.log(data.docs[0].data().messagesArray[data.docs[0].data().messagesArray.length -1].createdAt)
            setMessageJsonTime(data.docs[0].data().messagesArray[data.docs[0].data().messagesArray.length -1].createdAt)
            setMessagesJson(data.docs[0].data().messagesArray[data.docs[0].data().messagesArray.length -1].msng)
        } else {
            setMessagesJson(null);
            console.log("no such docss")
        }
    }, [user])

    useEffect(() => {
        const snapshot = onSnapshot(CollectionRef, (snapshot) => {
            getMessagesArray(email);
        });
        return snapshot
    }, [email, getMessagesArray]);

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return subscriber;
    }, [])

    
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
                <img alt="sorry" width={20} height={20} src="https://i.pinimg.com/originals/49/23/29/492329d446c422b0483677d0318ab4fa.gif"></img>
                {/* {currentDate.format(' D/MM/YYYY')} */}
            </span>
        )
    }

    return (
        // className={`contact ${contact && contact.name && "highLight"}`}
        <div className={contact && contact.name === name ? "highLight contact" : "contact"} // this one
            onClick={() => {
                showContact({ name, lastSeen, imgLink, messages, email })
            }}>
            <div className='displayPicture'>
                <img alt="sorry" src={imgLink}></img>
            </div>
            <div className='contactsDetails '>
                <div className='nameTime'>
                    <span className='font17'>{name}</span>
                    <span className='font12'> {messageTime(messageJsonTime)}</span>
                </div>
                <div className='messageOptions'>
                    <span className='font14 overFlowEllipsis'>{messagesJson}</span>
                    <span className="pinned" ></span> 
                </div>
            </div>
        </div >
    );
}


