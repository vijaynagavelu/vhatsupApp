export default function Input({ type, placeHolder, setItem, label, errorMessage }) {

    return (
        <div>
            <label className="inputLabel">
                {label}
            </label>

            <input className="inputBox" type={type} placeholder={placeHolder} onChange={(e) => {
                setItem(e.target.value)
            }} />

            <div className={errorMessage ? "errorMessage" : "transparentMessage"}>{errorMessage ? errorMessage : ""}</div>

        </div >
    )
}