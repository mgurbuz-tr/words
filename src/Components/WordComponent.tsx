import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";


((String.prototype) as any).splice = function (idx: number, str: string) {
    var x = this.split("");
    if (str == "") {
        x[idx] = ' ';
    }
    else {
        x[idx] = str;
    }
    return x.join("");
};

interface WordComponentProps {
    enWord: string;
    trWord: string;
    onSuccess: () => void;
}


function WordComponent(props: WordComponentProps) {
    const { enWord, trWord, onSuccess } = props;
    const [inputTrWord, setInputTrWord] = useState("");

    function handleOnChange(event: ChangeEvent<HTMLInputElement>, index: number): void {
        setInputTrWord((inputTrWord as any).splice(index, event.target.value));
    }

    function btnShow_onClick() {
        setInputTrWord(trWord);
    }

    function btnNext_onClick() {
        setInputTrWord("");
        onSuccess();
    }

    function getValue(index: number): string {
        if (inputTrWord.length == 0 || inputTrWord.split("")[index] == undefined)
            return "";
        return inputTrWord.split("")[index] == ' ' ? '' : inputTrWord.split("")[index];
    }

    function onKeyUp(e: any, index: number) {
        if (e.target.value == "" && inputTrWord.split("")[index] == " ") {
            var x = (document.getElementById("input_" + (index - 1)) as any);
            if (x) {
                x?.focus();
                setInputTrWord((inputTrWord as any).splice(index, e.target.value));
            }
        }
        else if (index < trWord.length && e.target.value != "") {
            var x = document.getElementById("input_" + (index + 1)) as any;
            x?.focus();
        } else {
            var x = (document.getElementById("input_" + (index - 1)) as any);
            if (x) {
                x?.focus();
                setInputTrWord((inputTrWord as any).splice(index, e.target.value));
            }
        }
    }

    useEffect(() => {
        if(trWord == inputTrWord){
            var inputs = document.getElementById("inputs");
            (inputs?.childNodes as any).forEach((s: HTMLInputElement) : void=> {
                s.classList.add("inputWordsSuccess");
            });
        }else{
            var inputs = document.getElementById("inputs");
            (inputs?.childNodes as any).forEach((s: HTMLInputElement) : void=> {
                s.classList.remove("inputWordsSuccess");
            });
        }
    }, [inputTrWord])
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography variant="body2">
                        {enWord.toLocaleUpperCase()}
                    </Typography>
                </CardContent>
                <CardContent>
                    <div id="inputs">
                        {trWord.split("").map((chr, index) => {
                            return <input key={index.toString()} id={"input_" + index.toString()} onKeyUp={(e) => { onKeyUp(e, index) }} className="inputWords" maxLength={1} type="text" value={getValue(index)} onChange={(e) => handleOnChange(e, index)} />
                        })}

                    </div>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={(e) => btnShow_onClick()}>Show</Button>
                    <Button size="small" onClick={(e) => btnNext_onClick()}>Next</Button>
                </CardActions>
            </Card>
        </>
    )
}
export default WordComponent;