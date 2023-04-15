import Contact from "./Contact";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from '../firebase-config';
import { useEffect, useState } from "react";
import {
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    collection,
    updateDoc,
    setDoc,
    where,
    query,
    getDocs,
    arrayUnion,
    or,
    onSnapshot,
} from "firebase/firestore";

export default function ChatsSection() {

    const [user, setUser] = useState();
    const [chats, setChats] = useState();
    const [documentId, setDocumentId] = useState();
    const [message, setMessage] = useState();

    const CollectionRef = collection(db, "contactsArray");


    const getChatsArray = async () => {
        if (!user) {
            return;
        }
        console.log(user.email + "Array");
        const data = await getDocs(CollectionRef, user.email + "Array");
        if (data.docs[0]) {
            //  console.log(data.docs[0].id);
            setDocumentId(data.docs[0].id);
            // console.log(data.docs[0].data().a);
            setChats(data.docs[0].data().a);
        } else {
            setChats(null);
            console.log("no such docss")
        }
    }


    const addContact = async () => {
        if (!message) {
            return (console.log("emptyMessage"));
        }
        if (documentId) {
            console.log("update", message)
            const Doc = doc(db, "contactsArray", documentId);
            const newField = {
                a: arrayUnion({
                    name: message,
                    email: 'L',
                    lastSeen: 1679885500,
                    imgLink: "https://pps.whatsapp.net/v/t61.24694-24/328166465_249566454170366_1441687259811871293_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdTloUIuU5nXttmyPVHbcR69kvgrNsxrSardAVsAU-2McA&oe=6444D8ED",
                })
            };
            await updateDoc(Doc, newField);
            setMessage("");
        } else {
            console.log("new")
            await setDoc(doc(CollectionRef, user.email + "Array"), {
                a: [
                    {
                        email: "d",
                        imgLink: "d",
                        lastSeen: "f",
                        name: "agent1"
                    },
                ]
            });
        }
    };

    useEffect(() => {
        // console.log("chatSection");
        getChatsArray();
    }, [user]);

    useEffect(() => {
        onSnapshot(CollectionRef, (snapshot) => {
            // console.log(snapshot)
            getChatsArray();
        });
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return subscriber;
    }, []);


    // var contactsArray = [
    //     {
    //         name: "Tharini", lastSeen: 1680344448, messageTime: 1680344448, message: "✔️Oii", pinned: "📌", email: "vj0503@gmail.com",
    //         imgLink: "https://pps.whatsapp.net/v/t61.24694-24/328704714_229782059617706_5975540012040999418_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdR2zXsejk0BwMs0T8bMvpb3wYNWn5-Q3LbXi8E0_O1adw&oe=6433A575",
    //         messages: [
    //             {
    //                 sender: "personA",
    //                 message: "I am cool",
    //                 time: 1679994090,
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "Ah ok",
    //                 time: 1679994030,
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "what dinner",
    //                 time: 1679994090,
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "chicken masala",
    //                 time: 1679994150,
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "mutton  ",
    //                 time: 1679994150
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "fish fry",
    //                 time: 1679994210
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "chicken chips",
    //                 time: 1679994210
    //             }
    //         ]
    //     },
    //     {
    //         name: "Prasanna", lastSeen: 1679885500, messageTime: 1679885500, message: "padi da", pinned: "📌", email: "pvr@gmail.com",
    //         imgLink: "https://pps.whatsapp.net/v/t61.24694-24/299845059_581118320335824_5443398273651425811_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdQyia4dtUYdx0FBr_jCs0AN59DkAj0YWGj3DxOElWF9wQ&oe=64156305"
    //         , messages: [
    //             {
    //                 sender: "personA",
    //                 message: "epo pakalam",
    //                 time: 1679927577,
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "mudichiya",
    //                 time: 1679927576
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "poitu iruku",
    //                 time: 1679927575,
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "night 8 ku",
    //                 time: 1679927574
    //             },
    //             {
    //                 sender: "personB",
    //                 message: "pakalam  ",
    //                 time: 1679927572
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "done",
    //                 time: 1679927571
    //             },
    //             {
    //                 sender: "personA",
    //                 message: "ok da",
    //                 time: 1679927570
    //             }
    //         ]
    //     },
    //     {
    //         name: "Raghav", lastSeen: 1679820700, messageTime: 1679820700, message: "ok da", pinned: "📌", imgLink: "https://pps.whatsapp.net/v/t61.24694-24/323107481_233093672520047_5073444702369604171_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdQEPgnVN3hezkoC56EHqAgGaPhNfzDfllh5BAs1JJThQQ&oe=64381226"
    //         , messages: [{
    //             sender: "Person A",
    //             message: "I am cool",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "Ah ok",
    //                 time: 1503202319143316
    //             }
    //         }, {
    //             sender: "Person A",
    //             message: "what dinner",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "chicken gravy\mutton masala",
    //                 time: 1503202319143316
    //             }
    //         }
    //         ]
    //     },
    //     {
    //         name: "PVR Kaivendhar", lastSeen: 1679705500, messageTime: 1679705500, message: "Raghav:🤣🤣🤣🤣", pinned: "", imgLink: "https://pps.whatsapp.net/v/t61.24694-24/253075198_127823396285160_4289809487115666341_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdS3kRZcyOmX6biB4hF6H5hGP1HBa9aa1r75MWNysgpEwg&oe=64157344",
    //         messages: [{
    //             sender: "Person A",
    //             message: "I am cool",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "Ah ok",
    //                 time: 1503202319143316
    //             }
    //         }, {
    //             sender: "Person A",
    //             message: "what dinner",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "chicken gravy\mutton masala",
    //                 time: 1503202319143316
    //             }
    //         }
    //         ]
    //     },
    //     {
    //         name: "Trends", lastSeen: 1679305900, messageTime: 1679305900, message: "This business works with other companies", pinned: "", imgLink: "https://pps.whatsapp.net/v/t61.24694-24/160653682_110953718216061_5564924393895890460_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdRCzNrPTMAylkt-Qp3N65TvT03MslCdEa7dsw7Hf8sW-g&oe=64156BD1",
    //         messages: [{
    //             sender: "Person A",
    //             message: "I am cool",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "Ah ok",
    //                 time: 1503202319143316
    //             }
    //         }, {
    //             sender: "Person A",
    //             message: "what dinner",
    //             time: 1503202319143215,
    //             response: {
    //                 sender: "Person B",
    //                 message: "chicken gravy\mutton masala",
    //                 time: 1503202319143316
    //             }
    //         }
    //         ]
    //     }
    // ]

    useEffect(() => {
        const subscriber = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
        return subscriber;
    }, [])

    const logout = async () => {
        await signOut(auth);
    }

    if (!chats) {
        return;
    }
    if (chats) {
        console.log("nooooo")
        return (
            <div className='containerA'>

                <div className="sticky">
                    <div className='navBar'>
                        <div className='profilePicture'>
                            <img src='https://pps.whatsapp.net/v/t61.24694-24/325585548_523323919881403_2051161980019777328_n.jpg?stp=dst-jpg_s96x96&ccb=11-4&oh=01_AdSdXxKQTWmPkO1RZJJ6QZ0H_ZFefhla_EyWK26QM40hSg&oe=642EC410'></img>
                        </div>

                        <div className='options'>
                            <svg viewBox="0 0 28 28" height="28" width="28" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2146 12.1436C19.2257 12.2242 19.2405 12.3027 19.2587 12.38C19.2678 12.4192 19.2777 12.4573 19.2885 12.4942C19.3098 12.5695 19.3347 12.6435 19.3631 12.7161C19.4049 12.8228 19.4541 12.9261 19.5103 13.0253C19.5476 13.0903 19.5878 13.1541 19.6308 13.2146C19.7592 13.3979 19.9131 13.5599 20.0872 13.6953C20.2045 13.7857 20.3297 13.8641 20.4611 13.9294C20.5619 13.979 20.6659 14.0209 20.7723 14.0549C20.8441 14.0773 20.9175 14.0964 20.9926 14.112C21.1465 14.1432 21.3029 14.159 21.4596 14.1591C22.7133 14.1591 23.7297 13.0907 23.7297 11.7727C23.7297 10.4548 22.7133 9.38636 21.4596 9.38636C21.3028 9.38593 21.1464 9.40169 20.9926 9.43343C20.9183 9.44836 20.8448 9.46743 20.7723 9.49057C20.6659 9.52417 20.5619 9.56573 20.4611 9.61493C20.1326 9.77773 19.8474 10.0232 19.6308 10.3297C19.5881 10.3913 19.5476 10.4541 19.5103 10.5202C19.4539 10.6192 19.4047 10.7226 19.3631 10.8294C19.3351 10.9011 19.3098 10.975 19.2885 11.0501C19.2776 11.0882 19.2677 11.1263 19.2587 11.1644C19.2405 11.2417 19.2257 11.3201 19.2146 11.4008C19.1807 11.6471 19.1807 11.8972 19.2146 12.1436ZM8.78544 12.1436C8.77479 12.2242 8.75955 12.3027 8.74143 12.38C8.73233 12.4192 8.72238 12.4573 8.71158 12.4942C8.69029 12.5695 8.66539 12.6435 8.63697 12.7161C8.5951 12.8228 8.54587 12.9261 8.48968 13.0253C8.45248 13.0903 8.4123 13.1541 8.36935 13.2146C8.2408 13.3978 8.08694 13.5598 7.91285 13.6953C7.79563 13.7857 7.67043 13.8641 7.53896 13.9294C7.43819 13.979 7.33419 14.0209 7.22773 14.0549C7.1559 14.0773 7.08246 14.0964 7.00743 14.112C6.85355 14.1432 6.6972 14.159 6.54049 14.1591C5.28668 14.1591 4.27027 13.0907 4.27027 11.7727C4.27027 10.4548 5.28668 9.38636 6.54049 9.38636C6.69722 9.38594 6.85362 9.4017 7.00743 9.43343C7.08177 9.44837 7.15531 9.46745 7.22773 9.49057C7.33416 9.52417 7.43817 9.56573 7.53896 9.61493C7.86749 9.77773 8.15273 10.0232 8.36935 10.3297C8.41198 10.3913 8.45248 10.4541 8.48968 10.5202C8.54608 10.6192 8.59532 10.7226 8.63697 10.8294C8.66501 10.9011 8.69027 10.975 8.71158 11.0501C8.72231 11.0882 8.73226 11.1263 8.74143 11.1644C8.75955 11.2417 8.77436 11.3201 8.78544 11.4008C8.81927 11.6471 8.81927 11.8972 8.78544 12.1436ZM25.8687 17.9655C25.8408 17.9167 25.81 17.8635 25.7724 17.8045C25.732 17.741 25.6864 17.673 25.6341 17.6005C25.5818 17.5279 25.524 17.4509 25.459 17.3715C25.3939 17.2922 25.3229 17.2106 25.2447 17.1267C24.925 16.7866 24.5597 16.4953 24.1598 16.2618C24.0335 16.187 23.8993 16.1167 23.7576 16.0498C23.7533 16.0476 23.7496 16.0464 23.7455 16.0442C22.1352 15.3489 20.3211 15.3489 18.7108 16.0442C18.6881 16.0544 18.6667 16.0657 18.6447 16.077C18.6086 16.094 18.5756 16.1133 18.5405 16.1314C18.5601 16.1428 18.5801 16.153 18.5996 16.1643C18.9985 16.3978 19.3771 16.6663 19.7312 16.9668C19.9625 17.1625 20.1826 17.3718 20.3904 17.5937C20.5189 17.7297 20.6364 17.8646 20.7437 17.9961C20.8538 18.131 20.9503 18.2568 21.0364 18.377C21.125 18.5005 21.2015 18.615 21.2698 18.7204C21.3344 18.8224 21.3891 18.9131 21.4363 18.997C21.5259 19.1507 21.5927 19.3172 21.6345 19.4912L21.652 19.6136H26V18.2273C25.9621 18.1371 25.9182 18.0496 25.8687 17.9655ZM17.5278 10.1666C17.5102 10.0398 17.487 9.91635 17.4584 9.79522C17.4442 9.73465 17.4285 9.67408 17.4115 9.61466C17.3777 9.49581 17.3386 9.38039 17.2945 9.26726C17.2289 9.09959 17.1515 8.93725 17.0631 8.78158C17.0046 8.67873 16.9415 8.57931 16.8739 8.48332C16.5346 8.00097 16.0861 7.61525 15.5691 7.36112C15.4109 7.28296 15.2473 7.21726 15.0798 7.16456C14.967 7.12913 14.8515 7.09828 14.7337 7.07428C14.4919 7.02494 14.2462 7 13.9999 7C11.9785 7 10.4324 8.62502 10.4324 10.7506C10.4324 12.8761 11.9785 14.5 13.9999 14.5C14.2462 14.5 14.4919 14.4751 14.7337 14.4257C14.8515 14.4017 14.967 14.3709 15.0798 14.3354C15.2473 14.2827 15.4109 14.217 15.5691 14.1389C16.0861 13.8847 16.5346 13.499 16.8739 13.0167C16.9414 12.9207 17.0045 12.8213 17.0631 12.7184C17.1515 12.5627 17.2289 12.4004 17.2945 12.2327C17.338 12.1196 17.3777 12.003 17.4115 11.8853C17.4285 11.8259 17.4442 11.7654 17.4584 11.7048C17.487 11.5837 17.5102 11.4602 17.5278 11.3334C17.5808 10.9465 17.5808 10.5535 17.5278 10.1666ZM20.6193 19.4555C20.5796 19.3837 20.5339 19.3049 20.4804 19.218C20.4229 19.1253 20.3569 19.0245 20.2824 18.9179C20.2078 18.8113 20.1246 18.6978 20.0322 18.5819C19.9399 18.466 19.8381 18.3444 19.7265 18.2227C19.5473 18.0258 19.3577 17.8397 19.1588 17.6654C18.8523 17.3979 18.5247 17.1587 18.1798 16.9505C17.9998 16.8416 17.8086 16.7373 17.6063 16.64C17.6008 16.6364 17.595 16.6333 17.5891 16.6307C16.6495 16.1788 15.4683 15.8636 13.9998 15.8636C12.5313 15.8636 11.3499 16.1788 10.4105 16.6307C10.3778 16.6457 10.348 16.6631 10.3161 16.6793C10.1788 16.7477 10.0469 16.8195 9.92017 16.8925C9.85146 16.9331 9.78428 16.9737 9.71862 17.0142C9.41108 17.2077 9.11765 17.4253 8.84079 17.6654C8.6418 17.8397 8.45224 18.0257 8.27305 18.2227C8.16168 18.3444 8.06003 18.4649 7.96733 18.5819C7.87464 18.6989 7.79166 18.8102 7.71709 18.9179C7.64252 19.0257 7.57668 19.1253 7.51914 19.218C7.46564 19.3049 7.42 19.3837 7.38037 19.4555C7.37666 19.4611 7.37327 19.4669 7.37021 19.4729C7.32851 19.5482 7.29455 19.6143 7.26769 19.6687C7.21397 19.7777 7.18919 19.8391 7.18919 19.8391V22H20.8108V19.8391C20.754 19.7074 20.6901 19.5793 20.6193 19.4555ZM6.35546 19.4924C6.36554 19.4066 6.39303 19.324 6.43613 19.2498C6.46975 19.1841 6.49499 19.1048 6.54734 19.013C6.60542 18.9121 6.65115 18.8226 6.71464 18.7217C6.78264 18.6152 6.85571 18.5007 6.94322 18.3795C7.03072 18.2582 7.12639 18.1301 7.23395 17.9987C7.34152 17.8672 7.45967 17.7312 7.58895 17.5929C8.08473 17.0649 8.64795 16.6085 9.26317 16.2364C9.3271 16.1978 9.393 16.1593 9.45946 16.1219C9.43069 16.1072 9.40435 16.0913 9.37449 16.0777C9.35244 16.0664 9.3304 16.055 9.30836 16.0448C8.51449 15.6871 7.65502 15.5093 6.78837 15.5235C5.92176 15.5093 5.06232 15.6871 4.26849 16.0448C4.2643 16.0471 4.26055 16.0482 4.25636 16.0505C4.11441 16.1174 3.98006 16.1876 3.85365 16.2624C3.61148 16.404 3.38154 16.5667 3.16637 16.7486C3.02676 16.8672 2.89361 16.9935 2.76751 17.1272C2.68926 17.211 2.61777 17.2926 2.55304 17.372C2.48813 17.4513 2.42972 17.5283 2.37736 17.6009C2.32501 17.6734 2.27873 17.7414 2.23828 17.8049C2.20081 17.8638 2.16532 17.9171 2.13743 17.9658C2.04497 18.1267 2 18.2276 2 18.2276V19.6136H6.34741L6.35546 19.4924Z" fill="currentColor"></path></svg>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill="currentColor" d="M12,20.664c-2.447,0.006-4.795-0.966-6.521-2.702c-0.381-0.381-0.381-1,0-1.381c0.381-0.381,1-0.381,1.381,0 l0,0c2.742,2.742,7.153,2.849,10.024,0.244c0.4-0.361,1.018-0.33,1.379,0.07c0.36,0.398,0.33,1.013-0.066,1.375 C16.502,19.813,14.292,20.666,12,20.664z M19.965,14.552c-0.539,0-0.977-0.437-0.977-0.976c0-0.085,0.011-0.17,0.033-0.253 c1.009-3.746-1.105-7.623-4.8-8.804c-0.51-0.175-0.782-0.731-0.607-1.241c0.17-0.495,0.7-0.768,1.201-0.619 c4.688,1.498,7.371,6.416,6.092,11.169C20.793,14.255,20.407,14.551,19.965,14.552z M3.94,14.162 c-0.459-0.001-0.856-0.321-0.953-0.769C1.939,8.584,4.858,3.801,9.613,2.533c0.52-0.144,1.058,0.161,1.201,0.681 c0.144,0.52-0.161,1.058-0.681,1.201c-0.005,0.001-0.01,0.003-0.015,0.004C6.37,5.418,4.07,9.187,4.895,12.977 c0.114,0.527-0.221,1.048-0.748,1.162C4.079,14.154,4.01,14.162,3.94,14.162z"></path></svg>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill="currentColor" enable-background="new    " d="M19.005,3.175H4.674C3.642,3.175,3,3.789,3,4.821V21.02 l3.544-3.514h12.461c1.033,0,2.064-1.06,2.064-2.093V4.821C21.068,3.789,20.037,3.175,19.005,3.175z M14.016,13.044H7.041V11.1 h6.975V13.044z M17.016,9.044H7.041V7.1h9.975V9.044z"></path></svg>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill="currentColor" d="M12,7c1.104,0,2-0.896,2-2c0-1.105-0.895-2-2-2c-1.104,0-2,0.894-2,2 C10,6.105,10.895,7,12,7z M12,9c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,9.895,13.104,9,12,9z M12,15 c-1.104,0-2,0.894-2,2c0,1.104,0.895,2,2,2c1.104,0,2-0.896,2-2C13.999,15.894,13.104,15,12,15z"></path></svg>
                        </div>
                    </div>

                    <div className='search'>
                        <div className='searchBar'>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill="currentColor" d="M15.009,13.805h-0.636l-0.22-0.219c0.781-0.911,1.256-2.092,1.256-3.386 c0-2.876-2.332-5.207-5.207-5.207c-2.876,0-5.208,2.331-5.208,5.207s2.331,5.208,5.208,5.208c1.293,0,2.474-0.474,3.385-1.255 l0.221,0.22v0.635l4.004,3.999l1.194-1.195L15.009,13.805z M10.201,13.805c-1.991,0-3.605-1.614-3.605-3.605 s1.614-3.605,3.605-3.605s3.605,1.614,3.605,3.605S12.192,13.805,10.201,13.805z"></path></svg>
                            <input className='searchBox' placeholder='Search or start new chat' onChange={(e) => { setMessage(e.target.value) }} value={message}></input >
                        </div>
                        <button onClick={addContact} >Add</button>
                        <div className='unreadChatsFliter'>
                            <svg viewBox="0 0 24 24" height="20" width="20" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path fill="currentColor" d="M10,18.1h4v-2h-4V18.1z M3,6.1v2h18v-2H3z M6,13.1h12v-2H6V13.1z"></path></svg>
                        </div>
                    </div>
                </div>

                <div className='archivedBar'>
                    <div className='archivedIcon'>
                        <svg viewBox="0 0 20 20" height="18" width="18" preserveAspectRatio="xMidYMid meet" class="" fill="none"><path d="M18.54 3.23L17.15 1.55C16.88 1.21 16.47 1 16 1H4C3.53 1 3.12 1.21 2.84 1.55L1.46 3.23C1.17 3.57 1 4.02 1 4.5V17C1 18.1 1.9 19 3 19H17C18.1 19 19 18.1 19 17V4.5C19 4.02 18.83 3.57 18.54 3.23ZM4.24 3H15.76L16.57 3.97H3.44L4.24 3ZM3 17V6H17V17H3ZM11.45 8H8.55V11H6L10 15L14 11H11.45V8Z" fill="currentColor"></path></svg>
                    </div>
                    <div className='archived'>
                        Archived
                    </div>
                </div>


                {
                    chats.map(function (contact, i) {
                        return (
                            // <Contact key={i} name={contact.name} lastSeen={contact.lastSeen} lastMessageTime={contact.messageTime} message={contact.message} pinned={contact.pinned} imgLink={contact.imgLink} messages={contact.messages} email={contact.email} />
                            <Contact key={i} name={contact.name} lastSeen={contact.lastSeen} lastMessageTime={1679705500} message={"No"} pinned={"No"} imgLink={contact.imgLink} messages={"No"} email={contact.email} />
                        )
                    })
                }

                <span className='encrptionMessage'>
                    <svg className='lock' viewBox="0 0 13 12" height="12" width="13" preserveAspectRatio="xMidYMid meet" ><path d="M9.54004 3.4668C9.54004 2.87891 9.39421 2.33887 9.10254 1.84668C8.81543 1.34993 8.4235 0.958008 7.92676 0.670898C7.43457 0.379232 6.89681 0.233398 6.31348 0.233398C5.72559 0.233398 5.18327 0.379232 4.68652 0.670898C4.19434 0.958008 3.80241 1.34993 3.51074 1.84668C3.22363 2.33887 3.08008 2.87891 3.08008 3.4668V4.7041C3.05273 4.71322 2.99805 4.73828 2.91602 4.7793C2.61979 4.9388 2.39421 5.16439 2.23926 5.45605C2.15267 5.61556 2.09115 5.79102 2.05469 5.98242C2.01823 6.17383 2 6.45866 2 6.83691V9.25C2 9.62826 2.01823 9.91309 2.05469 10.1045C2.09115 10.2959 2.15267 10.4714 2.23926 10.6309C2.39421 10.9225 2.61979 11.1481 2.91602 11.3076C3.07096 11.3942 3.24414 11.4557 3.43555 11.4922C3.63151 11.5286 3.91634 11.5469 4.29004 11.5469H8.33008C8.70378 11.5469 8.98633 11.5286 9.17773 11.4922C9.3737 11.4557 9.54915 11.3942 9.7041 11.3076C9.99577 11.1527 10.2214 10.9271 10.3809 10.6309C10.4674 10.4714 10.529 10.2959 10.5654 10.1045C10.6019 9.91309 10.6201 9.62826 10.6201 9.25V6.83691C10.6201 6.45866 10.6019 6.17383 10.5654 5.98242C10.529 5.79102 10.4674 5.61556 10.3809 5.45605C10.2214 5.15983 9.99577 4.93424 9.7041 4.7793C9.62207 4.73828 9.56738 4.71322 9.54004 4.7041V3.4668ZM4.37207 3.4668C4.37207 3.11589 4.45866 2.79232 4.63184 2.49609C4.80501 2.19531 5.03971 1.95833 5.33594 1.78516C5.63672 1.61198 5.96257 1.52539 6.31348 1.52539C6.66439 1.52539 6.98796 1.61198 7.28418 1.78516C7.5804 1.95833 7.8151 2.19531 7.98828 2.49609C8.16146 2.79232 8.24805 3.11589 8.24805 3.4668V4.54004H4.37207V3.4668Z"></path></svg>
                    <span>
                        Your personal messages are {""}
                        <span style={{ color: "#53bdeb" }}>
                            end-to-end encrypted
                        </span>
                    </span>

                    <p>
                        <input type="submit" value="LogOut" onClick={logout} />
                        {user && <p>{user.email}</p>}
                    </p>


                </span>

            </div >
        );
    }


}
