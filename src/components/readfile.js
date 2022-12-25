import { useState } from "react";

const fs = require("fs");

function syncReadFile(filename){
    const contents = fs.readFileSync(filename, 'utf-8');

    const arr = contents.split("\r\n");

    console.log(arr);

    let co2 = arr.map((current) => current["co2"])

    console.log(co2);
    return arr;
}

syncReadFile("src/components/data.txt");