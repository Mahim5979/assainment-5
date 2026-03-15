
let allIssues = []; 
const issueContainer = document.getElementById("issue-container");

let currentBtn = "all"
function switchBtn(id) {
    const btnAll = document.getElementById('btn-all');
    const btnOpen = document.getElementById('btn-open');
    const btnClose = document.getElementById('btn-close');


    [btnAll, btnOpen, btnClose].forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-primary', 'btn-outline');
    });


    const clickedBtn = document.getElementById("btn-" + id);
    if(clickedBtn) {
        clickedBtn.classList.remove('btn-primary', 'btn-outline');
        clickedBtn.classList.add('btn-primary');
    }
}

function openModal(issue) {
    document.getElementById('modal-title').innerText = issue.title;
    document.getElementById('modal-status-badge').innerText = issue.status;
    document.getElementById('modal-author').innerText = `Opened by ${issue.author}`;
    document.getElementById('modal-date').innerText = issue.createdAt;
    document.getElementById('modal-description').innerText = issue.description;
    document.getElementById('modal-assignee').innerText = issue.assignee || issue.author;
    document.getElementById('modal-priority').innerText = issue.priority;
    document.getElementById('modal-labels').innerHTML = issue.labels.map(label => `
        <span class="text-xs border rounded-full px-3 py-1">${label}</span>
    `).join('');
    document.getElementById('my_modal_5').showModal();
}


async function loadIssues() {
    const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
    const json = await response.json();
    allIssues = json.data;
    displayIssue(allIssues);
}


const displayIssue = (issues) => {
    issueContainer.innerHTML = '';
    
    issues.forEach(issue => {
        const borderColor = issue.status === 'open' ? '#00A96E' : '#A855F7';
        const statusIcon = issue.status === 'open' ? './images/Open-Status.png' : './images/Closed- Status .png';
        const issueDiv = document.createElement('div');
        issueDiv.classList.add('cursor-pointer');
        issueDiv.onclick = () => openModal(issue);

        issueDiv.innerHTML = `
        <div style="border-top: 4px solid ${borderColor}" class="card bg-white shadow-md rounded-2xl p-4 flex flex-col gap-3">
            <div class="flex justify-between">
              <img src="${statusIcon}" alt="${issue.status}" class="h-5 w-5">
              <span class="text-xs font-semibold rounded-full px-3 py-1 border bg-amber-200">${issue.priority}</span>
            </div>
            <h2 class="font-bold text-lg">${issue.title}</h2>
            <p class="text-sm text-[#64748B]">${issue.description.slice(0, 100)}...</p>
            <div class="flex gap-2">
                ${issue.labels.map(label =>`<span class="border-2 border-red-300 bg-rose-200 font-bold text-red-400 px-2 h-5 text-xs rounded-full">${label}</span>`).join('')}
            </div>
            <div class=" text-sm text-[#64748B] border-t-2 border-gray-300 flex justify-between">
                <p>${issue.author}</p>
                <p>${issue.createdAt}</p>
            </div>
            <div class=" text-sm text-[#64748B] flex justify-between">
                <p>${issue.assignee}</p>
                <p>${issue.updatedAt}</p>
            </div>
        </div>`;
        issueContainer.appendChild(issueDiv);
    });

    document.getElementById('issue-count').innerText = issues.length;
}


document.getElementById('btn-all').addEventListener('click', () => {
    switchBtn('all');
    displayIssue(allIssues);
});

document.getElementById('btn-open').addEventListener('click', () => {
    switchBtn('open');
    const openData = allIssues.filter(item => item.status === 'open');
    displayIssue(openData);
});

document.getElementById('btn-close').addEventListener('click', () => {
    switchBtn('close');
    const closeData = allIssues.filter(item => item.status === 'closed');
    displayIssue(closeData);
});

document.getElementById('btn-search').addEventListener('click', async function() {
    const searchText = document.getElementById('search-input').value.trim();
    if(searchText === "") return loadIssues();
    
    const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchText}`);
    const data = await res.json();
    displayIssue(data.data);
});

switchBtn(currentBtn)

loadIssues();