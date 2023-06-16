import React, { useEffect } from "react";
import "./App.css";

import axios from "axios";

export const CounterComp = () => {
    //New World w. React.useState()
    const [counter, setCounter] = React.useState(0);
    const increment = () => {
        setCounter(counter + 1);
        console.log(counter);
    };
    //Old World
    // let counter = 1;
    // const increment = () => {
    //   counter = counter + 1;
    //   console.log(counter)

    return (
        <div>
            {counter}

            <button onClick={increment}>Increment</button>
        </div>
    );
};

export const InputBoxComp = () => {
    const [inputText, setInputText] = React.useState("Jerome");
    let onChange = (event) => {
        const newText = event.target.value;
        setInputText(newText);
        console.log(inputText);
    };
    return (
        <div>
            <input type="text" placeholder="type here..." onChange={onChange} />
            {inputText}
        </div>
    );
};

export const ReducerComp = () => {
    const reducer = (state, action) => {
        switch (action.type) {
            case "Increment":
                return { count: state.count + 1, showText: state.showText };
            case "toggleShowText":
                return { count: state.count, showText: !state.showText };
            default:
                return state;
        }
    };
    const [state, dispatch] = React.useReducer(reducer, {
        count: 0,
        showText: true,
    });
    return (
        <div>
            <h1>{state.count}</h1>
            <button
                onClick={() => {
                    dispatch({ type: "Increment" });
                    dispatch({ type: "toggleShowText" });
                }}
            >
                Click Here
            </button>
            {state.showText && <p>This is a text</p>}
        </div>
    );
};

export const UseEffectComp = () => {
    const [data, setData] = React.useState("");
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        axios
            .get("https://api.es-dictionary.com/api/random")
            .then((response) => {
                const data = response.data.word;
                const { word, part_of_speech, pronunciation, image_url } = data;
                const message = `${data.word} is a ${data.part_of_speech} pronounced as ${data.pronunciation}.`;
                setData({ word, part_of_speech, pronunciation, image_url });
                console.log("request initiated: ", message);
            });
    }, [count]);

    return (
        <div>
            Hello World
            <h1>{count}</h1>
            <img
                style={{
                    maxHeight: "200px",
                    width: "350px",
                    objectFit: "cover",
                }}
                src={data.image_url}
                alt={`${data.word} is a ${data.part_of_speech} pronounced as ${data.pronunciation}.`}
            />
            <h2>{`${data.word} is a ${data.part_of_speech} pronounced as ${data.pronunciation}.`}</h2>
            <button
                onClick={() => {
                    setCount(count + 1);
                }}
            >
                Click
            </button>
        </div>
    );
};

export const RefComp = () => {
    const inputRef = React.useRef(null);
    const onClick = () => {
        //usecase in forms
        inputRef.current.focus();
        console.log(inputRef.current.value);
        inputRef.current.value = "";
    };
    return (
        <div>
            <h1>Jerome</h1>
            <input
                style={{
                    lineHeight: "42px",
                    borderRadius: "10px",
                    marginRight: "0.5rem",
                }}
                type="text"
                placeholder="Ex..."
                ref={inputRef}
            />
            <button onClick={onClick}>Change Name</button>
        </div>
    );
};

export const UseLayoutComp = () => {
    const inputRef = React.useRef(null);

    React.useLayoutEffect(() => {
        console.log("UseLayoutEffect: ", inputRef.current.value);
    }, []);

    React.useEffect(() => {
        inputRef.current.value = "HELLO";
        console.log("UseEffect: ", inputRef.current.value);
    }, []);

    return (
        <div>
            <input
                style={{
                    lineHeight: "42px",
                    borderRadius: "10px",
                    marginRight: "0.5rem",
                    width: "400px",
                }}
                type="text"
                value={"JEROME"}
                placeholder="Ex..."
                readOnly
                ref={inputRef}
            />
        </div>
    );
};

export const ButtonChild = React.forwardRef((props, ref) => {
    const [toggle, setToggle] = React.useState(null);

    React.useImperativeHandle(ref, () => ({
        alterToggle() {
            setToggle(!toggle);
        },
    }));
    return (
        <>
            <button
                onClick={() => {
                    setToggle(!toggle);
                    console.log("Triggered toggle from Child");
                }}
            >
                Button from Child
            </button>
            {toggle && <h2>Toggle Text</h2>}
        </>
    );
});

export const ImperativeHandle = () => {
    const buttonRef = React.useRef(null);
    return (
        <div
            style={{
                display: "flex",
                flexFlow: "column",
                gap: "0.5rem",
                padding: "1rem",
            }}
            onClick={() => {
                buttonRef.current.alterToggle();
            }}
        >
            <button>Button from Parent</button>
            <ButtonChild ref={buttonRef} />
        </div>
    );
};

//ContextComponent Child
export const Login = (setUsername) => {
    
    
    return (
        <>
            <input type="text" onChange={() => {
                setUsername
            }} placeholder="Type anything here..." />
        </>
    );
};

export const User = () => {
    const usernameRef = React.useRef(null);

    return (
        <>
            <h1 ref={usernameRef}>User:</h1>
        </>
    );
};

export const ContextComponent = () => {
    const [username, setUsername] = React.useState("");

    return (
        <div>
            <Login setUsername={setUsername} />
            <User username={username} />
        </div>
    );
};

export default function App() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                gap: "10px",
                textAlign: "center",
            }}
        >
            <ContextComponent />
        </div>
    );
}
