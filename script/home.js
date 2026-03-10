  

let currentBtn = "all"
const btnActive = ["btn-primary"];
const btnInactive = ["btn-primary", "btn-outline", "btn-transparent"];

const issueContainer = document.getElementById("issue-container")
const openIssueContainer = document.getElementById("open-issue-container")
const closeIssueContainer = document.getElementById("close-issue-container")

function switchBtn(button){
    const btns = ["all", "open", "close"];

    for (const btn of btns) {
        const btnName = document.getElementById("btn-" + btn);
        if(btn === button) {
            btnName.classList.remove(...btnInactive)
            btnName.classList.add(btnActive)
        } else{
            btnName.classList.remove(btnActive)
            btnName.classList.add(...btnInactive)
        }
    }

    const pages = [issueContainer, openIssueContainer, closeIssueContainer]

    for (const section of pages) {
        section.classList.add("hidden")

    }

    if (button === "all") {
        issueContainer.classList.remove("hidden")
    }
    else if(button === "open") {
        openIssueContainer.classList.remove("hidden") 
    }
    else{  
        closeIssueContainer.classList.remove("hidden")
    }

}

// count update
// const totalCard = document.getElementById("count")

// totalCard.innerText = issueContainer.children.length;

switchBtn(currentBtn)



const loadIssues = () => {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((json) => displayIssue(json.data));
};

const displayIssue = (issues) => {
    const issueContainer = document.getElementById("issue-container")
    issueContainer.innerHTML = "";

    for (let issue of issues ){
        const issueDiv = document.createElement("div");
        issueDiv.innerHTML = `
        <div class="card w-100% shadow-md py-3 px-4 space-y-4 border-t-4 border-[#00A96E]">
            <div class="flex justify-between px-2 ">
                <img src="images/Open-Status.png" alt="">
                <h2 class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full">${issue.priority}</h2>
                <p Class="hidden"> ${issue.status} </p>
            </div>

            <div class="">
                <h2 class="font-semibold text-lg">${issue.title}</h2>
                <p class=" text-[#64748B]">${issue.description}</p>
                <button class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</button>
                <button class="border-2 border-amber-400 bg-yellow-300 font-bold text-amber-500 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</button>
            </div>

            <div class=" text-sm text-[#64748B] border-t-2 border-gray-300 flex justify-between">
                <p>${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
            <div class=" text-sm text-[#64748B] flex justify-between">
                <p>${issue.assignee}</p>
                <p>${issue.updatedAt}</p>
            </div>
        </div>        
        `

        issueContainer.append(issueDiv);

    }

    
}


// const displayOpenIssue = (issues) =>{
//     const issue = document.getElementById("open-issue-container")
//     issue.innerHTML = "";

//     if ($issue.status === "open" ) {

//          for (let issue of issues ){
//         const issueDiv = document.createElement("div");
//         issueDiv.innerHTML = `
//         <div class="card w-100% shadow-md py-3 px-4 space-y-4 border-t-4 border-[#00A96E]">
//             <div class="flex justify-between px-2 ">
//                 <img src="images/Open-Status.png" alt="">
//                 <h2 class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full">${issue.priority}</h2>
//                 <p Class=""> ${issue.status} </p>
//             </div>

//             <div class="">
//                 <h2 class="font-semibold text-lg">${issue.title}</h2>
//                 <p class=" text-[#64748B]">${issue.description}</p>
//                 <button class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</button>
//                 <button class="border-2 border-amber-400 bg-yellow-300 font-bold text-amber-500 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</button>
//             </div>

//             <div class=" text-sm text-[#64748B] border-t-2 border-gray-300 flex justify-between">
//                 <p>${issue.author}</p>
//                 <p>${issue.createdAt}</p>
//             </div>
//             <div class=" text-sm text-[#64748B] flex justify-between">
//                 <p>${issue.assignee}</p>
//                 <p>${issue.updatedAt}</p>
//             </div>
//         </div>        
//         `

//         issueContainer.append(issueDiv);

//     }
//     }
//     else{

//     }

// }




loadIssues();


// const displayOpenIssue = (openIssues) => {
//     const openIssueContainer = document.getElementById("open-issue-container")
//     openIssueContainer.innerHTML = "";

//      for (let issue of issues ){
//         const openIssueDiv = document.createElement("div");
//         openIssueDiv.innerHTML = `
//         <div class="card w-100% shadow-md py-3 px-4 space-y-4 border-t-4 border-[#00A96E]">
//             <div class="flex justify-between px-2 ">
//                 <img src="images/Open-Status.png" alt="">
//                 <h2 class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full">${issue.priority}</h2>
//                 <p Class="hidden"> ${issue.status} </p>
//             </div>

//             <div class="">
//                 <h2 class="font-semibold text-lg">${issue.title}</h2>
//                 <p class=" text-[#64748B]">${issue.description}</p>
//                 <button class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-bug"></i> ${issue.labels[0]}</button>
//                 <button class="border-2 border-amber-400 bg-yellow-300 font-bold text-amber-500 px-4 h-5 text-xs rounded-full"><i class="fa-solid fa-life-ring"></i> ${issue.labels[1]}</button>
//             </div>

//             <div class=" text-sm text-[#64748B] border-t-2 border-gray-300 flex justify-between">
//                 <p>${issue.author}</p>
//                 <p>${issue.createdAt}</p>
//             </div>
//             <div class=" text-sm text-[#64748B] flex justify-between">
//                 <p>${issue.assignee}</p>
//                 <p>${issue.updatedAt}</p>
//             </div>
//         </div>        
//         `

//         openIssueContainer.append(openIssueDiv);

//     }

//     if (issue.status === "open"){
//         const openIssueDiv = document.getElementById("issue-container")

//     }
// }


