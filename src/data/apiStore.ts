import jmespath from "jmespath";


if (!localStorage.apis) localStorage.apis = [];

interface API {
    name: string
}

function filePicker(): Promise<string[]> {
    
    const elem = document.createElement("input");
    elem.type = "file";
    elem.accept = "application/json";

    return new Promise(function(resolve, reject) {
        elem.addEventListener("change", async function (e) {
    
            const files = Array.from(elem.files || []);
    
            const texts = await Promise.all(files.map(file => file?.text()));

            resolve(texts);
        });
        elem.click();

    });

}

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = "https://reddit.com/r/mildlyinteresting.json";

async function getData() {
    const response = await fetch(proxy + url);
    const json = await response.json();
    const data = jmespath.search(json, "data.children[].data");
    return data;
}


function addStore(store: any) {
    localStorage.apis.push(store);
}

export {filePicker, addStore};