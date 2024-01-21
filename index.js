let myLeads = [];
const leadsfromLS = localStorage.getItem("myLeads");
const inputEl = document.getElementById("input-el");
const savebtn = document.getElementById("input-btn");
const tabbtn = document.getElementById("tab-btn");
const delbtn = document.getElementById("delete-btn");
const ulEl = document.getElementById("ul-el");

if (leadsfromLS){
    myLeads = leadsfromLS.split(',');
    render(myLeads);
};

function render(leads){
    let listItems = "";
    for (let i = 0; i < leads.length; i++){
        listItems += `<li>
                        <a href='${leads[i]}' target='_blank'>
                            ${leads[i]}
                        </a>
                    </li>`;
    };
    
    ulEl.innerHTML = listItems;
};

tabbtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
    

    
})

delbtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

savebtn.addEventListener("click", function(){   
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});
